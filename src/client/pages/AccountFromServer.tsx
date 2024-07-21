"use client";

import { Layout1 } from "@/client/ui/templates/Layout1";
import { SessionState, StytchTokenType } from "@/common/data/session/types";
import { useSessionStore } from "@/client/data/session/useSessionStore";
import { useAccountStore } from "../data/account/useAccountStore";
import { AccountState } from "../../common/data/account/types";
import { useEffect } from "react";
import { redirectNextjs } from "../../common/data/errorHandling";

type Props = {
  accountState?: AccountState;
  sessionState?: SessionState;
  token?: string;
  stytch_token_type?: StytchTokenType;
};

export default function AccountFromServer({ sessionState: sessionStateFromServer, accountState: accountStateFromServer }: Props) {
  const sessionState = useSessionStore();
  const accountState = useAccountStore();

  useEffect(() => {
    if (sessionStateFromServer) {
      sessionState.setState(sessionStateFromServer);
      redirectNextjs("/account");
    }
  }, [sessionStateFromServer]);

  useEffect(() => {
    if (accountStateFromServer) {
      accountState.setState(accountStateFromServer);
      redirectNextjs("/account");
    }
  }, [accountStateFromServer]);

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
