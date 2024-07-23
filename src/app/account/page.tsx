import dynamic from "next/dynamic";
const AccountPageClient = dynamic(() => import("@/client/pages/Account"), { ssr: false });

export default async function AccountPageServer() {
  return <AccountPageClient />;
}
