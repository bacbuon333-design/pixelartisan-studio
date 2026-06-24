import { LANG_NODES, LANG_EDGES } from "../data/hub";
import { Play, Pause, RotateCcw } from "lucide-react";

const STATUS_COLOR: Record<string, string> = {
  done:    "var(--phosphor)",
  running: "var(--violet)",
  idle:    "oklch(1 0 0 / 0.18)",
  error:   "var(--destructive)",
};

export function LangGraphFlow() {
  return (
    <section className="glass relative overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Actor-Critic Loop</div>
          <h2 className="mt-0.5 text-base font-semibold tracking-tight">LangGraph · Self-Healing Pipeline</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 text-xs text-muted-foreground hover:text-foreground">
            <Pause className="h-3.5 w-3.5" /> Pause
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 text-xs text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-aurora px-3 text-xs font-semibold text-background">
            <Play className="h-3.5 w-3.5" /> Run
          </button>
        </div>
      </div>

      <div className="relative h-[420px] grid-bg">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="oklch(0.86 0.22 145 / 0.6)" />
            </marker>
          </defs>
          {LANG_EDGES.map(([from, to], i) => {
            const a = LANG_NODES.find((n) => n.id === from)!;
            const b = LANG_NODES.find((n) => n.id === to)!;
            const active = a.status === "done" || a.status === "running";
            return (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={active ? "oklch(0.86 0.22 145 / 0.55)" : "oklch(1 0 0 / 0.12)"}
                strokeWidth="0.3"
                strokeDasharray="1 0.8"
                markerEnd="url(#arrow)"
                style={active ? { animation: "dash-flow 1.4s linear infinite" } : undefined}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {LANG_NODES.map((n) => (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <div
              className="relative rounded-xl border bg-card/90 p-3 backdrop-blur-md transition"
              style={{
                borderColor: STATUS_COLOR[n.status],
                boxShadow: n.status === "running"
                  ? "0 0 0 1px var(--violet), 0 0 32px -4px var(--violet)"
                  : n.status === "done"
                  ? "0 0 0 1px var(--phosphor), 0 0 24px -8px var(--phosphor)"
                  : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="relative h-2 w-2 rounded-full"
                  style={{ background: STATUS_COLOR[n.status] }}
                >
                  {n.status === "running" && (
                    <span className="absolute inset-0 animate-ping rounded-full opacity-70" style={{ background: STATUS_COLOR[n.status] }} />
                  )}
                </span>
                <span className="text-xs font-semibold tracking-tight">{n.label}</span>
              </div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground">{n.model}</div>
              <div className="mt-2 rounded-md bg-background/60 px-2 py-1 font-mono text-[10px] text-foreground/80">
                {n.meta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}