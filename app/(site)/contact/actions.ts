"use server";
import { z } from "zod";
import { db, hasDatabase } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  contact: z.string().trim().min(5, "Please enter an email or phone number").max(120),
  interest: z.string().trim().max(60),
  message: z.string().trim().min(5, "Please write a short message").max(3000),
  website: z.string().max(0).optional(), // honeypot — real people leave it empty
});

export type ContactState = { ok?: boolean; error?: string };

export async function sendMessage(_: ContactState, form: FormData): Promise<ContactState> {
  const parsed = schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  if (parsed.data.website) return { ok: true }; // bot — pretend success
  if (!hasDatabase()) return { error: "Messages can’t be received right now. Please call or email us." };
  const { name, contact, interest, message } = parsed.data;
  await db().contactMessage.create({ data: { name, contact, interest, message } });
  return { ok: true };
}
