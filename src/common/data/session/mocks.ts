import { accountMock } from "@/common/data/account";
import { sessionType, sessionStateType } from "@/common/data/session";

export const ipinfoMock = {
  status: "success",
  country: "United States",
  countryCode: "US",
  region: "MO",
  regionName: "Missouri",
  city: "Kansas City",
  zip: "64109",
  lat: 39.0696,
  lon: -94.5693,
  timezone: "America/Chicago",
  isp: "Google Fiber Inc.",
  org: "Google Fiber Inc",
  as: "AS16591 Google Fiber Inc.",
  query: "136.37.20.77",
};

export const sessionMock: sessionType = {
  id: "1",
  user: accountMock,
  expires_at: "3024-07-21T22:58:12Z",
  expires_on: 2721602692,
  provider: "Github",
};

export const sessionStateMock: sessionStateType = {
  session: sessionMock,
  invalid: false,
  error: undefined,
  ipinfo: ipinfoMock,
  weatherToday: {},
};
