"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { heroSlides } from "@/lib/content";
import { ArrowIcon } from "./icons";

export default function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % heroSlides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex min-h-[min(860px,100svh)] items-end overflow-hidden bg-night text-white">
      <AnimatePresence initial={false}>
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }}>
          <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "easeOut" }}>
            <Image src={heroSlides[i].src} alt={heroSlides[i].alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,35,29,.25)_0%,rgba(10,35,29,.45)_40%,rgba(10,35,29,.95)_100%)]" />

      <div className="wrap relative pb-16 pt-40">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 rounded-full bg-night/55 px-3.5 py-2 text-[13px] font-medium text-[#F3E2C4] backdrop-blur">
          <span className="live-dot size-2 rounded-full bg-gold" />38 years in Krishnagiri &amp; Dharmapuri
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-6 max-w-[1000px] text-[clamp(44px,7vw,100px)] font-extrabold leading-[.96]">
          Rooted in our villages.<br /><span className="text-gold">Growing with them.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-7 max-w-[640px] text-[clamp(17px,1.6vw,20px)] leading-relaxed text-[#E2ECE6]">
          Since 1988, ARCOD has worked alongside farmers, women, children and marginalised families in rural Tamil Nadu — building local leadership and lasting change in agriculture, education, health and livelihoods.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45 }} className="mt-9 flex flex-wrap gap-3.5">
          <Link href="/contact#donate" className="btn-gold">Support our work <ArrowIcon /></Link>
          <Link href="/programmes" className="btn-ghost">Explore our programmes</Link>
        </motion.div>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-5 border-t border-white/20 pt-6">
          <p className="max-w-[460px] text-sm text-sage" aria-live="polite">{heroSlides[i].caption}</p>
          <div className="flex gap-2">
            {heroSlides.map((s, k) => (
              <button key={s.src} onClick={() => setI(k)} aria-label={`Show slide ${k + 1}`} aria-current={k === i}
                className={`h-3 rounded-full transition-all duration-500 ${k === i ? "w-9 bg-gold" : "w-3 bg-white/40 hover:bg-white/70"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
