import "server-only";
import { initializeApp, getApps, getApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

// On Firebase App Hosting, Application Default Credentials come from the backend's
// service account automatically — no key file or secret needed.
// Locally, set GOOGLE_APPLICATION_CREDENTIALS to a service-account JSON (never commit it).
function adminApp() {
  if (getApps().length) return getApp();
  return initializeApp({
    credential: applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

export const adminAuth = () => getAuth(adminApp());
export const adminBucket = () => getStorage(adminApp()).bucket();
