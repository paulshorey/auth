import dynamic from "next/dynamic";
const Login = dynamic(() => import("@/client/pages/Login"), { ssr: false });

export default function LoginPageServer() {
  return <Login />;
}
