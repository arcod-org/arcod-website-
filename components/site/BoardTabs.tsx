"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { board } from "@/lib/content";

export default function BoardTabs() {
  const [tab, setTab] = useState<"governing" | "general">("governing");
  const people = board[tab];
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="eyebrow">Leadership</div>
          <h2 className="h-section mt-4 text-forest">Our board</h2>
        </div>
        <div role="tablist" aria-label="Board" className="flex gap-1 rounded-full bg-sand p-1">
          {([["governing", "Governing Body"], ["general", "General Body"]] as const).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold transition ${tab === k ? "bg-forest text-white" : "text-forest"}`}>{l}</button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
        <AnimatePresence mode="popLayout">
          {people.map((p, i) => (
            <motion.div key={tab + p.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
              className="zoom flex flex-col overflow-hidden rounded-[22px] border border-line bg-white transition hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-24px_rgba(18,55,46,.35)]">
              <div className="relative aspect-square overflow-hidden bg-[#F4F1E8]"><Image src={p.image} alt={p.name} fill sizes="240px" className="object-cover" /></div>
              <div className="flex flex-col gap-1.5 px-5 pb-5 pt-4">
                <span className="font-display text-[19px] font-bold leading-tight text-forest">{p.name}</span>
                <span className="text-[13px] font-semibold text-amber">{p.role}</span>
                {p.qual && <span className="text-[13px] text-[#7C8B84]">{p.qual}</span>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
