import { sessionState_from_stytch_data } from "@/server/data/session";
import { isSessionValid, sessionStateType } from "@/common/data/session";
import dynamic from "next/dynamic";
import { decodeJWT } from "@/common/utils/encode";
import { accountState_get_or_add } from "@/server/data/account";
import { accountStateType } from "@/common/data/account";
const AccountSessionPageClient = dynamic(() => import("@/client/pages/AccountSession"), { ssr: false });

type AccountPageProps = {
  params: {};
  searchParams: { data: string };
};

export default async function AccountPageServer({ searchParams }: AccountPageProps) {
  let sessionState = {} as sessionStateType;
  const { data } = searchParams;

  // From phone/email OTP event (redirected from client-side login page)
  if (data) {
    const otpEventData = decodeJWT(data) as sessionStateType;
    sessionState = sessionState_from_stytch_data(otpEventData, "otp");
    if (!sessionState.error) {
      if (!isSessionValid(sessionState.session)) {
        sessionState.invalid = true;
        sessionState.error = { name: "400", message: "OTP authentication error. Please login again.", stack: JSON.stringify(sessionState) };
      }
    }
  }

  // fetch Account data
  let accountState = {} as accountStateType;
  if (!sessionState.invalid && !sessionState.error && sessionState.session?.user) {
    accountState = await accountState_get_or_add(sessionState.session.user);
  }

  return <AccountSessionPageClient accountState={accountState} sessionState={sessionState} />;
}
