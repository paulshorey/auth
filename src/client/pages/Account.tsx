"use client";

import { Layout1 } from "@/client/ui/templates/Layout1";
import { SessionState, StytchTokenType } from "@/common/data/session/types";
import { AccountState } from "@/common/data/account/types";
import { useSession } from "@/client/data/session/useSession";
import { useAccount } from "../data/account/useAccount";

type Props = {
  token?: string;
  stytch_token_type?: StytchTokenType;
  sessionState?: SessionState;
  accountState?: AccountState;
};

// function throttle<F extends (...args: any[]) => any>(fn: F, ms: number = 1000): (...args: Parameters<F>) => void {
//   let lastCallTime = 0;
//   return (...args: Parameters<F>): void => {
//     const now = Date.now();
//     if (now - lastCallTime > ms) {
//       fn(...args);
//       lastCallTime = now;
//     }
//   };
// }

export default function AccountPage({ token = "", stytch_token_type = "" }: Props) {
  const sessionState = useSession(token, stytch_token_type);
  const accountState = useAccount();

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
