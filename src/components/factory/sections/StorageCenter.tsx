import { Folder, ImageIcon, Film, Music2, Wand2, Search, UploadCloud, Download } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const FOLDERS = [
  { name: "Projects", icon: Folder, count: "24", size: "84 GB" },
  { name: "Images", icon: ImageIcon, count: "42,612", size: "186 GB" },
  { name: "Videos", icon: Film, count: "1,284", size: "112 GB" },
  { name: "Audio", icon: Music2, count: "3,402", size: "18 GB" },
  { name: "LoRA Models", icon: Wand2, count: "38", size: "28 GB" },
];

const FILES = [
  { name: "aria_neon_tokyo_02.mp4", size: "184 MB", mod: "2m ago", gradient: "from-violet to-cyan" },
  { name: "luna_forest_walk_v3.mp4", size: "98 MB", mod: "8m ago", gradient: "from-emerald-400 to-cyan" },
  { name: "product_reel_q3_final.mp4", size: "412 MB", mod: "1h ago", gradient: "from-amber-400 to-pink-400" },
  { name: "aria_portrait_seed84291.png", size: "6.4 MB", mod: "3h ago", gradient: "from-fuchsia-500 to-violet" },
];

export function StorageCenter() {
  return (
    <section>
      <SectionHeader
        title="Storage center"
        subtitle="Cloudflare R2 · 428 GB / 1 TB"
        action={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-aurora px-2.5 py-1.5 text-xs font-semibold text-background">
            <UploadCloud className="h-3.5 w-3.5" /> Upload
          </button>
        }
      />
      <div className="glass mt-3 rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {FOLDERS.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.name}
                className="group rounded-xl border border-border bg-background/40 p-3 text-left transition hover:border-violet/40"
              >
                <Icon className="h-5 w-5 text-violet" />
                <div className="mt-2 text-sm font-medium">{f.name}</div>
                <div className="text-[10px] text-muted-foreground">{f.count} files · {f.size}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 border-b border-border pb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search files…"
              className="h-8 w-full rounded-md border border-border bg-background/40 pl-8 text-xs focus:outline-none focus:ring-1 focus:ring-violet/40"
            />
          </div>
          <button className="rounded-md border border-border px-2 py-1.5 text-[11px] text-muted-foreground hover:text-foreground">
            Sort: Recent
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
          {FILES.map((f) => (
            <div key={f.name} className="group overflow-hidden rounded-xl border border-border bg-background/40">
              <div className={`relative aspect-video bg-gradient-to-br ${f.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_50%)]" />
                <button className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded bg-black/50 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Download className="h-3 w-3" />
                </button>
              </div>
              <div className="space-y-0.5 p-2">
                <div className="truncate text-[11px] font-medium">{f.name}</div>
                <div className="text-[10px] text-muted-foreground">{f.size} · {f.mod}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}