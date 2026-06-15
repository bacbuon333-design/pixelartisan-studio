import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { ProjectsGrid } from "@/components/factory/projects/ProjectsGrid";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — AI Video Factory" },
      { name: "description", content: "Organize characters, assets, and workflows by project." },
      { property: "og:title", content: "Projects — AI Video Factory" },
      { property: "og:description", content: "Project-centric workspace for AI video production." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Workspace"
        title="Projects"
        description="One workspace per campaign or channel — characters, assets, workflows and renders kept together."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-aurora px-3.5 text-xs font-semibold text-background shadow-[0_0_24px_-6px_oklch(0.72_0.18_295/0.6)]">
            <Plus className="h-3.5 w-3.5" /> New project
          </button>
        }
      />
      <ProjectsGrid />
    </AppShell>
  );
}