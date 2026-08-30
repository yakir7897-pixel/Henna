import { notFound } from "next/navigation";
import { getEventWithRsvpsBySlug } from "@/lib/invite/get-event";
import { RsvpTable } from "@/components/invite/RsvpTable";

export const dynamic = "force-dynamic";

export default async function AdminGuestsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventWithRsvpsBySlug(slug);
  if (!event) notFound();

  return <RsvpTable rsvps={event.rsvps} slug={event.slug} />;
}
