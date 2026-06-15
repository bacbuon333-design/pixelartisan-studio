import {
  FolderKanban,
  Film,
  ImageIcon,
  Server,
  Zap,
  HardDrive,
  Wand2,
  Users,
  Plus,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { label: "Active Projects", value: "24", delta: "+3", icon: FolderKanban, tone: "text-violet" },
  { label: "Videos Generated", value: "1,284", delta: "+128", icon: Film, tone: "text-cyan" },
  { label: "Images Generated", value: "42.6K", delta: "+2.1K", icon: ImageIcon, tone: "text-success" },
  { label: "Colab Workers", value: "6/8", delta: "Online", icon: Server, tone: "text-warning" },
  { label: "Monthly Credits", value: "7,420", delta: "/ 10K", icon: Zap, tone: "text-violet" },
  { label: "Storage Used", value: "428 GB", delta: "/ 1 TB", icon: HardDrive, tone: "text-cyan" },
];

const actions = [
  { label: "Generate Image", icon: ImageIcon, hint: "FLUX Dev FP8" },
  { label: "Generate Video", icon: Film, hint: "LTX 2.3" },
  { label: "Create Character", icon: Users, hint: "PuLID + InstantID" },
  { label: "Train LoRA", icon: Wand2, hint: "Kohya SS" },
  { label: "Create Workflow", icon: Plus, hint: "Agent Studio" },
];

export function HeroSection() {
  return (
    <section className="glass relative overflow-hidden rounded-2xl p-6 md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              All systems nominal · 4 Colab pods streaming
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Welcome back, <span className="text-gradient">Quang Vinh</span>
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
              Your render farm processed <span className="font-medium text-foreground">312 jobs</span> in
              the last 24h. 6 Colab workers are warm, the Wan 2.2 pipeline averages
              <span className="font-medium text-foreground"> 42s</span> per shot.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 text-xs font-medium text-muted-foreground hover:text-foreground">
              View report <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-aurora px-3.5 text-xs font-semibold text-background shadow-[0_0_30px_-8px_oklch(0.72_0.18_295/0.6)]">
              <Plus className="h-3.5 w-3.5" /> New project
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="group rounded-xl border border-border bg-background/40 p-4 transition hover:border-violet/40 hover:bg-background/60"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-4 w-4 ${s.tone}`} />
                  <span className="text-[10px] text-muted-foreground">{s.delta}</span>
                </div>
                <div className="mt-3 text-2xl font-semibold tabular-nums">{s.value}</div>
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.label}
                className="group flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 text-xs hover:border-violet/40 hover:bg-background/60"
              >
                <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-violet/20 to-cyan/20 text-violet">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="font-medium">{a.label}</span>
                <span className="text-[10px] text-muted-foreground">· {a.hint}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}