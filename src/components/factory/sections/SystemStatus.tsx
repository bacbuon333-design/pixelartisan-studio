import { Cpu, Server, ListChecks, Activity, AlertTriangle, Clock } from "lucide-react";

const cards = [
  { label: "GPU Workers Online", value: "12", sub: "8× A100 · 4× L4", icon: Cpu, tone: "success" },
  { label: "Colab Workers", value: "6 / 8", sub: "2 pending Ngrok", icon: Server, tone: "warning" },
  { label: "Queue Jobs", value: "14", sub: "ETA 4m 12s", icon: ListChecks, tone: "warning" },
  { label: "Running Tasks", value: "9", sub: "3 video · 6 image", icon: Activity, tone: "success" },
  { label: "Failed (24h)", value: "3", sub: "Auto-retry enabled", icon: AlertTriangle, tone: "destructive" },
  { label: "Avg Render Time", value: "42s", sub: "Wan 2.2 · 5s clip", icon: Clock, tone: "success" },
];

const TONE: Record<string, string> = {
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

export function SystemStatus() {
  return (
    <section>
      <SectionHeader title="Live system status" subtitle="Realtime health across the render mesh" />
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inset-0 rounded-full ${TONE[c.tone]} opacity-60 animate-ping`} />
                  <span className={`relative h-2 w-2 rounded-full ${TONE[c.tone]}`} />
                </span>
              </div>
              <div className="mt-3 text-xl font-semibold tabular-nums">{c.value}</div>
              <div className="text-[11px] text-muted-foreground">{c.label}</div>
              <div className="mt-2 text-[10px] text-muted-foreground/80">{c.sub}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold tracking-tight md:text-lg">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}