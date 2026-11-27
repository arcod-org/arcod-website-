import Image from "next/image";
import Link from "next/link";
import { org } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="bg-night text-sage">
      <div className="wrap flex flex-wrap gap-12 pb-10 pt-20">
        <div className="flex flex-[2_1_300px] flex-col gap-4">
          <span className="block w-[120px] rounded-2xl bg-white p-2.5">
            <Image src="/images/logo.jpg" alt="ARCOD logo, Estd. 1988" width={300} height={290} className="h-auto w-full" />
          </span>
          <p className="max-w-sm text-[15px] leading-7 text-mist">
            {org.fullName}. FCRA registered · 12A &amp; 80G · NGO Darpan · GuideStar India.
          </p>
        </div>
        <div className="flex flex-[1_1_160px] flex-col gap-3">
          <span className="font-semibold text-white">Explore</span>
          {[["/about", "About us"], ["/programmes", "Programmes"], ["/events", "Events"], ["/gallery", "Gallery"], ["/about#reports", "Reports & compliance"]].map(([h, l]) => (
            <Link key={h} href={h} className="text-[15px] text-mist hover:text-gold">{l}</Link>
          ))}
        </div>
        <div className="flex flex-[1_1_220px] flex-col gap-3">
          <span className="font-semibold text-white">Visit</span>
          <span className="text-[15px] leading-6 text-mist">{org.address}</span>
        </div>
        <div className="flex flex-[1_1_220px] flex-col gap-3">
          <span className="font-semibold text-white">Talk to us</span>
          <a href={`tel:${org.phones[0].value.replace(/\s/g, "")}`} className="text-[15px] text-mist hover:text-gold">{org.phones[0].value}</a>
          <a href={`mailto:${org.emails[0]}`} className="text-[15px] text-mist hover:text-gold">{org.emails[0]}</a>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-4 border-t border-white/10 pb-8 pt-6 text-[13px] text-[#8FA79B]">
        <span>© {new Date().getFullYear()} ARCOD. All rights reserved.</span>
        <span className="flex flex-wrap gap-5">
          <Link href="/privacy" className="hover:text-gold">Privacy</Link>
          <Link href="/terms" className="hover:text-gold">Terms</Link>
          <Link href="/refund-policy" className="hover:text-gold">Refund policy</Link>
          <Link href="/admin" className="hover:text-gold">Admin</Link>
        </span>
      </div>
    </footer>
  );
}
