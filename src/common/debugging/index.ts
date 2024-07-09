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
