"use client";

import { Layout1 } from "@/client/ui/templates/Layout1";
import { useSessionStore } from "@/client/data/session/useSessionStore";
import { useAccountStore } from "../data/account/useAccountStore";

export default function AccountPage() {
  const sessionState = useSessionStore();
  const accountState = useAccountStore();

  return (
    <Layout1>
      <h1>Session:</h1>
      <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
        <code>{JSON.stringify(sessionState, null, " ")}</code>
      </pre>
      <h1>Account:</h1>
      <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
        <code>{JSON.stringify(accountState, null, " ")}</code>
      </pre>
    </Layout1>
  );
}
