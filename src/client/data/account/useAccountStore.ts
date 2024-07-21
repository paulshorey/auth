import { create } from "zustand";
import { accountDefault, isAccountValid, AccountState, AccountType } from "@/common/data/account/types";
import { persist } from "zustand/middleware";
// import { devtools } from "zustand/middleware";

export type AccountStore = AccountState & {
  setState: (state: AccountState) => Promise<void>;
  resetAccount: () => void;
};

const accountCreate = (set: (options: Partial<AccountState>) => void, get: () => AccountStore) => {
  return {
    account: accountDefault,
    invalid: true,
    error: undefined,
    setState: async (state: AccountState) => {
      const invalid = !isAccountValid(state.account);
      if (invalid && !state.error) {
        state.error = { name: "500", message: "Account invalid", stack: "useAccountStore.setAccount()" };
      }
      const oldAccount = get().account;
      if (state.account) {
        set({ account: mergeAccounts(state.account, oldAccount || {}), error: state.error, invalid });
      }
      if (invalid) {
        fetch("/api/account", {
          method: "POST",
          body: JSON.stringify(state.account),
        });
      }
    },
    resetAccount: () => {
      set({ account: accountDefault, invalid: false, error: undefined });
    },
  } as AccountStore;
};

// export const useAccountStore = create<AccountStore>(accountState);
type Filter = (arg0: AccountState) => any;
const ENABLE_PERSIST_STATE = true;
export const useAccountStore: (filter?: Filter) => AccountStore = create(
  // persist state in localStorage
  persist<AccountStore>(accountCreate, {
    name: ENABLE_PERSIST_STATE ? "account/1" : Math.random().toString(),
  })
);

function mergeAccounts(newAccount: Record<string, unknown>, oldAccount: Record<string, unknown>): AccountType {
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
