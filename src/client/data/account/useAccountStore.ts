import { create } from "zustand";
import { accountDefault, isAccountValid, AccountState, session_state_from_stytch_data } from "@/common/data/account/types";
import { persist } from "zustand/middleware";
import { SessionState } from "@/common/data/session/types";
import { SessionStore } from "@/client/data/session/useSessionStore";
// import { devtools } from "zustand/middleware";

export type AccountStore = AccountState & {
  setAccount: (state: { account: AccountState["account"]; account_error?: AccountState["account_error"] }) => Promise<void>;
  resetAccount: () => void;
};

const accountCreate = (set: (options: Partial<AccountState>) => void, get: () => AccountStore) => {
  return {
    account: accountDefault,
    account_valid: false,
    account_error: undefined,
    setAccount: async ({ account, account_error }) => {
      const account_valid = isAccountValid(account);
      if (account_valid && !account_error) {
        account_error = { name: "Error", message: "Account invalid", stack: "useAccountStore.setAccount()" };
      }
      set({ account: mergeAccounts(account, get().account), account_error, account_valid });
      if (account_valid) {
        await fetch("/api/account", {
          method: "POST",
          body: JSON.stringify(account),
        }).then((res) => res.json());
      }
    },
    resetAccount: () => {
      set({ account: accountDefault, account_valid: false, account_error: undefined });
    },
  } as AccountStore;
};

// export const useAccountStore = create<AccountStore>(accountState);
type Filter = (arg0: AccountState) => any;
const ENABLE_PERSIST_STATE = false;
export const useAccountStore: (filter?: Filter) => AccountStore = create(
  // persist state in localStorage
  persist<AccountStore>(accountCreate, {
    // IN DEVELOPMENT, UNCOMMENT Math.random() to bypass localStorage
    name: ENABLE_PERSIST_STATE ? "1" : Math.random().toString(),
  })
);

function mergeAccounts(newAccount: Record<string, unknown>, oldAccount: Record<string, unknown>): session_state_from_stytch_data {
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
