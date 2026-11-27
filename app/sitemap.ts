import type { MetadataRoute } from "next";
import { db, hasDatabase } from "@/lib/db";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcod.in";
  const pages = ["", "/about", "/programmes", "/events", "/gallery", "/contact", "/privacy", "/terms", "/refund-policy"].map((p) => ({ url: base + p, lastModified: new Date() }));
  let events: MetadataRoute.Sitemap = [];
  if (hasDatabase()) {
    try {
      const rows = await db().event.findMany({ where: { status: "PUBLISHED", publishAt: { lte: new Date() } }, select: { slug: true, updatedAt: true } });
      events = rows.map((e) => ({ url: `${base}/events/${e.slug}`, lastModified: e.updatedAt }));
    } catch {}
  }
  return [...pages, ...events];
}
