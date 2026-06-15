import { Sparkles, Wand2, Pencil, Trash2, Plus } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const CHARS = [
  { name: "Aria Nakamura", status: "Trained", assets: 184, videos: 42, gradient: "from-violet to-pink-400" },
  { name: "Kaito Voss", status: "Training", assets: 96, videos: 8, gradient: "from-cyan to-emerald-400" },
  { name: "Luna Sterling", status: "Trained", assets: 212, videos: 67, gradient: "from-amber-400 to-pink-400" },
  { name: "Rex Aurelius", status: "Draft", assets: 24, videos: 0, gradient: "from-indigo-400 to-violet" },
  { name: "Iris Hollow", status: "Trained", assets: 148, videos: 28, gradient: "from-fuchsia-500 to-cyan" },
];

export function CharacterEngine() {
  return (
    <section>
      <SectionHeader
        title="Character engine"
        subtitle="Identity-preserving LoRA · InstantID · PuLID"
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Plus className="h-3.5 w-3.5" /> New character
          </button>
        }
      />
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {CHARS.map((c) => (
          <div key={c.name} className="glass group overflow-hidden rounded-2xl">
            <div className={`relative aspect-[4/5] bg-gradient-to-br ${c.gradient}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, white 0%, transparent 35%), radial-gradient(circle at 70% 60%, black 0%, transparent 45%)",
                }}
              />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] text-white backdrop-blur">
                <StatusDot status={c.status} /> {c.status}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-sm font-semibold text-white">{c.name}</div>
                <div className="mt-0.5 flex items-center gap-3 text-[10px] text-white/70">
                  <span>{c.assets} assets</span>
                  <span>·</span>
                  <span>{c.videos} videos</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-1 border-t border-border bg-background/40 p-2">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[11px] hover:bg-accent">
                <Sparkles className="h-3 w-3" /> Generate
              </button>
              <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"><Wand2 className="h-3 w-3" /></button>
              <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"><Pencil className="h-3 w-3" /></button>
              <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusDot({ status }: { status: string }) {
  const tone =
    status === "Trained" ? "bg-success" : status === "Training" ? "bg-warning" : "bg-muted-foreground";
  return <span className={`h-1.5 w-1.5 rounded-full ${tone}`} />;
}