"use client";

import { useState } from "react";

function ActionButton({
  icon,
  label,
  onClick,
  href,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "flex flex-col items-center gap-1.5 rounded-2xl border border-line/60 bg-surface p-4 text-center shadow-sm transition hover:shadow-md";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-xl">{icon}</span>
        <span className="text-xs font-medium text-ink">{label}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-xl">{icon}</span>
      <span className="text-xs font-medium text-ink">{label}</span>
    </button>
  );
}

export function QuickActions({ slug, siteUrl }: { slug: string; siteUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const path = `/i/${slug}`;

  function fullLink() {
    return `${siteUrl ?? window.location.origin}${path}`;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <ActionButton
        icon="🔗"
        label={copied ? "הועתק!" : "העתקת קישור"}
        onClick={() => {
          navigator.clipboard.writeText(fullLink());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      />
      <ActionButton
        icon="💬"
        label="שיתוף בוואטסאפ"
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(fullLink())}`, "_blank", "noopener,noreferrer")}
      />
      <ActionButton icon="👁️" label="תצוגה מקדימה" href={path} />
      <ActionButton icon="📊" label="ייצוא לאקסל" href={`/admin/${slug}/export`} />
    </div>
  );
}
