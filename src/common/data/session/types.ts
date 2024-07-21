import { AccountType, accountDefault } from "@/common/data/account/types";

export function isSessionValid(session: any): session is SessionType {
  return session?.id && session?.user && session?.expires_at && session?.expires_on > Date.now() / 1000;
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
  invalid: true,
  error: undefined,
};

export type SessionType = {
  id: string;
  user: AccountType;
  expires_at: string;
  expires_on: number;
  provider: string;
};

export type SessionState = {
  session?: SessionType;
  invalid?: boolean;
  error?: ErrorWithResponseCode;
};

export type StytchTokenType = "" | "magic_links" | "oauth" | "otp";
