"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { homeAreas } from "@/lib/content";
import { ArrowIcon } from "./icons";

export default function ProgrammeTabs() {
  const keys = Object.keys(homeAreas);
  const [area, setArea] = useState(keys[0]);
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="eyebrow">What we do</div>
          <h2 className="h-section mt-4 max-w-[640px] text-forest">One lifecycle approach. Five ways we work.</h2>
        </div>
        <div role="tablist" aria-label="Programme areas" className="flex flex-wrap gap-2">
          {keys.map((k) => (
            <button key={k} role="tab" aria-selected={k === area} onClick={() => setArea(k)}
              className={`chip ${k === area ? "border-forest bg-forest text-white" : "border-[#CBD8D0] text-forest hover:border-forest"}`}>{k}</button>
          ))}
        </div>
      </div>
      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <AnimatePresence mode="popLayout">
          {homeAreas[area].map((p, idx) => (
            <motion.div key={area + p.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, delay: idx * 0.06 }}>
              <Link href="/programmes" className="card zoom flex h-full flex-col">
                <div className="relative h-[230px] overflow-hidden"><Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></div>
                <div className="flex flex-col gap-2.5 px-6 pb-7 pt-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-amber">{p.tag}</span>
                  <span className="font-display text-[22px] font-bold leading-tight text-forest">{p.title}</span>
                  <span className="text-[15px] leading-relaxed text-muted">{p.body}</span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-forest">Learn more <ArrowIcon size={14} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
