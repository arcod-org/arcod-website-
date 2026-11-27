import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/site/ContactForm";
import DonateBox from "@/components/site/DonateBox";
import Reveal from "@/components/site/Reveal";
import { org } from "@/lib/content";

export const metadata: Metadata = { title: "Donate, volunteer & contact", description: "Support ARCOD with a tax-deductible donation (80G), volunteer, partner through CSR, or get in touch." };

const ways = [
  ["Volunteer", "Teach, mentor, or lend your professional skills to our field teams."],
  ["Sponsor a child", "Support one child’s schooling for a full year."],
  ["CSR partnership", "ARCOD is CSR-registered. Co-design a programme with measurable outcomes — like Luminous’s LAMP."],
  ["Internships", "Field placements for students of social work and development studies."],
];

export default function ContactPage() {
  return (
    <>
      <section id="donate" className="relative scroll-mt-20 overflow-hidden bg-forest text-white">
        <Image src="/images/lamp-trip.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[.18]" aria-hidden />
        <div className="wrap relative py-24"><DonateBox /></div>
      </section>

      <section className="wrap py-24">
        <div className="eyebrow">Get involved</div>
        <h2 className="h-section mt-4 text-forest">More ways to stand with us</h2>
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[22px]">
          {ways.map(([t, b], i) => (
            <Reveal key={t} delay={i * 0.06} className="flex flex-col gap-3 rounded-[22px] border border-line bg-white p-8 transition hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-24px_rgba(18,55,46,.35)]">
              <span className="font-display text-2xl font-bold text-forest">{t}</span>
              <p className="text-[15px] leading-relaxed text-muted">{b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap flex flex-wrap gap-14 py-24">
          <div className="flex flex-[1_1_380px] flex-col gap-7">
            <div>
              <div className="eyebrow">Contact</div>
              <h2 className="h-section mt-4 text-forest">Come and see our work.</h2>
            </div>
            <div className="flex flex-col gap-5 text-base leading-relaxed">
              <div><div className="font-semibold text-forest">Office</div><div className="text-body">{org.address}</div></div>
              <div><div className="font-semibold text-forest">Phone</div>
                {org.phones.map((p) => <div key={p.value} className="text-body"><a href={`tel:${p.value.replace(/\s/g, "")}`} className="text-forest underline-offset-2 hover:underline">{p.value}</a> · {p.label}</div>)}
              </div>
              <div><div className="font-semibold text-forest">Email</div>
                <div className="text-body">{org.emails.map((e, i) => <span key={e}>{i > 0 && " · "}<a href={`mailto:${e}`} className="text-forest underline-offset-2 hover:underline">{e}</a></span>)}</div>
              </div>
            </div>
            <iframe title="Map — ARCOD, Rayakottai" src={org.mapEmbed} loading="lazy" className="h-60 w-full rounded-[20px] border-0" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="flex-[1_1_440px] rounded-[28px] bg-white p-[clamp(24px,4vw,40px)]"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
