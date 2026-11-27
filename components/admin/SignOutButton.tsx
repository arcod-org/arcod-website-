"use client";
import { signOut } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/session", { method: "DELETE" });
        await signOut(clientAuth()).catch(() => null);
        window.location.href = "/admin/login";
      }}
      className="self-start text-left text-[13px] font-semibold text-white hover:text-gold">Sign out</button>
  );
}
