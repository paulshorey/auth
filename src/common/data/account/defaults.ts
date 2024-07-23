import { accountStateType, accountType } from "@/common/data/account";

export const accountDefault: accountType = {
  id: "",
  email: "",
  phone_number: 0,
  name_first: "",
  name_last: "",
  count: 0,
};
export const accountStateDefault: accountStateType = {
  account: accountDefault,
  invalid: true,
  error: undefined,
};
