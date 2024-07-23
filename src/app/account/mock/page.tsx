import { sessionStateMock } from "@/common/data/session";
import dynamic from "next/dynamic";
import { accountStateMock } from "@/common/data/account";
const AccountSessionPageClient = dynamic(() => import("@/client/pages/AccountSession"), { ssr: false });

/**
 * This is used by Playwright / E2E tests.
 * Visit this page as the very first action, before testing any other pages.
 * This will load mock data into the browser localStorage, as if the user signed in.
 */
export default async function AccountPageServer() {
  let sessionState = sessionStateMock;
  let accountState = accountStateMock;
  return <AccountSessionPageClient accountState={accountState} sessionState={sessionState} />;
}
