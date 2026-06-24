import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { CrtConsole } from "@/components/factory/hub/CrtConsole";

export const Route = createFileRoute("/console")({
  head: () => ({
    meta: [
      { title: "CRT Console — AI Character Factory" },
      { name: "description", content: "Phosphor green realtime gateway log stream." },
    ],
  }),
  component: ConsolePage,
});

function ConsolePage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Realtime"
        title="CRT Console"
        description="Streaming log feed across gateway · ngrok · workers · sandboxes · LangGraph agents."
      />
      <CrtConsole />
    </AppShell>
  );
}