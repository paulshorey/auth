import { accountStateType, accountType } from "@/common/data/account";

export const accountMock: accountType = {
  id: "1",
  email: "hello@example.com",
  phone_number: 15555555555,
  name_first: "John",
  name_last: "Smith",
  count: 1,
};
export const accountStateMock: accountStateType = {
  account: accountMock,
  invalid: false,
  error: undefined,
};
