import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { SystemStatus } from "@/components/factory/sections/SystemStatus";
import { RenderFarm } from "@/components/factory/sections/RenderFarm";
import { ActiveJobs } from "@/components/factory/sections/ActiveJobs";

export const Route = createFileRoute("/factory")({
  head: () => ({
    meta: [
      { title: "Render Farm — AI Video Factory" },
      { name: "description", content: "Realtime GPU mesh of Google Colab workers — VRAM, throughput, queue and failover." },
      { property: "og:title", content: "Render Farm — AI Video Factory" },
      { property: "og:description", content: "Multi-Colab GPU mesh with auto-failover." },
    ],
  }),
  component: FactoryPage,
});

function FactoryPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Infrastructure"
        title="Render Farm"
        description="GPU workers, queue, and throughput across the multi-region Colab mesh."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-aurora px-3.5 text-xs font-semibold text-background">
            <Plus className="h-3.5 w-3.5" /> Spin up worker
          </button>
        }
      />
      <SystemStatus />
      <RenderFarm />
      <ActiveJobs />
    </AppShell>
  );
}