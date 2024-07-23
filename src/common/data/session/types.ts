import { accountType } from "@/common/data/account";
import { ipinfoMock } from "./mocks";
import { ErrorWithResponseCode } from "../../utils";

export type ipinfoType = typeof ipinfoMock;

export type sessionType = {
  id: string;
  user: accountType;
  expires_at: string;
  expires_on: number;
  provider: string;
};

export type sessionStateType = {
  session?: sessionType;
  invalid?: boolean;
  error?: ErrorWithResponseCode;
  ipinfo?: ipinfoType;
  weatherToday?: Record<string, string | number | boolean>;
};

export type stytchTokenType = "" | "magic_links" | "oauth" | "otp";
