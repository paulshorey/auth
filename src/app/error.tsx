"use client"; // error MUST BE a client component

import dynamic from "next/dynamic";
const Error = dynamic(() => import("@/client/pages/Error"), { ssr: false });

export default function ServerError({ error }: { error: any }) {
  return <Error data={error} />;
}
