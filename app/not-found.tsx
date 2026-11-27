import Link from "next/link";
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-5 bg-night px-6 text-center text-white">
      <span className="font-display text-7xl font-extrabold text-gold">404</span>
      <h1 className="text-3xl font-extrabold">This page has wandered off.</h1>
      <Link href="/" className="btn-gold">Back to home</Link>
    </main>
  );
}
