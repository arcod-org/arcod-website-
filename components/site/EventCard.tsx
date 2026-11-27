import Link from "next/link";
import type { Event } from "@prisma/client";
import { dayNum, fmtTime, monthShort } from "@/lib/utils";
import { ArrowIcon, PinIcon } from "./icons";

export default function EventCard({ e, tone = "light" }: { e: Event; tone?: "light" | "cream" }) {
  return (
    <Link href={`/events/${e.slug}`} className={`card flex flex-[1_1_300px] gap-[18px] p-[18px] text-night ${tone === "cream" ? "bg-[#FFF8EA]" : "bg-white"}`}>
      <div className="flex w-[72px] flex-none flex-col items-center justify-center rounded-[14px] bg-forest py-2.5 text-white">
        <span className="text-xs font-semibold tracking-widest text-gold">{monthShort(e.startsAt)}</span>
        <span className="font-display text-[30px] font-extrabold leading-tight">{dayNum(e.startsAt)}</span>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="text-xs font-medium text-amber">{e.category}</span>
        <span className="font-display text-[19px] font-bold leading-tight">{e.title}</span>
        <span className="flex items-center gap-1.5 text-sm text-body"><PinIcon />{e.venue || "Venue TBA"} · {fmtTime(e.startsAt)}</span>
        {e.summary && <span className="text-sm leading-snug text-body">{e.summary}</span>}
        <span className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-forest">Read details <ArrowIcon size={13} /></span>
      </div>
    </Link>
  );
}
