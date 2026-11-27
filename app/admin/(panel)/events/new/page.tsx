import { db } from "@/lib/db";
import EventForm from "@/components/admin/EventForm";
import { PageHead, Panel } from "@/components/admin/ui";

export default async function NewEvent() {
  const library = await db().media.findMany({ where: { type: "PHOTO" }, select: { url: true, title: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return (
    <div className="flex flex-col gap-6">
      <PageHead title="New event" sub="Fill in the details. Visitors see the summary on the homepage and the full description on the event page." />
      <Panel className="p-6"><EventForm library={library} /></Panel>
    </div>
  );
}
