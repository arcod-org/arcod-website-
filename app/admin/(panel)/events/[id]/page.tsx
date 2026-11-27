import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import EventForm from "@/components/admin/EventForm";
import { PageHead, Panel } from "@/components/admin/ui";

export default async function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const [event, library] = await Promise.all([
    db().event.findUnique({ where: { id: (await params).id } }),
    db().media.findMany({ where: { type: "PHOTO" }, select: { url: true, title: true }, orderBy: { createdAt: "desc" }, take: 100 }),
  ]);
  if (!event) notFound();
  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Edit event" sub={event.title} />
      <Panel className="p-6"><EventForm event={event} library={library} /></Panel>
    </div>
  );
}
