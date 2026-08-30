"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function FlipDigit({ value, colorClass = "text-white" }: { value: string; colorClass?: string }) {
  const [displayed, setDisplayed] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);

  if (value !== displayed) {
    setPrevious(displayed);
    setDisplayed(value);
    setFlipping(true);
  }

  useEffect(() => {
    if (!flipping) return;
    const id = setTimeout(() => setFlipping(false), 600);
    return () => clearTimeout(id);
  }, [flipping]);

  return (
    <div
      className={`relative h-11 w-[26px] select-none text-lg font-bold [perspective:220px] sm:h-16 sm:w-11 sm:text-2xl ${colorClass}`}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-md bg-flip sm:rounded-t-lg">
        <div className="absolute inset-x-0 top-0 flex h-[200%] items-center justify-center">{displayed}</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-md bg-flip-shade sm:rounded-b-lg">
        <div className="absolute inset-x-0 -top-full flex h-[200%] items-center justify-center">{displayed}</div>
      </div>

      {flipping && (
        <>
          <div
            className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-md bg-flip [animation:flipTop_0.6s_ease-in_forwards] [backface-visibility:hidden] [transform-origin:bottom] sm:rounded-t-lg"
          >
            <div className="absolute inset-x-0 top-0 flex h-[200%] items-center justify-center">{previous}</div>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-md bg-flip-shade [animation:flipBottom_0.6s_ease-out_forwards] [backface-visibility:hidden] [transform-origin:top] sm:rounded-b-lg"
          >
            <div className="absolute inset-x-0 -top-full flex h-[200%] items-center justify-center">{displayed}</div>
          </div>
        </>
      )}

      <div className="absolute inset-x-0 top-1/2 h-px bg-black/30" />
    </div>
  );
}

function FlipUnit({ value, label, colorClass }: { value: number; label: string; colorClass?: string }) {
  const digits = pad(value).split("");
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
      <div className="flex gap-[3px] sm:gap-1">
        {digits.map((d, i) => (
          <FlipDigit key={i} value={d} colorClass={colorClass} />
        ))}
      </div>
      <p className="text-[9px] font-medium tracking-wide text-muted sm:text-[10px]">{label}</p>
    </div>
  );
}

function UnitDivider() {
  return (
    <div className="mt-0.5 h-10 w-px shrink-0 self-start bg-primary/45 shadow-[0_0_6px_1px_rgba(18,168,131,0.6)] sm:h-14" />
  );
}

export function CountdownTimer({ eventDate }: { eventDate: string }) {
  const target = new Date(eventDate).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setNow(Date.now()));
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  if (now === null) {
    return <div className="h-24" />;
  }

  if (target <= now) {
    return <p className="py-3 text-center text-lg font-bold text-primary">האירוע כבר כאן! 🎉</p>;
  }

  const totalSeconds = Math.floor((target - now) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="rounded-2xl border border-primary/30 bg-surface/60 px-3 py-3 shadow-[0_0_18px_-4px_rgba(18,168,131,0.6)]">
      <div dir="ltr" className="flex items-start justify-center gap-1.5 sm:gap-3">
        <FlipUnit value={days} label="ימים" colorClass="text-flip-accent" />
        <UnitDivider />
        <FlipUnit value={hours} label="שעות" />
        <UnitDivider />
        <FlipUnit value={minutes} label="דקות" />
        <UnitDivider />
        <FlipUnit value={seconds} label="שניות" />
      </div>
    </div>
  );
}
