"use client";
import { Layout1 } from "@/client/ui/templates/Layout1";
import { LoginForm } from "@/client/ui/organisms/forms/Login";

type Props = {
  error?: Error;
  data?: unknown;
};

export default function LoginPageClient({ error, data }: Props) {
  return (
    <Layout1>
      {!!error && <div>{JSON.stringify(error, null, " ")}</div>}
      {!!data && (
        <pre>
          <code>{JSON.stringify(data, null, " ")}</code>
        </pre>
      )}
      <LoginForm />
    </Layout1>
  );
}
