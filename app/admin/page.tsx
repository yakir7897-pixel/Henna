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
        <h1 className="text-2xl font-bold text-neutral-900">אישורי הגעה</h1>
        <p className="mt-1 text-sm text-neutral-600">ניהול אירועים, קישורי הזמנה ורשימות אורחים.</p>
      </div>

      <section className="rounded-lg border border-neutral-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">אירוע חדש</h2>
        <NewEventForm />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-neutral-900">האירועים שלי</h2>
        {events.length === 0 ? (
          <p className="text-sm text-neutral-500">עדיין לא נוצרו אירועים.</p>
        ) : (
          <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
            {events.map((event) => (
              <li key={event.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-medium text-neutral-900">{event.title}</p>
                  <p className="text-sm text-neutral-500">
                    {new Date(event.eventDate).toLocaleString("he-IL")} · {event._count.rsvps} אישורים
                  </p>
                </div>
                <Link
                  href={`/admin/${event.slug}`}
                  className="rounded px-3 py-1.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: "#1f3a5f" }}
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
