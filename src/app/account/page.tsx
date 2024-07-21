import { session_from_stytch_token, SessionState_from_stytch_data } from "@/server/data/session";
import { isSessionValid, SessionState, StytchTokenType } from "@/common/data/session/types";
import dynamic from "next/dynamic";
import { handleStateError } from "@/common/data/errorHandling";
import { account_get_or_add } from "@/server/data/account/index";
import { AccountState } from "../../common/data/account/types";
const Account = dynamic(() => import("@/client/pages/Account"), { ssr: false });

type AccountPageProps = {
  params: {};
  searchParams: { token?: string; stytch_token_type?: StytchTokenType; otpEventDataJSON?: string };
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  let sessionState = {} as SessionState;
  const { token, stytch_token_type, otpEventDataJSON } = searchParams;

  // From token (redirected from OAuth provider)
  if (token && stytch_token_type) {
    sessionState = await session_from_stytch_token({ token, stytch_token_type });
    if (sessionState.error) {
      handleStateError(sessionState);
    }
  }

  // // From phone/email OTP event (redirected from client-side login page)
  // if (otpEventJWT) {
  //   const otpEventData = decodeJWT(otpEventJWT) as SessionState;
  //   sessionState = SessionState_from_stytch_data(otpEventData, "otp");
  //   if (!sessionState.error) {
  //     if (!isSessionValid(sessionState.session)) {
  //       sessionState.invalid = true;
  //       sessionState.error = { name: "400", message: "OTP authentication error. Please login again.", stack: JSON.stringify(sessionState) };
  //     }
  //   }
  // }
  // From phone/email OTP event (redirected from client-side login page)
  console.log("otpEventDataJSON", otpEventDataJSON);
  if (otpEventDataJSON) {
    const otpEventData = JSON.parse(otpEventDataJSON);
    console.log("otpEventData", otpEventData);
    if (otpEventData && otpEventData.user) {
      sessionState = SessionState_from_stytch_data(otpEventData, "otp");
      console.log("otpEventData sessionState", sessionState);
      if (!sessionState.error) {
        if (!isSessionValid(sessionState.session)) {
          sessionState.invalid = true;
          sessionState.error = { name: "400", message: "OTP authentication error. Please login again.", stack: JSON.stringify(sessionState) };
        }
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
