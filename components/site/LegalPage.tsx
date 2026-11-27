export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="wrap max-w-3xl py-20">
      <h1 className="text-[clamp(36px,4vw,52px)] font-extrabold text-forest">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated: November 2026 · [Have ARCOD’s auditor or legal adviser review this text before launch.]</p>
      <div className="mt-8 flex flex-col gap-5 text-[17px] leading-[1.75] text-body [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-forest">{children}</div>
    </section>
  );
}
