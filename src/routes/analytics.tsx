import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { Analytics } from "@/components/factory/sections/Analytics";
import { StorageCenter } from "@/components/factory/sections/StorageCenter";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — AI Video Factory" },
      { name: "description", content: "Usage, cost, throughput and storage analytics." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Usage, cost, throughput and storage across the factory."
      />
      <Analytics />
      <StorageCenter />
    </AppShell>
  );
}