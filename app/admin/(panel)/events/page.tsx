import Link from "next/link";
import { db } from "@/lib/db";
import { deleteEvent, toggleEventStatus } from "@/app/admin/actions";
import ActionButton from "@/components/admin/ActionButton";
import { PageHead, Panel, StatusPill } from "@/components/admin/ui";
import { fmtDate, fmtTime } from "@/lib/utils";

export default async function EventsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const events = await db().event.findMany({ orderBy: { startsAt: "desc" }, take: 200 });
  const now = new Date();
  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Events" sub="Published events with a future date appear on the homepage automatically. Drafts stay hidden.">
        <Link href="/admin/events/new" className="btn-dark min-h-11">New event</Link>
      </PageHead>
      {saved && <p role="status" className="rounded-xl bg-forest px-4 py-3 text-sm text-white">Event saved. The website updates within a minute.</p>}
      <Panel className="overflow-hidden">
        <div className="hidden gap-3.5 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#7C8B84] md:flex">
          <span className="w-[130px]">Date</span><span className="flex-1">Event</span><span className="w-[170px]">Website</span><span className="w-[250px] text-right">Actions</span>
        </div>
        {events.length === 0 && <p className="border-t border-[#EEEBE2] p-6 text-muted">No events yet. Click “New event” to add one.</p>}
        {events.map((e) => (
          <div key={e.id} className="flex flex-wrap items-center gap-3.5 border-t border-[#EEEBE2] px-5 py-3.5">
            <span className="w-[130px] text-sm font-semibold text-forest">{fmtDate(e.startsAt, { day: "numeric", month: "short", year: "numeric" })}<br /><span className="font-normal text-[#7C8B84]">{fmtTime(e.startsAt)}</span></span>
            <span className="flex min-w-[200px] flex-1 flex-col gap-1">
              <span className="text-[15px] font-semibold">{e.title}</span>
              <span className="text-[13px] text-[#7C8B84]">{e.category} · {e.venue || "Venue TBA"}</span>
              {e.summary && <span className="text-[13px] text-muted">{e.summary}</span>}
            </span>
            <span className="w-[170px]"><StatusPill status={e.status} publishAt={e.publishAt} pastLabel={e.startsAt < now ? "Past · in archive" : undefined} /></span>
            <span className="flex w-[250px] flex-wrap justify-end gap-1">
              <a href={`/events/${e.slug}`} target="_blank" className="inline-flex min-h-11 items-center rounded-[10px] px-2.5 text-[13px] font-semibold text-forest hover:bg-[#F3F1EA]">View</a>
              <Link href={`/admin/events/${e.id}`} className="inline-flex min-h-11 items-center rounded-[10px] px-2.5 text-[13px] font-semibold text-forest hover:bg-[#F3F1EA]">Edit</Link>
              <ActionButton label={e.status === "DRAFT" ? "Publish" : "Move to draft"} action={toggleEventStatus.bind(null, e.id)} className="text-forest hover:bg-[#F3F1EA]">{e.status === "DRAFT" ? "Publish" : "Hide"}</ActionButton>
              <ActionButton label={`Delete ${e.title}`} confirmText={`Delete “${e.title}” permanently?`} action={deleteEvent.bind(null, e.id)} className="text-[#A3361B] hover:bg-[#FBE7E1]">Delete</ActionButton>
            </span>
          </div>
        ))}
      </Panel>
    </div>
  );
}
