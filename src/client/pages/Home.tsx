"use client";

import { useState, useEffect } from "react";
import { Layout1 } from "@/client/ui/templates/Layout1";

export default function HomePage() {
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
