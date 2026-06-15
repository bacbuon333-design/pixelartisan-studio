import { Play, Volume2, Captions, Clock } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const VIDEOS = [
  { title: "Aria · Neon Tokyo 02", status: "Rendered", duration: "00:32", res: "1920×1080", audio: true, subs: true, gradient: "from-violet/60 to-cyan/60" },
  { title: "Luna · Forest Walk", status: "Rendering", duration: "00:18", res: "1280×720", audio: true, subs: false, gradient: "from-emerald-500/60 to-cyan/60" },
  { title: "Product Reel · Q3", status: "Rendered", duration: "01:24", res: "3840×2160", audio: true, subs: true, gradient: "from-amber-500/60 to-pink-500/60" },
  { title: "Kaito · Promo Cut", status: "Queued", duration: "00:42", res: "1920×1080", audio: false, subs: false, gradient: "from-indigo-500/60 to-violet/60" },
];

export function VideoFactory() {
  return (
    <section>
      <SectionHeader
        title="Video factory"
        subtitle="Recent renders · timeline view"
        action={
          <button className="text-xs text-muted-foreground hover:text-foreground">Open timeline editor →</button>
        }
      />
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {VIDEOS.map((v) => (
          <article key={v.title} className="glass group overflow-hidden rounded-2xl">
            <div className={`relative aspect-video bg-gradient-to-br ${v.gradient}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_50%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="grid h-12 w-12 place-items-center rounded-full bg-background/60 ring-1 ring-white/20 backdrop-blur transition group-hover:scale-110">
                  <Play className="h-5 w-5 fill-current" />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white backdrop-blur">
                  {v.duration}
                </span>
                <div className="flex items-center gap-1">
                  {v.audio && <Pill icon={Volume2} />}
                  {v.subs && <Pill icon={Captions} />}
                </div>
              </div>
            </div>
            <div className="space-y-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-medium">{v.title}</div>
                <StatusTag status={v.status} />
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {v.duration}</span>
                <span>·</span>
                <span>{v.res}</span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-sm bg-gradient-to-t from-violet/40 to-cyan/40"
                    style={{ opacity: 0.25 + Math.abs(Math.sin(i * 0.7)) * 0.7 }}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pill({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <span className="grid h-5 w-5 place-items-center rounded bg-black/50 text-white backdrop-blur">
      <Icon className="h-2.5 w-2.5" />
    </span>
  );
}

function StatusTag({ status }: { status: string }) {
  const map: Record<string, string> = {
    Rendered: "bg-success/15 text-success",
    Rendering: "bg-violet/15 text-violet",
    Queued: "bg-warning/15 text-warning",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${map[status]}`}>{status}</span>;
}