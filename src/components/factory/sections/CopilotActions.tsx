import { Link } from "@tanstack/react-router";
import { Video, Megaphone, PlaySquare, Package, UserRound, Wand2, ArrowUpRight } from "lucide-react";

const ICONS = {
  tiktok: Video,
  marketing: Megaphone,
  short: PlaySquare,
  product: Package,
  influencer: UserRound,
  custom: Wand2,
} as const;

const ACTIONS: { id: keyof typeof ICONS; label: string; hint: string; gradient: string }[] = [
  { id: "tiktok", label: "TikTok Avatar", hint: "Daily 60s AI host", gradient: "from-violet to-pink-400" },
  { id: "marketing", label: "Marketing Video", hint: "30s product story", gradient: "from-amber-400 to-pink-400" },
  { id: "short", label: "YouTube Short", hint: "Vertical 9:16 · 60s", gradient: "from-cyan to-emerald-400" },
  { id: "product", label: "Product Ad", hint: "Cinematic LTX 2.3", gradient: "from-cyan to-indigo-400" },
  { id: "influencer", label: "AI Influencer", hint: "Persistent identity", gradient: "from-fuchsia-500 to-cyan" },
  { id: "custom", label: "Custom Workflow", hint: "Start from scratch", gradient: "from-indigo-400 to-violet" },
];

export function CopilotActions() {
  return (
    <section className="glass rounded-2xl p-5 md:p-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">AI Copilot</div>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">Pick an outcome — Copilot builds the workflow</h2>
        </div>
        <Link
          to="/agents"
          className="hidden items-center gap-1 text-xs text-muted-foreground hover:text-foreground md:inline-flex"
        >
          Browse all workflows <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {ACTIONS.map((a) => {
          const Icon = ICONS[a.id];
          return (
            <Link
              key={a.id}
              to="/agents"
              className="group relative overflow-hidden rounded-xl border border-border bg-background/40 p-4 text-left transition hover:border-violet/40 hover:bg-background/60"
            >
              <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${a.gradient} opacity-20 blur-2xl transition group-hover:opacity-40`} />
              <div className={`relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${a.gradient}`}>
                <Icon className="h-4 w-4 text-background" />
              </div>
              <div className="relative mt-3 text-sm font-medium">{a.label}</div>
              <div className="relative mt-0.5 text-[11px] text-muted-foreground">{a.hint}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}