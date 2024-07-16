"use client";
import { Layout1 } from "@/client/ui/templates/Layout1";
import { LoginForm } from "@/client/ui/organisms/forms/Login";
import { SessionState_from_stytch_data } from "@/server/data/session";
import { isSessionValid } from "@/common/data/session/types";
import { useSessionStore } from "@/client/data/session/useSessionStore";

type Props = {
  error?: Error;
  data?: unknown;
};

export default function LoginPage({ error, data }: Props) {
  const { setSession } = useSessionStore((state) => state.session);

  const validatePhone = (event: any) => {
    const sessionState = SessionState_from_stytch_data(event.data, "otp");
    if (isSessionValid(sessionState?.session)) {
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
