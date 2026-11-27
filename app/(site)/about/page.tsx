import Image from "next/image";
import type { Metadata } from "next";
import BoardTabs from "@/components/site/BoardTabs";
import Timeline from "@/components/site/Timeline";
import LeadershipMessages from "@/components/site/LeadershipMessages";
import Reveal from "@/components/site/Reveal";
import { DownloadIcon, ShieldIcon } from "@/components/site/icons";
import { awards, reports } from "@/lib/content";

export const metadata: Metadata = { title: "About us", description: "38 years of community development in rural Tamil Nadu — our vision, founder, board, milestones and reports." };

const creds = ["38 years of community development", "FCRA registered & compliant", "UNCCD Provisional Accreditation", "Valid 12A & 80G registrations", "CSR registration", "NGO Darpan", "GuideStar India accreditation"];
const approach = [["Agriculture", "income and food security"], ["Women", "leadership and economic power"], ["Children", "education, safety and health"], ["Environment", "climate resilience"], ["Institutions", "long-term community ownership"]];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-night text-white">
        <Image src="/images/campus-aerial2.jpg" alt="ARCOD campus among the hills" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,35,29,.95)_0%,rgba(10,35,29,.75)_50%,rgba(10,35,29,.2)_100%)]" />
        <Reveal className="wrap relative pb-32 pt-36">
          <div className="eyebrow text-gold">About ARCOD</div>
          <h1 className="mt-5 max-w-[820px] text-[clamp(42px,6vw,84px)] font-extrabold leading-[.98]">38 years of walking with <span className="text-gold">rural Tamil Nadu.</span></h1>
          <p className="mt-7 max-w-[600px] text-[19px] leading-relaxed text-[#E2ECE6]">Founded in 1988 in Rayakottai, Krishnagiri District, ARCOD is a non-profit organisation that works with women, children, farmers, youth and marginalised communities for sustainable and inclusive development.</p>
        </Reveal>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 pb-10 pt-24">
        <Reveal className="rounded-3xl border border-line bg-white p-10">
          <h2 className="text-3xl font-extrabold text-forest">Our vision</h2>
          <p className="mt-3.5 text-[17px] leading-[1.7] text-body">Social, economic, political and health empowerment of the rural poor, Dalits, Adivasis, small farmers, women and children.</p>
        </Reveal>
        <Reveal delay={0.08} className="rounded-3xl border border-line bg-white p-10">
          <h2 className="text-3xl font-extrabold text-forest">Our mission</h2>
          <p className="mt-3.5 text-[17px] leading-[1.7] text-body">To build collective leadership and improve living standards through sustainable development in education, health, environment and livelihoods.</p>
        </Reveal>
        <Reveal delay={0.16} className="rounded-3xl bg-forest p-10 text-white">
          <h2 className="text-3xl font-extrabold">Our approach</h2>
          <ul className="mt-4 flex flex-col gap-3 text-base text-[#E2ECE6]">
            {approach.map(([a, b]) => <li key={a}><strong className="text-gold">{a}</strong> → {b}</li>)}
          </ul>
        </Reveal>
      </section>

      <section className="wrap pb-24 pt-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
          {creds.map((c) => (
            <div key={c} className="flex items-center gap-3.5 rounded-2xl border border-line bg-white px-5 py-4">
              <span className="flex size-10 flex-none items-center justify-center rounded-xl bg-[#E1EEE6] text-forest"><ShieldIcon size={20} /></span>
              <span className="text-[15px] font-semibold text-forest">{c}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap flex flex-wrap items-center gap-14 py-24">
          <Reveal className="max-w-[440px] flex-[1_1_340px]">
            <div className="relative aspect-square overflow-hidden rounded-[28px] bg-white"><Image src="/images/p-keshavraj.jpg" alt="V. R. Keshavraj, Founder and Secretary" fill sizes="440px" className="object-cover" /></div>
          </Reveal>
          <Reveal delay={0.1} className="flex-[1_1_480px]">
            <div className="eyebrow">Our visionary founder</div>
            <h2 className="h-section mt-4 text-forest">V. R. Keshavraj</h2>
            <p className="mt-2 text-[15px] text-muted">Founder, Secretary &amp; Executive Director · M.A. (Social Work)</p>
            <p className="mt-7 font-display text-[clamp(22px,2.2vw,28px)] font-semibold leading-snug text-forest">“Dedicated to uplifting the underprivileged and creating lasting change.”</p>
            <p className="mt-5 text-[17px] leading-[1.7] text-body">A social worker with a deep passion for uplifting communities, he has guided ARCOD’s mission since its founding. His expertise and compassionate approach have shaped our initiatives and touched countless lives — and under his leadership we continue to strive for a brighter, more equitable future for all.</p>
          </Reveal>
        </div>
      </section>

      <section id="leadership" className="wrap scroll-mt-24 pt-24">
        <div className="eyebrow">Messages from our leadership</div>
        <h2 className="h-section mt-4 max-w-[760px] text-forest">Why we do this work — in their own words.</h2>
        <LeadershipMessages />
      </section>

      <section id="board" className="wrap scroll-mt-24 py-24"><BoardTabs /></section>

      <section className="bg-night text-white"><div className="wrap py-24"><Timeline /></div></section>

      <section id="awards" className="wrap scroll-mt-24 py-24">
        <div className="eyebrow">Recognition</div>
        <h2 className="h-section mt-4 text-forest">Awards &amp; appreciation</h2>
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {awards.filter((a) => a.image).map((a, i) => (
            <Reveal key={a.year} delay={i * 0.06} className="overflow-hidden rounded-[22px] border border-line bg-white">
              <div className="relative h-60 bg-[#F4F1E8]"><Image src={a.image!} alt={`${a.title}, ${a.year}`} fill sizes="400px" className="object-contain p-3.5" /></div>
              <div className="p-5">
                <span className="font-display text-[28px] font-extrabold text-gold">{a.year}</span>
                <p className="mt-1.5 font-semibold text-forest">{a.title}</p>
                <p className="mt-1 text-sm text-muted">{a.by}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {awards.filter((a) => !a.image).map((a) => (
            <div key={a.year} className="flex items-center gap-3.5 rounded-2xl border border-line bg-white px-5 py-4">
              <span className="font-display text-[28px] font-extrabold text-gold">{a.year}</span>
              <span><strong className="text-forest">{a.title}</strong><br /><span className="text-sm text-muted">{a.by}</span></span>
            </div>
          ))}
        </div>
      </section>

      <section id="reports" className="scroll-mt-24 bg-sand">
        <div className="wrap flex flex-wrap gap-14 py-24">
          <div className="flex-[1_1_340px]">
            <div className="eyebrow">Transparency</div>
            <h2 className="h-section mt-4 text-forest">Reports &amp; compliance</h2>
            <p className="mt-[18px] text-[17px] leading-[1.7] text-body">We publish our annual reports and audited statements so every supporter can see how their contribution is used. Total funds and assets as of 31 March 2026: ₹622.62 lakhs.</p>
          </div>
          <div className="grid flex-[1_1_520px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
            {reports.map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener" className="flex min-h-11 items-center gap-4 rounded-2xl border border-line bg-white px-5 py-[18px] text-forest transition hover:translate-x-1 hover:border-forest">
                <span className="flex size-11 flex-none items-center justify-center rounded-xl bg-[#FCEFD8] text-amber"><DownloadIcon /></span>
                <span className="flex flex-col gap-1"><span className="font-semibold">{r.title}</span><span className="text-[13px] text-[#7C8B84]">PDF · {r.period}</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
