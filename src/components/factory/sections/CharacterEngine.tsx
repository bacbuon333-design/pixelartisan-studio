import { Sparkles, Wand2, Pencil, Trash2, Plus, HardDrive, Clock, Layers } from "lucide-react";
import { SectionHeader } from "./SystemStatus";
import { CHARACTERS } from "../data/mock";

export function CharacterEngine() {
  return (
    <section>
      <SectionHeader
        title="Character studio"
        subtitle="Identity-preserving LoRA · InstantID · PuLID · operational scoring"
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-aurora px-3 py-1.5 text-xs font-semibold text-background">
            <Plus className="h-3.5 w-3.5" /> New character
          </button>
        }
      />
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHARACTERS.map((c) => (
          <div key={c.id} className="glass group overflow-hidden rounded-2xl">
            <div className={`relative aspect-[16/9] bg-gradient-to-br ${c.gradient}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] text-white backdrop-blur">
                <StatusDot status={c.status} /> {c.status}
              </div>
              <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur">
                LoRA {c.loraVersion}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-base font-semibold text-white">{c.name}</div>
                <div className="mt-0.5 text-[10px] text-white/70">Project · {c.project}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border/60">
              <Score label="Identity" value={c.identity} />
              <Score label="Consistency" value={c.consistency} />
            </div>
            <div className="grid grid-cols-3 gap-3 border-t border-border bg-background/30 px-4 py-3 text-[11px]">
              <Meta icon={Layers} label="Refs" value={c.references.toString()} />
              <Meta icon={HardDrive} label="Storage" value={c.storage} />
              <Meta icon={Clock} label="Last gen" value={c.lastGenerated} />
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

function Score({ label, value }: { label: string; value: number }) {
  const tone = value >= 90 ? "text-success" : value >= 70 ? "text-warning" : "text-muted-foreground";
  return (
    <div className="bg-background/40 px-4 py-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span className={`tabular-nums ${tone}`}>{value}</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-background/60">
        <div className="h-full rounded-full bg-aurora" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Meta({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div>
      <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-0.5 font-mono text-xs">{value}</div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const tone =
    status === "Trained" ? "bg-success" : status === "Training" ? "bg-warning" : "bg-muted-foreground";
  return <span className={`h-1.5 w-1.5 rounded-full ${tone}`} />;
}