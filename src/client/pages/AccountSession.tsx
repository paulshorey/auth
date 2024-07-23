"use client";

import { Layout1 } from "@/client/ui/templates/Layout1";
import { sessionStateType, stytchTokenType } from "@/common/data/session";
import { useSessionStore } from "@/client/data/session";
import { useAccountStore } from "../data/account";
import { accountStateType } from "../../common/data/account";
import { useEffect } from "react";
import { redirectNextjs } from "@/common/utils/route";

type Props = {
  accountState?: accountStateType;
  sessionState?: sessionStateType;
  token?: string;
  stytch_token_type?: stytchTokenType;
};

export default function AccountSessionPageClient({ sessionState: sessionStateFromServer, accountState: accountStateFromServer }: Props) {
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
