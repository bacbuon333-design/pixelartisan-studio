import { Pause, RotateCcw, X, Film, ImageIcon, Mic2, Wand2 } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

type Job = {
  id: string;
  type: "Image" | "Video" | "Voice" | "LoRA";
  model: string;
  status: "Running" | "Queued" | "Rendering" | "Failed";
  progress: number;
  worker: string;
  eta: string;
};

const JOBS: Job[] = [
  { id: "job_9F2A", type: "Video", model: "Wan 2.2", status: "Rendering", progress: 72, worker: "colab-tokyo-03", eta: "00:48" },
  { id: "job_9F2B", type: "Image", model: "FLUX Dev FP8", status: "Running", progress: 41, worker: "colab-sg-01", eta: "00:12" },
  { id: "job_9F2C", type: "LoRA", model: "Kohya · Aria v3", status: "Running", progress: 88, worker: "colab-fra-02", eta: "06:31" },
  { id: "job_9F2D", type: "Voice", model: "XTTS v2", status: "Queued", progress: 0, worker: "—", eta: "00:09" },
  { id: "job_9F2E", type: "Video", model: "LTX 2.3", status: "Failed", progress: 32, worker: "colab-us-04", eta: "Retry" },
];

const TYPE_ICON = { Image: ImageIcon, Video: Film, Voice: Mic2, LoRA: Wand2 };

export function ActiveJobs() {
  return (
    <section>
      <SectionHeader
        title="Active jobs"
        subtitle="Live worker telemetry · auto-refresh 2s"
        action={
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> Streaming
          </div>
        }
      />
      <div className="glass mt-3 overflow-hidden rounded-2xl">
        <div className="grid grid-cols-[120px_140px_160px_120px_1fr_180px_90px_90px] gap-3 border-b border-border bg-background/30 px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <div>Job ID</div>
          <div>Type</div>
          <div>Model</div>
          <div>Status</div>
          <div>Progress</div>
          <div>GPU worker</div>
          <div>ETA</div>
          <div className="text-right">Actions</div>
        </div>
        {JOBS.map((j) => {
          const Icon = TYPE_ICON[j.type];
          return (
            <div
              key={j.id}
              className="grid grid-cols-[120px_140px_160px_120px_1fr_180px_90px_90px] items-center gap-3 border-b border-border/70 px-4 py-3 text-xs transition hover:bg-background/40 last:border-0"
            >
              <div className="font-mono text-[11px] text-muted-foreground">{j.id}</div>
              <div className="inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-violet" />
                {j.type}
              </div>
              <div className="text-muted-foreground">{j.model}</div>
              <StatusBadge status={j.status} />
              <div className="flex items-center gap-2">
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-background/60">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      j.status === "Failed" ? "bg-destructive" : "bg-aurora"
                    }`}
                    style={{ width: `${j.progress}%` }}
                  />
                </div>
                <span className="w-9 text-right text-[10px] tabular-nums text-muted-foreground">
                  {j.progress}%
                </span>
              </div>
              <div className="font-mono text-[11px] text-muted-foreground">{j.worker}</div>
              <div className="tabular-nums text-muted-foreground">{j.eta}</div>
              <div className="flex items-center justify-end gap-1">
                <ActionBtn icon={Pause} />
                <ActionBtn icon={RotateCcw} />
                <ActionBtn icon={X} danger />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: Job["status"] }) {
  const map = {
    Running: "bg-success/15 text-success border-success/30",
    Rendering: "bg-violet/15 text-violet border-violet/30",
    Queued: "bg-warning/15 text-warning border-warning/30",
    Failed: "bg-destructive/15 text-destructive border-destructive/30",
  } as const;
  return (
    <span className={`inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${map[status]}`}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ActionBtn({
  icon: Icon,
  danger,
}: {
  icon: React.ComponentType<{ className?: string }>;
  danger?: boolean;
}) {
  return (
    <button
      className={`grid h-7 w-7 place-items-center rounded-md border border-border/60 bg-background/40 transition ${
        danger ? "text-muted-foreground hover:border-destructive/40 hover:text-destructive" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-3 w-3" />
    </button>
  );
}