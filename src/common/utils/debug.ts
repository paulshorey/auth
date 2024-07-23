import { redirectNextjs } from "@/common/utils/route";

/**
 * Same as JS Error, except prop name =
 * '100': 'Display message as warning'
 * '200': 'Display message as success'
 * '300': 'Redirect to error.message'
 * '400': 'Redirect to homepage'
 * '500': 'Display message as error'
 */
export type ErrorWithResponseCode = Error & {
  name: "100" | "200" | "300" | "400" | "500";
};

export const handleErrorWithResponseCode = (error: ErrorWithResponseCode) => {
  if (error) {
    console.error("handleErrorWithResponseCode", error);
    if (error.name === "400") {
      return redirectNextjs("/");
    }
    if (error.name === "300") {
      return redirectNextjs(error.message);
    }
  }
};

export function convertErrorOrResponseToObject(error: unknown) {
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
