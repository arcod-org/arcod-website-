"use client";
import { useTransition } from "react";

/** Small button that runs a server action, with optional confirm (used for delete). */
export default function ActionButton({ action, children, confirmText, className = "", label }: {
  action: () => Promise<unknown>; children: React.ReactNode; confirmText?: string; className?: string; label: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button type="button" aria-label={label} title={label} disabled={pending}
      onClick={() => { if (confirmText && !window.confirm(confirmText)) return; start(async () => { await action(); }); }}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] px-2.5 text-[13px] font-semibold transition disabled:opacity-50 ${className}`}>
      {pending ? "…" : children}
    </button>
  );
}
