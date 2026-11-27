import type { Metadata } from "next";
import Link from "next/link";
import ProgrammesExplorer from "@/components/site/ProgrammesExplorer";

export const metadata: Metadata = { title: "Programmes", description: "ARCOD’s current programmes in education, agriculture, children, health and women’s empowerment — and 38 years of legacy work." };

export default async function ProgrammesPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = await searchParams;
  return (
    <>
      <ProgrammesExplorer initialPhase={view === "legacy" ? "legacy" : "current"} />
      <section className="bg-gold">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-[72px]">
          <h2 className="max-w-[720px] text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.1] text-night">Want to fund or partner on a programme? ARCOD is CSR-registered.</h2>
          <Link href="/contact" className="btn bg-night text-white">Partner with ARCOD</Link>
        </div>
      </section>
    </>
  );
}
