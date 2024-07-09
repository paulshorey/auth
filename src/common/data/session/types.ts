import { account_type, account_default } from "@/common/data/account/types";

export function is_session_valid(session: any): session is session_type {
  return session?.stytch_id && session?.user && session?.expires_at && session?.expires_on > Date.now() / 1000;
}

export type session_user_meta = {
  stytch_id: string;
  provider: string;
};

export const session_default: session_type = {
  user: account_default,
  expires_at: "",
  expires_on: 0,
  stytch_id: "",
  provider: "",
};

export type session_type = {
  user: account_type;
  expires_at: string;
  expires_on: number;
  stytch_id: string;
  provider: string;
};

export type session_state = {
  session?: session_type;
  session_valid?: boolean;
  session_error?: Error;
};

export type stytch_token_type_type = "magic_links" | "oauth" | "otp";
