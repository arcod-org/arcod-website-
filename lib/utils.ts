export const IST = "Asia/Kolkata";

export function cn(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

export function fmtDate(d: Date, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: IST, ...opts }).format(d);
}
export function fmtTime(d: Date) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: IST, hour: "numeric", minute: "2-digit" }).format(d);
}
export function monthShort(d: Date) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: IST, month: "short" }).format(d).toUpperCase();
}
export function dayNum(d: Date) {
  return new Intl.DateTimeFormat("en-IN", { timeZone: IST, day: "2-digit" }).format(d);
}

/** Build a Date from a date ("2026-12-06") and time ("10:00") entered in IST. */
export function istToDate(date: string, time = "00:00") {
  return new Date(`${date}T${time || "00:00"}:00+05:30`);
}

/** Inverse of istToDate, for filling form inputs. */
export function dateToIstParts(d: Date) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: IST, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d);
  const g = (t: string) => p.find((x) => x.type === t)?.value ?? "";
  return { date: `${g("year")}-${g("month")}-${g("day")}`, time: `${g("hour")}:${g("minute")}` };
}

export function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m?.[1] ?? null;
}
