import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/factory/AppShell";
import { ProjectDetail } from "@/components/factory/projects/ProjectDetail";

export const Route = createFileRoute("/projects/$id")({
  head: () => ({
    meta: [
      { title: "Project — AI Video Factory" },
      { name: "description", content: "Project workspace with characters, assets, workflow and renders." },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { id } = Route.useParams();
  return (
    <AppShell>
      <ProjectDetail projectId={id} />
    </AppShell>
  );
}