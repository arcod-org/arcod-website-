// Grant (or revoke) ARCOD admin access to a Firebase Auth user.
// Usage (needs a service-account key locally — never commit it):
//   $env:GOOGLE_APPLICATION_CREDENTIALS=".\service-account.json"   (PowerShell)
//   npm run set-admin -- staff@arcod.in            → grant
//   npm run set-admin -- staff@arcod.in --revoke   → revoke
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const [email, flag] = process.argv.slice(2);
if (!email) {
  console.error("Usage: npm run set-admin -- <email> [--revoke]");
  process.exit(1);
}
initializeApp({ credential: applicationDefault() });
const auth = getAuth();
const user = await auth.getUserByEmail(email);
const admin = flag !== "--revoke";
await auth.setCustomUserClaims(user.uid, { ...(user.customClaims ?? {}), admin });
await auth.revokeRefreshTokens(user.uid); // forces a fresh login so the change applies
console.log(`${admin ? "Granted" : "Revoked"} admin for ${email} (uid ${user.uid}).`);
