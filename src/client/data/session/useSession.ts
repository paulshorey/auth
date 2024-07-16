import { useEffect, useState } from "react";
import { StytchTokenType, SessionState } from "@/common/data/session/types";
import { session_from_stytch_token } from "@/server/data/session";
import { useSessionStore } from "@/client/data/session/useSessionStore";

export const useSession = (token: string, stytch_token_type: StytchTokenType) => {
  const [sessionState, setSessionState] = useState<SessionState>(useSessionStore());

  useEffect(() => {
    (async () => {
      const sessionState = await session_from_stytch_token({ token, stytch_token_type });
      setSessionState(sessionState);
    })();
  }, [token, stytch_token_type]);

  return sessionState;
};
