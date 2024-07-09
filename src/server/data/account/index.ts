import { Repository } from "@xata.io/client";
import { getXataClient, UsersRecord } from "./xata";
import { account_state, account_type, is_account_valid } from "@/common/data/account/types";

/**
 * Find user by email or phone_number
 */
export async function account_get(userPost: account_type, users?: Repository<UsersRecord>): Promise<account_state> {
  users = users ?? getXataClient().db.users;
  try {
    let user;
    if (userPost.email) {
      user = await users
        .filter({
          email: userPost.email,
        })
        ?.getFirst();
    }
    if (userPost.phone_number) {
      user = await users
        .filter({
          phone_number: userPost.phone_number,
        })
        ?.getFirst();
    }
    if (user) {
      // const user_preferences_ui = getXataClient().db.user_preferences_ui;
      // const ui = await user_preferences_ui.create({
      //   dark_mode: true,
      // });
      // const updated = await users.update(user.xata_id, {
      //   preferences_ui: ui.xata_id,
      // });
      // @ts-ignore
      return { account: user?.toSerializable() };
    } else {
      return { account: {}, account_error: { name: "Fail", message: "account_get invalid user", stack: JSON.stringify(userPost) } };
    }
  } catch (e) {
    return { account: {}, account_error: { name: "Error", message: "account_get catch", stack: JSON.stringify({ e, userPost }) } };
  }
}

/**
 * Create new user. Return existing user if already exists.
 */
export async function account_get_or_add(userPost: account_type): Promise<account_state> {
  const users = getXataClient().db.users;
  try {
    // get
    {
      let accountState = await account_get(userPost, users);
      if (is_account_valid(accountState.account)) {
        return accountState;
      }
    }
  } catch (e) {
    return { account: {}, account_error: { name: "Error", message: "account_get_or_add get catch", stack: JSON.stringify({ e, userPost }) } };
  }
  try {
    // add
    const account = await users.create(userPost);
    if (is_account_valid(account)) {
      return { account };
    } else {
      return { account: {}, account_error: { name: "Fail", message: "account_get_or_add invalid user", stack: JSON.stringify(userPost) } };
    }
  } catch (e) {
    return { account: {}, account_error: { name: "Error", message: "account_get_or_add add catch", stack: JSON.stringify({ e, userPost }) } };
  }
}

/**
 * Update existing user. Fail if does not exist!
 */
export async function account_update(userPost: account_type): Promise<account_state> {
  const users = getXataClient().db.users;
  const userId = (await account_get(userPost, users))?.account?.xata_id;
  if (!userId) {
    return { account: {}, account_error: { name: "Fail", message: "account_update !userId", stack: JSON.stringify(userPost) } };
  }
  const user = await users.update(userId, userPost);
  if (is_account_valid(user)) {
    return { account: user };
  } else {
    return { account: {}, account_error: { name: "Fail", message: "account_update invalid user", stack: JSON.stringify(userPost) } };
  }
}
