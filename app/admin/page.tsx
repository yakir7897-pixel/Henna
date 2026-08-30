import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { NewEventForm } from "@/components/invite/NewEventForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "אישורי הגעה" };

export default async function AdminIndexPage() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { rsvps: true } } },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink">אישורי הגעה</h1>
        <p className="mt-1 text-sm text-muted">ניהול אירועים, קישורי הזמנה ורשימות אורחים.</p>
      </div>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="mb-4 text-lg font-semibold text-ink">אירוע חדש</h2>
        <NewEventForm />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-ink">האירועים שלי</h2>
        {events.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-surface p-6 text-center text-sm text-muted">
            עדיין לא נוצרו אירועים — צרו אחד למעלה כדי לקבל קישור הזמנה.
          </p>
        ) : (
          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {events.map((event) => (
              <li key={event.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-medium text-ink">{event.title}</p>
                  <p className="text-sm text-muted">
                    {new Date(event.eventDate).toLocaleString("he-IL", { timeZone: "UTC" })} · {event._count.rsvps}{" "}
                    אישורים
                  </p>
                </div>
                <Link
                  href={`/admin/${event.slug}`}
                  className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  ניהול
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
