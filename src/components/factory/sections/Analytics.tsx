import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const series = Array.from({ length: 14 }).map((_, i) => ({
  d: `D${i + 1}`,
  gen: 800 + Math.round(Math.sin(i / 2) * 220 + i * 30 + Math.random() * 120),
  min: 60 + Math.round(Math.cos(i / 2) * 18 + i * 4),
  cred: 320 + Math.round(i * 22 + Math.random() * 80),
  rev: 1200 + Math.round(i * 110 + Math.random() * 300),
  users: 40 + Math.round(i * 4 + Math.random() * 20),
  util: 55 + Math.round(Math.sin(i / 2) * 18 + Math.random() * 12),
}));

const tooltipStyle = {
  background: "oklch(0.13 0.015 270)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 8,
  fontSize: 11,
};

export function Analytics() {
  return (
    <section>
      <SectionHeader title="Analytics" subtitle="Last 14 days · pipeline economics" />
      <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Daily generations" value="42.6K" delta="+18.4%">
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.22 295)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.7 0.22 295)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area dataKey="gen" stroke="oklch(0.7 0.22 295)" fill="url(#ag)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Video minutes produced" value="2,184m" delta="+24.2%">
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line dataKey="min" stroke="oklch(0.78 0.15 200)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Worker utilization" value="74%" delta="+6.1%">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="util" fill="oklch(0.72 0.18 155)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Credit consumption" value="7,420" delta="+9.8%">
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="cc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.8 0.17 75)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.8 0.17 75)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area dataKey="cred" stroke="oklch(0.8 0.17 75)" fill="url(#cc)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Revenue (MRR)" value="$28,420" delta="+32.1%">
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line dataKey="rev" stroke="oklch(0.68 0.22 340)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="User growth" value="1,284" delta="+12.4%">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={series} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.04)" vertical={false} />
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "oklch(0.62 0.025 270)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="users" fill="oklch(0.78 0.15 200)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </section>
  );
}

function Card({
  title,
  value,
  delta,
  children,
}: {
  title: string;
  value: string;
  delta: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground">{title}</div>
          <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
          <TrendingUp className="h-3 w-3" /> {delta}
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}