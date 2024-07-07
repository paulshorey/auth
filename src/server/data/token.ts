import { Session, StytchTokenType, isSession } from "@/types";

type Props = {
  token: string;
  stytch_token_type: StytchTokenType;
};

export async function stytch_token({ token, stytch_token_type }: Props): Promise<Session | Error> {
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
      return { name: "Failed", message: "!stytchResponse.ok", stack: JSON.stringify(convertErrorOrResponseToObject(stytchResponse)) };
    }

    const data = await stytchResponse.json();
    const session = parse_session(data, stytch_token_type);

    if (isSession(session)) {
      if (session.expires_on > Date.now() / 1000) {
        return session;
      } else {
        return { name: "Failed", message: "stytch_token sesion expired", stack: JSON.stringify(session) };
      }
    } else {
      return { name: "Failed", message: "stytch_token parse_session", stack: JSON.stringify(session) };
    }
  } catch (error) {
    return { name: "Error", message: "stytch_token catch error", stack: JSON.stringify({ token, stytch_token_type }) };
  }
}

function parse_session(data: Record<string, any>, stytch_token_type: StytchTokenType): Session | Error {
  let session = {
    user: {},
    expires_at: "",
    expires_on: 0,
  } as Session;
  try {
    if (stytch_token_type === "oauth" && data.provider_type === "Github") {
      // https://stytch.com/docs/api/oauth-authenticate
      // console.log("github data", data);
      session.user = {
        stytch_id: data.user.user_id,
        email: data.user.emails[0].email || "",
        name_first: data.user.name.first_name,
        name_last: data.user.name.last_name,
        provider: "Github",
      };
      session.expires_at = data.session.expires_at || "";
      session.expires_on = session.expires_at ? new Date(session.expires_at).getTime() / 1000 : 0;
      // console.log("github session", session);
      return session;
    } else if (stytch_token_type === "oauth" && data.provider_type === "Google") {
      // https://stytch.com/docs/api/oauth-authenticate
      // console.log("google data", data);
      session.user = {
        stytch_id: data.user.user_id,
        email: data.user.emails[0].email || "",
        name_first: data.user.name.first_name,
        name_last: data.user.name.last_name,
        provider: "Google",
      };
      session.expires_at = data.provider_values.expires_at || "";
      session.expires_on = session.expires_at ? new Date(session.expires_at).getTime() / 1000 : 0;
      // console.log("google session", session);
      return session;
    } else if (stytch_token_type === "magic_links") {
      // https://stytch.com/docs/api/authenticate-magic-link
      // console.log("email data", data);
      session.user = {
        stytch_id: data.user.user_id,
        email: data.user.emails[0].email || "",
        name_first: data.user.name.first_name,
        name_last: data.user.name.last_name,
        provider: "Email",
      };
      session.expires_at = data.session.expires_at || "";
      session.expires_on = session.expires_at ? new Date(session.expires_at).getTime() / 1000 : 0;
      // console.log("email session", session);
      return session;
    } else {
      return { name: "Failed", message: "parse_session bad response", stack: JSON.stringify(data) };
    }
  } catch (error) {
    return { name: "Failed", message: "Session parse failed", stack: JSON.stringify(data) };
  }
}

function convertErrorOrResponseToObject(error: unknown) {
  if (error instanceof Error) {
    return {
      instanceof: "Error",
      message: error.message,
      stack: error.stack,
    };
  } else if (error instanceof Response) {
    return {
      instanceof: "Response",
      status: error.status,
      statusText: error.statusText,
      url: error.url,
    };
  } else if (error?.toString) {
    return {
      typeof: typeof error,
      string: error.toString(),
    };
  } else {
    return {
      typeof: typeof error,
      string: String(error),
    };
  }
}
