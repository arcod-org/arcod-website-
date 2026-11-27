"use client";
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Event } from "@prisma/client";
import { saveEvent } from "@/app/admin/actions";
import { uploadToStorage } from "@/lib/upload";
import { eventCategories } from "@/lib/content";
import { dateToIstParts } from "@/lib/utils";
import { Field, adminInput } from "./ui";

export default function EventForm({ event, library }: { event?: Event; library: { url: string; title: string }[] }) {
  const router = useRouter();
  const start0 = event ? dateToIstParts(event.startsAt) : { date: "", time: "10:00" };
  const pub0 = event ? dateToIstParts(event.publishAt) : { date: "", time: "09:00" };
  const [f, setF] = useState({
    title: event?.title ?? "",
    category: event?.category ?? "Community",
    summary: event?.summary ?? "",
    description: event?.description ?? "",
    venue: event?.venue ?? "",
    date: start0.date,
    time: start0.time,
    coverUrl: event?.coverUrl ?? "",
    registrationLink: event?.registrationLink ?? "",
    status: (event?.status ?? "PUBLISHED") as "PUBLISHED" | "DRAFT",
    publishDate: event && event.publishAt > new Date() ? pub0.date : "",
    publishTime: pub0.time,
  });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF((x) => ({ ...x, [k]: e.target.value }));
  const [uploading, setUploading] = useState("");
  const [err, setErr] = useState("");
  const [pending, start] = useTransition();

  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadToStorage(file, "events", (p) => setUploading(`Uploading cover — ${p}%`));
      setF((x) => ({ ...x, coverUrl: url }));
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setUploading("");
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    start(async () => {
      const r = await saveEvent(event?.id ?? null, { ...f, publishTime: f.publishDate ? f.publishTime : "" });
      if (r?.error) setErr(r.error);
    });
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      <Field label="Event title" className="col-span-full md:col-span-2"><input required className={adminInput} value={f.title} onChange={set("title")} placeholder="e.g. Free eye-care camp" /></Field>
      <Field label="Category"><select className={adminInput} value={f.category} onChange={set("category")}>{eventCategories.map((c) => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Date"><input required type="date" className={adminInput} value={f.date} onChange={set("date")} /></Field>
      <Field label="Time (IST)"><input required type="time" className={adminInput} value={f.time} onChange={set("time")} /></Field>
      <Field label="Venue" className="md:col-span-2"><input className={adminInput} value={f.venue} onChange={set("venue")} placeholder="Village / town" /></Field>

      <Field label="Short summary" hint={`(one line on the homepage card · ${f.summary.length}/160)`} className="col-span-full">
        <input maxLength={160} className={adminInput} value={f.summary} onChange={set("summary")} placeholder="e.g. Free eye check-ups and spectacles for elders" />
      </Field>
      <Field label="Full description" hint="(shown on the event page · English or Tamil · line breaks are kept)" className="col-span-full">
        <textarea rows={7} className={`${adminInput} min-h-[160px] py-3`} value={f.description} onChange={set("description")} placeholder="What is happening, who can attend, what to bring, contact person…" />
      </Field>

      <div className="col-span-full flex flex-wrap items-start gap-4 rounded-2xl bg-paper p-4">
        <div className="relative h-[120px] w-[200px] flex-none overflow-hidden rounded-xl bg-forest">
          {f.coverUrl ? <img src={f.coverUrl} alt="Cover preview" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-sm text-mist">No cover yet</span>}
        </div>
        <div className="flex min-w-[240px] flex-1 flex-col gap-3">
          <Field label="Cover photo — upload a new one">
            <input type="file" accept="image/*" onChange={onCover} className="text-sm file:mr-3 file:rounded-full file:border-0 file:bg-forest file:px-4 file:py-2 file:font-semibold file:text-white" />
          </Field>
          <Field label="…or pick from the media library">
            <select className={adminInput} value={library.some((l) => l.url === f.coverUrl) ? f.coverUrl : ""} onChange={set("coverUrl")}>
              <option value="">— choose a photo —</option>
              {library.map((l) => <option key={l.url} value={l.url}>{l.title}</option>)}
            </select>
          </Field>
          {uploading && <span className="text-sm font-medium text-forest">{uploading}</span>}
        </div>
      </div>

      <Field label="Registration or contact link" hint="(optional — Google Form, WhatsApp…)" className="md:col-span-2"><input className={adminInput} value={f.registrationLink} onChange={set("registrationLink")} placeholder="https://forms.gle/…" /></Field>
      <Field label="Visibility"><select className={adminInput} value={f.status} onChange={set("status")}><option value="PUBLISHED">Published</option><option value="DRAFT">Draft (hidden)</option></select></Field>
      <Field label="Show on website from" hint="(blank = now)"><input type="date" className={adminInput} value={f.publishDate} onChange={set("publishDate")} /></Field>
      <Field label="Time (IST)"><input type="time" className={adminInput} value={f.publishTime} onChange={set("publishTime")} disabled={!f.publishDate} /></Field>

      <div className="col-span-full flex flex-wrap items-center gap-4">
        <button disabled={pending || !!uploading} className="btn-dark min-h-11 disabled:opacity-60">{pending ? "Saving…" : event ? "Save changes" : "Create event"}</button>
        <button type="button" onClick={() => router.push("/admin/events")} className="btn-line min-h-11">Cancel</button>
        {err && <span role="alert" className="text-sm font-medium text-[#A3361B]">{err}</span>}
      </div>
    </form>
  );
}
