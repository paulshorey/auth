"use client";
import { Layout1 } from "@/client/ui/templates/Layout1";
import { LoginForm } from "@/client/ui/organisms/forms/Login";

function redirectWithPut(url: string, data: Record<string, any>) {
  // Create form
  let form = document.createElement("form");
  form.method = "PUT";
  form.action = url;

  // Create hidden input elements for each data item
  Object.keys(data).forEach(function (key) {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  });

  // Append form to body and submit
  document.body.appendChild(form);
  form.submit();
}

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
      redirectWithPut("/account", { otpEventDataJSON: JSON.stringify(event.data) });
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
