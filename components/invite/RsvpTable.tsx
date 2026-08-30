"use client";

import { useTransition } from "react";
import type { Rsvp } from "@prisma/client";
import { deleteRsvp } from "@/app/admin/[slug]/actions";

export function RsvpTable({ rsvps, slug }: { rsvps: Rsvp[]; slug: string }) {
  const [isPending, startTransition] = useTransition();

  if (rsvps.length === 0) {
    return <p className="text-sm text-neutral-500">עדיין לא התקבלו אישורי הגעה.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
      <table className="w-full text-sm" dir="rtl">
        <thead className="bg-neutral-50 text-right text-xs text-neutral-500">
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
        <tbody className="divide-y divide-neutral-100">
          {rsvps.map((rsvp) => (
            <tr key={rsvp.id}>
              <td className="p-3 font-medium text-neutral-900">{rsvp.guestName}</td>
              <td className="p-3 text-neutral-600" dir="ltr">
                {rsvp.phone}
              </td>
              <td className="p-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    rsvp.attending ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {rsvp.attending ? "מגיע/ה" : "לא מגיע/ה"}
                </span>
              </td>
              <td className="p-3">{rsvp.attending ? rsvp.guestCount : "-"}</td>
              <td className="p-3 text-neutral-600">{rsvp.note || "-"}</td>
              <td className="p-3 text-neutral-500">{new Date(rsvp.createdAt).toLocaleString("he-IL")}</td>
              <td className="p-3">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => startTransition(() => deleteRsvp(rsvp.id, slug))}
                  className="text-xs text-red-600 hover:underline disabled:opacity-60"
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
