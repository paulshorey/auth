import { create } from "zustand";
import { sessionDefault, SessionState, isSessionValid, SessionType } from "@/common/data/session/types";
import { persist } from "zustand/middleware";
// import { devtools } from "zustand/middleware";

/**
 * "state" = just the data, serializable, can persist in localStorage if we want
 * "store" = state + plus methods that modify the state
 */
export type SessionStore = SessionState & {
  setState: (state: SessionState) => void;
  getState: () => SessionState;
};

const sessionCreate = (set: (state: Partial<SessionState>) => void, get: () => SessionState) => {
  return {
    getState: () => get(),
    setState: async (state: SessionState) => {
      let invalid = !isSessionValid(state.session);
      let error = state.error;
      if (error) {
        invalid = true;
      } else if (invalid) {
        error = { name: "500", message: "Session invalid", stack: "useSessionStore.setSessionState()" };
      }
      set({ session: state.session, error, invalid });
    },
    session: sessionDefault,
    invalid: true,
    error: undefined,
  } as SessionStore;
};

type Filter = (arg0: SessionState) => any;
const ENABLE_PERSIST_STATE = false;
export const useSessionStore: (filter?: Filter) => SessionStore = create(
  // persist state in localStorage
  persist<SessionStore>(sessionCreate, {
    // IN DEVELOPMENT, UNCOMMENT Math.random() to bypass localStorage
    name: ENABLE_PERSIST_STATE ? "1" : Math.random().toString(),
  })
);

// export const useAccountStore = () => {
//   const store = createStore((state) => state);
//   const account = store.account;
//   useEffect(() => {
//     // @ts-ignore
//     window.accountStore = store;
//     // @ts-ignore
//     console.log("accountStore", window.accountStore);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [account]);
//   return store;
// };
