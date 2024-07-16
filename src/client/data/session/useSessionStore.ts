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
  setSession: (state: { session: SessionState["session"]; session_error?: SessionState["session_error"] }) => Promise<void>;
  useSetSession: (session: SessionType) => void;
};

const sessionCreate = (set: (state: Partial<SessionState>) => void, get: () => SessionState) => {
  return {
    setState: (state: SessionState) => {
      set(state);
    },
    getState: () => get(),
    setSession: async ({ session, session_error }) => {
      const session_valid = isSessionValid(session);
      if (session_valid && !session_error) {
        session_error = { name: "Error", message: "Session invalid", stack: "useSessionStore.setSession()" };
      }
      set({ session: session, session_error, session_valid });
    },
    session: sessionDefault,
    session_valid: false,
    session_error: undefined,
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
