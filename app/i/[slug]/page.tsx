import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/invite/get-event";
import { InviteFlow } from "@/components/invite/InviteFlow";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return { title: event ? event.title : "הזמנה" };
}

export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <InviteFlow
      event={{
        id: event.id,
        slug: event.slug,
        title: event.title,
        hostNames: event.hostNames,
        eventDate: event.eventDate.toISOString(),
        venueName: event.venueName,
        address: event.address,
        mapsUrl: event.mapsUrl,
        description: event.description,
        coverImageUrl: event.coverImageUrl,
      }}
    />
  );
}
