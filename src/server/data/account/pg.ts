// CURRENTLY UNUSED, UNFINISHED

// import pgp from "pg-promise";
// const db_pg_words_connection_string = `postgresql://doadmin:${process.env.DB_PG_ACCOUNTS_PASSWORD}@db-pg-16-do-user-1354070-0.e.db.ondigitalocean.com:25060/defaultdb?sslmode=require`;
// const db = pgp(db_pg_words_connection_string);
// async function getUsersWithPosts() {
//   return db.any(`
//         SELECT users.*, array_agg(posts.title) AS posts
//         FROM users
//         JOIN posts ON users.id = posts.user_id
//         GROUP BY users.id`);
// }
import { accountType } from "@/common/data/account";

export function pg_account_init() {
  try {
    // check if table exists
  } catch (e) {
    console.warn("Table does not exist. Creating...");
  }
  try {
    // create if doesn't
    const columns = [] as [];
    columns.forEach(function (value, index) {
      // check if each column exists
      try {
      } catch (e) {
        console.warn("Column does not exist. Creating...");
      }
      // create if doesn't
      if (value && index) {
        console.log("TODO: build table");
      }
    });
    // exit after checked all columns
    return;
  } catch (e) {
    console.warn("Unable to access database. Please check that you have internet connection. Try refreshing the page.");
  }
}

export function pg_account_get_by_phone_or_email({ email, phone_number }: accountType) {
  try {
  } catch (e) {
    try {
      pg_account_init();
    } catch (e) {
      console.error("Error!", e);
    }
  }
}

export function pg_account_upsert(account: accountType) {
  try {
  } catch (e) {
    try {
      pg_account_init();
    } catch (e) {
      console.error("Error!", e);
    }
  }
}

export function pg_account_edit_by_id(account: accountType) {
  try {
  } catch (e) {
    try {
      pg_account_init();
    } catch (e) {
      console.error("Error!", e);
    }
  }
}

export function account_edit_by_phone_or_email(account: accountType) {
  try {
  } catch (e) {
    try {
      pg_account_init();
    } catch (e) {
      console.error("Error!", e);
    }
  }
}
