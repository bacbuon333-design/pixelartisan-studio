import { Search, Bell, Zap, Cpu, ListChecks, ChevronDown, Radio } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl md:px-6">
      <div className="relative max-w-xl flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search workers, containers, jobs, agents, logs…"
          className="h-9 w-full rounded-lg border border-border bg-secondary/40 pl-9 pr-16 text-sm placeholder:text-muted-foreground focus:border-violet/40 focus:outline-none focus:ring-2 focus:ring-violet/20"
        />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <StatusPill icon={Radio} label="Tunnels" value="6" tone="success" />
        <StatusPill icon={ListChecks} label="Queue" value="27" tone="warning" />
        <StatusPill icon={Cpu} label="Workers" value="6/8" tone="success" />

        <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-aurora px-3 text-xs font-semibold text-background shadow-[0_0_24px_-6px_oklch(0.72_0.18_295/0.6)] hover:opacity-95">
          <Zap className="h-3.5 w-3.5" />
          Run Auto-Loop
        </button>

        <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet ring-2 ring-background" />
        </button>

        <div className="ml-1 flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary/30 pl-1.5 pr-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet to-cyan text-[11px] font-bold text-background">
            QV
          </div>
          <div className="hidden text-left md:block">
            <div className="text-xs font-medium leading-none">Quang Vinh</div>
            <div className="text-[10px] text-muted-foreground">Studio Owner</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}

function StatusPill({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "success" | "warning" | "destructive";
}) {
  const dot =
    tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-destructive";
  return (
    <div className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-secondary/30 px-2.5 md:flex">
      <span className={`relative h-2 w-2 rounded-full ${dot}`}>
        <span className={`absolute inset-0 rounded-full ${dot} animate-ping opacity-60`} />
      </span>
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-semibold tabular-nums">{value}</span>
    </div>
  );
}