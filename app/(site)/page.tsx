import Image from "next/image";
import Link from "next/link";
import HeroSlider from "@/components/site/HeroSlider";
import ImpactStats from "@/components/site/ImpactStats";
import ProgrammeTabs from "@/components/site/ProgrammeTabs";
import EventCard from "@/components/site/EventCard";
import Marquee from "@/components/site/Marquee";
import Reveal from "@/components/site/Reveal";
import { ArrowIcon, ShieldIcon } from "@/components/site/icons";
import { awards, credentials } from "@/lib/content";
import { getFeaturedMedia, getUpcomingEvents } from "@/lib/data";

// Re-generate this page at most every 5 minutes (and instantly when an admin saves).
export const revalidate = 300;

const campus = [
  { src: "/images/campus-aerial3.jpg", alt: "Aerial view of the ARCOD campus", cap: "Campus view", cls: "col-span-2 row-span-2" },
  { src: "/images/campus-library.jpg", alt: "Pichu Iyer Library", cap: "Pichu Iyer Library", cls: "" },
  { src: "/images/campus-auditorium.jpg", alt: "Auditorium building", cap: "Auditorium", cls: "" },
  { src: "/images/campus-hall.jpg", alt: "Training hall interior", cap: "Training hall", cls: "" },
  { src: "/images/campus-guestroom.jpg", alt: "Residential guest room", cap: "Residential rooms", cls: "" },
];

const defaultTeaser = [
  { src: "/images/lamp-trip.jpg", title: "LAMP exposure visit, 2024" },
  { src: "/images/lamp-kabaddi1.jpg", title: "Inter-school kabaddi" },
  { src: "/images/lamp-dance.jpg", title: "LAMP launch, 2023" },
  { src: "/images/ev-walkathon.jpg", title: "Awareness walkathon" },
  { src: "/images/ag-tomato.jpg", title: "Tomato harvest" },
];

function Frame({ src, alt, cap, className = "" }: { src: string; alt: string; cap?: string; className?: string }) {
  return (
    <div className={`zoom group relative overflow-hidden rounded-[20px] bg-forest ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
      {cap && <span className="absolute bottom-3 left-3.5 translate-y-1.5 rounded-full bg-night/75 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">{cap}</span>}
    </div>
  );
}

export default async function HomePage() {
  const [events, featured] = await Promise.all([getUpcomingEvents(3), getFeaturedMedia(5)]);
  const teaser = featured.length >= 5 ? featured.map((m) => ({ src: m.url, title: m.title })) : defaultTeaser;

  return (
    <>
      <HeroSlider />

      {/* Credentials */}
      <section className="border-b border-line bg-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-9 gap-y-4 py-5">
          {credentials.map((c) => (
            <span key={c} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-forest"><ShieldIcon className="text-leaf" />{c}</span>
          ))}
        </div>
      </section>

      {/* Upcoming events — only shown when something is scheduled */}
      {events.length > 0 && (
        <section className="bg-gold text-night">
          <div className="wrap flex flex-wrap items-center gap-8 py-10">
            <div className="flex-[1_1_220px]">
              <div className="text-[13px] font-bold uppercase tracking-[0.14em]">Coming up</div>
              <h2 className="mt-2.5 text-[32px] font-extrabold leading-tight">Join us on the ground</h2>
              <Link href="/events" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">All events <ArrowIcon size={14} /></Link>
            </div>
            <div className="flex flex-[999_1_640px] flex-wrap gap-4">
              {events.map((e) => <EventCard key={e.id} e={e} tone="cream" />)}
            </div>
          </div>
        </section>
      )}

      {/* Who we are */}
      <section className="wrap flex flex-wrap items-center gap-16 py-28">
        <Reveal className="min-w-0 flex-[1_1_440px]">
          <div className="eyebrow">Who we are</div>
          <h2 className="h-section mt-4 text-forest">A grassroots organisation that began in one small office in Rayakottai.</h2>
          <p className="mt-6 text-lg leading-[1.7] text-body">ARCOD was founded in 1988 to work for the social, economic, political and health empowerment of the rural poor — Dalits, Adivasis, small farmers, women and children.</p>
          <p className="mt-4 text-lg leading-[1.7] text-body">Our mission is to build collective leadership and improve living standards through sustainable development in education, health, environment and livelihoods — working hand in hand with government, CSR partners and the communities themselves.</p>
          <Link href="/about" className="btn-dark mt-8">Our story <ArrowIcon /></Link>
        </Reveal>
        <Reveal delay={0.15} className="grid min-w-0 flex-[1_1_480px] grid-cols-2 grid-rows-[220px_220px] gap-4">
          <Frame src="/images/ag-women-training.jpg" alt="Women farmers learning to make value-added millet products" cap="Women’s value-addition training" className="row-span-2" />
          <Frame src="/images/lamp-mentoring.jpg" alt="Girls at a LAMP mentoring session" cap="LAMP mentoring session" />
          <Frame src="/images/ag-field.jpg" alt="Farmers on a field visit" cap="Farmer field visit" />
        </Reveal>
      </section>

      {/* Impact */}
      <section id="impact" className="relative overflow-hidden bg-forest text-white">
        <Image src="/images/ag-millet.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[.18]" aria-hidden />
        <div className="wrap relative py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow text-gold">38 years of impact</div>
              <h2 className="mt-4 max-w-[680px] text-[clamp(34px,4vw,56px)] font-extrabold leading-[1.02]">Numbers are people. Here are a few of them.</h2>
            </div>
            <p className="max-w-[380px] text-base leading-relaxed text-sage">Cumulative reach across ARCOD’s programmes, 1988–2026.</p>
          </Reveal>
          <ImpactStats />
        </div>
      </section>

      {/* Programmes */}
      <section className="wrap py-28"><ProgrammeTabs /></section>

      {/* Story */}
      <section className="wrap pb-28">
        <Reveal className="flex flex-wrap overflow-hidden rounded-[32px] bg-sand">
          <div className="zoom relative min-h-[480px] flex-[1_1_440px] overflow-hidden">
            <Image src="/images/ag-panchakavya.jpg" alt="Farmers preparing Panchakavya natural fertiliser" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-[1_1_420px] flex-col justify-center gap-5 p-[clamp(32px,5vw,72px)]">
            <div className="eyebrow">Story of change · Sustainable Agriculture</div>
            <h3 className="text-[clamp(28px,3vw,40px)] font-extrabold leading-[1.1] text-forest">Ashoka of Koppakarai: from trainee to village entrepreneur.</h3>
            <p className="text-[17px] leading-[1.7] text-body">A mother of two and a community cadre in her Farmers Interest Group, Ashoka attended every training in her panchayat — even when her family doubted her. With ARCOD’s support she began producing Panchakavya, a natural fertiliser, and later Ragi Murukku, a millet snack. Today she sells to farmers in neighbouring panchayats and inspires other women to follow.</p>
            <a href="/reports/case-story-sustainable-agriculture.pdf" className="btn-dark self-start">Read the full story</a>
          </div>
        </Reveal>
      </section>

      {/* Campus */}
      <section className="overflow-hidden bg-night py-28 text-white">
        <Reveal className="wrap flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow text-gold">ARCOD Namma Veedu · Rayakottai</div>
            <h2 className="h-section mt-4 max-w-[720px]">A campus among the hills, built for learning.</h2>
          </div>
          <p className="max-w-[420px] text-base leading-relaxed text-mist">Our training centre hosts children’s camps, farmer trainings, inter-school competitions and community meetings — with an auditorium, library, residential rooms and open grounds.</p>
        </Reveal>
        <Reveal delay={0.1} className="wrap mt-12 grid auto-rows-[160px] grid-cols-2 gap-3.5 md:auto-rows-[220px] md:grid-cols-4">
          {campus.map((c) => <Frame key={c.src} src={c.src} alt={c.alt} cap={c.cap} className={c.cls} />)}
        </Reveal>
      </section>

      {/* Awards */}
      <section className="wrap py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Recognition</div>
            <h2 className="h-section mt-4 text-forest">Trusted by government and partners.</h2>
          </div>
          <Link href="/about#awards" className="btn-dark">All awards</Link>
        </Reveal>
        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[18px]">
          {awards.map((a, i) => (
            <Reveal key={a.year} delay={i * 0.06} className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-gold">
              <span className="font-display text-4xl font-extrabold leading-none text-gold">{a.year}</span>
              <span className="font-display text-lg font-bold leading-tight text-forest">{a.title}</span>
              <span className="text-sm leading-normal text-muted">{a.by}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="overflow-hidden bg-sand py-24">
        <Reveal className="wrap flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">From the field</div>
            <h2 className="h-section mt-4 text-forest">Moments that move us.</h2>
          </div>
          <Link href="/gallery" className="btn-dark">Open full gallery</Link>
        </Reveal>
        <Reveal delay={0.1} className="wrap mt-12 grid auto-rows-[150px] grid-cols-2 gap-3.5 md:auto-rows-[210px] md:grid-cols-4">
          {teaser.slice(0, 5).map((t, i) => <Frame key={t.src} src={t.src} alt={t.title} cap={t.title} className={i === 0 ? "col-span-2 row-span-2" : ""} />)}
        </Reveal>
      </section>

      {/* Partners */}
      <section className="border-b border-line py-20">
        <div className="wrap text-center"><div className="eyebrow">Our partners over the years</div></div>
        <div className="mt-9"><Marquee /></div>
      </section>

      {/* Donate */}
      <section className="wrap py-24">
        <Reveal className="relative flex flex-wrap items-center justify-between gap-10 overflow-hidden rounded-[32px] bg-forest p-[clamp(36px,6vw,80px)] text-white">
          <Image src="/images/lamp-girls.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[.16]" aria-hidden />
          <div className="relative flex-[1_1_460px]">
            <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.05]">Every rupee reaches a village.</h2>
            <p className="mt-[18px] max-w-[540px] text-[17px] leading-relaxed text-sage">Your gift funds girls’ education, farmer training and care for children affected by HIV. ARCOD holds valid 12A and 80G registrations, so Indian donors can claim tax benefits.</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Link href="/contact#donate" className="btn-gold">Donate now</Link>
            <Link href="/contact" className="btn-ghost">Partner with us</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
