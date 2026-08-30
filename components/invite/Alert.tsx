import type { ReactNode } from "react";
import { CheckCircleIcon, WarningIcon, XCircleIcon } from "./icons";

type Tone = "success" | "danger" | "warning";

const STYLES: Record<Tone, { bg: string; text: string; icon: ReactNode }> = {
  success: { bg: "bg-success-bg", text: "text-success", icon: <CheckCircleIcon className="h-5 w-5" /> },
  danger: { bg: "bg-danger-bg", text: "text-danger", icon: <XCircleIcon className="h-5 w-5" /> },
  warning: { bg: "bg-amber-100", text: "text-amber-700", icon: <WarningIcon className="h-5 w-5" /> },
};

export function Alert({ tone, children }: { tone: Tone; children: ReactNode }) {
  const style = STYLES[tone];
  return (
    <div className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-sm ${style.bg} ${style.text}`}>
      <span className="mt-0.5 shrink-0">{style.icon}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
