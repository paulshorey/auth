import { AccountType, accountDefault } from "@/common/data/account/types";

export function isSessionValid(state: any): state is SessionState {
  return !state?.session_error && state?.session?.id && state?.session?.user && state?.session?.expires_at && state?.session?.expires_on > Date.now() / 1000;
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
  session_invalid: true,
  session_error: undefined,
};

export type SessionType = {
  id: string;
  user: AccountType;
  expires_at: string;
  expires_on: number;
  provider: string;
};

export type SessionState = {
  session: SessionType | {};
  session_invalid?: boolean;
  session_error?: ErrorWithResponseCode;
};

export type StytchTokenType = "" | "magic_links" | "oauth" | "otp";
