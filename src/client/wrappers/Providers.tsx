"use client";

import { StytchProvider } from "@stytch/react";
import { createStytchUIClient } from "@stytch/nextjs/ui";
const stytch = createStytchUIClient("public-token-test-2775e4ab-d536-4471-a7e6-d2ca64905160");

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StytchProvider stytch={stytch}>{children}</StytchProvider>;
}
