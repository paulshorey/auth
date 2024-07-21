import dynamic from "next/dynamic";
const Error = dynamic(() => import("@/client/pages/Error"), { ssr: false });

export default function ServerNotFound() {
  return <Error title="Page Not Found" />;
}
