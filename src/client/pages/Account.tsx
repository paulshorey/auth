"use client";

import { Layout1 } from "@/client/ui/templates/Layout1";
import { useSessionStore } from "@/client/data/session";
import { useAccountStore } from "@/client/data/account";

export default function AccountPageClient() {
  const sessionState = useSessionStore();
  const accountState = useAccountStore();

  return (
    <Layout1>
      <h1>Session:</h1>
      <sup>Temporary data about the currently sign in. NOTHING permanent, NOT from a database.</sup>
      <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
        <code>{JSON.stringify(sessionState, null, " ")}</code>
      </pre>
      <h1>Account:</h1>
      <sup>Permanent data from database, queried by the validated user email or phone number.</sup>
      <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
        <code>{JSON.stringify(accountState, null, " ")}</code>
      </pre>
    </Layout1>
  );
}
