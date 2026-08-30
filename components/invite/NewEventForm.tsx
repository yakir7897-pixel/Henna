"use client";

import { useState, useTransition } from "react";
import { createEvent } from "@/app/admin/actions";
import { emptyEventFormValues, toEventInput } from "@/lib/invite/types";
import { EventFormFields } from "./EventFormFields";

export function NewEventForm() {
  const [values, setValues] = useState(emptyEventFormValues());
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const created = await createEvent(toEventInput(values));
      setInviteLink(`${window.location.origin}/i/${created.slug}`);
      setValues(emptyEventFormValues());
    });
  }

  return (
    <div className="space-y-4">
      <form dir="rtl" onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <EventFormFields values={values} onChange={(patch) => setValues((v) => ({ ...v, ...patch }))} />
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            style={{ backgroundColor: "#1f3a5f" }}
          >
            {isPending ? "יוצר..." : "צור אירוע וקבל קישור"}
          </button>
        </div>
      </form>

      {inviteLink && (
        <div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          <p className="font-medium">האירוע נוצר! זה קישור ההזמנה שאפשר לשלוח לאורחים:</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <code className="rounded bg-white px-2 py-1 text-xs" dir="ltr">
              {inviteLink}
            </code>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(inviteLink)}
              className="rounded border border-green-300 px-2 py-1 text-xs hover:bg-green-100"
            >
              העתק קישור
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
