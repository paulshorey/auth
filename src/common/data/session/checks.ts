import { sessionType } from "@/common/data/session";

export function isSessionValid(session: any): session is sessionType {
  return session?.id && session?.user && session?.expires_at && session?.expires_on > Date.now() / 1000;
}
