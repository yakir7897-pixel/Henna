import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EventWorkspace } from "@/components/invite/EventWorkspace";

export const dynamic = "force-dynamic";

export default async function AdminEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });
  if (!event) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">{event.title}</h1>
        <p className="mt-1 text-sm text-muted">
          {new Date(event.eventDate).toLocaleString("he-IL", { timeZone: "UTC" })} · {event.venueName}
        </p>
      </div>

      <EventWorkspace event={event} />
    </div>
  );
}
