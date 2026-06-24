import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { LangGraphFlow } from "@/components/factory/hub/LangGraphFlow";
import { CrtConsole } from "@/components/factory/hub/CrtConsole";

export const Route = createFileRoute("/flow")({
  head: () => ({
    meta: [
      { title: "LangGraph Flow — AI Character Factory" },
      { name: "description", content: "Architect → Coder → Sandbox → Critic → Fixer self-healing loop." },
    ],
  }),
  component: FlowPage,
});

function FlowPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Auto-to-Auto"
        title="LangGraph Flow"
        description="Closed-loop Actor-Critic pipeline orchestrating Gemini CLI agents across isolated Docker sandboxes."
      />
      <LangGraphFlow />
      <CrtConsole compact />
    </AppShell>
  );
}