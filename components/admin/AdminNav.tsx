"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/media", label: "Media library" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="flex flex-row flex-wrap gap-1.5 md:flex-col" aria-label="Admin">
      {items.map((i) => {
        const on = i.href === "/admin" ? path === "/admin" : path.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href} aria-current={on ? "page" : undefined}
            className={`flex min-h-11 items-center rounded-xl px-3.5 text-[15px] font-medium transition ${on ? "bg-gold text-night" : "text-mist hover:bg-white/6 hover:text-white"}`}>{i.label}</Link>
        );
      })}
    </nav>
  );
}
