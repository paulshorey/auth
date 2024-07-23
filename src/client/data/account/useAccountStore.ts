import { create } from "zustand";
import { isAccountValid, accountStateType, accountType, accountStateDefault } from "@/common/data/account";
import { persist } from "zustand/middleware";
import { sessionStateType } from "@/common/data/session";
// import { devtools } from "zustand/middleware";

type accountStoreType = accountStateType & {
  getState: () => sessionStateType;
  setState: (state: accountStateType) => Promise<void>;
  resetState: () => void;
};

const accountStore = (set: (options: Partial<accountStateType>) => void, get: () => accountStoreType) => {
  return {
    ...accountStateDefault,
    getState: () => get(),
    setState: async (state: accountStateType) => {
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
    resetState: () => {
      set(accountStateDefault);
    },
  } as accountStoreType;
};

export const useAccountStore: (filter?: (arg0: accountStateType) => any) => accountStoreType = process.env.NEXT_PUBLIC_STATE_ACCOUNT_CACHE_KEY
  ? // persist state in localStorage
    create(
      persist<accountStoreType>(accountStore, {
        name: process.env.NEXT_PUBLIC_STATE_ACCOUNT_CACHE_KEY,
      })
    )
  : // do not persist
    create<accountStoreType>(accountStore);

function mergeAccounts(newAccount: Record<string, unknown>, oldAccount: Record<string, unknown>): accountType {
  for (let key in oldAccount) {
    if (newAccount[key]) {
      oldAccount[key] = newAccount[key];
    }
    // if (key.startsWith("xata")) {
    //   delete oldAccount[key];
    // }
  }
  return oldAccount as accountType;
}
