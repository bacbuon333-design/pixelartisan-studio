import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { ConnectionHub } from "@/components/factory/hub/ConnectionHub";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "Connection Hub — AI Character Factory" },
      { name: "description", content: "Distributed GPU fleet across Google Colab, local rigs, and RunPod with live worker telemetry." },
    ],
  }),
  component: HubPage,
});

function HubPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Super Gateway"
        title="Connection Hub"
        description="Live map of every GPU worker registered to the gateway — Colab, local rigs, RunPod — with role, VRAM, and ngrok tunnel."
      />
      <ConnectionHub />
    </AppShell>
  );
}