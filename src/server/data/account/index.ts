import { Repository } from "@xata.io/client";
import { getXataClient, UsersRecord } from "./xata";
import { AccountState, session_state_from_stytch_data, isAccountValid } from "@/common/data/account/types";

/**
 * Find user by email or phone_number
 */
export async function account_get(userPost: session_state_from_stytch_data, users?: Repository<UsersRecord>): Promise<AccountState> {
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
export async function account_get_or_add(userPost: session_state_from_stytch_data): Promise<AccountState> {
  const users = getXataClient().db.users;
  try {
    // get
    {
      let accountState = await account_get(userPost, users);
      if (isAccountValid(accountState.account)) {
        return accountState;
      }
    }
  } catch (e) {
    return { account: {}, account_error: { name: "Error", message: "account_get_or_add get catch", stack: JSON.stringify({ e, userPost }) } };
  }
  try {
    // add
    const account = await users.create(userPost);
    if (isAccountValid(account)) {
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
export async function account_update(userPost: session_state_from_stytch_data): Promise<AccountState> {
  const users = getXataClient().db.users;
  const userId = (await account_get(userPost, users))?.account?.xata_id;
  if (!userId) {
    return { account: {}, account_error: { name: "Fail", message: "account_update !userId", stack: JSON.stringify(userPost) } };
  }
  const user = await users.update(userId, userPost);
  if (isAccountValid(user)) {
    return { account: user };
  } else {
    return { account: {}, account_error: { name: "Fail", message: "account_update invalid user", stack: JSON.stringify(userPost) } };
  }
}
