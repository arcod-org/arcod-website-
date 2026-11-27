"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronL, ChevronR, PlayIcon, XIcon } from "./icons";

export type GalleryItem = {
  key: string;
  src: string; // image URL, video URL or YouTube thumbnail
  title: string;
  album: string;
  caption?: string;
  kind: "photo" | "video" | "youtube";
  videoUrl?: string; // for video/youtube
  span?: string;
};

const spanCls: Record<string, string> = { big: "md:col-span-2 md:row-span-2", wide: "md:col-span-2", tall: "row-span-2" };

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const albums = useMemo(() => {
    const a = Array.from(new Set(items.map((i) => i.album)));
    const hasVideo = items.some((i) => i.kind !== "photo");
    return ["All", ...a, ...(hasVideo ? ["Videos"] : [])];
  }, [items]);
  const [f, setF] = useState("All");
  const [open, setOpen] = useState(-1);
  const vis = items.filter((x) => f === "All" || (f === "Videos" ? x.kind !== "photo" : x.album === f));
  const cur = vis[open];

  const step = useCallback((d: number) => setOpen((o) => (o + d + vis.length) % vis.length), [vis.length]);
  useEffect(() => {
    if (open < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, step]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter">
        {albums.map((a) => (
          <button key={a} role="tab" aria-selected={f === a} onClick={() => { setF(a); setOpen(-1); }}
            className={`chip ${f === a ? "border-gold bg-gold text-night" : "border-white/25 text-sage hover:border-white hover:text-white"}`}>{a}</button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-3.5 md:auto-rows-[230px] md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        <AnimatePresence mode="popLayout">
          {vis.map((it, i) => (
            <motion.button layout key={it.key} onClick={() => setOpen(i)} aria-label={`Open ${it.title}`}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}
              className={`group relative cursor-zoom-in overflow-hidden rounded-[18px] bg-forest ${spanCls[it.span ?? ""] ?? ""}`}>
              <Image src={it.src} alt={it.title} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110" />
              {it.kind !== "photo" && <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold/95 text-night"><PlayIcon /></span>}
              <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-[linear-gradient(180deg,transparent,rgba(10,35,29,.85))] px-4 pb-3.5 pt-10 text-left text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">{it.title}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {cur && (
          <motion.div role="dialog" aria-modal="true" aria-label={cur.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,18,15,.95)] p-6" onClick={() => setOpen(-1)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="flex w-[min(1100px,100%)] flex-col gap-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative flex max-h-[72vh] justify-center overflow-hidden rounded-[20px] bg-black">
                {cur.kind === "youtube" && cur.videoUrl ? (
                  <iframe src={cur.videoUrl} title={cur.title} className="aspect-video w-full" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
                ) : cur.kind === "video" && cur.videoUrl ? (
                  <video src={cur.videoUrl} controls autoPlay className="max-h-[72vh] w-full" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cur.src} alt={cur.title} className="max-h-[72vh] max-w-full object-contain" />
                )}
              </div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-[1_1_400px]">
                  <div className="font-display text-2xl font-bold text-white">{cur.title}</div>
                  <div className="mt-1 text-sm text-mist">{cur.album} · {open + 1} of {vis.length}</div>
                  {cur.caption && <p className="mt-2.5 max-w-[720px] text-[15px] leading-relaxed text-[#E2ECE6]">{cur.caption}</p>}
                </div>
                <div className="flex gap-2.5">
                  <button onClick={() => step(-1)} aria-label="Previous" className="flex size-12 items-center justify-center rounded-full text-white ring-[1.5px] ring-white/30"><ChevronL /></button>
                  <button onClick={() => step(1)} aria-label="Next" className="flex size-12 items-center justify-center rounded-full text-white ring-[1.5px] ring-white/30"><ChevronR /></button>
                  <button onClick={() => setOpen(-1)} aria-label="Close" className="flex size-12 items-center justify-center rounded-full bg-gold text-night"><XIcon /></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
