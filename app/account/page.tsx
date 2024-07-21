import { session_from_stytch_token } from "@/server/data/session";
import { StytchTokenType } from "@/common/data/session/types";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
const Account = dynamic(() => import("@/client/pages/Account"), { ssr: false });

type oauthCallbackProps = {
  params: {};
  searchParams: { token: string; stytch_token_type: StytchTokenType };
};

export default async function oauthCallback({ searchParams }: oauthCallbackProps) {
  const { token, stytch_token_type } = searchParams;
  if (token && stytch_token_type) {
    // Pass state from server
    const sessionState = await session_from_stytch_token({ token, stytch_token_type });
    if (sessionState.session_error?.name === "400") {
      redirect("/");
    }
    return <Account sessionState={sessionState} />;
  } else {
    // Have state in client
    return <Account />;
  }
}
