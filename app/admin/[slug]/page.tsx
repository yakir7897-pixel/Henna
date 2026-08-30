import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventWithRsvpsBySlug } from "@/lib/invite/get-event";
import { getSiteUrl } from "@/lib/invite/site-url";
import { QuickActions } from "@/components/invite/QuickActions";
import { ResponseBar } from "@/components/invite/ResponseBar";
import { CountdownTimer } from "@/components/invite/CountdownTimer";
import { UsersIcon } from "@/components/invite/icons";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventWithRsvpsBySlug(slug);
  if (!event) notFound();

  const attending = event.rsvps.filter((r) => r.attending);
  const notAttending = event.rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + r.guestCount, 0);

  return (
    <div className="space-y-6">
      <CountdownTimer eventDate={event.eventDate.toISOString()} />

      <ResponseBar attending={attending.length} notAttending={notAttending.length} />

      <div className="flex items-center gap-4 rounded-2xl border border-line/60 bg-surface p-4 shadow-sm">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UsersIcon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-2xl font-bold text-ink">{totalGuests}</p>
          <p className="text-sm text-muted">סה&quot;כ אורחים מגיעים (כולל בני לוויה)</p>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted">תגובות אחרונות</h2>
          {event.rsvps.length > 5 && (
            <Link href={`/admin/${event.slug}/guests`} className="text-xs font-medium text-primary hover:underline">
              לכל הרשימה ←
            </Link>
          )}
        </div>

        {event.rsvps.length === 0 ? (
          <p className="mt-2 rounded-2xl border border-dashed border-line bg-surface p-6 text-center text-sm text-muted">
            עדיין לא התקבלו אישורי הגעה — שתפו את הקישור למעלה כדי להתחיל.
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-line rounded-2xl border border-line/60 bg-surface shadow-sm">
            {event.rsvps.slice(0, 5).map((rsvp) => (
              <li key={rsvp.id} className="flex items-center justify-between p-3 text-sm">
                <span className="font-medium text-ink">{rsvp.guestName}</span>
                <span className={rsvp.attending ? "text-success" : "text-danger"}>
                  {rsvp.attending ? `מגיע/ה (${rsvp.guestCount})` : "לא מגיע/ה"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <QuickActions slug={event.slug} siteUrl={getSiteUrl()} />
    </div>
  );
}
