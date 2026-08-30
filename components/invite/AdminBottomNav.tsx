"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OverviewIcon, GuestsIcon, DesignIcon, EventsIcon, LinkIcon, CheckCircleIcon } from "./icons";

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
        <div className="flex flex-1 items-center justify-around rounded-full bg-primary py-2 shadow-xl">
          {items.map(({ href, label, Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-1 px-2.5 py-1 text-[10px] font-medium">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                    active ? "bg-white text-primary" : "text-white/70"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className={active ? "text-white" : "text-white/70"}>{label}</span>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={copyLink}
          aria-label="העתקת קישור ההזמנה"
          className="absolute -top-9 left-1 flex h-14 w-14 items-center justify-center rounded-full bg-primary-dark text-white shadow-lg transition hover:scale-105"
        >
          {copied ? <CheckCircleIcon className="h-6 w-6" /> : <LinkIcon className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
