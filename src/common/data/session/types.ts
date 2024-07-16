import { session_state_from_stytch_data, accountDefault } from "@/common/data/account/types";

export function isSessionValid(state: any): state is SessionState {
  console.log("session3", state);
  return state?.session?.id && state?.session?.user && state?.session?.expires_at && state?.session?.expires_on > Date.now() / 1000;
}

export const sessionDefault: SessionType = {
  id: "",
  user: accountDefault,
  expires_at: "",
  expires_on: 0,
  provider: "",
};
export const sessionStateDefault: SessionState = {
  session: sessionDefault,
  session_valid: false,
  session_error: undefined,
};

export type SessionType = {
  id: string;
  user: session_state_from_stytch_data;
  expires_at: string;
  expires_on: number;
  provider: string;
};

export type SessionState = {
  session: SessionType | {};
  session_valid?: boolean;
  session_error?: Error;
};

export type StytchTokenType = "" | "magic_links" | "oauth" | "otp";
