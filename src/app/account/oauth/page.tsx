import { session_from_stytch_token } from "@/server/data/session";
import { SessionState, StytchTokenType } from "@/common/data/session/types";
import dynamic from "next/dynamic";
import { handleStateError } from "@/common/data/errorHandling";
import { account_get_or_add } from "@/server/data/account/index";
import { AccountState } from "@/common/data/account/types";
const Account = dynamic(() => import("@/client/pages/AccountFromServer"), { ssr: false });

type AccountPageProps = {
  params: {};
  searchParams: { token: string; stytch_token_type: StytchTokenType };
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  let sessionState = {} as SessionState;
  const { token, stytch_token_type } = searchParams;

  // From token (redirected from OAuth provider)
  if (token && stytch_token_type) {
    sessionState = await session_from_stytch_token({ token, stytch_token_type });
    if (sessionState.error) {
      handleStateError(sessionState);
    }
  }

  // fetch Account data
  let accountState = {} as AccountState;
  if (!sessionState.invalid && !sessionState.error && sessionState.session?.user) {
    accountState = await account_get_or_add(sessionState.session.user);
  }

  return <Account accountState={accountState} sessionState={sessionState} />;
}
