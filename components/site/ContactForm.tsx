"use client";
import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";
import { CheckIcon } from "./icons";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, {});
  if (state.ok)
    return (
      <div className="flex flex-col items-center gap-3 px-2 py-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#E1EEE6] text-forest"><CheckIcon /></span>
        <span className="text-[26px] font-extrabold text-forest">Thank you!</span>
        <span className="text-muted">We will reply within two working days.</span>
      </div>
    );
  return (
    <form action={action} className="flex flex-col gap-[18px]">
      <h3 className="text-[26px] font-extrabold text-forest">Send us a message</h3>
      <label className="flex flex-col gap-2"><span className="label">Name</span><input name="name" required className="input" autoComplete="name" /></label>
      <label className="flex flex-col gap-2"><span className="label">Email or phone</span><input name="contact" required className="input" /></label>
      <label className="flex flex-col gap-2"><span className="label">I am interested in</span>
        <select name="interest" className="input">
          {["Volunteering", "Donating", "CSR partnership", "Sponsoring a child", "Media enquiry", "Something else"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-2"><span className="label">Message</span><textarea name="message" required rows={5} className="input min-h-[130px] py-3.5" /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {state.error && <p role="alert" className="text-sm font-medium text-[#A3361B]">{state.error}</p>}
      <button disabled={pending} className="btn-dark disabled:opacity-60">{pending ? "Sending…" : "Send message"}</button>
    </form>
  );
}
