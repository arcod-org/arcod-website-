"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/content";
import { HeartIcon, MenuIcon, XIcon } from "./icons";

export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="sticky top-0 z-40 bg-night/92 backdrop-blur-md">
      <div className="wrap flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="ARCOD home">
          <span className="flex size-[52px] flex-none items-center justify-center rounded-[14px] bg-white">
            <Image src="/images/logo-tree.jpg" alt="" width={46} height={46} className="object-contain" priority />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-display text-[22px] font-extrabold leading-none text-white">ARCOD</span>
            <span className="hidden text-[11px] tracking-wide text-mist sm:block">Association for Rural Community Development · Estd. 1988</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => {
            const active = path.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined}
                className={`group relative py-2.5 text-[15px] font-medium transition ${active ? "text-gold" : "text-[#E9F1EC] hover:text-white"}`}>
                {n.label}
                <span className={`absolute inset-x-0 bottom-1 h-0.5 origin-left bg-gold transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact#donate" className="btn-gold hidden sm:inline-flex">Donate <HeartIcon /></Link>
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-white lg:hidden">
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 lg:hidden">
            <div className="wrap flex flex-col gap-1 py-4">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="py-3 text-lg text-[#E9F1EC] hover:text-gold">{n.label}</Link>
              ))}
              <Link href="/contact#donate" className="btn-gold mt-2">Donate</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
