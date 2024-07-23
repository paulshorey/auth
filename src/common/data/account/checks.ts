import { accountType } from "@/common/data/account";

export function isAccountValid(account: any): account is accountType {
  return !!account?.email || !!account?.phone_number;
}
