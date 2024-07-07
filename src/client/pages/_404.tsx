"use client";

import { useState } from "react";
import Layout1 from "@/client/wrappers/Layout1";

function _404() {
  const [count, setCount] = useState(0);

  // Assuming the current window location is the callback URL
  const urlParams = new URLSearchParams(window.location.search);

  // Get the 'token' parameter value
  const token = urlParams.get("token");
  const stytch_token_type = urlParams.get("stytch_token_type");
  if (token) {
    // Use the token to authenticate the user

    return (
      <>
        <h1>Authenticated!</h1>
        <div>type: {stytch_token_type}</div>
        <div>token: {token}</div>
      </>
    );
  }
  return (
    <Layout1>
      <h1>_404 page:</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </Layout1>
  );
}

export default _404;
