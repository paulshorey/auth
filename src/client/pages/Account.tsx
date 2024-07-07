"use client";

import Layout1 from "@/client/wrappers/Layout1";

type Props = {
  account: any;
};

export default function DebugAccount({ account }: Props) {
  return (
    <Layout1>
      <h1>Account page:</h1>
      <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
        <code>{JSON.stringify(account, null, " ")}</code>
      </pre>
    </Layout1>
  );
}
