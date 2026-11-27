"use client";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import type { Media } from "@prisma/client";
import { createMedia, updateMedia, type MediaInput } from "@/app/admin/actions";
import { uploadToStorage } from "@/lib/upload";
import { albums } from "@/lib/content";
import { dateToIstParts } from "@/lib/utils";
import { Field, adminInput } from "./ui";

type Kind = "PHOTO" | "VIDEO" | "YOUTUBE";

export default function MediaForm({ media }: { media?: Media }) {
  const router = useRouter();
  const editing = !!media;
  const pub = media ? dateToIstParts(media.publishAt) : { date: "", time: "" };
  const [type, setType] = useState<Kind>(media?.type ?? "PHOTO");
  const [title, setTitle] = useState(media?.title ?? "");
  const [caption, setCaption] = useState(media?.caption ?? "");
  const [album, setAlbum] = useState(media?.album ?? "Education");
  const [status, setStatus] = useState<"PUBLISHED" | "DRAFT">(media?.status ?? "PUBLISHED");
  const [publishDate, setPublishDate] = useState(editing ? pub.date : "");
  const [publishTime, setPublishTime] = useState(editing ? pub.time : "09:00");
  const [featured, setFeatured] = useState(media?.featured ?? false);
  const [youtube, setYoutube] = useState(media?.type === "YOUTUBE" ? media.url : "");
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<string>("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const base = (): Omit<MediaInput, "url" | "title"> => ({ caption, album, type, status, publishDate, publishTime: publishDate ? publishTime : "", featured, storagePath: null });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    start(async () => {
      try {
        // YouTube link
        if (type === "YOUTUBE") {
          const input = { ...base(), title, url: youtube };
          const r = editing ? await updateMedia(media.id, { ...input, storagePath: null }) : await createMedia(input);
          if (r.error) throw new Error(r.error);
        } else if (editing && files.length === 0) {
          // Edit details only, keep the existing file
          const r = await updateMedia(media.id, { ...base(), title, url: media.url, storagePath: media.storagePath });
          if (r.error) throw new Error(r.error);
        } else {
          if (!files.length) throw new Error("Choose a file to upload.");
          const list = editing ? files.slice(0, 1) : files;
          for (let i = 0; i < list.length; i++) {
            const f = list[i];
            const { url, path } = await uploadToStorage(f, "media", (p) => setProgress(list.length > 1 ? `Uploading ${i + 1} of ${list.length} — ${p}%` : `Uploading — ${p}%`));
            const t = title ? (list.length > 1 ? `${title} (${i + 1})` : title) : f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
            const input = { ...base(), title: t, url, storagePath: path };
            const r = editing ? await updateMedia(media.id, input) : await createMedia(input);
            if (r.error) throw new Error(r.error);
          }
        }
        setProgress("");
        if (editing) { router.push("/admin/media?saved=1"); return; }
        setMsg({ ok: true, text: publishDate ? `Saved — scheduled to go live on ${publishDate} at ${publishTime}.` : "Uploaded and live on the website." });
        setTitle(""); setCaption(""); setFiles([]); setYoutube(""); setPublishDate("");
        if (fileRef.current) fileRef.current.value = "";
        router.refresh();
      } catch (err) {
        setProgress("");
        setMsg({ ok: false, text: (err as Error).message || "Upload failed." });
      }
    });
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      <Field label="Type">
        <select className={adminInput} value={type} onChange={(e) => setType(e.target.value as Kind)}>
          <option value="PHOTO">Photo(s)</option><option value="VIDEO">Video file (short clips)</option><option value="YOUTUBE">YouTube link (long videos)</option>
        </select>
      </Field>
      {type === "YOUTUBE" ? (
        <Field label="YouTube link" className="col-span-full md:col-span-2"><input className={adminInput} value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://www.youtube.com/watch?v=…" /></Field>
      ) : (
        <Field label={editing ? "Replace file" : "File"} hint={type === "PHOTO" && !editing ? "(you can pick many photos at once)" : type === "VIDEO" ? "(MP4, under 150 MB)" : ""} className="col-span-full md:col-span-2">
          <input ref={fileRef} type="file" accept={type === "PHOTO" ? "image/*" : "video/mp4,video/webm"} multiple={type === "PHOTO" && !editing}
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
            className="rounded-[10px] border-2 border-dashed border-[#CBD8D0] bg-paper p-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-forest file:px-4 file:py-2 file:font-semibold file:text-white" />
        </Field>
      )}
      <Field label="Title" hint={files.length > 1 ? "(numbered automatically)" : "(optional for photos — file name is used)"}><input className={adminInput} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Medical camp, Kelamangalam" /></Field>
      <Field label="Album">
        <select className={adminInput} value={album} onChange={(e) => setAlbum(e.target.value)}>{albums.map((a) => <option key={a}>{a}</option>)}</select>
      </Field>
      <Field label="Visibility">
        <select className={adminInput} value={status} onChange={(e) => setStatus(e.target.value as "PUBLISHED" | "DRAFT")}><option value="PUBLISHED">Published</option><option value="DRAFT">Hidden (draft)</option></select>
      </Field>
      <Field label="Publish on" hint="(blank = now)"><input type="date" className={adminInput} value={publishDate} onChange={(e) => setPublishDate(e.target.value)} /></Field>
      <Field label="Time (IST)"><input type="time" className={adminInput} value={publishTime} onChange={(e) => setPublishTime(e.target.value)} disabled={!publishDate} /></Field>
      <Field label="Caption / description" hint="(shown in the gallery viewer)" className="col-span-full">
        <textarea rows={2} className={`${adminInput} min-h-[72px] py-2.5`} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. Farmers learn to prepare Panchakavya at Koppakarai, 12 Oct 2025." />
      </Field>
      <label className="col-span-full flex items-center gap-2.5 text-sm text-forest">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="size-5 accent-[#12372E]" />
        Feature on the homepage “From the field” strip (photos only — the latest 5 are shown)
      </label>
      <div className="col-span-full flex flex-wrap items-center gap-4">
        <button disabled={pending} className="btn-dark min-h-11 disabled:opacity-60">{pending ? "Saving…" : editing ? "Save changes" : "Upload & save"}</button>
        {editing && <button type="button" onClick={() => router.push("/admin/media")} className="btn-line min-h-11">Cancel</button>}
        {progress && <span className="text-sm font-medium text-forest">{progress}</span>}
        {msg && <span role="status" className={`text-sm font-medium ${msg.ok ? "text-forest" : "text-[#A3361B]"}`}>{msg.text}</span>}
      </div>
    </form>
  );
}
