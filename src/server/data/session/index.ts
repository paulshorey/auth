import { SessionType, isSessionValid, StytchTokenType, SessionState } from "@/common/data/session/types";
import { convertErrorOrResponseToObject } from "@/common/debugging";

type Props = {
  token: string;
  stytch_token_type: StytchTokenType;
};

export async function session_from_stytch_token({ token, stytch_token_type }: Props): Promise<SessionState> {
  try {
    // Basic auth credentials
    const username = "project-test-11bc6ab9-6fd7-41c1-8785-bf4452a33808";
    const password = "secret-test-mICr-g4hvThQ-dhzvji2bZMV4aUoNxoOoAA=";
    const base64Credentials = Buffer.from(`${username}:${password}`).toString("base64");

    // Verify the token with Stytch using fetch API
    const url = "https://test.stytch.com/v1/" + stytch_token_type + "/authenticate";
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
        session: {},
        session_error: { name: "Fail", message: "!stytchResponse.ok", stack: JSON.stringify(convertErrorOrResponseToObject(stytchResponse)) },
      };
    }

    return SessionState_from_stytch_data(await stytchResponse.json(), stytch_token_type);

    // error
  } catch (error) {
    return {
      session: {},
      session_error: { name: "Error", message: "session_from_stytch_token catch error", stack: JSON.stringify({ token, stytch_token_type }) },
    };
  }
}

export function SessionState_from_stytch_data(data: Record<string, any>, stytch_token_type: StytchTokenType): SessionState {
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
  } as SessionType;

  console.log("session1", session);

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
    return { session: {}, session_error: { name: "Error", message: "SessionState_from_stytch_data catch", stack: JSON.stringify(error) } };
  }
  console.log("session2", session);

  // validate and return
  if (isSessionValid(session)) {
    if (session.expires_on > Date.now() / 1000) {
      return { session };
    } else {
      return { session: {}, session_error: { name: "Fail", message: "SessionState_from_stytch_data expired", stack: JSON.stringify(session) } };
    }
  } else {
    return { session: {}, session_error: { name: "Fail", message: "SessionState_from_stytch_data invalid", stack: JSON.stringify(session) } };
  }
}
