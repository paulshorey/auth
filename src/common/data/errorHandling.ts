import { redirect } from "next/navigation";
import { AccountState } from "./account/types";
import { SessionState } from "./session/types";

export const handleStateError = (state: AccountState | SessionState) => {
  if (state.error) {
    console.error("handleStateError", state);
    if (state.error.name === "400") {
      return redirectNextjs("/");
    }
    if (state.error.name === "300") {
      return redirectNextjs(state.error.message);
    }
  }
};

export const redirectNextjs = (redirectUrl: string) => {
  if (typeof window === "undefined") {
    redirect(redirectUrl);
  } else {
    // nextjs client-side redirect
    const router = require("next/router");
    router.default.push(redirectUrl);
  }
};
