import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/factory/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Video Factory — Dashboard" },
      { name: "description", content: "Generate AI images, avatars, videos, voices and LoRA at scale on Google Colab GPU workers." },
      { property: "og:title", content: "AI Video Factory — Dashboard" },
      { property: "og:description", content: "Generate AI images, avatars, videos, voices and LoRA at scale on Google Colab GPU workers." },
    ],
  }),
  component: Dashboard,
});
