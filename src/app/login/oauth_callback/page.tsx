import { stytch_token_session } from "@/server/auth/stytch";
import { isSession, StytchTokenType } from "@/types";
import dynamic from "next/dynamic";
const Auth = dynamic(() => import("@/client/pages/Auth"), { ssr: false });
const DebugData = dynamic(() => import("@/client/pages/DebugData"), { ssr: false });

type oauthCallbackProps = {
  params: {};
  searchParams: { token: string; stytch_token_type: StytchTokenType };
};

export default async function oauthCallback({ searchParams }: oauthCallbackProps) {
  const { token, stytch_token_type } = searchParams;

  const data = await stytch_token_session({ token, stytch_token_type });
  if (isSession(data)) {
    return <DebugData data={data} />;
  }
  return <Auth error={data} />;
}
