import { getXataClient } from "./xata";
import { user_password, user_google } from "@/types";

/**
 * List all users
 */
export async function xata_auth_users_list() {
  const users = getXataClient().db.users;

  const list = (await users.getPaginated())?.records;

  return list;
}

/**
 * Find by key (args[0]) and value (args[1])
 */
export async function xata_auth_users_get(key: string, value: string) {
  const users = getXataClient().db.users;

  // const { email, password, google_id, name_first, name_last, phone_number } = user;
  const user = await users
    .filter({
      [key]: value,
    })
    ?.getFirst();

  if (!user) {
    console.error("xata_auth_users_get does not exist", key + " = " + value);
  }
  return user;
}

/**
 * Create new user. Fail if already exists!
 */
export async function xata_auth_users_add(userPost: user_password | user_google) {
  const users = getXataClient().db.users;

  try {
    // create accepts one (User) or multiple users (User[])
    const user = await users.create(userPost);

    return user;
  } catch (e) {
    console.error("xata_auth_users_add already exists", userPost.email);
    return null;
  }
}

/**
 * Update existing user. Fail if does not exist!
 */
export async function xata_auth_users_update(userPost: user_password | user_google) {
  const users = getXataClient().db.users;

  // must specify which user xata_id to update
  const userId = (await xata_auth_users_get("email", userPost.email))?.xata_id;
  if (!userId) {
    console.error("xata_auth_users_update does not exist", userPost.email);
    return null;
  }
  const user = await users.update(userId, userPost);

  return user;
}
