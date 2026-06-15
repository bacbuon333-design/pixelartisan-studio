import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { HeroSection } from "./sections/HeroSection";
import { SystemStatus } from "./sections/SystemStatus";
import { CommandCenter } from "./sections/CommandCenter";
import { ActiveJobs } from "./sections/ActiveJobs";
import { CharacterEngine } from "./sections/CharacterEngine";
import { VideoFactory } from "./sections/VideoFactory";
import { AgentStudio } from "./sections/AgentStudio";
import { RenderFarm } from "./sections/RenderFarm";
import { StorageCenter } from "./sections/StorageCenter";
import { Analytics } from "./sections/Analytics";
import { ActivityFeed } from "./sections/ActivityFeed";
import { Onboarding } from "./sections/Onboarding";
import { SettingsSection } from "./sections/SettingsSection";
import { CopilotFab } from "./sections/CopilotFab";

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 space-y-8 px-4 py-6 md:px-8 md:py-8">
          <HeroSection />
          <SystemStatus />
          <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <CommandCenter />
            <ActivityFeed />
          </div>
          <ActiveJobs />
          <CharacterEngine />
          <VideoFactory />
          <AgentStudio />
          <RenderFarm />
          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <StorageCenter />
            <Onboarding />
          </div>
          <Analytics />
          <SettingsSection />
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 pb-2 text-xs text-muted-foreground">
            <div>
              © 2026 AI Video Factory · Next.js 16 · FastAPI · Redis · Celery · Cloudflare R2
            </div>
            <div className="flex items-center gap-3">
              <span>FLUX</span><span>·</span>
              <span>PuLID</span><span>·</span>
              <span>InstantID</span><span>·</span>
              <span>LTX 2.3</span><span>·</span>
              <span>Wan 2.2</span><span>·</span>
              <span>XTTS</span><span>·</span>
              <span>LatentSync</span>
            </div>
          </footer>
        </main>
      </div>
      <CopilotFab />
    </div>
  );
}