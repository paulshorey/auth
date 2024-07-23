"use client";

import { Layout1 } from "@/client/ui/templates/Layout1";
import { usePathname } from "next/navigation";

type Props = {
  title?: string | React.ReactNode;
  data?: any;
};

export default function ErrorPageClient({ title, data }: Props) {
  const pathname = usePathname();
  const urlParams = new URLSearchParams(window.location.search);
  const urlData = urlParams.entries();
  const urlDataArray = urlData ? [...urlData] : [];
  return (
    <Layout1>
      <h1>{title ?? "Error:"}</h1>
      <h3>{pathname}</h3>
      <p>
        <a href="/">👈 back to homepage</a>
      </p>
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
