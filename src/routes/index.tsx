import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { ConnectionHub } from "@/components/factory/hub/ConnectionHub";
import { LangGraphFlow } from "@/components/factory/hub/LangGraphFlow";
import { CrtConsole } from "@/components/factory/hub/CrtConsole";
import { ActiveJobs } from "@/components/factory/sections/ActiveJobs";
import { CopilotActions } from "@/components/factory/sections/CopilotActions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Character Factory — Mission Control" },
      { name: "description", content: "Distributed GPU orchestration with self-healing Actor-Critic agents — Colab, Local, RunPod." },
      { property: "og:title", content: "AI Character Factory — Mission Control" },
      { property: "og:description", content: "Distributed GPU orchestration with self-healing Actor-Critic agents." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Mission Control"
        title="Auto-Loop is online"
        description="6 workers warm across Colab + Local + RunPod. The Architect → Coder → Sandbox → Critic loop has shipped 18 self-healed patches in the last hour."
      />
      <ConnectionHub />
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3"><LangGraphFlow /></div>
        <div className="xl:col-span-2"><CrtConsole compact /></div>
      </div>
      <CopilotActions />
      <ActiveJobs />
    </AppShell>
  );
}
