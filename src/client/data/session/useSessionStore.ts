import { create } from "zustand";
import { session_default, session_state, is_session_valid, session_type } from "@/common/data/session/types";
import { persist } from "zustand/middleware";
import { useAccountStore } from "@/client/data/account/useAccountStore";
import { is_account_valid } from "../../../common/data/account/types";
// import { devtools } from "zustand/middleware";

export type SessionStore = session_state & {
  useSetSession: () => (state: session_state) => void;
};

const sessionState = (set: (state: Partial<session_state>) => void, get: () => SessionStore) => {
  return {
    session: session_default,
    session_valid: false,
    session_error: undefined,
    useSetSession: () => {
      const [account, setAccount] = useAccountStore((state) => [state.account, state.setAccount]);
      return async function ({ session, session_error }) {
        // update session state
        set({ session, session_error, session_valid: is_session_valid(session) });
        // update account state
        if (is_session_valid(session)) {
          // && !is_account_valid(account)) {
          // const user = {
          //   ...session.user,
          //   "preferences_ui.dark_mode": true,
          // };
          const accountState = await (
            await fetch("/api/account", {
              method: "POST",
              body: JSON.stringify(session.user),
            })
          ).json();
          setAccount(accountState);
        }
      };
    },
  } as SessionStore;
};
// export const sessionStore = create<SessionStore>(sessionState);
export const useSessionStore = create(
  persist<SessionStore>(sessionState, {
    name: new Date().getDay().toString() + new Date().getMonth().toString() + "26ws2sss21",
  })
);
