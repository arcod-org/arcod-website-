import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";
import SignOutButton from "@/components/admin/SignOutButton";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <div className="flex min-h-svh flex-wrap bg-[#F3F1EA]">
      <aside className="flex w-full flex-col gap-1.5 bg-night px-4 py-6 md:sticky md:top-0 md:h-svh md:w-[250px]">
        <Link href="/admin" className="flex items-center gap-3 px-2 pb-6">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white"><Image src="/images/logo-tree.jpg" alt="" width={38} height={38} /></span>
          <span><span className="block font-display text-[19px] font-extrabold text-white">ARCOD</span><span className="text-xs text-[#8FA79B]">Admin console</span></span>
        </Link>
        <AdminNav />
        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 px-2 pt-4 text-[13px] text-[#8FA79B]">
          <span className="truncate">Signed in as {user.email}</span>
          <a href="/" target="_blank" className="text-gold hover:underline">View live site ↗</a>
          <SignOutButton />
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-[clamp(20px,3vw,40px)]">{children}</main>
    </div>
  );
}
