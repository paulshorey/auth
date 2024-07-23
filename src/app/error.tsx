"use client"; // error MUST BE a client component

import dynamic from "next/dynamic";
const ErrorPageClient = dynamic(() => import("@/client/pages/Error"), { ssr: false });

export default function ErrorPageServer({ error }: { error: any }) {
  return <ErrorPageClient data={error} />;
}
