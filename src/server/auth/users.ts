import { xata_auth_users_list, xata_auth_users_get, xata_auth_users_add, xata_auth_users_update } from "@/server/xata/auth/users";

/**
 * List all users
 */
export async function auth_users_list() {
  return await xata_auth_users_list();
}

/**
 * Find by key (args[0]) and value (args[1])
 */
export async function auth_users_get(key: string, value: string) {
  return await xata_auth_users_get(key, value);
}

/**
 * Create new user. Fail if already exists!
 */
export async function auth_users_add(userPost: user_password | user_google) {
  return await xata_auth_users_add(userPost);
}

/**
 * Update existing user. Fail if does not exist!
 */
export async function auth_users_update(userPost: user_password | user_google) {
  return await xata_auth_users_update(userPost);
}
