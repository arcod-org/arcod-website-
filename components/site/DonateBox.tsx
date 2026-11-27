"use client";
import { useState } from "react";
import { org } from "@/lib/content";

// [confirm] amounts and impact lines with ARCOD before launch.
const amounts: [number, string][] = [
  [500, "buys notebooks and stationery for a child for a term."],
  [1000, "supports a village health-screening session."],
  [2500, "helps a girl stay in school for a month with mentoring and supplies."],
  [5000, "trains a woman in a livelihood skill."],
  [10000, "runs a career-guidance session for a whole school."],
  [25000, "sponsors a child’s education for a full year."],
];
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function DonateBox() {
  const [amt, setAmt] = useState(2500);
  const [monthly, setMonthly] = useState(false);
  const impact = amounts.find(([a]) => a === amt)?.[1];
  return (
    <div className="flex flex-wrap items-center gap-14">
      <div className="flex-[1_1_440px]">
        <div className="eyebrow text-gold">Donate</div>
        <h1 className="mt-[18px] text-[clamp(42px,5.6vw,76px)] font-extrabold leading-none">Your gift travels further in a village.</h1>
        <p className="mt-6 max-w-[520px] text-[19px] leading-relaxed text-sage">Give securely online through Razorpay. ARCOD holds valid 12A and 80G registrations — you will receive an 80G receipt by email.</p>
        <div className="mt-8 flex items-center gap-4 rounded-[18px] bg-white/8 px-6 py-5" aria-live="polite">
          <span className="font-display text-[40px] font-extrabold text-gold">{inr(amt)}</span>
          <span className="text-base leading-normal text-sage">{impact}</span>
        </div>
      </div>
      <div className="flex flex-[1_1_440px] flex-col gap-[22px] rounded-[28px] bg-paper p-[clamp(24px,4vw,40px)] text-ink">
        <div role="tablist" aria-label="Frequency" className="flex gap-1 rounded-full bg-sand p-1">
          {[false, true].map((m) => (
            <button key={String(m)} role="tab" aria-selected={monthly === m} onClick={() => setMonthly(m)}
              className={`min-h-11 flex-1 rounded-full text-sm font-semibold transition ${monthly === m ? "bg-white text-forest shadow" : "text-muted"}`}>{m ? "Monthly" : "One-time"}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {amounts.map(([a]) => (
            <button key={a} onClick={() => setAmt(a)} aria-pressed={amt === a}
              className={`min-h-14 rounded-[14px] border-[1.5px] font-display text-lg font-bold transition ${amt === a ? "border-forest bg-forest text-white" : "border-[#CBD8D0] bg-white text-forest hover:border-forest"}`}>{inr(a)}</button>
          ))}
        </div>
        <a href={org.razorpay} target="_blank" rel="noopener" className="btn-gold">Donate {inr(amt)}{monthly ? "/month" : ""} securely</a>
        <span className="text-center text-[13px] text-[#7C8B84]">You’ll choose the final amount on Razorpay · UPI, cards and net banking</span>
      </div>
    </div>
  );
}
