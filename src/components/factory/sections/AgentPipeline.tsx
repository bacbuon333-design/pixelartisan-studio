import { Check, Play, Pause, RotateCcw, Loader2, CircleDashed, AlertCircle, Plus, FileText, ImageIcon, Film, Mic2, Scissors, Send, Layers, Sparkles, DollarSign } from "lucide-react";
import type { AgentStep } from "../data/mock";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  prompt: Sparkles,
  script: FileText,
  storyboard: Layers,
  image: ImageIcon,
  video: Film,
  voice: Mic2,
  editor: Scissors,
  publish: Send,
};

const STATUS_STYLE: Record<AgentStep["status"], { icon: React.ComponentType<{ className?: string }>; ring: string; chip: string; dot: string }> = {
  done: { icon: Check, ring: "border-success/40", chip: "bg-success/15 text-success border-success/30", dot: "bg-success" },
  running: { icon: Loader2, ring: "border-violet/60 shadow-[0_0_30px_-8px_oklch(0.7_0.22_295/0.6)]", chip: "bg-violet/15 text-violet border-violet/30", dot: "bg-violet animate-pulse" },
  queued: { icon: CircleDashed, ring: "border-warning/40", chip: "bg-warning/15 text-warning border-warning/30", dot: "bg-warning" },
  error: { icon: AlertCircle, ring: "border-destructive/40", chip: "bg-destructive/15 text-destructive border-destructive/30", dot: "bg-destructive" },
  idle: { icon: CircleDashed, ring: "border-border", chip: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground" },
};

export function AgentPipeline({ pipeline, compact = false }: { pipeline: AgentStep[]; compact?: boolean }) {
  const totalCost = pipeline
    .filter((s) => s.cost !== "—")
    .reduce((acc, s) => acc + parseFloat(s.cost.replace("$", "")), 0)
    .toFixed(3);

  return (
    <div className="space-y-4">
      {!compact && (
        <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-aurora px-3.5 text-xs font-semibold text-background shadow-[0_0_24px_-6px_oklch(0.72_0.18_295/0.6)]">
              <Play className="h-3.5 w-3.5" /> Run workflow
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-secondary/30 px-3 text-xs text-muted-foreground hover:text-foreground">
              <Pause className="h-3.5 w-3.5" /> Pause
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-secondary/30 px-3 text-xs text-muted-foreground hover:text-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Workflow · <span className="text-foreground">TikTok MC AI · Daily 60s</span></span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><DollarSign className="h-3 w-3" />Run cost <span className="font-semibold text-foreground tabular-nums">${totalCost}</span></span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {pipeline.map((step, i) => {
          const Icon = ICONS[step.id] ?? Sparkles;
          const s = STATUS_STYLE[step.status];
          const StatusIcon = s.icon;
          return (
            <div key={step.id} className="relative">
              {i < pipeline.length - 1 && (
                <div className="absolute left-[19px] top-[44px] h-[calc(100%-32px)] w-px bg-border" />
              )}
              <div className={`glass flex items-center gap-3 rounded-xl border p-3 ${s.ring}`}>
                <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-background/60">
                  <Icon className="h-4 w-4" />
                  <span className={`absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full border-2 border-background ${s.dot}`}>
                    <StatusIcon className={`h-2.5 w-2.5 text-background ${step.status === "running" ? "animate-spin" : ""}`} />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">{step.label}</div>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] ${s.chip}`}>
                      {step.status}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{step.model}</div>
                </div>
                {!compact && (
                  <div className="hidden items-center gap-4 text-[11px] text-muted-foreground sm:flex">
                    <div className="text-right">
                      <div className="tabular-nums text-foreground">{step.duration}</div>
                      <div className="text-[10px]">duration</div>
                    </div>
                    <div className="text-right">
                      <div className="tabular-nums text-foreground">{step.cost}</div>
                      <div className="text-[10px]">cost</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!compact && (
        <button className="glass flex w-full items-center justify-center gap-2 rounded-xl border-dashed py-3 text-xs text-muted-foreground hover:text-foreground">
          <Plus className="h-3.5 w-3.5" /> Add agent step
        </button>
      )}
    </div>
  );
}