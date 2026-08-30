"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function FlipDigit({ value }: { value: string }) {
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
    <div className="relative h-[62px] w-[46px] select-none text-3xl font-bold text-white [perspective:220px] sm:h-[76px] sm:w-[56px] sm:text-4xl">
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-lg bg-[#211d3d]">
        <div className="absolute inset-x-0 top-0 flex h-[200%] items-center justify-center">{displayed}</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-lg bg-[#161329]">
        <div className="absolute inset-x-0 -top-full flex h-[200%] items-center justify-center">{displayed}</div>
      </div>

      {flipping && (
        <>
          <div
            className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-lg bg-[#211d3d] [animation:flipTop_0.6s_ease-in_forwards] [backface-visibility:hidden] [transform-origin:bottom]"
          >
            <div className="absolute inset-x-0 top-0 flex h-[200%] items-center justify-center">{previous}</div>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-lg bg-[#161329] [animation:flipBottom_0.6s_ease-out_forwards] [backface-visibility:hidden] [transform-origin:top]"
          >
            <div className="absolute inset-x-0 -top-full flex h-[200%] items-center justify-center">{displayed}</div>
          </div>
        </>
      )}

      <div className="absolute inset-x-0 top-1/2 h-px bg-black/40" />
    </div>
  );
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const digits = pad(value).split("");
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex gap-0.5">
        {digits.map((d, i) => (
          <FlipDigit key={i} value={d} />
        ))}
      </div>
      <p className="text-[10px] font-medium tracking-wide text-muted">{label}</p>
    </div>
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
    <div dir="ltr" className="flex items-start justify-center gap-3 py-2">
      <FlipUnit value={days} label="ימים" />
      <FlipUnit value={hours} label="שעות" />
      <FlipUnit value={minutes} label="דקות" />
      <FlipUnit value={seconds} label="שניות" />
    </div>
  );
}
