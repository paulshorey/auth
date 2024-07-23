import { accountDefault } from "@/common/data/account";
import { sessionType, sessionStateType } from "@/common/data/session";

export const sessionDefault: sessionType = {
  id: "",
  user: accountDefault,
  expires_at: "",
  expires_on: 0,
  provider: "",
};
export const sessionStateDefault: sessionStateType = {
  session: sessionDefault,
  invalid: true,
  error: undefined,
};
