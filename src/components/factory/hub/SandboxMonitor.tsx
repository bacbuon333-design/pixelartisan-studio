import { CONTAINERS, type Container } from "../data/hub";
import { Container as ContainerIcon, Play, Square, RotateCcw, FileTerminal } from "lucide-react";

export function SandboxMonitor() {
  return (
    <section className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Docker Sandbox</div>
          <h2 className="mt-0.5 text-base font-semibold tracking-tight">Isolated Gemini CLI Profiles & Test Runners</h2>
        </div>
        <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-aurora px-3 text-xs font-semibold text-background">
          <Play className="h-3.5 w-3.5" /> Spin Container
        </button>
      </div>
      <div className="divide-y divide-border">
        {CONTAINERS.map((c) => <Row key={c.id} c={c} />)}
      </div>
    </section>
  );
}

function Row({ c }: { c: Container }) {
  const running = c.status === "running";
  return (
    <div className="grid grid-cols-12 items-center gap-3 px-5 py-3 transition hover:bg-background/40">
      <div className="col-span-4 flex items-center gap-3">
        <div className={`grid h-9 w-9 place-items-center rounded-lg ${running ? "bg-gradient-to-br from-phosphor/30 to-cyan/30" : "bg-secondary"}`}>
          <ContainerIcon className={`h-4 w-4 ${running ? "text-phosphor" : "text-muted-foreground"}`} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{c.name}</div>
          <div className="truncate font-mono text-[10px] text-muted-foreground">{c.image} · {c.profile}</div>
        </div>
      </div>
      <div className="col-span-2">
        <Meter label="CPU" value={c.cpu} text={`${c.cpu}%`} />
      </div>
      <div className="col-span-3">
        <Meter label="MEM" value={(c.mem / c.memTotal) * 100} text={`${c.mem.toFixed(1)} / ${c.memTotal} GB`} />
      </div>
      <div className="col-span-1 text-xs text-muted-foreground">{c.uptime}</div>
      <div className="col-span-1">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
          running ? "bg-phosphor/15 text-phosphor" : "bg-muted text-muted-foreground"
        }`}>{c.status}</span>
      </div>
      <div className="col-span-1 flex items-center justify-end gap-1">
        <IconBtn icon={FileTerminal} />
        <IconBtn icon={RotateCcw} />
        <IconBtn icon={Square} />
      </div>
    </div>
  );
}

function Meter({ label, value, text }: { label: string; value: number; text: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className="tabular-nums text-foreground/80">{text}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-background/80">
        <div className="h-full rounded-full bg-gradient-to-r from-phosphor to-cyan" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}

function IconBtn({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}