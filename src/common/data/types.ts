type ErrorWithResponseCode = Error & {
  /**
   * 100: "Display message as warning"
   * 200: "Display message as success"
   * 300: "Redirect to error.message"
   * 400: "Redirect to homepage"
   * 500: "Display message as error"
   */
  name: "100" | "200" | "300" | "400" | "500";
};
