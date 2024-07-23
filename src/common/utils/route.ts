import { redirect } from "next/navigation";

export const redirectNextjs = (redirectUrl: string) => {
  if (typeof window === "object") {
    // client
    window.location.href = redirectUrl;
  } else {
    // server
    redirect(redirectUrl);
  }
};
