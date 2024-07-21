import dynamic from "next/dynamic";
const Account = dynamic(() => import("@/client/pages/Account"), { ssr: false });

export default async function AccountPage() {
  return <Account />;
}
