"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { programmes } from "@/lib/content";
import { ChevronD } from "./icons";

const tones = ["#3F7A5A", "#2E5E6E", "#8C4B32", "#C9822A"];

export default function ProgrammesExplorer({ initialPhase = "current" }: { initialPhase?: "current" | "legacy" }) {
  const [phase, setPhase] = useState(initialPhase);
  const [theme, setTheme] = useState("All");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const inPhase = programmes.filter((p) => p.phase === phase);
  const themes = useMemo(() => ["All", ...Array.from(new Set(inPhase.map((p) => p.theme)))], [inPhase]);
  const active = themes.includes(theme) ? theme : "All";
  const list = inPhase.filter((p) => active === "All" || p.theme === active);

  return (
    <>
      <section className="relative overflow-hidden bg-night text-white">
        <Image src="/images/ag-field.jpg" alt="Farmers on a field visit" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,35,29,.55),rgba(10,35,29,.92))]" />
        <div className="wrap relative pb-16 pt-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="eyebrow text-gold">Programmes</div>
            <h1 className="mt-5 max-w-[900px] text-[clamp(42px,6vw,84px)] font-extrabold leading-[.98]">Work that starts in the village — and stays.</h1>
            <p className="mt-6 max-w-[640px] text-[19px] leading-relaxed text-[#E2ECE6]">From classrooms to farm fields, every programme is shaped with the people it serves. Explore what we do today and the work that built our 38-year legacy.</p>
          </motion.div>
          <div role="tablist" aria-label="Current or past" className="mt-10 inline-flex gap-1 rounded-full bg-white/12 p-1">
            {([["current", "Current work"], ["legacy", "Our legacy"]] as const).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={phase === k} onClick={() => { setPhase(k); setTheme("All"); }}
                className={`min-h-11 rounded-full px-[22px] text-sm font-semibold transition ${phase === k ? "bg-gold text-night" : "text-sage"}`}>{l}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest text-white">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 py-8">
          {[["2,000+", "farmers trained in 2025–26"], ["1,000", "remedial sessions for students"], ["704", "schools received STEM kits"], ["400+", "counselling sessions on HIV care"]].map(([n, l]) => (
            <div key={l}><div className="font-display text-4xl font-extrabold text-gold">{n}</div><div className="text-sm text-sage">{l}</div></div>
          ))}
        </div>
      </section>

      <section className="wrap pb-28 pt-12">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Theme">
        {themes.map((t) => (
          <button key={t} role="tab" aria-selected={active === t} onClick={() => setTheme(t)}
            className={`chip ${active === t ? "border-forest bg-forest text-white" : "border-[#CBD8D0] bg-white text-forest hover:border-forest"}`}>
            {t} · {t === "All" ? inPhase.length : inPhase.filter((p) => p.theme === t).length}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-7">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => {
            const isOpen = !!open[p.title];
            return (
              <motion.article layout key={p.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4, delay: Math.min(i, 6) * 0.04 }}
                className="card zoom flex flex-col">
                <div className="relative h-[230px] overflow-hidden">
                  {p.image ? (
                    <Image src={p.image} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  ) : (
                    <div className="flex h-full items-end p-6" style={{ background: tones[i % tones.length] }}>
                      <span className="font-display text-[52px] font-extrabold leading-none text-white/90">{p.years}</span>
                    </div>
                  )}
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-paper px-3 py-2 text-xs font-semibold text-forest">{p.theme}</span>
                  <span className="absolute right-3.5 top-3.5 rounded-full bg-gold px-3 py-2 text-xs font-semibold text-night">{p.years}</span>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-7 pb-6 pt-6">
                  <h2 className="text-[23px] font-bold leading-tight text-forest">{p.title}</h2>
                  <p className="text-[15px] leading-[1.65] text-muted">{p.body}</p>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="rounded-[14px] bg-[#F4F0E4] p-4 text-sm leading-relaxed text-body">
                          <strong className="text-forest">Where:</strong> {p.where}<br /><strong className="text-forest">Supported by:</strong> {p.partner}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button onClick={() => setOpen((o) => ({ ...o, [p.title]: !isOpen }))} aria-expanded={isOpen}
                    className="mt-auto flex min-h-11 items-center gap-1.5 text-sm font-semibold text-forest">
                    {isOpen ? "Show less" : "Details"} <span className={`transition ${isOpen ? "rotate-180" : ""}`}><ChevronD /></span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
      </section>
    </>
  );
}
