import { Play } from "lucide-react";
import { RECENT_JOBS } from "../data/mock";
import { SectionHeader } from "./SystemStatus";

export function RecentJobs() {
  return (
    <section>
      <SectionHeader
        title="Recent renders"
        subtitle="Latest completed jobs from your workers"
        action={
          <button className="text-xs text-muted-foreground hover:text-foreground">View all →</button>
        }
      />
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {RECENT_JOBS.map((j) => (
          <div key={j.id} className="glass group overflow-hidden rounded-xl">
            <div className={`relative aspect-video bg-gradient-to-br ${j.gradient}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent" />
              <button className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              </button>
              <div className="absolute left-2 top-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] text-white backdrop-blur">
                {j.model}
              </div>
            </div>
            <div className="px-3 py-2">
              <div className="truncate text-xs font-medium">{j.title}</div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">{j.time} ago</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}