"use client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { clientStorage } from "./firebase-client";

/** Shrinks large photos in the browser before upload (max 2000px, JPEG ~82%). */
async function compressImage(file: File, max = 2000): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    if (scale === 1 && file.size < 1.5 * 1024 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

export async function uploadToStorage(file: File, folder: "media" | "events", onProgress?: (pct: number) => void) {
  const body = await compressImage(file);
  const isJpeg = body !== file;
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/\.[a-z0-9]+$/, "");
  const ext = isJpeg ? "jpg" : (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `media/${folder}/${new Date().getFullYear()}/${crypto.randomUUID().slice(0, 8)}-${safeName}.${ext}`;
  const task = uploadBytesResumable(ref(clientStorage(), path), body, {
    contentType: isJpeg ? "image/jpeg" : file.type,
    cacheControl: "public, max-age=31536000, immutable",
  });
  await new Promise<void>((resolve, reject) =>
    task.on("state_changed", (s) => onProgress?.(Math.round((s.bytesTransferred / s.totalBytes) * 100)), reject, () => resolve()),
  );
  return { url: await getDownloadURL(task.snapshot.ref), path };
}
