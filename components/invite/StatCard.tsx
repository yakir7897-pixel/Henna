export function StatCard({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: number;
  tone: "success" | "primary" | "danger";
  icon: string;
}) {
  const toneClass = {
    success: "text-success bg-success-bg",
    primary: "text-primary bg-primary/10",
    danger: "text-danger bg-danger-bg",
  }[tone];

  return (
    <div className="rounded-2xl border border-line/60 bg-surface p-4 text-center shadow-sm">
      <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-lg ${toneClass}`}>
        {icon}
      </div>
      <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
