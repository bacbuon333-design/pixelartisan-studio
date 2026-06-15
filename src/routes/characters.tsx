import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/factory/AppShell";
import { CharacterEngine } from "@/components/factory/sections/CharacterEngine";

export const Route = createFileRoute("/characters")({
  head: () => ({
    meta: [
      { title: "Character Studio — AI Video Factory" },
      { name: "description", content: "Train and manage identity-preserving AI characters with LoRA, InstantID and PuLID." },
      { property: "og:title", content: "Character Studio — AI Video Factory" },
      { property: "og:description", content: "Identity-preserving AI characters with operational scoring." },
    ],
  }),
  component: CharactersPage,
});

function CharactersPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Workspace"
        title="Character Studio"
        description="Trainable identities with consistency scoring, LoRA versioning and reference libraries."
        actions={
          <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-aurora px-3.5 text-xs font-semibold text-background">
            <Plus className="h-3.5 w-3.5" /> New character
          </button>
        }
      />
      <CharacterEngine />
    </AppShell>
  );
}