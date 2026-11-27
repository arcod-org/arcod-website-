import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/data";
import { dayNum, fmtDate, fmtTime, monthShort } from "@/lib/utils";
import { CalIcon, ClockIcon, PinIcon } from "@/components/site/icons";

export const revalidate = 300;
// Pages are generated on first visit, then cached (refreshed every 5 min or when an admin saves).
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = await getEventBySlug((await params).slug);
  if (!e) return { title: "Event not found" };
  return {
    title: e.title,
    description: e.summary || e.description.slice(0, 150),
    openGraph: { title: e.title, description: e.summary, images: e.coverUrl ? [e.coverUrl] : ["/images/hero-campus.jpg"] },
  };
}

export default async function EventPage({ params }: Props) {
  const e = await getEventBySlug((await params).slug);
  if (!e) notFound();
  const upcoming = e.startsAt >= new Date();
  return (
    <article>
      <section className="relative h-[min(520px,60svh)] overflow-hidden bg-night">
        <Image src={e.coverUrl || "/images/hero-campus.jpg"} alt={e.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,35,29,.2),rgba(10,35,29,.85))]" />
        <div className="wrap relative flex h-full items-end pb-12">
          <div className="flex items-end gap-6 text-white">
            <span className="flex size-[92px] flex-none flex-col items-center justify-center rounded-[20px] bg-forest shadow-xl">
              <span className="text-xs font-semibold tracking-widest text-gold">{monthShort(e.startsAt)}</span>
              <span className="font-display text-[38px] font-extrabold leading-tight">{dayNum(e.startsAt)}</span>
            </span>
            <div>
              <span className="eyebrow text-gold">{e.category}{upcoming ? "" : " · Past event"}</span>
              <h1 className="mt-2 max-w-[820px] text-[clamp(32px,4.4vw,56px)] font-extrabold leading-[1.05]">{e.title}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap flex flex-wrap gap-12 py-16">
        <div className="min-w-0 flex-[2_1_520px]">
          {e.summary && <p className="font-display text-[22px] font-semibold leading-snug text-forest">{e.summary}</p>}
          <div className="mt-6 whitespace-pre-line text-[17px] leading-[1.8] text-body">{e.description}</div>
        </div>
        <aside className="flex flex-[1_1_300px] flex-col gap-3 self-start rounded-3xl border border-line bg-white p-7">
          <span className="flex items-center gap-3 text-forest"><CalIcon /> {fmtDate(e.startsAt, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
          <span className="flex items-center gap-3 text-forest"><ClockIcon /> {fmtTime(e.startsAt)}</span>
          <span className="flex items-center gap-3 text-forest"><PinIcon size={16} /> {e.venue || "Venue to be announced"}</span>
          {upcoming && (e.registrationLink ? (
            <a href={e.registrationLink} target="_blank" rel="noopener" className="btn-gold mt-3">Register now</a>
          ) : (
            <Link href="/contact" className="btn-dark mt-3">Contact us to join</Link>
          ))}
          <Link href="/events" className="btn-line">All events</Link>
        </aside>
      </section>
    </article>
  );
}
