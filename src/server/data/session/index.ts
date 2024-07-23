import { sessionType, isSessionValid, stytchTokenType, sessionStateType } from "@/common/data/session";
import { convertErrorOrResponseToObject } from "@/common/utils";

type Props = {
  token: string;
  stytch_token_type: stytchTokenType;
};

export async function sessionState_from_stytch_token({ token, stytch_token_type }: Props): Promise<sessionStateType> {
  if (!token || !stytch_token_type) {
    return {
      session: undefined,
      invalid: true,
      error: {
        name: "400",
        message: "Token expired. Please try again.",
        stack: "!token || !stytch_token_type \n" + JSON.stringify({ token, stytch_token_type }),
      },
    };
  }
  try {
    // Basic auth credentials
    const username = process.env.STYTCH_USERNAME;
    const password = process.env.STYTCH_PASSWORD;
    const base64Credentials = Buffer.from(`${username}:${password}`).toString("base64");

    // Verify the token with Stytch using fetch API
    const url = process.env.STYTCH_BASEPATH + "/" + stytch_token_type + "/authenticate";
    const stytchResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${base64Credentials}`,
      },
      body: JSON.stringify({
        token,
        session_duration_minutes: 60,
      }),
    });

    if (!stytchResponse.ok) {
      return {
        session: undefined,
        invalid: true,
        error: {
          name: "400",
          message: "Server took too long to respond. Please try again.",
          stack: "!stytchResponse.ok \n" + JSON.stringify(convertErrorOrResponseToObject(stytchResponse)),
        },
      };
    }

    return sessionState_from_stytch_data(await stytchResponse.json(), stytch_token_type);

    // error
  } catch (error) {
    return {
      session: undefined,
      invalid: true,
      error: {
        name: "400",
        message: "Authentication error. Please try again.",
        stack: "sessionState_from_stytch_token catch error. \nProps: " + JSON.stringify({ token, stytch_token_type }),
      },
    };
  }
}

export function sessionState_from_stytch_data(data: Record<string, any>, stytch_token_type: stytchTokenType): sessionStateType {
  // common
  let phone = parseInt(data.user.phone_numbers?.[0]?.phone_number?.replace(/[^\d]+/g, "") || "0");
  let email = data.user.emails?.[0]?.email || "";
  let session = {
    id: data.user.user_id,
    user: {
      email: email,
      phone_number: phone,
      name_first: data.user.name?.first_name,
      name_last: data.user.name?.last_name,
    },
    expires_at: "",
    expires_on: 0,
  } as sessionType;

  // unique
  try {
    if (stytch_token_type === "otp") {
      // this function is called from the front-end OTP_AUTHENTICATE event handler
      session.provider = "OTP";
      session.expires_at = data.session.expires_at || "";
      session.expires_on = session.expires_at ? new Date(session.expires_at).getTime() / 1000 : 0;
    } else if (stytch_token_type === "oauth") {
      // https://stytch.com/docs/api/oauth-authenticate
      if (data.provider_type === "Github") {
        session.provider = "Github";
        session.expires_at = data.session.expires_at || "";
        session.expires_on = session.expires_at ? new Date(session.expires_at).getTime() / 1000 : 0;
      } else if (data.provider_type === "Google") {
        session.provider = "Google";
        session.expires_at = data.provider_values.expires_at || "";
        session.expires_on = session.expires_at ? new Date(session.expires_at).getTime() / 1000 : 0;
      }
    } else if (stytch_token_type === "magic_links") {
      // https://stytch.com/docs/api/authenticate-magic-link
      session.provider = "Email";
      session.expires_at = data.session.expires_at || "";
      session.expires_on = session.expires_at ? new Date(session.expires_at).getTime() / 1000 : 0;
    }
    // error
  } catch (error) {
    return {
      session: undefined,
      invalid: true,
      error: {
        name: "400",
        message: "Authentication error. Please try again.",
        stack: "sessionState_from_stytch_data catch \n" + JSON.stringify(error),
      },
    };
  }

  // validate and return
  if (isSessionValid(session)) {
    if (session.expires_on > Date.now() / 1000) {
      return { session };
    } else {
      return {
        session: undefined,
        invalid: true,
        error: {
          name: "400",
          message: "Session expired. Please login again.",
          stack: "sessionState_from_stytch_data expired \n" + JSON.stringify(session),
        },
      };
    }
  } else {
    return {
      session: undefined,
      invalid: true,
      error: {
        name: "400",
        message: "Session invalid. Please login again.",
        stack: "sessionState_from_stytch_data invalid \n" + JSON.stringify(session),
      },
    };
  }
}
