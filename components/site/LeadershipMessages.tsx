"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { leadershipMessages } from "@/lib/content";
import { ChevronD } from "./icons";
import Reveal from "./Reveal";

export default function LeadershipMessages() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-6">
      {leadershipMessages.map((m, i) => {
        const isOpen = !!open[m.id];
        return (
          <Reveal key={m.id} delay={i * 0.1} className="flex flex-col rounded-[28px] border border-line bg-white p-[clamp(24px,3vw,40px)]">
            <div className="flex items-center gap-5">
              <span className="relative size-24 flex-none overflow-hidden rounded-full bg-sand ring-4 ring-sand">
                <Image src={m.image} alt={m.name} fill sizes="96px" className="object-cover" />
              </span>
              <div>
                <div className="eyebrow">{m.heading}</div>
                <div className="mt-2 font-display text-2xl font-extrabold leading-tight text-forest">{m.name}</div>
                <div className="text-sm text-muted">{m.role}, ARCOD</div>
              </div>
            </div>
            <p className="mt-7 border-l-4 border-gold pl-5 font-display text-[clamp(20px,1.9vw,24px)] font-semibold leading-snug text-forest">“{m.pull}”</p>
            <p className="mt-6 text-[16px] leading-[1.75] text-body">{m.paragraphs[0]}</p>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div id={`msg-${m.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                  {m.paragraphs.slice(1).map((p, k) => <p key={k} className="mt-4 text-[16px] leading-[1.75] text-body">{p}</p>)}
                  <p className="mt-6 text-[15px] text-body">With warm regards,<br /><strong className="text-forest">{m.name}</strong><br />{m.role}, Association for Rural Community Development</p>
                </motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => setOpen((o) => ({ ...o, [m.id]: !isOpen }))} aria-expanded={isOpen} aria-controls={`msg-${m.id}`}
              className="mt-auto flex min-h-11 items-center gap-1.5 self-start pt-5 text-sm font-semibold text-forest">
              {isOpen ? "Show less" : "Read the full message"} <span className={`transition ${isOpen ? "rotate-180" : ""}`}><ChevronD /></span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
