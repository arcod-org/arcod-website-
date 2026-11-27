import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "./firebase-admin";

// Firebase-hosted apps only forward a cookie named "__session".
export const SESSION_COOKIE = "__session";
export const SESSION_DAYS = 5;

export type AdminUser = { uid: string; email: string };

/** Returns the signed-in admin, or null. Only users with the custom claim admin=true count. */
export async function getAdmin(): Promise<AdminUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const decoded = await adminAuth().verifySessionCookie(token, true);
    if (decoded.admin !== true) return null;
    return { uid: decoded.uid, email: decoded.email ?? "" };
  } catch {
    return null;
  }
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdmin();
  if (!user) redirect("/admin/login");
  return user;
}
