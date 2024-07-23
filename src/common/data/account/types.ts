import { ErrorWithResponseCode } from "../../utils";

export type accountType = {
  id?: string;
  email?: string;
  phone_number?: number;
  name_first?: string;
  name_last?: string;
  count?: number;
};

export type accountStateType = {
  account?: accountType;
  invalid?: boolean;
  error?: ErrorWithResponseCode;
};
