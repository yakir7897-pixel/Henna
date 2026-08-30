import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditEventForm } from "@/components/invite/EditEventForm";
import { RsvpTable } from "@/components/invite/RsvpTable";
import { InviteLinkBox } from "@/components/invite/InviteLinkBox";

export const dynamic = "force-dynamic";

export default async function AdminEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug },
    include: { rsvps: { orderBy: { createdAt: "desc" } } },
  });
  if (!event) notFound();

  const attending = event.rsvps.filter((r) => r.attending);
  const notAttending = event.rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + r.guestCount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">{event.title}</h1>
        <p className="mt-1 text-sm text-neutral-600">
          {new Date(event.eventDate).toLocaleString("he-IL")} · {event.venueName}
        </p>
      </div>

      <InviteLinkBox slug={event.slug} />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="אישרו הגעה" value={attending.length} />
        <StatCard label='סה"כ מגיעים' value={totalGuests} />
        <StatCard label="לא מגיעים" value={notAttending.length} />
      </section>

      <RsvpTable rsvps={event.rsvps} slug={event.slug} />

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">עריכת פרטי האירוע</h2>
        <EditEventForm event={event} />
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 text-center">
      <p className="text-2xl font-bold" style={{ color: "#1f3a5f" }}>
        {value}
      </p>
      <p className="mt-1 text-sm text-neutral-600">{label}</p>
    </div>
  );
}
