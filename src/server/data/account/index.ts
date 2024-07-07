import { Repository } from "@xata.io/client";
import { getXataClient, UsersRecord } from "./xata";
import { UserAccount } from "@/types";

/**
 * Find by key (args[0]) and value (args[1])
 */
export async function data_account_get(key: string, value: string, users?: Repository<UsersRecord>) {
  users = users ?? getXataClient().db.users;

  // const { email, password, google_id, name_first, name_last, phone_number } = user;
  const user = (
    await users
      .filter({
        [key]: value,
      })
      ?.getFirst()
  )?.toSerializable();

  if (!user) {
    console.error("data_account_get !user", key + " = " + value);
  }
  return user;
}

/**
 * Create new user. Return existing user if already exists.
 */
export async function data_account_get_or_add(userPost: UserAccount, users?: Repository<UsersRecord>) {
  users = users ?? getXataClient().db.users;
  // get
  const user = await data_account_get("email", userPost.email, users);
  if (user) {
    return user;
  }
  // add
  try {
    // create accepts one (User) or multiple users (User[])
    const user = await users.create(userPost);
    return user;
  } catch (e) {
    console.error("data_account_get_or_add error", e);
    return null;
  }
}

/**
 * Update existing user. Fail if does not exist!
 */
export async function data_account_update(userPost: UserAccount) {
  const users = getXataClient().db.users;

  // must specify which user xata_id to update
  const userId = (await data_account_get("email", userPost.email))?.xata_id;
  if (!userId) {
    console.error("data_account_update !userId", userPost.email);
    return null;
  }
  const user = await users.update(userId, userPost);

  return user;
}
