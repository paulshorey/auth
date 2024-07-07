export type Session = {
  user: UserAccount;
  expires_at: string;
  expires_on: number;
};
export function isSession(session: any): session is Session {
  return session.user?.stytch_id && session.expires_at;
}

export type StytchTokenType = "magic_links" | "oauth";

export type SessionData = Record<string, any>;

export type UserAccount = {
  stytch_id: string;
  provider: string;
  email: string;
  name_first?: string;
  name_last?: string;
  phone_number?: string;
};
// & (UserPasswordValidated | user_google_validated);

// type UserPasswordValidated = {
//   password: string;
//   google_id: undefined;
// };

// type user_google_validated = {
//   google_id: string;
//   password: undefined;
// };
