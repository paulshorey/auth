"use client";

import Layout1 from "@/client/wrappers/Layout1";

type Props = {
  title?: string | React.ReactNode;
  data?: any;
};

export default function Error({ title, data }: Props) {
  const urlParams = new URLSearchParams(window.location.search);
  const urlData = urlParams.entries();
  const urlDataArray = urlData ? [...urlData] : [];
  return (
    <Layout1>
      <h1>{title ?? "Error:"}</h1>
      {!!data && (
        <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
          <code>{JSON.stringify(data, null, " ")}</code>
        </pre>
      )}
      {!!urlDataArray.length && (
        <pre style={{ textAlign: "left", maxWidth: "100dvw" }}>
          <code>{JSON.stringify(urlDataArray, null, " ")}</code>
        </pre>
      )}
    </Layout1>
  );
}
