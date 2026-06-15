import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { QuickGenerate } from "@/components/factory/sections/QuickGenerate";
import { CopilotActions } from "@/components/factory/sections/CopilotActions";
import { ActiveJobs } from "@/components/factory/sections/ActiveJobs";
import { SystemStatus } from "@/components/factory/sections/SystemStatus";
import { RecentJobs } from "@/components/factory/sections/RecentJobs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Video Factory — Dashboard" },
      { name: "description", content: "Generate AI images, avatars, videos, voices and LoRA at scale on Google Colab GPU workers." },
      { property: "og:title", content: "AI Video Factory — Dashboard" },
      { property: "og:description", content: "Generate AI images, avatars, videos, voices and LoRA at scale on Google Colab GPU workers." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Workspace"
        title="Welcome back, Quang Vinh"
        description="Your render farm processed 312 jobs in the last 24h. 6 Colab workers are warm — Wan 2.2 pipeline averages 42s per shot."
      />
      <QuickGenerate />
      <CopilotActions />
      <SystemStatus />
      <ActiveJobs />
      <RecentJobs />
    </AppShell>
  );
}
