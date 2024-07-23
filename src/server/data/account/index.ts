import { accountType } from "@/common/data/account";
import { xata_account_get_or_add, xata_account_edit_by_phone_or_email } from "@/server/data/account/xata";

export const accountState_get_or_add: typeof xata_account_get_or_add = async (account: accountType) => {
  return await xata_account_get_or_add(account);
  // try {
  // } catch (e) {
  //   try {
  //   } catch (e) {
  //     console.error("Error!", e);
  //   }
  // }
};

export const accountState_edit_by_phone_or_email = async (account: accountType) => {
  return await xata_account_edit_by_phone_or_email(account);
  // try {
  // } catch (e) {
  //   try {
  //   } catch (e) {
  //     console.error("Error!", e);
  //   }
  // }
};
