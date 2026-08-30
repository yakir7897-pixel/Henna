"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
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
    return <div className="h-16" />;
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
    <div className="py-2">
      <div className="flex items-center justify-between px-1">
        <div dir="ltr" className="flex items-baseline gap-1 font-mono text-sm text-muted">
          <span>{pad(days)}</span>:<span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:<span>{pad(seconds)}</span>
        </div>
        <div className="text-4xl font-bold text-primary">{days}</div>
      </div>
      <p className="mt-1 text-center text-xs text-muted">ימים · שעות · דקות · שניות לאירוע</p>
    </div>
  );
}
