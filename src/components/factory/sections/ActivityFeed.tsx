import { CheckCircle2, AlertTriangle, Wand2, Server, User, Film } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const FEED = [
  { icon: Film, color: "text-violet", title: "Wan 2.2 render finished", who: "aria_neon_tokyo_02.mp4", time: "now" },
  { icon: Server, color: "text-cyan", title: "Colab worker connected", who: "colab-sea-06 · T4 16GB", time: "1m" },
  { icon: Wand2, color: "text-success", title: "LoRA training completed", who: "Aria v3 · 4,800 steps", time: "8m" },
  { icon: CheckCircle2, color: "text-success", title: "Workflow run succeeded", who: "YouTube Short · Aria daily", time: "12m" },
  { icon: AlertTriangle, color: "text-destructive", title: "Job failed · auto-retry", who: "LTX 2.3 · job_9F2E", time: "21m" },
  { icon: User, color: "text-muted-foreground", title: "Member invited", who: "minh@studio.io", time: "1h" },
  { icon: Film, color: "text-violet", title: "Video published to TikTok", who: "luna_forest_walk_v3", time: "2h" },
];

export function ActivityFeed() {
  return (
    <section className="glass flex flex-col rounded-2xl p-5">
      <SectionHeader title="Activity" subtitle="Realtime · last 24 hours" />
      <ol className="relative mt-4 space-y-4">
        <span aria-hidden className="absolute left-[14px] top-2 bottom-2 w-px bg-border" />
        {FEED.map((f, i) => {
          const Icon = f.icon;
          return (
            <li key={i} className="relative flex items-start gap-3">
              <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full border border-border bg-background">
                <Icon className={`h-3.5 w-3.5 ${f.color}`} />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="text-xs font-medium">{f.title}</div>
                <div className="truncate text-[11px] text-muted-foreground">{f.who}</div>
              </div>
              <div className="pt-0.5 text-[10px] text-muted-foreground tabular-nums">{f.time}</div>
            </li>
          );
        })}
      </ol>
      <button className="mt-4 w-full rounded-lg border border-border bg-background/40 py-2 text-xs text-muted-foreground hover:text-foreground">
        View full activity log
      </button>
    </section>
  );
}