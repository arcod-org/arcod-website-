"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { adminBucket } from "@/lib/firebase-admin";
import { istToDate, slugify } from "@/lib/utils";

export type ActionResult = { ok?: boolean; error?: string };

function refreshPublicPages() {
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/events");
  revalidatePath("/events/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

async function deleteStorageFile(path?: string | null) {
  if (!path) return;
  try {
    await adminBucket().file(path).delete({ ignoreNotFound: true });
  } catch (e) {
    console.error("[storage delete]", e);
  }
}

const optionalUrl = z.string().trim().url("Enter a full link starting with https://").or(z.literal("")).optional();

// ─────────────────────────── MEDIA ───────────────────────────

const mediaSchema = z.object({
  title: z.string().trim().min(2, "Add a title").max(140),
  caption: z.string().trim().max(1000).default(""),
  album: z.string().trim().min(1).max(40),
  type: z.enum(["PHOTO", "VIDEO", "YOUTUBE"]),
  url: z.string().trim().url("Upload a file or paste a valid link"),
  storagePath: z.string().trim().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  publishDate: z.string().optional().default(""),
  publishTime: z.string().optional().default(""),
  featured: z.boolean().default(false),
});
export type MediaInput = z.input<typeof mediaSchema>;

export async function createMedia(input: MediaInput): Promise<ActionResult> {
  await requireAdmin();
  const p = mediaSchema.safeParse(input);
  if (!p.success) return { error: p.error.issues[0].message };
  const { publishDate, publishTime, ...d } = p.data;
  await db().media.create({ data: { ...d, publishAt: publishDate ? istToDate(publishDate, publishTime) : new Date() } });
  refreshPublicPages();
  revalidatePath("/admin/media");
  return { ok: true };
}

export async function updateMedia(id: string, input: MediaInput): Promise<ActionResult> {
  await requireAdmin();
  const p = mediaSchema.safeParse(input);
  if (!p.success) return { error: p.error.issues[0].message };
  const { publishDate, publishTime, ...d } = p.data;
  const prev = await db().media.findUnique({ where: { id } });
  if (!prev) return { error: "This item no longer exists." };
  await db().media.update({ where: { id }, data: { ...d, publishAt: publishDate ? istToDate(publishDate, publishTime) : prev.publishAt } });
  if (prev.storagePath && prev.storagePath !== d.storagePath) await deleteStorageFile(prev.storagePath);
  refreshPublicPages();
  revalidatePath("/admin/media");
  return { ok: true };
}

export async function toggleMediaStatus(id: string) {
  await requireAdmin();
  const m = await db().media.findUnique({ where: { id } });
  if (!m) return;
  await db().media.update({ where: { id }, data: { status: m.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" } });
  refreshPublicPages();
  revalidatePath("/admin/media");
}

export async function toggleMediaFeatured(id: string) {
  await requireAdmin();
  const m = await db().media.findUnique({ where: { id } });
  if (!m) return;
  await db().media.update({ where: { id }, data: { featured: !m.featured } });
  refreshPublicPages();
  revalidatePath("/admin/media");
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  const m = await db().media.delete({ where: { id } }).catch(() => null);
  await deleteStorageFile(m?.storagePath);
  refreshPublicPages();
  revalidatePath("/admin/media");
}

// ─────────────────────────── EVENTS ───────────────────────────

const eventSchema = z.object({
  title: z.string().trim().min(3, "Add an event title").max(140),
  category: z.string().trim().min(1).max(40),
  summary: z.string().trim().max(160, "Keep the summary under 160 characters").default(""),
  description: z.string().trim().max(10000).default(""),
  venue: z.string().trim().max(160).default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick the event date"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Pick the event time"),
  coverUrl: optionalUrl,
  registrationLink: optionalUrl,
  status: z.enum(["DRAFT", "PUBLISHED"]),
  publishDate: z.string().optional().default(""),
  publishTime: z.string().optional().default(""),
});
export type EventInput = z.input<typeof eventSchema>;

async function uniqueSlug(title: string, date: string, ignoreId?: string) {
  const base = slugify(`${title} ${date.slice(0, 7)}`) || "event";
  let slug = base;
  for (let n = 2; ; n++) {
    const hit = await db().event.findUnique({ where: { slug } });
    if (!hit || hit.id === ignoreId) return slug;
    slug = `${base}-${n}`;
  }
}

function eventData(d: z.output<typeof eventSchema>) {
  const { date, time, publishDate, publishTime, coverUrl, registrationLink, ...rest } = d;
  return {
    ...rest,
    startsAt: istToDate(date, time),
    coverUrl: coverUrl || null,
    registrationLink: registrationLink || null,
    publishAt: publishDate ? istToDate(publishDate, publishTime) : undefined,
  };
}

export async function saveEvent(id: string | null, input: EventInput): Promise<ActionResult> {
  await requireAdmin();
  const p = eventSchema.safeParse(input);
  if (!p.success) return { error: p.error.issues[0].message };
  const data = eventData(p.data);
  if (id) {
    await db().event.update({ where: { id }, data: { ...data, publishAt: data.publishAt ?? undefined } });
  } else {
    const slug = await uniqueSlug(p.data.title, p.data.date);
    await db().event.create({ data: { ...data, slug, publishAt: data.publishAt ?? new Date() } });
  }
  refreshPublicPages();
  revalidatePath("/admin/events");
  redirect("/admin/events?saved=1");
}

export async function toggleEventStatus(id: string) {
  await requireAdmin();
  const e = await db().event.findUnique({ where: { id } });
  if (!e) return;
  await db().event.update({ where: { id }, data: { status: e.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" } });
  refreshPublicPages();
  revalidatePath("/admin/events");
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  await db().event.delete({ where: { id } }).catch(() => null);
  refreshPublicPages();
  revalidatePath("/admin/events");
}

// ─────────────────────────── MESSAGES ───────────────────────────

export async function toggleMessageHandled(id: string) {
  await requireAdmin();
  const m = await db().contactMessage.findUnique({ where: { id } });
  if (!m) return;
  await db().contactMessage.update({ where: { id }, data: { handled: !m.handled } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await db().contactMessage.delete({ where: { id } }).catch(() => null);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
