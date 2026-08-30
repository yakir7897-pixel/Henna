"use client";

import { useState } from "react";

export function InviteLinkBox({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const path = `/i/${slug}`;

  function fullLink() {
    return `${window.location.origin}${path}`;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface p-4">
      <span className="text-sm text-muted">קישור ההזמנה:</span>
      <code className="rounded bg-app px-2 py-1 text-xs text-ink" dir="ltr">
        {path}
      </code>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(fullLink());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="rounded-full border border-line px-3 py-1 text-xs hover:bg-app"
      >
        {copied ? "הועתק!" : "העתק קישור"}
      </button>
      <button
        type="button"
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(fullLink())}`, "_blank", "noopener,noreferrer")}
        className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
      >
        שיתוף בוואטסאפ
      </button>
      <a
        href={`/admin/${slug}/export`}
        className="rounded-full border border-line px-3 py-1 text-xs hover:bg-app"
      >
        ייצוא לאקסל
      </a>
    </div>
  );
}
