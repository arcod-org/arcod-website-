import Link from "next/link";
import { db } from "@/lib/db";
import { PageHead, Panel } from "@/components/admin/ui";
import { fmtDate, fmtTime } from "@/lib/utils";

export default async function Overview() {
  const now = new Date();
  const [liveMedia, scheduledMedia, drafts, upcoming, newMessages] = await Promise.all([
    db().media.count({ where: { status: "PUBLISHED", publishAt: { lte: now } } }),
    db().media.count({ where: { status: "PUBLISHED", publishAt: { gt: now } } }),
    Promise.all([db().media.count({ where: { status: "DRAFT" } }), db().event.count({ where: { status: "DRAFT" } })]).then(([a, b]) => a + b),
    db().event.findMany({ where: { status: "PUBLISHED", publishAt: { lte: now }, startsAt: { gte: now } }, orderBy: { startsAt: "asc" }, take: 5 }),
    db().contactMessage.count({ where: { handled: false } }),
  ]);
  const kpis = [["Live photos & videos", liveMedia], ["Scheduled to go live", scheduledMedia], ["Drafts (hidden)", drafts], ["New messages", newMessages]] as const;

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Overview" sub="Everything on the website at a glance.">
        <div className="flex gap-2"><Link href="/admin/media" className="btn-line min-h-11">Upload media</Link><Link href="/admin/events/new" className="btn-dark min-h-11">New event</Link></div>
      </PageHead>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {kpis.map(([l, v]) => <Panel key={l} className="p-6"><div className="text-[13px] text-muted">{l}</div><div className="mt-2 font-display text-[38px] font-extrabold text-forest">{v}</div></Panel>)}
      </div>
      <Panel className="p-6">
        <div className="font-display text-xl font-extrabold text-forest">Showing on the homepage now</div>
        <p className="mt-2 text-sm text-muted">Only events that are <strong>published</strong>, whose publish time has passed, and whose date is today or later appear in the “Coming up” band.</p>
        <div className="mt-4 flex flex-col gap-2">
          {upcoming.length ? upcoming.map((e) => (
            <Link key={e.id} href={`/admin/events/${e.id}`} className="rounded-xl bg-[#FCEFD8] px-4 py-3 text-sm hover:ring-2 hover:ring-gold"><strong>{fmtDate(e.startsAt)}</strong> · {fmtTime(e.startsAt)} · {e.title} · {e.venue}</Link>
          )) : <p className="text-sm text-muted">No upcoming events. The homepage band is hidden until you add one.</p>}
        </div>
      </Panel>
    </div>
  );
}
