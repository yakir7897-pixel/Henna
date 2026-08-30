"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function OverviewIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GuestsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M15.5 20c.2-2.3 1.8-4 3.7-4.3" strokeLinecap="round" />
    </svg>
  );
}

function DesignIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <path d="M12 21a9 9 0 1 1 0-18c4 0 8 2.5 8 6.5 0 2-1.5 3.5-3.5 3.5H15c-1 0-1.5.7-1.5 1.5 0 .5.2.8.5 1.2.3.4.5.7.5 1.3 0 1.5-1.2 3-2.5 3Z" />
      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EventsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16" strokeLinecap="round" />
      <path d="M8 3v3M16 3v3" strokeLinecap="round" />
    </svg>
  );
}

export function AdminBottomNav({ slug }: { slug: string }) {
  const pathname = usePathname();

  const items = [
    { href: `/admin/${slug}`, label: "סקירה", Icon: OverviewIcon, exact: true },
    { href: `/admin/${slug}/guests`, label: "אורחים", Icon: GuestsIcon, exact: false },
    { href: `/admin/${slug}/design`, label: "עיצוב", Icon: DesignIcon, exact: false },
    { href: `/admin/events`, label: "אירועים", Icon: EventsIcon, exact: false },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-5xl items-stretch justify-around">
        {items.map(({ href, label, Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition ${
                active ? "text-primary" : "text-muted"
              }`}
            >
              <Icon active={active} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
