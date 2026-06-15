import { Cable, Server, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const STEPS = [
  { icon: Cable, title: "Connect Ngrok", desc: "Paste your auth token to tunnel Colab workers.", done: true },
  { icon: Server, title: "Launch a Colab worker", desc: "Open the bootstrap notebook · 90 seconds to live GPU.", done: true },
  { icon: Users, title: "Upload a character", desc: "3–10 reference images for identity-preserving generation.", done: false, active: true },
  { icon: Sparkles, title: "Generate first video", desc: "Pick Wan 2.2 or LTX 2.3 and ship your first cinematic shot.", done: false },
];

export function Onboarding() {
  return (
    <section className="glass relative overflow-hidden rounded-2xl p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet/15 blur-3xl"
      />
      <SectionHeader
        title="Get production-ready"
        subtitle="2 of 4 steps complete · ~3 minutes left"
      />
      <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-background/60">
        <div className="h-full w-1/2 rounded-full bg-aurora" />
      </div>

      <ol className="relative mt-5 space-y-3">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <li
              key={s.title}
              className={`group flex items-start gap-3 rounded-xl border p-3 transition ${
                s.active
                  ? "border-violet/40 bg-violet/5"
                  : "border-border bg-background/30"
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                  s.done
                    ? "bg-success/15 text-success"
                    : s.active
                    ? "bg-aurora text-background"
                    : "bg-background/50 text-muted-foreground"
                }`}
              >
                {s.done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-muted-foreground">STEP {i + 1}</span>
                  {s.done && <span className="text-[10px] text-success">Done</span>}
                </div>
                <div className="text-sm font-medium">{s.title}</div>
                <div className="text-[11px] text-muted-foreground">{s.desc}</div>
              </div>
              {s.active && (
                <button className="self-center rounded-md bg-aurora px-3 py-1.5 text-[11px] font-semibold text-background">
                  Continue
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}