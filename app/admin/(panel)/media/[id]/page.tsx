import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import MediaForm from "@/components/admin/MediaForm";
import { PageHead, Panel } from "@/components/admin/ui";

export default async function EditMedia({ params }: { params: Promise<{ id: string }> }) {
  const media = await db().media.findUnique({ where: { id: (await params).id } });
  if (!media) notFound();
  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Edit media" sub={media.title} />
      <Panel className="p-6"><MediaForm media={media} /></Panel>
    </div>
  );
}
