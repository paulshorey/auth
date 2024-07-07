"use client"; // error MUST BE a client component

import dynamic from "next/dynamic";
const DebugData = dynamic(() => import("@/client/pages/DebugData"), { ssr: false });

export default function ServerError({ error }: { error: any }) {
  return <DebugData data={error} />;
}
