import "server-only";
import { db, hasDatabase } from "./db";
import type { Event, Media } from "@prisma/client";

// Every public query only returns items that are PUBLISHED and whose publishAt has passed.
// That is how scheduling works: an item saved with a future publishAt stays hidden until then.
// Pages that use these are cached (ISR) and refreshed every few minutes or when admins save,
// so most visits don't touch the database and Neon can sleep between visits.

const live = () => ({ status: "PUBLISHED" as const, publishAt: { lte: new Date() } });

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabase()) return fallback;
  try {
    return await fn();
  } catch (e) {
    console.error("[data]", e);
    return fallback;
  }
}

/** Upcoming public events (scheduled for today or later). */
export function getUpcomingEvents(limit = 6): Promise<Event[]> {
  const startOfToday = new Date(new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }) + "T00:00:00+05:30");
  return safe(
    () => db().event.findMany({ where: { ...live(), startsAt: { gte: startOfToday } }, orderBy: { startsAt: "asc" }, take: limit }),
    [],
  );
}

export function getPastEvents(limit = 12): Promise<Event[]> {
  return safe(
    () => db().event.findMany({ where: { ...live(), startsAt: { lt: new Date() } }, orderBy: { startsAt: "desc" }, take: limit }),
    [],
  );
}

export function getEventBySlug(slug: string): Promise<Event | null> {
  return safe(() => db().event.findFirst({ where: { slug, ...live() } }), null);
}

export function getPublicMedia(limit = 200): Promise<Media[]> {
  return safe(() => db().media.findMany({ where: live(), orderBy: { publishAt: "desc" }, take: limit }), []);
}

export function getFeaturedMedia(limit = 6): Promise<Media[]> {
  return safe(() => db().media.findMany({ where: { ...live(), featured: true, type: "PHOTO" }, orderBy: { publishAt: "desc" }, take: limit }), []);
}
