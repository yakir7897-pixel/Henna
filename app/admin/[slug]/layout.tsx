import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/invite/get-event";
import { getSiteUrl } from "@/lib/invite/site-url";
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
    <div className="pb-36">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">RSVP MANAGER</p>
        <h1
          className="mt-1 text-[28px] font-bold leading-tight text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          מערכת ניהול אישורי הגעה
        </h1>
      </div>

      {children}

      <AdminBottomNav slug={slug} siteUrl={getSiteUrl()} />
    </div>
  );
}
