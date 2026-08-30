"use client";

import { useState, useTransition } from "react";
import { submitRsvp } from "@/app/i/[slug]/actions";
import { toEntranceEffect } from "@/lib/invite/types";

export type InviteEventData = {
  id: string;
  slug: string;
  title: string;
  hostNames: string | null;
  eventDate: string;
  venueName: string;
  address: string | null;
  mapsUrl: string | null;
  description: string | null;
  coverImageUrl: string | null;
  loadingImageUrl: string | null;
  entranceEffect: string;
};

type Step = "loading" | "invite" | "form" | "thanks";

const ENTRANCE_ANIMATION: Record<string, string> = {
  fade: "[animation:fadeIn_0.8s_ease-out]",
  slideUp: "[animation:slideUp_0.7s_ease-out]",
  zoomIn: "[animation:zoomIn_0.7s_ease-out]",
  flip: "[animation:flipIn_0.8s_ease-out]",
};

export function InviteFlow({ event }: { event: InviteEventData }) {
  const [step, setStep] = useState<Step>(event.loadingImageUrl ? "loading" : "invite");
  const entranceAnimation = ENTRANCE_ANIMATION[toEntranceEffect(event.entranceEffect)];
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const eventDate = new Date(event.eventDate);
  const dateLabel = eventDate.toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeLabel = eventDate.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (attending === null) {
      setError("נא לבחור אם מגיעים");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await submitRsvp({
        eventId: event.id,
        guestName,
        phone,
        attending,
        guestCount,
        note,
      });
      if (result.ok) {
        setStep("thanks");
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10 text-center text-white">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center [animation:kenBurns_20s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage: event.coverImageUrl
            ? `url(${event.coverImageUrl})`
            : "linear-gradient(135deg, #1f3a5f, #0f1c2e)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      <div className="w-full max-w-md">
        {step === "loading" && (
          <div className="[animation:fadeIn_0.5s_ease-out]">
            {event.loadingImageUrl && (
              <img
                src={event.loadingImageUrl}
                alt=""
                className="mx-auto mb-6 h-40 w-40 rounded-full border-2 border-white/40 object-cover shadow-lg"
              />
            )}
            <p className="text-sm uppercase tracking-widest text-white/70">הזמנה מיוחדת</p>
            <h1 className="mt-3 text-2xl font-bold">{event.title}</h1>
            <button
              type="button"
              onClick={() => setStep("invite")}
              className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-bold text-neutral-900 shadow-lg transition hover:scale-105"
            >
              פתיחת ההזמנה
            </button>
          </div>
        )}

        {step === "invite" && (
          <div className={entranceAnimation}>
            <p className="text-sm uppercase tracking-widest text-white/70">אתם מוזמנים</p>
            {event.hostNames && <h1 className="mt-3 text-3xl font-bold">{event.hostNames}</h1>}
            <h2 className="mt-2 text-xl font-semibold">{event.title}</h2>
            {event.description && (
              <p className="mt-4 text-sm leading-relaxed text-white/90">{event.description}</p>
            )}

            <div className="mt-6 space-y-1 text-sm text-white/90">
              <p>{dateLabel}</p>
              <p>בשעה {timeLabel}</p>
              <p>
                {event.venueName}
                {event.address ? ` · ${event.address}` : ""}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              {event.mapsUrl && (
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 underline underline-offset-4 hover:text-white"
                >
                  ניווט למקום
                </a>
              )}
              <button
                type="button"
                onClick={() => setStep("form")}
                className="mt-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-neutral-900 shadow-lg transition hover:scale-105"
              >
                לאישור הגעה
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <form
            dir="rtl"
            onSubmit={handleSubmit}
            className="[animation:fadeIn_0.5s_ease-out] space-y-4 rounded-2xl bg-white/95 p-6 text-right text-neutral-900 shadow-xl"
          >
            <h2 className="text-center text-lg font-bold">אישור הגעה</h2>

            <div>
              <label className="block text-sm font-medium text-neutral-700">שם מלא</label>
              <input
                className="w-full rounded border border-neutral-300 p-2 text-sm"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">טלפון</label>
              <input
                dir="ltr"
                type="tel"
                className="w-full rounded border border-neutral-300 p-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-neutral-700">האם תגיעו?</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${
                    attending === true
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-neutral-300 text-neutral-600"
                  }`}
                >
                  מגיע/ה בשמחה
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${
                    attending === false
                      ? "border-red-600 bg-red-50 text-red-700"
                      : "border-neutral-300 text-neutral-600"
                  }`}
                >
                  לא אוכל להגיע
                </button>
              </div>
            </div>

            {attending && (
              <div>
                <label className="block text-sm font-medium text-neutral-700">כמה מגיעים בסה&quot;כ?</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  className="w-full rounded border border-neutral-300 p-2 text-sm"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700">הערה / ברכה (לא חובה)</label>
              <textarea
                className="w-full rounded border border-neutral-300 p-2 text-sm"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
              style={{ backgroundColor: "#1f3a5f" }}
            >
              {isPending ? "שולח..." : "שליחת אישור"}
            </button>
          </form>
        )}

        {step === "thanks" && (
          <div className="[animation:fadeIn_0.6s_ease-out] space-y-4 rounded-2xl bg-white/95 p-8 text-neutral-900 shadow-xl">
            <div className="text-5xl">{attending ? "🎉" : "💌"}</div>
            <h2 className="text-xl font-bold">{attending ? "תודה שאישרתם!" : "תודה על התשובה"}</h2>
            <p className="text-sm text-neutral-600">
              {attending
                ? `נרשמת בתור ${guestName}, ${guestCount} מגיעים. מחכים לראותכם!`
                : `נרשם ש${guestName} לא תוכל/י להגיע הפעם. תודה שעדכנת!`}
            </p>
            <button
              type="button"
              onClick={() => setStep("form")}
              className="text-sm font-medium underline underline-offset-4"
              style={{ color: "#1f3a5f" }}
            >
              לתקן את התשובה
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
