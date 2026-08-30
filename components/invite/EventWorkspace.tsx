"use client";

import { useState } from "react";
import type { Event, Rsvp } from "@prisma/client";
import { InviteLinkBox } from "./InviteLinkBox";
import { RsvpTable } from "./RsvpTable";
import { EditEventForm } from "./EditEventForm";

type Tab = "overview" | "guests" | "design";

export function EventWorkspace({ event }: { event: Event & { rsvps: Rsvp[] } }) {
  const [tab, setTab] = useState<Tab>("overview");

  const attending = event.rsvps.filter((r) => r.attending);
  const notAttending = event.rsvps.filter((r) => !r.attending);
  const totalGuests = attending.reduce((sum, r) => sum + r.guestCount, 0);

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "overview", label: "סקירה" },
    { id: "guests", label: "אורחים", badge: event.rsvps.length || undefined },
    { id: "design", label: "עיצוב ההזמנה" },
  ];

  return (
    <div>
      <div className="mb-6 flex w-fit gap-1 rounded-full bg-line/50 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === t.id ? "bg-primary text-white shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
            {t.badge !== undefined && <span className="mr-1.5 opacity-80">({t.badge})</span>}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <InviteLinkBox slug={event.slug} />
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="אישרו הגעה" value={attending.length} tone="success" />
            <StatCard label='סה"כ מגיעים' value={totalGuests} tone="primary" />
            <StatCard label="לא מגיעים" value={notAttending.length} tone="danger" />
          </section>
        </div>
      )}

      {tab === "guests" && <RsvpTable rsvps={event.rsvps} slug={event.slug} />}

      {tab === "design" && (
        <section className="rounded-xl border border-line bg-surface p-5">
          <EditEventForm event={event} />
        </section>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "success" | "primary" | "danger";
}) {
  const toneClass = {
    success: "text-success",
    primary: "text-primary",
    danger: "text-danger",
  }[tone];

  return (
    <div className="rounded-xl border border-line bg-surface p-5 text-center">
      <p className={`text-3xl font-bold ${toneClass}`}>{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
