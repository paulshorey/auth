import dynamic from "next/dynamic";
const _404 = dynamic(() => import("@/client/pages/_404"), { ssr: false });

export default function ServerNotFound() {
  return <_404 />;
}
