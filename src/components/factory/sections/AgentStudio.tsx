import { FileText, ImageIcon, Film, Mic2, Scissors, Send, Plus } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const NODES = [
  { id: "script", label: "Script Writer", icon: FileText, x: 5, y: 25, color: "from-violet to-fuchsia-400" },
  { id: "image", label: "Image Agent", icon: ImageIcon, x: 25, y: 10, color: "from-cyan to-indigo-400" },
  { id: "video", label: "Video Agent", icon: Film, x: 45, y: 40, color: "from-emerald-400 to-cyan" },
  { id: "voice", label: "Voice Agent", icon: Mic2, x: 25, y: 65, color: "from-amber-400 to-pink-400" },
  { id: "edit", label: "Editor Agent", icon: Scissors, x: 65, y: 25, color: "from-violet to-cyan" },
  { id: "pub", label: "Publishing", icon: Send, x: 85, y: 55, color: "from-pink-500 to-violet" },
];
const EDGES: [string, string][] = [
  ["script", "image"],
  ["script", "voice"],
  ["image", "video"],
  ["voice", "video"],
  ["video", "edit"],
  ["edit", "pub"],
];

export function AgentStudio() {
  const pos: Record<string, { x: number; y: number }> = Object.fromEntries(
    NODES.map((n) => [n.id, { x: n.x, y: n.y }]),
  );
  return (
    <section>
      <SectionHeader
        title="Agent studio"
        subtitle="Visual orchestration · drag & drop · node based"
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Plus className="h-3.5 w-3.5" /> New agent
          </button>
        }
      />
      <div className="glass relative mt-3 h-[420px] overflow-hidden rounded-2xl">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(1 0 0 / 0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.7 0.22 295)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => {
            const p1 = pos[a];
            const p2 = pos[b];
            const mx = (p1.x + p2.x) / 2;
            return (
              <path
                key={i}
                d={`M ${p1.x} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x} ${p2.y}`}
                stroke="url(#edge)"
                strokeWidth="0.3"
                fill="none"
                strokeDasharray="0.6 0.6"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-2.4" dur="1.5s" repeatCount="indefinite" />
              </path>
            );
          })}
        </svg>

        {NODES.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="glass-strong group flex w-44 items-center gap-2 rounded-xl border border-border p-2.5 transition hover:border-violet/40">
                <span className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${n.color}`}>
                  <Icon className="h-4 w-4 text-background" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium">{n.label}</div>
                  <div className="text-[10px] text-muted-foreground">Idle · v2</div>
                </div>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              </div>
            </div>
          );
        })}

        <div className="glass-strong absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-border px-4 py-2 text-xs">
          <div className="text-muted-foreground">Workflow: <span className="text-foreground">YouTube Short · Aria daily</span></div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <span>Runs today · <span className="text-foreground tabular-nums">28</span></span>
            <span>Success · <span className="text-success tabular-nums">96%</span></span>
            <button className="rounded-md bg-aurora px-3 py-1 text-[11px] font-semibold text-background">Run</button>
          </div>
        </div>
      </div>
    </section>
  );
}