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

  if (!token || !stytch_token_type) {
    redirect("/login");
  }

  return <Account token={token} stytch_token_type={stytch_token_type} />;
}
