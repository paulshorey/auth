import { session_from_stytch_token } from "@/server/data/session";
import { isSessionValid, StytchTokenType } from "@/common/data/session/types";
import dynamic from "next/dynamic";
import { account_get_or_add } from "@/server/data/account";
const Error = dynamic(() => import("@/client/pages/Error"), { ssr: false });
const Account = dynamic(() => import("@/client/pages/Account"), { ssr: false });

type oauthCallbackProps = {
  params: {};
  searchParams: { token: string; stytch_token_type: StytchTokenType };
};

export default async function oauthCallback({ searchParams }: oauthCallbackProps) {
  const { token, stytch_token_type } = searchParams;

  const sessionState = await session_from_stytch_token({ token, stytch_token_type });
  if (isSessionValid(sessionState)) {
    const accountState = await account_get_or_add(sessionState.session.user);
    if (accountState?.account.email === sessionState?.session.user.email) {
      return <Account accountState={accountState} />;
    }
    return <Error title={"Error in account:"} data={accountState} />;
  }
  return <Error title={"Error in session:"} data={sessionState} />;
}
