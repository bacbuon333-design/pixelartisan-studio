import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ImageIcon,
  Film,
  Mic2,
  Wand2,
  Workflow,
  LayoutTemplate,
  Bot,
  Server,
  HardDrive,
  CreditCard,
  Settings,
  Sparkles,
  ChevronsLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { group: "Workspace", items: [
    { label: "Dashboard", icon: LayoutDashboard, badge: null, active: true },
    { label: "Projects", icon: FolderKanban, badge: "12" },
    { label: "Characters", icon: Users, badge: null },
  ]},
  { group: "Generation", items: [
    { label: "Images", icon: ImageIcon, badge: null },
    { label: "Videos", icon: Film, badge: "3" },
    { label: "Voices", icon: Mic2, badge: null },
    { label: "LoRA Training", icon: Wand2, badge: "2" },
  ]},
  { group: "Automation", items: [
    { label: "Workflows", icon: Workflow, badge: null },
    { label: "Templates", icon: LayoutTemplate, badge: null },
    { label: "Agent Studio", icon: Bot, badge: "NEW" },
  ]},
  { group: "Infrastructure", items: [
    { label: "Render Farm", icon: Server, badge: null },
    { label: "Storage", icon: HardDrive, badge: null },
    { label: "Billing", icon: CreditCard, badge: null },
    { label: "Settings", icon: Settings, badge: null },
  ]},
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl lg:flex transition-[width] duration-300",
        collapsed ? "w-[72px]" : "w-[260px]",
      )}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-aurora ring-glow">
          <Sparkles className="h-4 w-4 text-background" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="flex-1">
            <div className="text-sm font-semibold tracking-tight">AI Video Factory</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Production · v2.6</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ChevronsLeft className={cn("h-4 w-4 transition", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {NAV.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <div className="mb-2 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                {group.group}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition",
                      item.active
                        ? "bg-sidebar-accent text-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                    )}
                  >
                    {item.active && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-aurora" />
                    )}
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                          item.badge === "NEW"
                            ? "bg-violet/20 text-violet"
                            : "bg-accent text-muted-foreground",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="m-3 rounded-xl border border-sidebar-border bg-gradient-to-br from-violet/10 to-cyan/10 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">Monthly credits</span>
            <span className="text-muted-foreground">7,420 / 10,000</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background/40">
            <div className="h-full w-[74%] rounded-full bg-aurora" />
          </div>
          <button className="mt-3 w-full rounded-md bg-foreground/95 py-1.5 text-xs font-medium text-background hover:bg-foreground">
            Upgrade plan
          </button>
        </div>
      )}
    </aside>
  );
}