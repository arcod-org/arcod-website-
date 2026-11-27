import type { PublishStatus } from "@prisma/client";

export function PageHead({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div><h1 className="text-[32px] font-extrabold text-forest">{title}</h1>{sub && <p className="mt-1.5 text-[15px] text-muted">{sub}</p>}</div>
      {children}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[20px] border border-line bg-white ${className}`}>{children}</div>;
}

/** Status pill that understands scheduling. */
export function StatusPill({ status, publishAt, pastLabel }: { status: PublishStatus; publishAt: Date; pastLabel?: string }) {
  const now = new Date();
  let cls = "bg-[#E1EEE6] text-[#1E5A40]";
  let label = "Live";
  if (status === "DRAFT") { cls = "bg-[#ECEBE6] text-muted"; label = "Hidden"; }
  else if (publishAt > now) {
    cls = "bg-[#FCEFD8] text-[#8A5200]";
    label = "Goes live " + new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(publishAt);
  } else if (pastLabel) { cls = "bg-[#ECEBE6] text-muted"; label = pastLabel; }
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold ${cls}`}>{label}</span>;
}

export function Field({ label, hint, children, className = "" }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="label">{label} {hint && <span className="font-normal text-[#7C8B84]">{hint}</span>}</span>
      {children}
    </label>
  );
}

export const adminInput = "min-h-11 w-full rounded-[10px] border-[1.5px] border-[#D5DED8] bg-white px-3 text-[15px] outline-none focus:border-forest focus:ring-[3px] focus:ring-forest/12";
