export function isAccountValid(account: any): account is session_state_from_stytch_data {
  return !!account.email || !!account.phone_number;
}

export const accountDefault = {
  email: "",
  phone_number: 0,
  name_first: "",
  name_last: "",
};
export const accountStateDefault: AccountState = {
  account: accountDefault,
  account_valid: false,
  account_error: undefined,
};

export type session_state_from_stytch_data = {
  xata_id?: string;
  email?: string;
  phone_number?: number;
  name_first?: string;
  name_last?: string;
};

export type AccountState = {
  account: session_state_from_stytch_data;
  account_valid?: boolean;
  account_error?: Error;
};
