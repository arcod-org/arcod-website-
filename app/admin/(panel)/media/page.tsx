/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { deleteMedia, toggleMediaFeatured, toggleMediaStatus } from "@/app/admin/actions";
import MediaForm from "@/components/admin/MediaForm";
import ActionButton from "@/components/admin/ActionButton";
import { PageHead, Panel, StatusPill } from "@/components/admin/ui";
import { youtubeId } from "@/lib/utils";

const filters = ["All", "Photos", "Videos", "Scheduled", "Hidden", "Featured"] as const;

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ f?: string; saved?: string }> }) {
  const { f = "All", saved } = await searchParams;
  const now = new Date();
  const where: Prisma.MediaWhereInput =
    f === "Photos" ? { type: "PHOTO" } :
    f === "Videos" ? { type: { in: ["VIDEO", "YOUTUBE"] } } :
    f === "Scheduled" ? { status: "PUBLISHED", publishAt: { gt: now } } :
    f === "Hidden" ? { status: "DRAFT" } :
    f === "Featured" ? { featured: true } : {};
  const items = await db().media.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Media library" sub="Upload photos and videos, schedule when they appear, or remove them." />
      {saved && <p role="status" className="rounded-xl bg-forest px-4 py-3 text-sm text-white">Changes saved.</p>}
      <Panel className="p-6"><MediaForm /></Panel>

      <div className="flex flex-wrap gap-2">
        {filters.map((x) => (
          <Link key={x} href={`/admin/media?f=${x}`} className={`flex min-h-11 items-center rounded-[10px] px-4 text-sm font-semibold ${f === x ? "bg-forest text-white" : "bg-white text-forest ring-[1.5px] ring-[#D5DED8] ring-inset"}`}>{x}</Link>
        ))}
      </div>

      {items.length === 0 ? <Panel className="p-8 text-muted">Nothing here yet.</Panel> : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
          {items.map((m) => {
            const thumb = m.type === "YOUTUBE" ? `https://img.youtube.com/vi/${youtubeId(m.url)}/mqdefault.jpg` : m.url;
            return (
              <Panel key={m.id} className="flex flex-col overflow-hidden">
                <div className="relative h-[150px] bg-forest">
                  {m.type === "VIDEO" ? <video src={m.url} muted className="h-full w-full object-cover" /> : <img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover" />}
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-night/75 px-2 py-1.5 text-[11px] font-semibold text-white">{m.type === "PHOTO" ? "Photo" : m.type === "VIDEO" ? "Video" : "YouTube"}</span>
                  {m.featured && <span className="absolute right-2.5 top-2.5 rounded-full bg-gold px-2 py-1.5 text-[11px] font-semibold text-night">Featured</span>}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-3.5">
                  <div className="text-sm font-semibold text-forest">{m.title}</div>
                  {m.caption && <div className="line-clamp-2 text-xs leading-snug text-muted">{m.caption}</div>}
                  <div className="flex flex-wrap items-center gap-2"><StatusPill status={m.status} publishAt={m.publishAt} /><span className="text-xs text-[#7C8B84]">{m.album}</span></div>
                  <div className="mt-auto flex flex-wrap justify-end gap-1">
                    <Link href={`/admin/media/${m.id}`} className="inline-flex min-h-11 items-center rounded-[10px] px-2.5 text-[13px] font-semibold text-forest hover:bg-[#F3F1EA]">Edit</Link>
                    <ActionButton label={m.featured ? "Unfeature" : "Feature on homepage"} action={toggleMediaFeatured.bind(null, m.id)} className="text-forest hover:bg-[#F3F1EA]">{m.featured ? "Unfeature" : "Feature"}</ActionButton>
                    <ActionButton label={m.status === "DRAFT" ? "Publish" : "Hide"} action={toggleMediaStatus.bind(null, m.id)} className="text-forest hover:bg-[#F3F1EA]">{m.status === "DRAFT" ? "Publish" : "Hide"}</ActionButton>
                    <ActionButton label={`Delete ${m.title}`} confirmText={`Delete “${m.title}” permanently? This also removes the file.`} action={deleteMedia.bind(null, m.id)} className="text-[#A3361B] hover:bg-[#FBE7E1]">Delete</ActionButton>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}
