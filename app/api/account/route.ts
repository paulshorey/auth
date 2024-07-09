import { account_get_or_add } from "@/server/data/account";

export const POST = async function (request: Request) {
  const userData = await request.json();
  const state = await account_get_or_add(userData as any);
  return Response.json(state);
};
