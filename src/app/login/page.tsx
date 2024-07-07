import dynamic from "next/dynamic";
const Auth = dynamic(() => import("@/client/pages/Auth"), { ssr: false });

export default function ServerHome() {
  return <Auth />;
}
