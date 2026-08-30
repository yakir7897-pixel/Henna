import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/invite/get-event";
import { AdminBottomNav } from "@/components/invite/AdminBottomNav";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return { title: event ? `${event.title} | אישורי הגעה` : "אישורי הגעה" };
}

export default async function EventAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">{event.title}</h1>
        <p className="mt-1 text-sm text-muted">
          {new Date(event.eventDate).toLocaleString("he-IL", { timeZone: "UTC" })} · {event.venueName}
        </p>
      </div>

      {children}

      <AdminBottomNav slug={slug} />
    </div>
  );
}
