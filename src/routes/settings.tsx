import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { SettingsSection } from "@/components/factory/sections/SettingsSection";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AI Video Factory" },
      { name: "description", content: "Workspace, billing, API keys and integrations." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Profile, billing, API keys and integrations."
      />
      <SettingsSection />
    </AppShell>
  );
}