"use client";
import { Layout1 } from "@/client/ui/templates/Layout1";
import { LoginForm } from "@/client/ui/organisms/forms/Login";
import { encodeJWT } from "@/common/data/encodeDecode";

type Props = {
  error?: Error;
  data?: unknown;
};

export default function LoginPage({ error, data }: Props) {
  /**
   * OTP code from email/phone can only be handled on the client side.
   * But for consistency and security, we fetch session/account data only on the server.
   */
  const validatePhone = async (event: any) => {
    if (event.type === "OTP_AUTHENTICATE") {
      console.log("otp event.data", event.data);
      const otpEventJWT = encodeJWT(event.data);
      // window.location.href = "/account?otpEventJWT=" + encodeURIComponent(otpEventJWT);
      console.log('"/account?otpEventJWT=" + encodeURIComponent(otpEventJWT)', "/account?otpEventJWT=" + encodeURIComponent(otpEventJWT));
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
      <LoginForm onEvent={validatePhone} />
    </Layout1>
  );
}
