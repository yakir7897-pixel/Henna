"use client";

import { useState } from "react";

export function InviteLinkBox({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const path = `/i/${slug}`;

  function fullLink() {
    return `${window.location.origin}${path}`;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-neutral-200 bg-white p-4">
      <span className="text-sm text-neutral-600">קישור ההזמנה:</span>
      <code className="rounded bg-neutral-100 px-2 py-1 text-xs" dir="ltr">
        {path}
      </code>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(fullLink());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="rounded border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-50"
      >
        {copied ? "הועתק!" : "העתק קישור"}
      </button>
      <button
        type="button"
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(fullLink())}`, "_blank", "noopener,noreferrer")}
        className="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
      >
        שיתוף בוואטסאפ
      </button>
      <a
        href={`/admin/${slug}/export`}
        className="rounded border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-50"
      >
        ייצוא לאקסל
      </a>
    </div>
  );
}
