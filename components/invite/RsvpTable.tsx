"use client";

import { useTransition } from "react";
import type { Rsvp } from "@prisma/client";
import { deleteRsvp } from "@/app/admin/[slug]/actions";
import { CheckCircleIcon, XCircleIcon } from "./icons";

export function RsvpTable({ rsvps, slug }: { rsvps: Rsvp[]; slug: string }) {
  const [isPending, startTransition] = useTransition();

  if (rsvps.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-line bg-surface p-6 text-center text-sm text-muted">
        עדיין לא התקבלו אישורי הגעה — ברגע שאורחים ימלאו את הטופס הם יופיעו כאן.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full text-sm" dir="rtl">
        <thead className="bg-app text-right text-xs text-muted">
          <tr>
            <th className="p-3">שם</th>
            <th className="p-3">טלפון</th>
            <th className="p-3">סטטוס</th>
            <th className="p-3">מס&apos; אורחים</th>
            <th className="p-3">הערה</th>
            <th className="p-3">נשלח</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rsvps.map((rsvp) => (
            <tr key={rsvp.id}>
              <td className="p-3 font-medium text-ink">{rsvp.guestName}</td>
              <td className="p-3 text-muted" dir="ltr">
                {rsvp.phone}
              </td>
              <td className="p-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    rsvp.attending ? "bg-success-bg text-success" : "bg-danger-bg text-danger"
                  }`}
                >
                  {rsvp.attending ? <CheckCircleIcon className="h-3.5 w-3.5" /> : <XCircleIcon className="h-3.5 w-3.5" />}
                  {rsvp.attending ? "מגיע/ה" : "לא מגיע/ה"}
                </span>
              </td>
              <td className="p-3">{rsvp.attending ? rsvp.guestCount : "-"}</td>
              <td className="p-3 text-muted">{rsvp.note || "-"}</td>
              <td className="p-3 text-muted">{new Date(rsvp.createdAt).toLocaleString("he-IL")}</td>
              <td className="p-3">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => startTransition(() => deleteRsvp(rsvp.id, slug))}
                  className="text-xs text-danger hover:underline disabled:opacity-60"
                >
                  מחיקה
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
