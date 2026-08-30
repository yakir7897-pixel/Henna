import { CheckCircleIcon, XCircleIcon } from "./icons";

export function ResponseBar({ attending, notAttending }: { attending: number; notAttending: number }) {
  const total = attending + notAttending;

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-line/60 bg-surface p-4 shadow-sm">
        <div className="h-5 w-full rounded-full bg-line" />
        <p className="mt-3 text-center text-sm text-muted">עדיין אין תגובות</p>
      </div>
    );
  }

  const attendingPct = (attending / total) * 100;
  const notAttendingPct = 100 - attendingPct;

  return (
    <div className="rounded-2xl border border-line/60 bg-surface p-4 shadow-sm">
      <p className="text-sm text-muted">
        <span className="font-semibold text-ink">{attending}</span> מתוך {total} שהגיבו אישרו הגעה
      </p>

      <div
        className="mt-3 flex h-5 w-full overflow-hidden rounded-full bg-line"
        role="img"
        aria-label={`${attending} מגיעים, ${notAttending} לא מגיעים`}
      >
        {attending > 0 && <div className="h-full bg-success" style={{ width: `${attendingPct}%` }} />}
        {attending > 0 && notAttending > 0 && <div className="h-full w-[2px] bg-surface" />}
        {notAttending > 0 && <div className="h-full bg-danger" style={{ width: `${notAttendingPct}%` }} />}
      </div>

      <div className="mt-3 flex items-center justify-center gap-6 text-sm">
        <span className="flex items-center gap-1.5 text-ink">
          <CheckCircleIcon className="h-4 w-4 text-success" /> מגיעים ({attending})
        </span>
        <span className="flex items-center gap-1.5 text-ink">
          <XCircleIcon className="h-4 w-4 text-danger" /> לא מגיעים ({notAttending})
        </span>
      </div>
    </div>
  );
}
