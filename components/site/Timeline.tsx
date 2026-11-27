"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { milestones } from "@/lib/content";

export default function Timeline() {
  const [i, setI] = useState(0);
  const m = milestones[i];
  return (
    <div className="flex flex-wrap gap-14">
      <div className="flex-[1_1_380px]">
        <div className="eyebrow text-gold">Our journey · 1988–2026</div>
        <h2 className="h-section mt-4">Milestones</h2>
        <div className="sticky top-28 mt-7 min-h-[260px] rounded-3xl bg-forest p-8">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <div className="font-display text-[44px] font-extrabold leading-none text-gold">{m.year}</div>
              <div className="mt-3.5 font-display text-2xl font-bold leading-tight">{m.title}</div>
              <p className="mt-3 text-base leading-relaxed text-sage">{m.body}</p>
              <p className="mt-3.5 text-[13px] text-[#8FA79B]">Supported by {m.by}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <ol className="flex flex-[1_1_480px] flex-col gap-1.5 border-l-2 border-white/15 pl-1">
        {milestones.map((x, k) => (
          <li key={x.year + x.title}>
            <button onClick={() => setI(k)} aria-current={k === i} className="group -ml-3.5 flex min-h-11 w-full items-start gap-4 py-2 text-left">
              <span className={`mt-1 size-[18px] flex-none rounded-full border-[3px] transition ${k === i ? "border-gold bg-gold shadow-[0_0_0_6px_rgba(242,169,59,.2)]" : "border-[#CBD8D0] bg-night group-hover:border-leaf"}`} />
              <span className="flex flex-col gap-1">
                <span className="text-[13px] font-bold text-gold">{x.year}</span>
                <span className="font-display text-lg font-semibold text-white">{x.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
