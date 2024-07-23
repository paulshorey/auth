import dynamic from "next/dynamic";
const LoginPageClient = dynamic(() => import("@/client/pages/Login"), { ssr: false });

export default function LoginPageServer() {
  return <LoginPageClient />;
}
