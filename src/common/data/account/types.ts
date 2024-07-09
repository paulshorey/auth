export function is_account_valid(account: any): account is account_type {
  return !!account.email || !!account.phone_number;
}

export const account_default = {
  email: "",
  phone_number: 0,
  name_first: "",
  name_last: "",
};

export type account_type = {
  xata_id?: string;
  email?: string;
  phone_number?: number;
  name_first?: string;
  name_last?: string;
};

export type account_state = {
  account: account_type;
  account_valid?: boolean;
  account_error?: Error;
};
