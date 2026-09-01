"use client";

import { useState, useTransition } from "react";
import type { Rsvp } from "@prisma/client";
import { deleteRsvp, updateRsvp } from "@/app/admin/[slug]/actions";
import { CheckCircleIcon, XCircleIcon } from "./icons";

type EditValues = {
  guestName: string;
  phone: string;
  attending: boolean;
  guestCount: number;
  note: string;
};

function toEditValues(rsvp: Rsvp): EditValues {
  return {
    guestName: rsvp.guestName,
    phone: rsvp.phone,
    attending: rsvp.attending,
    guestCount: rsvp.guestCount,
    note: rsvp.note ?? "",
  };
}

export function RsvpTable({ rsvps, slug }: { rsvps: Rsvp[]; slug: string }) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<EditValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (rsvps.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-line bg-surface p-6 text-center text-sm text-muted">
        עדיין לא התקבלו אישורי הגעה — ברגע שאורחים ימלאו את הטופס הם יופיעו כאן.
      </p>
    );
  }

  function startEdit(rsvp: Rsvp) {
    setEditingId(rsvp.id);
    setValues(toEditValues(rsvp));
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setValues(null);
    setError(null);
  }

  function saveEdit(rsvpId: string) {
    if (!values) return;
    setError(null);
    startTransition(async () => {
      const result = await updateRsvp(rsvpId, slug, values);
      if (result.ok) {
        setEditingId(null);
        setValues(null);
      } else {
        setError(result.error);
      }
    });
  }

  const inputClass =
    "w-full min-w-[6rem] rounded-lg border border-line bg-app px-2 py-1 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

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
          {rsvps.map((rsvp) => {
            const editing = editingId === rsvp.id;

            if (editing && values) {
              return (
                <tr key={rsvp.id} className="bg-primary/5">
                  <td className="p-2">
                    <input
                      className={inputClass}
                      value={values.guestName}
                      onChange={(e) => setValues({ ...values, guestName: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      dir="ltr"
                      className={inputClass}
                      value={values.phone}
                      onChange={(e) => setValues({ ...values, phone: e.target.value })}
                    />
                  </td>
                  <td className="p-2">
                    <select
                      className={inputClass}
                      value={values.attending ? "yes" : "no"}
                      onChange={(e) => setValues({ ...values, attending: e.target.value === "yes" })}
                    >
                      <option value="yes">מגיע/ה</option>
                      <option value="no">לא מגיע/ה</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      disabled={!values.attending}
                      className={`${inputClass} disabled:opacity-50`}
                      value={values.guestCount}
                      onChange={(e) => setValues({ ...values, guestCount: Number(e.target.value) })}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className={inputClass}
                      value={values.note}
                      onChange={(e) => setValues({ ...values, note: e.target.value })}
                    />
                  </td>
                  <td className="p-3 text-muted">{new Date(rsvp.createdAt).toLocaleString("he-IL")}</td>
                  <td className="p-2">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => saveEdit(rsvp.id)}
                          className="text-xs font-medium text-primary hover:underline disabled:opacity-60"
                        >
                          שמירה
                        </button>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={cancelEdit}
                          className="text-xs text-muted hover:underline disabled:opacity-60"
                        >
                          ביטול
                        </button>
                      </div>
                      {error && <p className="text-xs text-danger">{error}</p>}
                    </div>
                  </td>
                </tr>
              );
            }

            return (
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
                  <div className="flex gap-3">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => startEdit(rsvp)}
                      className="text-xs font-medium text-primary hover:underline disabled:opacity-60"
                    >
                      עריכה
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => startTransition(() => deleteRsvp(rsvp.id, slug))}
                      className="text-xs text-danger hover:underline disabled:opacity-60"
                    >
                      מחיקה
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
