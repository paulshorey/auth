import { sessionState_from_stytch_token } from "@/server/data/session";
import { sessionStateType, stytchTokenType } from "@/common/data/session";
import dynamic from "next/dynamic";
import { handleErrorWithResponseCode } from "@/common/utils/debug";
import { accountState_get_or_add } from "@/server/data/account";
import { accountStateType } from "@/common/data/account";

const AccountSessionPageClient = dynamic(() => import("@/client/pages/AccountSession"), { ssr: false });

type AccountPageProps = {
  params: {};
  searchParams: { token: string; stytch_token_type: stytchTokenType };
};

export default async function AccountPageServer({ searchParams }: AccountPageProps) {
  let sessionState = {} as sessionStateType;
  const { token, stytch_token_type } = searchParams;

  // session from token (redirected from OAuth provider)
  if (token && stytch_token_type) {
    sessionState = await sessionState_from_stytch_token({ token, stytch_token_type });
    if (sessionState.error) {
      handleErrorWithResponseCode(sessionState.error);
    }
  }

  // fetch Account data
  let accountState = {} as accountStateType;
  if (!sessionState.invalid && !sessionState.error && sessionState.session?.user) {
    accountState = await accountState_get_or_add(sessionState.session.user);
  }

  return <AccountSessionPageClient accountState={accountState} sessionState={sessionState} />;
}
