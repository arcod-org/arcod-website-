import Image from "next/image";
import type { Metadata } from "next";
import GalleryGrid, { type GalleryItem } from "@/components/site/GalleryGrid";
import { curatedGallery } from "@/lib/content";
import { getPublicMedia } from "@/lib/data";
import { youtubeId } from "@/lib/utils";

export const revalidate = 300;
export const metadata: Metadata = { title: "Gallery", description: "Photos and videos from ARCOD’s work across Krishnagiri and Dharmapuri." };

export default async function GalleryPage() {
  const media = await getPublicMedia();
  const uploaded: GalleryItem[] = media.map((m) => {
    if (m.type === "YOUTUBE") {
      const id = youtubeId(m.url);
      return { key: m.id, kind: "youtube", title: m.title, album: m.album, caption: m.caption, src: id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "/images/logo.jpg", videoUrl: id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : undefined };
    }
    if (m.type === "VIDEO") return { key: m.id, kind: "video", title: m.title, album: m.album, caption: m.caption, src: "/images/hero-campus.jpg", videoUrl: m.url };
    return { key: m.id, kind: "photo", title: m.title, album: m.album, caption: m.caption, src: m.url };
  });
  const curated: GalleryItem[] = curatedGallery.map((c) => ({ key: c.src, kind: "photo", src: c.src, title: c.title, album: c.album, caption: "caption" in c ? c.caption : undefined, span: "span" in c ? c.span : undefined }));
  const items = [...uploaded, ...curated];

  return (
    <div className="bg-night text-[#E9F1EC]">
      <section className="wrap pb-24 pt-24">
        <div className="eyebrow text-gold">Gallery &amp; stories</div>
        <h1 className="mt-5 max-w-[880px] text-[clamp(42px,6vw,80px)] font-extrabold leading-none text-white">See the change, one moment at a time.</h1>
        <GalleryGrid items={items} />
      </section>

      <section className="bg-paper text-ink">
        <div className="wrap py-24">
          <div className="eyebrow">Stories of change</div>
          <h2 className="h-section mt-4 text-forest">Lives we have walked alongside</h2>
          <article className="mt-11 flex flex-wrap overflow-hidden rounded-[22px] border border-line bg-white">
            <div className="relative min-h-[320px] flex-[1_1_320px]"><Image src="/images/ag-panchakavya.jpg" alt="Preparing Panchakavya" fill sizes="50vw" className="object-cover" /></div>
            <div className="flex flex-[1_1_360px] flex-col gap-3 p-8">
              <span className="eyebrow">Sustainable Agriculture</span>
              <h3 className="text-[26px] font-bold leading-tight text-forest">Ashoka of Koppakarai builds a village business</h3>
              <p className="text-[15px] leading-[1.65] text-body">She joined every training in her panchayat, even when her family had doubts. Today she makes Panchakavya and Ragi Murukku and sells them to farmers in neighbouring villages — and her husband now works alongside her.</p>
              <a href="/reports/case-story-sustainable-agriculture.pdf" className="btn-dark mt-2 self-start">Read the case story (PDF)</a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
