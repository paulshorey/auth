import { stytch_token } from "@/server/data/token";
import { isSession, StytchTokenType } from "@/types";
import dynamic from "next/dynamic";
import { data_account_get_or_add } from "@/server/data/account";
const Error = dynamic(() => import("@/client/pages/Error"), { ssr: false });
const Account = dynamic(() => import("@/client/pages/Account"), { ssr: false });

type oauthCallbackProps = {
  params: {};
  searchParams: { token: string; stytch_token_type: StytchTokenType };
};

export default async function oauthCallback({ searchParams }: oauthCallbackProps) {
  const { token, stytch_token_type } = searchParams;

  const session = await stytch_token({ token, stytch_token_type });
  if (isSession(session)) {
    const account = await data_account_get_or_add(session.user);
    if (account?.email === session.user.email) {
      return <Account account={account} />;
    }
    return <Error title={"Error in account:"} data={account} />;
  }
  return <Error title={"Error in session:"} data={session} />;
}
