import { Repository } from "@xata.io/client";
import { getXataClient, UsersRecord } from "./xataClient";
import { accountStateType, accountType, isAccountValid } from "@/common/data/account";

/**
 * Find user by email or phone_number
 */
export async function xata_account_get(userPost: accountType, users?: Repository<UsersRecord>): Promise<accountStateType> {
  users = users ?? getXataClient().db.users;
  try {
    let user;
    if (userPost.phone_number) {
      user = await users
        .filter({
          phone_number: userPost.phone_number,
        })
        ?.getFirst();
    }
    if (userPost.email) {
      user = await users
        .filter({
          email: userPost.email,
        })
        ?.getFirst();
    }
    if (user) {
      // const user_preferences_ui = getXataClient().db.user_preferences_ui;
      // const ui = await user_preferences_ui.create({
      //   dark_mode: true,
      // });
      // const updated = await users.update(user.id, {
      //   preferences_ui: ui.id,
      // });
      // @ts-ignore
      return { account: user?.toSerializable() };
    } else {
      return { account: {}, error: { name: "400", message: "xata_account_get invalid user", stack: JSON.stringify(userPost) } };
    }
  } catch (e) {
    return { account: {}, error: { name: "400", message: "xata_account_get catch", stack: JSON.stringify({ e, userPost }) } };
  }
}

/**
 * Create new user. Return existing user if already exists.
 */
export async function xata_account_get_or_add(userPost: accountType): Promise<accountStateType> {
  const users = getXataClient().db.users;
  try {
    // get
    {
      let accountState = await xata_account_get(userPost, users);
      if (isAccountValid(accountState.account)) {
        return accountState;
      }
    }
  } catch (e) {
    return { account: {}, error: { name: "400", message: "xata_account_get_or_add get catch", stack: JSON.stringify({ e, userPost }) } };
  }
  try {
    // add (because it does not exist)
    await users.create(userPost);
    // get (validate that it was added successfully)
    let accountState = await xata_account_get(userPost, users);
    if (isAccountValid(accountState.account)) {
      return accountState;
    } else {
      return { account: {}, error: { name: "400", message: "xata_account_get_or_add invalid user", stack: JSON.stringify(userPost) } };
    }
  } catch (e) {
    return { account: {}, error: { name: "400", message: "xata_account_get_or_add add catch", stack: JSON.stringify({ e, userPost }) } };
  }
}

/**
 * Update existing user. Fail if does not exist!
 */
export async function xata_account_edit_by_phone_or_email(userPost: accountType): Promise<accountStateType> {
  const users = getXataClient().db.users;
  const userId = userPost.id ?? (await xata_account_get(userPost, users))?.account?.id;
  if (!userId) {
    return { account: {}, error: { name: "400", message: "xata_account_edit_by_phone_or_email !userId", stack: JSON.stringify(userPost) } };
  }
  const user = await users.update(userId, userPost);
  if (isAccountValid(user)) {
    return { account: user };
  } else {
    return { account: {}, error: { name: "400", message: "xata_account_edit_by_phone_or_email invalid user", stack: JSON.stringify(userPost) } };
  }
}
