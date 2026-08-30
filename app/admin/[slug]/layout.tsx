import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/invite/get-event";
import { getSiteUrl } from "@/lib/invite/site-url";
import { toHebrewDateString } from "@/lib/invite/hebrew-date";
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
    <div className="pb-28">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">{event.title}</h1>
        <p className="mt-1 text-sm text-muted">
          {new Date(event.eventDate).toLocaleString("he-IL", { timeZone: "UTC" })} · {event.venueName}
        </p>
        <p className="text-xs text-muted">{toHebrewDateString(event.eventDate)}</p>
      </div>

      {children}

      <AdminBottomNav slug={slug} siteUrl={getSiteUrl()} />
    </div>
  );
}
