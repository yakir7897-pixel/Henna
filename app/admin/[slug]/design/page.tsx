import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/invite/get-event";
import { EditEventForm } from "@/components/invite/EditEventForm";

export const dynamic = "force-dynamic";

export default async function AdminDesignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <EditEventForm event={event} />
    </section>
  );
}
