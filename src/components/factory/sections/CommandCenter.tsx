import { useState } from "react";
import {
  ImagePlus,
  Wand2,
  Sparkles,
  Settings2,
  ChevronDown,
  Dice5,
  Layers,
} from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const MODELS = [
  { name: "FLUX Dev FP8", type: "Image", color: "from-violet to-cyan" },
  { name: "FLUX Kontext", type: "Image", color: "from-violet to-pink-400" },
  { name: "LTX 2.3", type: "Video", color: "from-cyan to-emerald-400" },
  { name: "Wan 2.2", type: "Video", color: "from-amber-400 to-pink-400" },
  { name: "InstantID", type: "Avatar", color: "from-violet to-fuchsia-500" },
  { name: "PuLID", type: "Avatar", color: "from-cyan to-indigo-400" },
  { name: "XTTS", type: "Voice", color: "from-emerald-400 to-cyan" },
  { name: "LatentSync", type: "Lipsync", color: "from-pink-400 to-violet" },
];

export function CommandCenter() {
  const [selected, setSelected] = useState("Wan 2.2");
  const [advanced, setAdvanced] = useState(true);
  return (
    <section className="glass relative overflow-hidden rounded-2xl p-5 md:p-6">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />
      <SectionHeader
        title="Generation command center"
        subtitle="One prompt. Eight pipelines. Six GPU workers."
        action={
          <button className="text-xs text-muted-foreground hover:text-foreground">
            View pipeline graph →
          </button>
        }
      />

      <div className="relative mt-4 rounded-xl border border-border bg-background/40 p-4">
        <textarea
          rows={3}
          defaultValue="A cinematic medium shot of Aria, neon-lit Tokyo rooftop at dusk, rain particles, anamorphic flare, shallow depth of field, 35mm film grain, slow dolly-in. ::style cinematic, photoreal --ar 16:9"
          className="w-full resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <Chip icon={ImagePlus} label="Upload reference" />
            <Chip icon={Layers} label="Character: Aria" tone="violet" />
            <Chip icon={Dice5} label="Seed · 84291" />
            <button
              onClick={() => setAdvanced((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/30 px-2.5 py-1.5 text-[11px] text-muted-foreground hover:text-foreground"
            >
              <Settings2 className="h-3.5 w-3.5" />
              Advanced
              <ChevronDown className={`h-3 w-3 transition ${advanced ? "rotate-180" : ""}`} />
            </button>
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-aurora px-4 text-xs font-semibold text-background shadow-[0_0_30px_-8px_oklch(0.72_0.18_295/0.7)]">
            <Sparkles className="h-3.5 w-3.5" /> Generate
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Model</div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {MODELS.map((m) => {
            const active = m.name === selected;
            return (
              <button
                key={m.name}
                onClick={() => setSelected(m.name)}
                className={`group relative overflow-hidden rounded-lg border p-3 text-left transition ${
                  active
                    ? "border-violet/60 bg-background/80"
                    : "border-border bg-background/30 hover:border-border/80 hover:bg-background/50"
                }`}
              >
                <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${m.color}`} />
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{m.name}</div>
                  <Wand2 className={`h-3.5 w-3.5 ${active ? "text-violet" : "text-muted-foreground/60"}`} />
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {m.type}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {advanced && (
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/30 p-4 md:grid-cols-3">
          <Param label="Steps" value="30" />
          <Param label="CFG" value="7.5" />
          <Param label="Resolution" value="1280×720" />
          <Param label="Aspect ratio" value="16:9" />
          <Param label="LoRA strength" value="0.85" />
          <Param label="Reference weight" value="0.6" />
        </div>
      )}
    </section>
  );
}

function Chip({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone?: "violet";
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] ${
        tone === "violet"
          ? "border-violet/40 bg-violet/10 text-violet"
          : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function Param({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center justify-between rounded-md border border-border bg-background/40 px-2.5 py-1.5 text-xs">
        <span className="tabular-nums">{value}</span>
        <span className="text-muted-foreground/60">›</span>
      </div>
    </div>
  );
}