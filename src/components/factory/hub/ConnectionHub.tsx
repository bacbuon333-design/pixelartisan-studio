import { useState } from "react";
import { WORKERS, GATEWAY_METRICS, type Worker, type WorkerStatus } from "../data/hub";
import { Activity, Cpu, Thermometer, Zap, Radio, Globe2, HardDrive, Server, AlertTriangle, Plus, Filter } from "lucide-react";

const STATUS_TONE: Record<WorkerStatus, { dot: string; ring: string; label: string }> = {
  online:    { dot: "bg-phosphor",   ring: "ring-phosphor/40",   label: "ONLINE" },
  warming:   { dot: "bg-amber-crt",  ring: "ring-amber-crt/40",  label: "WARMING" },
  throttled: { dot: "bg-warning",    ring: "ring-warning/40",    label: "THROTTLED" },
  offline:   { dot: "bg-muted-foreground/40", ring: "ring-border", label: "OFFLINE" },
  error:     { dot: "bg-destructive",ring: "ring-destructive/40",label: "ERROR" },
};

const PLATFORM_GRAD: Record<string, string> = {
  Colab:  "from-amber-400 to-pink-400",
  Local:  "from-violet to-cyan",
  RunPod: "from-cyan to-emerald-400",
  Lambda: "from-fuchsia-500 to-violet",
};

export function ConnectionHub() {
  const [filter, setFilter] = useState<"all" | "Colab" | "Local" | "RunPod">("all");
  const filtered = WORKERS.filter((w) => filter === "all" || w.platform === filter);

  return (
    <div className="space-y-6">
      <GatewayMetrics />
      <section className="glass relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Worker Map</div>
            <div className="mt-0.5 text-base font-semibold tracking-tight">Distributed GPU Fleet</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-background/40 p-1">
              {(["all", "Colab", "Local", "RunPod"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilter(p)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                    filter === p ? "bg-aurora text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p === "all" ? "All" : p}
                </button>
              ))}
            </div>
            <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background/40 px-2.5 text-xs text-muted-foreground hover:text-foreground">
              <Filter className="h-3.5 w-3.5" /> Role
            </button>
            <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-aurora px-3 text-xs font-semibold text-background">
              <Plus className="h-3.5 w-3.5" /> Add Worker
            </button>
          </div>
        </div>
        <div className="relative grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((w) => (
            <WorkerCard key={w.id} w={w} />
          ))}
        </div>
      </section>
    </div>
  );
}

function GatewayMetrics() {
  const m = GATEWAY_METRICS;
  const cards = [
    { label: "Workers Online", value: `${m.workersOnline}/${m.workersTotal}`, icon: Server, accent: "text-phosphor" },
    { label: "Queue Depth", value: m.queueDepth, icon: Activity, accent: "text-amber-crt" },
    { label: "Throughput", value: `${m.throughput}/h`, icon: Zap, accent: "text-violet" },
    { label: "Ngrok Tunnels", value: m.ngrokTunnels, icon: Radio, accent: "text-cyan" },
    { label: "Sandboxes", value: m.sandboxes, icon: HardDrive, accent: "text-cyan" },
    { label: "Self-Heal Events", value: m.selfHealEvents, icon: AlertTriangle, accent: "text-warning" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="glass relative overflow-hidden rounded-xl p-4">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-aurora opacity-10 blur-2xl" />
            <div className="flex items-center gap-2">
              <Icon className={`h-3.5 w-3.5 ${c.accent}`} />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{c.label}</span>
            </div>
            <div className="mt-2 text-xl font-semibold tabular-nums">{c.value}</div>
          </div>
        );
      })}
    </div>
  );
}

function WorkerCard({ w }: { w: Worker }) {
  const tone = STATUS_TONE[w.status];
  const vramPct = Math.round((w.vramUsed / w.vramTotal) * 100);
  const grad = PLATFORM_GRAD[w.platform];
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-background/40 p-4 transition hover:border-violet/40 hover:bg-background/60">
      <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${grad} opacity-10 blur-3xl transition group-hover:opacity-20`} />
      <div className="relative flex items-start gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${grad}`}>
          <Cpu className="h-4 w-4 text-background" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold tracking-tight">{w.alias}</span>
            <span className="rounded-md border border-border bg-background/60 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
              {w.platform}
            </span>
          </div>
          <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{w.account}</div>
        </div>
        <div className={`flex items-center gap-1.5 rounded-full bg-background/60 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ring-1 ${tone.ring}`}>
          <span className={`relative h-1.5 w-1.5 rounded-full ${tone.dot}`}>
            {w.status === "online" && <span className={`absolute inset-0 rounded-full ${tone.dot} animate-ping opacity-60`} />}
          </span>
          {tone.label}
        </div>
      </div>

      <div className="relative mt-3 rounded-lg border border-border/60 bg-background/40 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-phosphor shadow-[0_0_6px_oklch(0.86_0.22_145)]" />
            <span className="font-mono text-foreground/90">{w.role}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">{w.roleLabel}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] tabular-nums text-muted-foreground">
          <span>{w.gpu}</span>
          <span className="flex items-center gap-1"><Thermometer className="h-3 w-3" />{w.temp}°C</span>
        </div>
      </div>

      <div className="relative mt-3 space-y-2">
        <Bar label="VRAM" value={vramPct} text={`${w.vramUsed.toFixed(1)} / ${w.vramTotal} GB`} />
        <Bar label="GPU"  value={w.utilization} text={`${w.utilization}%`} accent />
      </div>

      <div className="relative mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><Globe2 className="h-3 w-3" />{w.region}</span>
        <span className="font-mono">{w.tunnel}</span>
        <span>{w.latency ? `${w.latency}ms` : "—"}</span>
      </div>
      <div className="relative mt-2 flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{w.jobs} jobs · {w.uptime}</span>
        <button className="text-violet hover:underline">Inspect →</button>
      </div>
    </div>
  );
}

function Bar({ label, value, text, accent }: { label: string; value: number; text: string; accent?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums text-foreground/80">{text}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-background/80">
        <div
          className={`h-full rounded-full ${accent ? "bg-aurora" : "bg-gradient-to-r from-phosphor to-cyan"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}