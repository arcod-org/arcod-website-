"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { clientAuth } from "@/lib/firebase-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const cred = await signInWithEmailAndPassword(clientAuth(), email.trim(), password);
      const idToken = await cred.user.getIdToken(true);
      const res = await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
      const data = await res.json();
      if (!res.ok) {
        await signOut(clientAuth());
        throw new Error(data.error ?? "Sign-in failed.");
      }
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setMsg({ type: "error", text: code.includes("invalid-credential") || code.includes("wrong-password") ? "Email or password is incorrect." : (err as Error).message });
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!email) return setMsg({ type: "error", text: "Enter your email first, then click “Forgot password”." });
    await sendPasswordResetEmail(clientAuth(), email.trim()).catch(() => null);
    setMsg({ type: "info", text: "If this email has an account, a reset link has been sent." });
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-night px-5">
      <form onSubmit={login} className="flex w-full max-w-[420px] flex-col gap-5 rounded-[28px] bg-paper p-9">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-white ring-1 ring-line"><Image src="/images/logo-tree.jpg" alt="" width={40} height={40} /></span>
          <div><div className="font-display text-xl font-extrabold text-forest">ARCOD Admin</div><div className="text-sm text-muted">Sign in to manage the website</div></div>
        </div>
        <label className="flex flex-col gap-2"><span className="label">Email</span><input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></label>
        <label className="flex flex-col gap-2"><span className="label">Password</span><input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" /></label>
        {msg && <p role="alert" className={`text-sm font-medium ${msg.type === "error" ? "text-[#A3361B]" : "text-forest"}`}>{msg.text}</p>}
        <button disabled={busy} className="btn-dark disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        <button type="button" onClick={reset} className="text-sm font-semibold text-forest underline-offset-4 hover:underline">Forgot password?</button>
      </form>
    </main>
  );
}
