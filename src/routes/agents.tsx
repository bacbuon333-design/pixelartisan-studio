import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { AgentPipeline } from "@/components/factory/sections/AgentPipeline";
import { AGENT_PIPELINE } from "@/components/factory/data/mock";
import { Terminal } from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agent Studio — AI Video Factory" },
      { name: "description", content: "Visual multi-agent pipelines for end-to-end AI video production." },
      { property: "og:title", content: "Agent Studio — AI Video Factory" },
      { property: "og:description", content: "Prompt → Script → Storyboard → Image → Video → Voice → Editor → Publish." },
    ],
  }),
  component: AgentsPage,
});

const LOGS = [
  { t: "12:04:08", level: "info", msg: "[prompt] Generated 1 message in 1.2s · 132 tokens" },
  { t: "12:04:09", level: "info", msg: "[script] Claude sonnet · streaming 4 scenes" },
  { t: "12:04:14", level: "ok",   msg: "[script] Completed · 412 tokens · $0.014" },
  { t: "12:04:14", level: "info", msg: "[storyboard] FLUX Kontext · 4 keyframes queued" },
  { t: "12:04:26", level: "ok",   msg: "[storyboard] 4/4 keyframes rendered in 12.4s" },
  { t: "12:04:27", level: "info", msg: "[image] FLUX Dev FP8 · job_9F2B dispatched to colab-sg-01" },
  { t: "12:04:55", level: "warn", msg: "[image] VRAM 31/40 GB · consider Q4 quantization" },
];

function AgentsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Automation"
        title="Agent Studio"
        description="Compose multi-agent video production pipelines. Run, pause, inspect logs and per-step cost."
      />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <AgentPipeline pipeline={AGENT_PIPELINE} />
        <div className="glass overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="inline-flex items-center gap-2 text-sm font-medium">
              <Terminal className="h-4 w-4 text-violet" /> Live logs
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> streaming
            </span>
          </div>
          <div className="max-h-[520px] overflow-y-auto px-4 py-3 font-mono text-[11px]">
            {LOGS.map((l, i) => (
              <div key={i} className="flex gap-3 py-1">
                <span className="text-muted-foreground/70">{l.t}</span>
                <span
                  className={
                    l.level === "ok"
                      ? "text-success"
                      : l.level === "warn"
                      ? "text-warning"
                      : l.level === "err"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }
                >
                  {l.level.padEnd(4)}
                </span>
                <span className="text-foreground">{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}