import { useState } from "react";
import { Sparkles, X, Send, Lightbulb, Bug, Workflow, Wand2 } from "lucide-react";

const SUGGESTIONS = [
  { icon: Workflow, label: "Create a YouTube short workflow" },
  { icon: Wand2, label: "Optimize my Wan 2.2 prompt" },
  { icon: Bug, label: "Debug job_9F2E failure" },
  { icon: Lightbulb, label: "Suggest the best model for me" },
];

export function CopilotFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-aurora px-4 py-3 text-xs font-semibold text-background shadow-[0_10px_40px_-10px_oklch(0.72_0.18_295/0.7)] hover:scale-105 transition"
      >
        <Sparkles className="h-4 w-4" />
        AI Copilot
      </button>

      {open && (
        <div className="glass-strong fixed bottom-24 right-6 z-40 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-aurora">
                <Sparkles className="h-3.5 w-3.5 text-background" />
              </span>
              <div>
                <div className="text-sm font-semibold">Copilot</div>
                <div className="text-[10px] text-muted-foreground">gemini-3-flash · grounded on your workspace</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="grid h-7 w-7 place-items-center rounded-md hover:bg-accent">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <Bubble role="ai">
              Hey Vinh — your Wan 2.2 average render time dropped to <b>42s</b> today.
              Want me to draft a daily TikTok workflow using Aria + the new LatentSync model?
            </Bubble>
            <Bubble role="user">Yes, target 9:00 AM ICT daily, 30s vertical.</Bubble>
            <Bubble role="ai">
              Drafting <b>YouTube Short · Aria daily</b> · 6 nodes: Script → Image → Voice → Video → Edit → Publish.
              I'll route Wan 2.2 to <code className="rounded bg-background/60 px-1">colab-tokyo-03</code>.
            </Bubble>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {SUGGESTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.label}
                    className="flex items-start gap-2 rounded-lg border border-border bg-background/40 p-2.5 text-left text-[11px] hover:border-violet/40"
                  >
                    <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-2.5">
              <input
                placeholder="Ask the factory anything…"
                className="h-9 flex-1 bg-transparent text-xs placeholder:text-muted-foreground focus:outline-none"
              />
              <button className="grid h-7 w-7 place-items-center rounded-md bg-aurora text-background">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Bubble({ role, children }: { role: "ai" | "user"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-xs text-primary-foreground">
        {children}
      </div>
    );
  }
  return (
    <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-border bg-background/50 px-3 py-2 text-xs leading-relaxed">
      {children}
    </div>
  );
}