"use client";
import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { impactStats } from "@/lib/content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}{suffix}</span>;
}

export default function ImpactStats() {
  return (
    <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-px overflow-hidden rounded-3xl bg-white/15">
      {impactStats.map((s) => (
        <div key={s.label} className="flex flex-col gap-2.5 bg-forest/92 px-8 py-9">
          <span className="font-display text-[clamp(44px,5vw,64px)] font-extrabold leading-none text-gold"><Counter value={s.value} suffix={s.suffix} /></span>
          <span className="text-base leading-normal text-[#E2ECE6]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
