import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { AssetLibrary } from "@/components/factory/assets/AssetLibrary";

export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "Assets — AI Video Factory" },
      { name: "description", content: "Unified library for images, videos, voices, subtitles, characters and LoRA weights." },
      { property: "og:title", content: "Asset Library — AI Video Factory" },
      { property: "og:description", content: "Runway-style asset library backed by Cloudflare R2." },
    ],
  }),
  component: AssetsPage,
});

function AssetsPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Library"
        title="Assets"
        description="Everything your studio produces — searchable, taggable, project-scoped."
      />
      <AssetLibrary />
    </AppShell>
  );
}