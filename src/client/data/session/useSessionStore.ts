import { create } from "zustand";
import { sessionStateType, isSessionValid, sessionStateDefault } from "@/common/data/session";
import { persist } from "zustand/middleware";
// import { devtools } from "zustand/middleware";

/**
 * "state" = just the data, serializable, can persist in localStorage if we want
 * "store" = state + plus methods that modify the state
 */
type sessionStoreType = sessionStateType & {
  getState: () => sessionStateType;
  setState: (state: sessionStateType) => void;
  resetState: () => void;
};

const sessionCreate = (set: (state: Partial<sessionStateType>) => void, get: () => sessionStateType) => {
  if (typeof window !== "undefined") {
  }
  return {
    ...sessionStateDefault,
    getState: () => get(),
    setState: async (state: sessionStateType) => {
      let invalid = !isSessionValid(state.session);
      let error = state.error;
      if (error) {
        invalid = true;
      } else if (invalid) {
        error = { name: "500", message: "Session invalid", stack: "useSessionStore.setsessionStateType()" };
      }
      set({ ...state, error, invalid });
    },
    resetState: () => {
      set(sessionStateDefault);
    },
  } as sessionStoreType;
};

export const useSessionStore: (filter?: (arg0: sessionStateType) => any) => sessionStoreType = process.env.NEXT_PUBLIC_STATE_SESSION_CACHE_KEY
  ? // persist state in localStorage
    create(
      persist<sessionStoreType>(sessionCreate, {
        name: process.env.NEXT_PUBLIC_STATE_SESSION_CACHE_KEY,
      })
    )
  : // do not persist
    create<sessionStoreType>(sessionCreate);
