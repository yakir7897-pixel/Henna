"use client";

import { useState, useTransition } from "react";
import type { Event } from "@prisma/client";
import { updateEvent } from "@/app/admin/[slug]/actions";
import { toDatetimeLocal, toEventInput, type EventFormValues } from "@/lib/invite/types";
import { EventFormFields } from "./EventFormFields";

function toFormValues(event: Event): EventFormValues {
  return {
    title: event.title,
    hostNames: event.hostNames ?? "",
    eventDate: toDatetimeLocal(new Date(event.eventDate)),
    venueName: event.venueName,
    address: event.address ?? "",
    mapsUrl: event.mapsUrl ?? "",
    description: event.description ?? "",
    coverImageUrl: event.coverImageUrl ?? "",
  };
}

export function EditEventForm({ event }: { event: Event }) {
  const [values, setValues] = useState(() => toFormValues(event));
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await updateEvent(event.id, toEventInput(values));
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    });
  }

  return (
    <form dir="rtl" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <EventFormFields values={values} onChange={(patch) => setValues((v) => ({ ...v, ...patch }))} />
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          style={{ backgroundColor: "#1f3a5f" }}
        >
          {isPending ? "שומר..." : saved ? "נשמר!" : "שמירה"}
        </button>
      </div>
    </form>
  );
}
