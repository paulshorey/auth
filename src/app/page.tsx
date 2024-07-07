import dynamic from "next/dynamic";
const Home = dynamic(() => import("@/client/pages/Home"), { ssr: false });

export default function ServerHome() {
  return <Home />;
}
