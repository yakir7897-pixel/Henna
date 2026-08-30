"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function OverviewIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GuestsIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M15.5 20c.2-2.3 1.8-4 3.7-4.3" strokeLinecap="round" />
    </svg>
  );
}

function DesignIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <path d="M12 21a9 9 0 1 1 0-18c4 0 8 2.5 8 6.5 0 2-1.5 3.5-3.5 3.5H15c-1 0-1.5.7-1.5 1.5 0 .5.2.8.5 1.2.3.4.5.7.5 1.3 0 1.5-1.2 3-2.5 3Z" />
      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EventsIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16" strokeLinecap="round" />
      <path d="M8 3v3M16 3v3" strokeLinecap="round" />
    </svg>
  );
}

export function AdminBottomNav({ slug, siteUrl }: { slug: string; siteUrl?: string }) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  function copyLink() {
    const link = `${siteUrl ?? window.location.origin}/i/${slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const items = [
    { href: `/admin/${slug}`, label: "סקירה", Icon: OverviewIcon, exact: true },
    { href: `/admin/${slug}/guests`, label: "אורחים", Icon: GuestsIcon, exact: false },
    { href: `/admin/${slug}/design`, label: "עיצוב", Icon: DesignIcon, exact: false },
    { href: `/admin/events`, label: "אירועים", Icon: EventsIcon, exact: false },
  ];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
    >
      <div className="relative flex w-full max-w-sm items-center">
        <div className="flex flex-1 items-center justify-around rounded-full bg-ink py-2 shadow-xl">
          {items.map(({ href, label, Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-1 px-2.5 py-1 text-[10px] font-medium">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                    active ? "bg-primary text-white" : "text-white/55"
                  }`}
                >
                  <Icon active={active} />
                </span>
                <span className={active ? "text-white" : "text-white/45"}>{label}</span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={copyLink}
          aria-label="העתקת קישור ההזמנה"
          className="absolute -top-5 left-1 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl text-white shadow-lg transition hover:scale-105"
        >
          {copied ? "✓" : "🔗"}
        </button>
      </div>
    </div>
  );
}
