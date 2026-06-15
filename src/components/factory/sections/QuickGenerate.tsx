import { useState } from "react";
import { Sparkles, ImagePlus, Layers, Dice5, ChevronDown } from "lucide-react";

const MODELS = ["FLUX Dev FP8", "FLUX Kontext", "Wan 2.2", "LTX 2.3", "PuLID", "InstantID"];

export function QuickGenerate() {
  const [model, setModel] = useState("Wan 2.2");
  return (
    <section className="glass relative overflow-hidden rounded-2xl p-5 md:p-6">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Quick generate</div>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">What do you want to create?</h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/30 px-2.5 py-1.5 text-[11px] text-muted-foreground hover:text-foreground">
              {model} <ChevronDown className="h-3 w-3" />
            </button>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="sr-only"
            >
              {MODELS.map((m) => (<option key={m}>{m}</option>))}
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-background/40 p-4">
          <textarea
            rows={2}
            defaultValue="A cinematic medium shot of Aria, neon-lit Tokyo rooftop at dusk, rain particles, anamorphic flare, 35mm film grain."
            className="w-full resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <Chip icon={ImagePlus} label="Reference" />
              <Chip icon={Layers} label="Character · Aria" tone="violet" />
              <Chip icon={Dice5} label="Seed · 84291" />
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-aurora px-4 text-xs font-semibold text-background shadow-[0_0_30px_-8px_oklch(0.72_0.18_295/0.7)]">
              <Sparkles className="h-3.5 w-3.5" /> Generate
            </button>
          </div>
        </div>
      </div>
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