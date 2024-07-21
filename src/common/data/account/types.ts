export function isAccountValid(account: any): account is AccountType {
  return !!account?.email || !!account?.phone_number;
}

export const accountDefault = {
  email: "",
  phone_number: 0,
  name_first: "",
  name_last: "",
};
export const accountStateDefault: AccountState = {
  account: accountDefault,
  account_invalid: true,
  account_error: undefined,
};

export type AccountType = {
  xata_id?: string;
  email?: string;
  phone_number?: number;
  name_first?: string;
  name_last?: string;
};

export type AccountState = {
  account: AccountType;
  account_invalid?: boolean;
  account_error?: ErrorWithResponseCode;
};
