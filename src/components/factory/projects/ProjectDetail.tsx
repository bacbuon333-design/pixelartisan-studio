import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Users, Film, ImageIcon, Mic2, Workflow, Library, Settings2, Play, Plus } from "lucide-react";
import { PROJECTS, CHARACTERS, ASSETS, AGENT_PIPELINE, RECENT_JOBS } from "../data/mock";
import { AgentPipeline } from "../sections/AgentPipeline";

const TABS = [
  { id: "overview", label: "Overview", icon: Library },
  { id: "characters", label: "Characters", icon: Users },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "videos", label: "Videos", icon: Film },
  { id: "voice", label: "Voice", icon: Mic2 },
  { id: "workflow", label: "Workflow", icon: Workflow },
  { id: "assets", label: "Assets", icon: Library },
] as const;

export function ProjectDetail({ projectId }: { projectId: string }) {
  const project = PROJECTS.find((p) => p.id === projectId) ?? PROJECTS[0];
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/projects" className="hover:text-foreground">Projects</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{project.name}</span>
      </nav>

      <section className={`glass relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/20" />
        <div className="relative flex flex-wrap items-end justify-between gap-4 p-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/40 px-2 py-0.5">
                <span className="h-1 w-1 rounded-full bg-success" /> {project.status}
              </span>
              <span>·</span>
              <span>Last activity {project.lastActivity}</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{project.name}</h1>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="rounded-md border border-border bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 text-xs font-medium text-muted-foreground hover:text-foreground">
              <Settings2 className="h-3.5 w-3.5" /> Settings
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-aurora px-3.5 text-xs font-semibold text-background shadow-[0_0_24px_-6px_oklch(0.72_0.18_295/0.6)]">
              <Play className="h-3.5 w-3.5" /> Run workflow
            </button>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-px border-t border-border bg-border/60 md:grid-cols-4">
          <Stat label="Characters" value={project.characters.toString()} />
          <Stat label="Assets" value={project.assets.toLocaleString()} />
          <Stat label="Videos" value={project.videos.toString()} />
          <Stat label="Status" value={project.status} />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-1 border-b border-border">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
              {active && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-aurora" />}
            </button>
          );
        })}
      </div>

      {tab === "overview" && <OverviewTab />}
      {tab === "characters" && <CharactersTab />}
      {(tab === "images" || tab === "videos" || tab === "voice") && <MediaGrid kind={tab} />}
      {tab === "workflow" && <AgentPipeline pipeline={AGENT_PIPELINE} />}
      {tab === "assets" && <AssetsTab />}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background/60 px-5 py-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Recent renders</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {RECENT_JOBS.slice(0, 6).map((j) => (
            <div key={j.id} className="glass overflow-hidden rounded-xl">
              <div className={`aspect-video bg-gradient-to-br ${j.gradient}`} />
              <div className="px-3 py-2 text-xs">
                <div className="truncate font-medium">{j.title}</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">{j.model} · {j.time} ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Pipeline</h3>
        <AgentPipeline pipeline={AGENT_PIPELINE} compact />
      </div>
    </div>
  );
}

function CharactersTab() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CHARACTERS.slice(0, 3).map((c) => (
        <div key={c.id} className="glass overflow-hidden rounded-2xl">
          <div className={`aspect-[4/3] bg-gradient-to-br ${c.gradient}`} />
          <div className="p-4">
            <div className="text-sm font-semibold">{c.name}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">LoRA {c.loraVersion} · {c.references} refs</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MediaGrid({ kind }: { kind: "images" | "videos" | "voice" }) {
  const filtered = ASSETS.filter((a) =>
    kind === "images" ? a.kind === "Image" : kind === "videos" ? a.kind === "Video" : a.kind === "Voice"
  );
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      <button className="glass grid aspect-square place-items-center rounded-xl border-dashed text-muted-foreground hover:border-violet/40 hover:text-foreground">
        <div className="text-center">
          <Plus className="mx-auto h-5 w-5" />
          <div className="mt-1.5 text-xs">Generate</div>
        </div>
      </button>
      {filtered.map((a) => (
        <div key={a.id} className={`glass overflow-hidden rounded-xl`}>
          <div className={`aspect-square bg-gradient-to-br ${a.gradient}`} />
          <div className="px-2.5 py-2 text-[11px]">
            <div className="truncate font-medium">{a.name}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">{a.model} · {a.size}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AssetsTab() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
      {ASSETS.slice(0, 18).map((a) => (
        <div key={a.id} className="glass overflow-hidden rounded-xl">
          <div className={`aspect-square bg-gradient-to-br ${a.gradient}`} />
          <div className="px-2.5 py-2 text-[11px]">
            <div className="truncate font-medium">{a.name}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">{a.kind} · {a.size}</div>
          </div>
        </div>
      ))}
    </div>
  );
}