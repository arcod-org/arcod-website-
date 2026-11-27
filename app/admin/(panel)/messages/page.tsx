import { db } from "@/lib/db";
import { deleteMessage, toggleMessageHandled } from "@/app/admin/actions";
import ActionButton from "@/components/admin/ActionButton";
import { PageHead, Panel } from "@/components/admin/ui";
import { fmtDate, fmtTime } from "@/lib/utils";

export default async function Messages() {
  const msgs = await db().contactMessage.findMany({ orderBy: [{ handled: "asc" }, { createdAt: "desc" }], take: 200 });
  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Messages" sub="Sent from the contact form on the website." />
      {msgs.length === 0 && <Panel className="p-8 text-muted">No messages yet.</Panel>}
      {msgs.map((m) => (
        <Panel key={m.id} className={`flex flex-wrap gap-4 p-5 ${m.handled ? "opacity-60" : ""}`}>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-forest">{m.name}</span>
              <span className="rounded-full bg-[#FCEFD8] px-2.5 py-1 text-xs font-semibold text-[#8A5200]">{m.interest}</span>
              {!m.handled && <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-night">New</span>}
            </div>
            <div className="mt-1 text-sm text-muted">{m.contact} · {fmtDate(m.createdAt, { day: "numeric", month: "short" })}, {fmtTime(m.createdAt)}</div>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-body">{m.message}</p>
          </div>
          <div className="flex items-start gap-1">
            <ActionButton label={m.handled ? "Mark as new" : "Mark as handled"} action={toggleMessageHandled.bind(null, m.id)} className="text-forest hover:bg-[#F3F1EA]">{m.handled ? "Mark new" : "Mark handled"}</ActionButton>
            <ActionButton label="Delete message" confirmText="Delete this message?" action={deleteMessage.bind(null, m.id)} className="text-[#A3361B] hover:bg-[#FBE7E1]">Delete</ActionButton>
          </div>
        </Panel>
      ))}
    </div>
  );
}
