"use client";

import { useState, useEffect } from "react";
import { Layout1 } from "@/client/wrappers/Layout1";
import { useSessionStore } from "@/client/data/session/useSessionStore";

export default function HomePage() {
  const [count, setCount] = useState(0);
  useSessionStore();
  return (
    <Layout1>
      <h1>Home page:</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </Layout1>
  );
}
