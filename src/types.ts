export type Session = {
  expires: number;
  user: Record<string, any>;
  session: Record<string, any>;
};
export function isSession(data: any): data is Session {
  return data.expires && data.user && data.session;
}

export type StytchTokenType = "magic_links" | "oauth";

export type user = {
  email: string;
  name_first: string;
  name_last: string;
  phone_number: string;
};

export type user_password = {
  password: string;
  google_id: undefined;
} & user;

export type user_google = {
  google_id: string;
  password: undefined;
} & user;
