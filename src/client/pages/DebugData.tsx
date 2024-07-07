"use client";

import Layout1 from "@/client/wrappers/Layout1";

type Props = {
  data: any;
};

export default function DebugData({ data }: Props) {
  return (
    <Layout1>
      <h1>DebugData page:</h1>
      <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
        <code>{JSON.stringify(data, null, " ")}</code>
      </pre>
    </Layout1>
  );
}
