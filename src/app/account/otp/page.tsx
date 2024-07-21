import { SessionState_from_stytch_data } from "@/server/data/session";
import { isSessionValid, SessionState } from "@/common/data/session/types";
import dynamic from "next/dynamic";
import { decodeJWT } from "@/common/data/encodeDecode";
import { account_get_or_add } from "@/server/data/account/index";
import { AccountState } from "../../../common/data/account/types";
const Account = dynamic(() => import("@/client/pages/AccountFromServer"), { ssr: false });

type AccountPageProps = {
  params: {};
  searchParams: { data: string };
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  let sessionState = {} as SessionState;
  const { data } = searchParams;

  // From phone/email OTP event (redirected from client-side login page)
  if (data) {
    const otpEventData = decodeJWT(data) as SessionState;
    sessionState = SessionState_from_stytch_data(otpEventData, "otp");
    if (!sessionState.error) {
      if (!isSessionValid(sessionState.session)) {
        sessionState.invalid = true;
        sessionState.error = { name: "400", message: "OTP authentication error. Please login again.", stack: JSON.stringify(sessionState) };
      }
    }
  }

  // fetch Account data
  let accountState = {} as AccountState;
  if (!sessionState.invalid && !sessionState.error && sessionState.session?.user) {
    accountState = await account_get_or_add(sessionState.session.user);
  }

  return <Account accountState={accountState} sessionState={sessionState} />;
}
