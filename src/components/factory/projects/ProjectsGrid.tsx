import { Link } from "@tanstack/react-router";
import { Plus, Users, Film, Library, Clock } from "lucide-react";
import { PROJECTS } from "../data/mock";

const STATUS: Record<string, string> = {
  Active: "bg-success/15 text-success border-success/30",
  Draft: "bg-muted text-muted-foreground border-border",
  Paused: "bg-warning/15 text-warning border-warning/30",
  Archived: "bg-destructive/15 text-destructive border-destructive/30",
};

export function ProjectsGrid() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <button className="glass group flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-dashed text-muted-foreground transition hover:border-violet/40 hover:text-foreground">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-aurora">
            <Plus className="h-5 w-5 text-background" />
          </span>
          <div className="mt-3 text-sm font-medium">New project</div>
          <div className="mt-0.5 text-[11px]">Blank · template · from prompt</div>
        </button>

        {PROJECTS.map((p) => (
          <Link
            key={p.id}
            to="/projects/$id"
            params={{ id: p.id }}
            className="glass group overflow-hidden rounded-2xl transition hover:border-violet/40"
          >
            <div className={`relative aspect-[16/7] bg-gradient-to-br ${p.gradient}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border bg-black/40 px-2 py-0.5 text-[10px] text-white backdrop-blur ${STATUS[p.status]}`}>
                <span className="h-1 w-1 rounded-full bg-current" /> {p.status}
              </span>
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80 backdrop-blur">{t}</span>
                ))}
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="text-sm font-semibold">{p.name}</div>
              <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{p.characters}</span>
                  <span className="inline-flex items-center gap-1"><Library className="h-3 w-3" />{p.assets}</span>
                  <span className="inline-flex items-center gap-1"><Film className="h-3 w-3" />{p.videos}</span>
                </div>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.lastActivity}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}