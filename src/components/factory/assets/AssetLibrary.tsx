import { useState } from "react";
import { Search, Upload, FolderPlus, Grid3x3, List, ImageIcon, Film, Mic2, FileText, Users, Wand2, Library } from "lucide-react";
import { ASSETS, type AssetItem } from "../data/mock";

const FILTERS: { id: AssetItem["kind"] | "All"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "All", label: "All assets", icon: Library },
  { id: "Image", label: "Images", icon: ImageIcon },
  { id: "Video", label: "Videos", icon: Film },
  { id: "Voice", label: "Voices", icon: Mic2 },
  { id: "Subtitle", label: "Subtitles", icon: FileText },
  { id: "Character", label: "Characters", icon: Users },
  { id: "LoRA", label: "LoRA", icon: Wand2 },
];

export function AssetLibrary() {
  const [filter, setFilter] = useState<AssetItem["kind"] | "All">("All");
  const [selected, setSelected] = useState<AssetItem | null>(ASSETS[0]);
  const items = filter === "All" ? ASSETS : ASSETS.filter((a) => a.kind === filter);

  return (
    <div className="grid gap-4 lg:grid-cols-[200px_1fr_280px]">
      {/* Filter sidebar */}
      <aside className="glass h-fit rounded-2xl p-2">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const active = filter === f.id;
          const count = f.id === "All" ? ASSETS.length : ASSETS.filter((a) => a.kind === f.id).length;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs transition ${
                active ? "bg-sidebar-accent text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60"
              }`}
            >
              <span className="inline-flex items-center gap-2"><Icon className="h-3.5 w-3.5" />{f.label}</span>
              <span className="text-[10px] tabular-nums text-muted-foreground">{count}</span>
            </button>
          );
        })}
      </aside>

      {/* Main grid */}
      <div className="space-y-3">
        <div className="glass flex items-center gap-2 rounded-xl p-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search assets, prompts, projects…"
              className="h-8 w-full rounded-md bg-background/40 pl-8 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-[11px] text-muted-foreground hover:text-foreground">
            <FolderPlus className="h-3.5 w-3.5" /> Folder
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-aurora px-3 text-[11px] font-semibold text-background">
            <Upload className="h-3.5 w-3.5" /> Upload
          </button>
          <div className="ml-1 flex h-8 items-center rounded-md border border-border">
            <button className="grid h-full w-8 place-items-center text-foreground"><Grid3x3 className="h-3.5 w-3.5" /></button>
            <button className="grid h-full w-8 place-items-center text-muted-foreground"><List className="h-3.5 w-3.5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {items.map((a) => {
            const active = selected?.id === a.id;
            return (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className={`glass overflow-hidden rounded-xl text-left transition ${
                  active ? "ring-2 ring-violet" : "hover:border-violet/40"
                }`}
              >
                <div className={`aspect-square bg-gradient-to-br ${a.gradient}`} />
                <div className="px-2.5 py-2 text-[11px]">
                  <div className="truncate font-medium">{a.name}</div>
                  <div className="mt-0.5 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{a.kind}</span>
                    <span>{a.size}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Meta panel */}
      <aside className="glass h-fit rounded-2xl p-4">
        {selected ? (
          <>
            <div className={`aspect-square overflow-hidden rounded-lg bg-gradient-to-br ${selected.gradient}`} />
            <div className="mt-3 text-sm font-semibold">{selected.name}</div>
            <div className="text-[11px] text-muted-foreground">{selected.kind} asset</div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-[11px]">
              <Row label="ID" value={selected.id} />
              <Row label="Model" value={selected.model} />
              <Row label="Size" value={selected.size} />
              <Row label="Project" value={selected.project} />
              <Row label="Created" value={selected.createdAt} />
            </div>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-aurora py-2 text-xs font-semibold text-background">
              Open in editor
            </button>
          </>
        ) : (
          <div className="py-12 text-center text-xs text-muted-foreground">Select an asset to inspect</div>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="truncate font-mono text-foreground">{value}</span>
    </div>
  );
}