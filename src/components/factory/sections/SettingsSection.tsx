import { KeyRound, Cable, Box, Server, Bell, Database } from "lucide-react";
import { SectionHeader } from "./SystemStatus";

const TILES = [
  { icon: Database, title: "Model Registry", desc: "12 active models · FLUX, Wan 2.2, LTX 2.3, PuLID…", value: "12" },
  { icon: KeyRound, title: "API Keys", desc: "Personal access tokens, scoped per workspace.", value: "4 active" },
  { icon: Cable, title: "Ngrok Tokens", desc: "Secure tunnel auth for Colab workers.", value: "2 saved" },
  { icon: Box, title: "Storage Providers", desc: "Cloudflare R2 · S3 · GCS · Backblaze.", value: "R2" },
  { icon: Server, title: "Worker Management", desc: "Auto-scale rules, region pinning, priority queues.", value: "Auto" },
  { icon: Bell, title: "Notifications", desc: "Slack, Discord, email and webhook events.", value: "On" },
];

export function SettingsSection() {
  return (
    <section>
      <SectionHeader title="Settings" subtitle="Models · keys · infrastructure" />
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {TILES.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.title}
              className="glass group flex items-start gap-3 rounded-2xl p-4 text-left transition hover:border-violet/40"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet/20 to-cyan/20 text-violet">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{t.title}</div>
                  <span className="rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                    {t.value}
                  </span>
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{t.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}