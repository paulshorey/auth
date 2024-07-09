"use client";

import { Layout1 } from "@/client/wrappers/Layout1";
import { session_state } from "@/common/data/session/types";
import { useSessionStore } from "@/client/data/session/useSessionStore";
import { useEffect } from "react";
import { useAccountStore } from "@/client/data/account/useAccountStore";
import { account_state } from "@/common/data/account/types";

type Props = {
  sessionState?: session_state;
  accountState?: account_state;
};

function throttle<F extends (...args: any[]) => any>(fn: F, ms: number = 1000): (...args: Parameters<F>) => void {
  let lastCallTime = 0;

  return (...args: Parameters<F>): void => {
    const now = Date.now();
    if (now - lastCallTime > ms) {
      fn(...args);
      lastCallTime = now;
    }
  };
}

export default function AccountPage({ sessionState }: Props) {
  const { account, account_error } = useAccountStore();
  const { session, session_valid, session_error, useSetSession } = useSessionStore();
  const setSession = useSetSession();

  // On component mount, set state from server
  useEffect(
    throttle(() => {
      if (session_valid) {
        setSession({ session });
      } else {
        sessionState && setSession(sessionState);
      }
    }),
    []
  );

  return (
    <Layout1>
      <h1>Account page:</h1>
      <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
        <code>{JSON.stringify({ session, session_error }, null, " ")}</code>
      </pre>
      <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
        <code>{JSON.stringify({ account, account_error }, null, " ")}</code>
      </pre>
    </Layout1>
  );
}
