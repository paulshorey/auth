import { session_from_stytch_token } from "@/server/data/session";
import { stytch_token_type_type } from "@/common/data/session/types";
import dynamic from "next/dynamic";
const Account = dynamic(() => import("@/client/pages/Account"), { ssr: false });

type oauthCallbackProps = {
  params: {};
  searchParams: { token: string; stytch_token_type: stytch_token_type_type };
};

export default async function oauthCallback({ searchParams }: oauthCallbackProps) {
  const { token, stytch_token_type } = searchParams;
  if (token && stytch_token_type) {
    // Pass state from server
    const sessionState = await session_from_stytch_token({ token, stytch_token_type });
    return <Account sessionState={sessionState} />;
  } else {
    // Have state in client
    return <Account />;
  }
}
