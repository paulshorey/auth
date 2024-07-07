import { Session, StytchTokenType, isSession } from "@/types";

type Props = {
  token: string;
  stytch_token_type: StytchTokenType;
};

export async function stytch_token_session({ token, stytch_token_type }: Props): Promise<Session | Error> {
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
  const session = parseStytchSession(data, stytch_token_type);

  if (isSession(session)) {
    return session;
  } else {
    return { name: "Error", message: "Authentication failed", stack: data };
  }
}

function parseStytchSession(data: Record<string, any>, stytch_token_type: StytchTokenType): Session | Error {
  let expires = 0;
  let user = null;
  let session = null;
  try {
    if (stytch_token_type === "oauth") {
      user = data.user;
      session = data.session;
      // https://stytch.com/docs/api/oauth-authenticate
      expires = data.provider_values.expires_at ? new Date(data.provider_values.expires_at).getTime() / 1000 : 0;
    } else if (stytch_token_type === "magic_links") {
      user = data.user;
      session = data.session;
      // https://stytch.com/docs/api/authenticate-magic-link
      expires = data.session.expires_at ? new Date(data.session.expires_at).getTime() / 1000 : 0;
    }
    return { expires, user, session };
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
