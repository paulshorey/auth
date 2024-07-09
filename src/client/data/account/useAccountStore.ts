import { create } from "zustand";
import { account_default, is_account_valid, account_state, account_type } from "@/common/data/account/types";
import { persist } from "zustand/middleware";
// import { devtools } from "zustand/middleware";

export type AccountStore = account_state & {
  setAccount: (state: account_state) => void;
  resetAccount: () => void;
};

const accountState = (set: (options: Partial<account_state>) => void, get: () => AccountStore) => {
  return {
    account: account_default,
    account_valid: false,
    account_error: undefined,
    setAccount: ({ account, account_error }) => {
      const oldAccount = get().account;
      set({ account: syncAccount(account, oldAccount), account_error, account_valid: is_account_valid(account) });
    },
    resetAccount: () => {
      set({ account: account_default, account_error: undefined });
    },
  } as AccountStore;
};
// export const useAccountStore = create<AccountStore>(accountState);
export const useAccountStore = create(
  persist<AccountStore>(accountState, {
    name: new Date().getDay().toString() + new Date().getMonth().toString() + "26s22ssss1",
  })
);

function syncAccount(newAccount: Record<string, unknown>, oldAccount: Record<string, unknown>): account_type {
  for (let key in oldAccount) {
    if (newAccount[key]) {
      oldAccount[key] = newAccount[key];
    }
    // if (key.startsWith("xata")) {
    //   delete oldAccount[key];
    // }
  }
  return oldAccount;
}
