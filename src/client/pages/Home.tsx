"use client";

import { useState } from "react";
import Layout1 from "@/client/wrappers/Layout1";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <Layout1>
      <h1>Home page:</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </Layout1>
  );
}
