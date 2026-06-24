import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { SandboxMonitor } from "@/components/factory/hub/SandboxMonitor";

export const Route = createFileRoute("/sandbox")({
  head: () => ({
    meta: [
      { title: "Docker Sandbox — AI Character Factory" },
      { name: "description", content: "Isolated Gemini CLI containers and pytest sandbox runners." },
    ],
  }),
  component: SandboxPage,
});

function SandboxPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Isolation Layer"
        title="Docker Sandbox"
        description="Each Gemini CLI account runs in its own container so ~/.gemini profiles never collide. Auto-generated code is executed in throwaway pytest sandboxes."
      />
      <SandboxMonitor />
    </AppShell>
  );
}