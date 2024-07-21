import { session_from_stytch_token } from "@/server/data/session";
import { StytchTokenType } from "@/common/data/session/types";
import dynamic from "next/dynamic";
import { handleStateError } from "@/common/data/errorHandling";
const Account = dynamic(() => import("@/client/pages/Account"), { ssr: false });

type AccountPageProps = {
  params: {};
  searchParams: { token: string; stytch_token_type: StytchTokenType };
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { token, stytch_token_type } = searchParams;
  // Pass state from server
  const sessionState = await session_from_stytch_token({ token, stytch_token_type });
  if (sessionState.error) {
    handleStateError(sessionState);
  }
  return <Account sessionState={sessionState} />;
}
