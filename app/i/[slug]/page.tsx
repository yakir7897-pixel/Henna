import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/invite/get-event";
import { InviteFlow } from "@/components/invite/InviteFlow";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "הזמנה" };

  const title = event.hostNames ? `הזמנה לחינה של ${event.hostNames}` : event.title;
  const description = event.description ?? undefined;
  const imageUrl = event.loadingImageUrl ?? event.coverImageUrl ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
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
        loadingImageUrl: event.loadingImageUrl,
        entranceEffect: event.entranceEffect,
      }}
    />
  );
}
