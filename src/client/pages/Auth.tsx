"use client";
import { StytchLogin } from "@stytch/react";
import Layout1 from "@/client/wrappers/Layout1";
import { StytchLoginConfig } from "@stytch/core/dist/public";

type Props = {
  error?: Error;
  data?: unknown;
};

export default function Auth({ error, data }: Props) {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;
  const client = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  const config: StytchLoginConfig = {
    products: ["oauth", "emailMagicLinks"],
    oauthOptions: {
      providers: [
        {
          type: "google",
        },
      ],
      loginRedirectURL: client + "/login/oauth_callback",
      signupRedirectURL: client + "/login/oauth_callback",
    },
    emailMagicLinksOptions: {
      loginRedirectURL: client + "/login/oauth_callback",
      loginExpirationMinutes: 30,
      signupRedirectURL: client + "/login/oauth_callback",
      signupExpirationMinutes: 30,
    },
  };
  const styles = {
    container: {
      backgroundColor: "#FFFFFF",
      borderColor: "#ADBCC5",
      borderRadius: "8px",
      width: "400px",
    },
    colors: {
      primary: "#19303D",
      secondary: "#5C727D",
      success: "#0C5A56",
      error: "#8B1214",
    },
    buttons: {
      primary: {
        backgroundColor: "#19303D",
        textColor: "#FFFFFF",
        borderColor: "#19303D",
        borderRadius: "4px",
      },
      secondary: {
        backgroundColor: "#FFFFFF",
        textColor: "#19303D",
        borderColor: "#19303D",
        borderRadius: "4px",
      },
    },
    inputs: {
      backgroundColor: "#FFFFFF00",
      borderColor: "#19303D",
      borderRadius: "4px",
      placeholderColor: "#8296A1",
      textColor: "#19303D",
    },
    fontFamily: "Arial",
    hideHeaderText: false,
    logo: {
      logoImageUrl: "",
    },
  };

  return (
    <Layout1>
      <h1>Auth page:</h1>
      {!!error && <div>{JSON.stringify(error, null, " ")}</div>}
      {!!data && (
        <pre>
          <code>{JSON.stringify(data, null, " ")}</code>
        </pre>
      )}
      <StytchLogin config={config} styles={styles} />
    </Layout1>
  );
}
