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
    success: "text-success",
    primary: "text-primary",
    danger: "text-danger",
  }[tone];

  return (
    <div className="rounded-xl border border-line bg-surface p-4 text-center">
      <div className="text-xl">{icon}</div>
      <p className={`mt-1 text-3xl font-bold ${toneClass}`}>{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
