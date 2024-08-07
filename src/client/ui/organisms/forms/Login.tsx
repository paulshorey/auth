import { StytchLogin } from "@stytch/react";
import { StytchLoginConfig } from "@stytch/core/dist/public";
import { encodeJWT } from "@/common/utils/encode";

export function LoginForm() {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;
  const client = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  const config: StytchLoginConfig = {
    otpOptions: {
      methods: ["email"],
      expirationMinutes: 10,
    },
    products: ["oauth", "otp"], // "emailMagicLinks",
    oauthOptions: {
      providers: [
        {
          type: "google",
        },
        {
          type: "github",
        },
      ],
      loginRedirectURL: client + "/account/oauth",
      signupRedirectURL: client + "/account/oauth",
    },
    emailMagicLinksOptions: {
      loginRedirectURL: client + "/account/oauth",
      loginExpirationMinutes: 30,
      signupRedirectURL: client + "/account/oauth",
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

  /**
   * OTP code from email/phone can only be handled on the client side.
   * But for consistency and security, we fetch session/account data only on the server.
   */
  const validatePhone = async (event: any) => {
    if (event.type === "OTP_AUTHENTICATE") {
      const otpEventJWT = encodeJWT(event.data);
      window.location.href = "/account/otp?data=" + encodeURIComponent(otpEventJWT);
    }
  };

  return (
    <>
      <StytchLogin config={config} styles={styles} callbacks={{ onEvent: validatePhone }} />
      <style>{`
        a[href*="https://stytch.com"] {
          display: none !important;
        }
        button#oauth-google {
          border-bottom: solid 2px #666; padding-bottom: 2px;
        }
        select {
          color: #8296A1 !important;
        }
        input, select {
          border-color: #ccc !important;
        }
        div[size="header"] {
          display:none;
        }
        .oauth-buttons + div * {
          color: #333 !important;
          border-color: #ccc !important;
        }
        stytch-ui > div > section > span > div {
          box-shadow: 1px 2px 0 0 #ccc;
          border-color: #ccc !important;
        }
        stytch-ui > div > section > span > div > div:last-child:not(:first-child) {
          display: none !important;
        }
        button[aria-selected="true"] {
          border-bottom-width: 1px !important;
          padding-bottom: 2px !important;
        } 
        button#oauth-github {
          color: rgb(255, 255, 255) !important;
          background-color: rgb(25, 48, 61) !important;
          border-width: 1px !important;
          border-style: solid !important;
          border-color: rgb(25, 48, 61) !important;
        }
        button#oauth-github svg {
          filter: invert(1) !important;
          position:relative;
          left: -1px;
        }
      `}</style>
    </>
  );
}
