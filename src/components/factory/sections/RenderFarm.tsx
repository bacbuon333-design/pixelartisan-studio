import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { SectionHeader } from "./SystemStatus";

const WORKERS = [
  { name: "colab-tokyo-03", gpu: "A100 80G", vram: "72 / 80 GB", region: "Tokyo", status: "Busy", job: "Wan 2.2 · job_9F2A", queue: 4 },
  { name: "colab-sg-01", gpu: "A100 40G", vram: "31 / 40 GB", region: "Singapore", status: "Busy", job: "FLUX · job_9F2B", queue: 2 },
  { name: "colab-fra-02", gpu: "L4 24G", vram: "20 / 24 GB", region: "Frankfurt", status: "Busy", job: "LoRA · Aria v3", queue: 1 },
  { name: "colab-us-04", gpu: "A100 40G", vram: "—", region: "Iowa", status: "Offline", job: "—", queue: 0 },
  { name: "colab-ny-05", gpu: "L4 24G", vram: "0 / 24 GB", region: "Virginia", status: "Idle", job: "—", queue: 0 },
  { name: "colab-sea-06", gpu: "T4 16G", vram: "9 / 16 GB", region: "Seattle", status: "Busy", job: "XTTS · job_9F2D", queue: 3 },
];

const usage = Array.from({ length: 24 }).map((_, i) => ({
  h: `${i}`,
  gpu: 35 + Math.round(Math.sin(i / 2) * 18 + Math.random() * 12 + 28),
  vram: 30 + Math.round(Math.cos(i / 3) * 15 + Math.random() * 10 + 22),
}));
const throughput = Array.from({ length: 12 }).map((_, i) => ({
  m: `${i * 5}m`,
  ok: 8 + Math.round(Math.random() * 16),
  err: Math.round(Math.random() * 3),
}));

export function RenderFarm() {
  return (
    <section>
      <SectionHeader title="Multi-Colab render farm" subtitle="Realtime GPU mesh · auto-failover" />
      <div className="mt-3 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass overflow-hidden rounded-2xl">
          <div className="grid grid-cols-[1.4fr_1fr_1.1fr_1fr_0.9fr_1.6fr_0.7fr] gap-3 border-b border-border bg-background/30 px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <div>Worker</div>
            <div>GPU</div>
            <div>VRAM</div>
            <div>Region</div>
            <div>Status</div>
            <div>Current job</div>
            <div className="text-right">Queue</div>
          </div>
          {WORKERS.map((w) => (
            <div key={w.name} className="grid grid-cols-[1.4fr_1fr_1.1fr_1fr_0.9fr_1.6fr_0.7fr] items-center gap-3 border-b border-border/60 px-4 py-3 text-xs last:border-0 hover:bg-background/40">
              <div className="font-mono text-[11px]">{w.name}</div>
              <div className="text-muted-foreground">{w.gpu}</div>
              <div className="tabular-nums text-muted-foreground">{w.vram}</div>
              <div className="text-muted-foreground">{w.region}</div>
              <div>
                <WorkerStatus status={w.status} />
              </div>
              <div className="truncate text-muted-foreground">{w.job}</div>
              <div className="text-right tabular-nums">{w.queue}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4">
          <ChartCard title="GPU & VRAM usage" hint="Last 24h · %">
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={usage} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.22 295)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.7 0.22 295)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="h" tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="gpu" stroke="oklch(0.7 0.22 295)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="vram" stroke="oklch(0.78 0.15 200)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Render throughput" hint="Jobs / 5m">
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={throughput} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="m" tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="ok" stackId="a" fill="oklch(0.72 0.18 155)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="err" stackId="a" fill="oklch(0.65 0.24 25)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

const tooltipStyle = {
  background: "oklch(0.13 0.015 270)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 8,
  fontSize: 11,
};

function WorkerStatus({ status }: { status: string }) {
  const map: Record<string, string> = {
    Busy: "bg-warning/15 text-warning border-warning/30",
    Idle: "bg-success/15 text-success border-success/30",
    Offline: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${map[status]}`}>
      <span className="h-1 w-1 rounded-full bg-current" /> {status}
    </span>
  );
}

function ChartCard({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{hint}</div>
      </div>
      {children}
    </div>
  );
}