"use client";
import { Layout1 } from "@/client/wrappers/Layout1";
import { LoginForm } from "@/client/ui/form/Login";
import { session_state_from_stytch_data } from "@/server/data/session";
import { is_session_valid } from "@/common/data/session/types";
import { useSessionStore } from "@/client/data/session/useSessionStore";

type Props = {
  error?: Error;
  data?: unknown;
};

export default function LoginPage({ error, data }: Props) {
  const useSetSession = useSessionStore((store) => store.useSetSession);
  const setSession = useSetSession();

  const validatePhone = (event: any) => {
    const sessionState = session_state_from_stytch_data(event.data, "otp");
    if (is_session_valid(sessionState?.session)) {
      setSession(sessionState);
      window.location.href = "/account";
    }
  };
  const onEvent = async (event: any) => {
    if (event.type === "OTP_AUTHENTICATE") {
      validatePhone(event);
    }
  };

  return (
    <Layout1>
      {!!error && <div>{JSON.stringify(error, null, " ")}</div>}
      {!!data && (
        <pre>
          <code>{JSON.stringify(data, null, " ")}</code>
        </pre>
      )}
      <LoginForm onEvent={onEvent} />
    </Layout1>
  );
}
