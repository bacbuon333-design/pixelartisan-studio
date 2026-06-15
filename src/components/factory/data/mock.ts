export type Project = {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Draft" | "Paused" | "Archived";
  characters: number;
  assets: number;
  videos: number;
  lastActivity: string;
  gradient: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "tiktok-mc-ai",
    name: "TikTok MC AI",
    description: "Daily AI host channel — Aria reads trending news in 60s shorts.",
    status: "Active",
    characters: 2,
    assets: 1284,
    videos: 96,
    lastActivity: "2 minutes ago",
    gradient: "from-violet to-pink-400",
    tags: ["TikTok", "Daily", "Wan 2.2"],
  },
  {
    id: "cafe-marketing",
    name: "Cafe Marketing Campaign",
    description: "Promo videos & social posts for Aroma Roasters Q3 launch.",
    status: "Active",
    characters: 1,
    assets: 412,
    videos: 24,
    lastActivity: "1 hour ago",
    gradient: "from-amber-400 to-pink-400",
    tags: ["Brand", "Ads", "FLUX"],
  },
  {
    id: "ai-influencer-luna",
    name: "AI Influencer · Luna",
    description: "Virtual fashion creator with weekly IG reels + UGC photos.",
    status: "Active",
    characters: 1,
    assets: 2104,
    videos: 148,
    lastActivity: "23 minutes ago",
    gradient: "from-fuchsia-500 to-cyan",
    tags: ["IG", "Fashion", "PuLID"],
  },
  {
    id: "product-ad-nexus",
    name: "Nexus Watch Launch",
    description: "30s product ad — cinematic shots, voiceover, and lipsync demo.",
    status: "Draft",
    characters: 0,
    assets: 36,
    videos: 2,
    lastActivity: "Yesterday",
    gradient: "from-cyan to-indigo-400",
    tags: ["Product", "Ad", "LTX 2.3"],
  },
  {
    id: "youtube-shorts-kaito",
    name: "Kaito · YouTube Shorts",
    description: "Tech explainer shorts hosted by Kaito with auto subtitles.",
    status: "Paused",
    characters: 1,
    assets: 218,
    videos: 18,
    lastActivity: "3 days ago",
    gradient: "from-cyan to-emerald-400",
    tags: ["YouTube", "Tech"],
  },
  {
    id: "wedding-storyteller",
    name: "Wedding Storyteller",
    description: "AI-personalised wedding recap videos for studio clients.",
    status: "Draft",
    characters: 0,
    assets: 12,
    videos: 0,
    lastActivity: "5 days ago",
    gradient: "from-indigo-400 to-violet",
    tags: ["B2B", "Concept"],
  },
];

export type Character = {
  id: string;
  name: string;
  status: "Trained" | "Training" | "Draft";
  identity: number;
  consistency: number;
  loraVersion: string;
  references: number;
  lastGenerated: string;
  storage: string;
  videos: number;
  assets: number;
  gradient: string;
  project: string;
};

export const CHARACTERS: Character[] = [
  { id: "aria", name: "Aria Nakamura", status: "Trained", identity: 96, consistency: 94, loraVersion: "v3.2.1", references: 184, lastGenerated: "2m ago", storage: "1.8 GB", videos: 96, assets: 1284, gradient: "from-violet to-pink-400", project: "TikTok MC AI" },
  { id: "kaito", name: "Kaito Voss", status: "Training", identity: 78, consistency: 71, loraVersion: "v1.0.4", references: 96, lastGenerated: "3h ago", storage: "0.9 GB", videos: 18, assets: 218, gradient: "from-cyan to-emerald-400", project: "Kaito · Shorts" },
  { id: "luna", name: "Luna Sterling", status: "Trained", identity: 98, consistency: 95, loraVersion: "v4.0.0", references: 212, lastGenerated: "23m ago", storage: "2.4 GB", videos: 148, assets: 2104, gradient: "from-amber-400 to-pink-400", project: "AI Influencer · Luna" },
  { id: "rex", name: "Rex Aurelius", status: "Draft", identity: 32, consistency: 28, loraVersion: "v0.1.0", references: 24, lastGenerated: "—", storage: "0.2 GB", videos: 0, assets: 24, gradient: "from-indigo-400 to-violet", project: "—" },
  { id: "iris", name: "Iris Hollow", status: "Trained", identity: 92, consistency: 88, loraVersion: "v2.1.0", references: 148, lastGenerated: "1d ago", storage: "1.4 GB", videos: 28, assets: 412, gradient: "from-fuchsia-500 to-cyan", project: "Cafe Marketing" },
  { id: "nova", name: "Nova Park", status: "Trained", identity: 89, consistency: 86, loraVersion: "v2.4.0", references: 132, lastGenerated: "6h ago", storage: "1.1 GB", videos: 41, assets: 564, gradient: "from-emerald-400 to-cyan", project: "Nexus Launch" },
];

export type AssetItem = {
  id: string;
  name: string;
  kind: "Image" | "Video" | "Voice" | "Subtitle" | "Character" | "LoRA";
  size: string;
  model: string;
  project: string;
  createdAt: string;
  gradient: string;
};

const grads = [
  "from-violet to-pink-400",
  "from-cyan to-emerald-400",
  "from-amber-400 to-pink-400",
  "from-indigo-400 to-violet",
  "from-fuchsia-500 to-cyan",
  "from-emerald-400 to-cyan",
  "from-pink-500 to-violet",
];

export const ASSETS: AssetItem[] = Array.from({ length: 24 }).map((_, i) => {
  const kinds: AssetItem["kind"][] = ["Image", "Video", "Voice", "Subtitle", "Character", "LoRA"];
  const kind = kinds[i % kinds.length];
  return {
    id: `ast_${(1000 + i).toString(16)}`,
    name: `${kind.toLowerCase()}_${(1000 + i).toString(16)}`,
    kind,
    size: kind === "Video" ? `${(Math.random() * 80 + 8).toFixed(1)} MB` : kind === "Voice" ? `${(Math.random() * 4 + 0.4).toFixed(2)} MB` : `${(Math.random() * 6 + 0.2).toFixed(2)} MB`,
    model: ["FLUX", "Wan 2.2", "LTX 2.3", "PuLID", "XTTS", "LatentSync"][i % 6],
    project: ["TikTok MC AI", "Cafe Marketing", "AI Influencer · Luna", "Nexus Launch"][i % 4],
    createdAt: `${(i % 12) + 1}h ago`,
    gradient: grads[i % grads.length],
  };
});

export type AgentStep = {
  id: string;
  label: string;
  model: string;
  status: "done" | "running" | "queued" | "error" | "idle";
  duration: string;
  cost: string;
};

export const AGENT_PIPELINE: AgentStep[] = [
  { id: "prompt", label: "Prompt Agent", model: "GPT-Mix · v4", status: "done", duration: "1.2s", cost: "$0.002" },
  { id: "script", label: "Script Agent", model: "Claude · sonnet", status: "done", duration: "4.8s", cost: "$0.014" },
  { id: "storyboard", label: "Storyboard Agent", model: "FLUX Kontext", status: "done", duration: "12.4s", cost: "$0.041" },
  { id: "image", label: "Image Agent", model: "FLUX Dev FP8", status: "running", duration: "28.1s", cost: "$0.092" },
  { id: "video", label: "Video Agent", model: "Wan 2.2", status: "queued", duration: "—", cost: "—" },
  { id: "voice", label: "Voice Agent", model: "XTTS v2", status: "queued", duration: "—", cost: "—" },
  { id: "editor", label: "Editor Agent", model: "LatentSync", status: "idle", duration: "—", cost: "—" },
  { id: "publish", label: "Publishing", model: "TikTok API", status: "idle", duration: "—", cost: "—" },
];

export const COPILOT_ACTIONS = [
  { id: "tiktok", label: "TikTok Avatar", hint: "Daily 60s AI host", icon: "tiktok" },
  { id: "marketing", label: "Marketing Video", hint: "30s product ad", icon: "marketing" },
  { id: "short", label: "YouTube Short", hint: "Vertical 9:16 · 60s", icon: "short" },
  { id: "product", label: "Product Ad", hint: "Cinematic LTX 2.3", icon: "product" },
  { id: "influencer", label: "AI Influencer", hint: "Persistent identity", icon: "influencer" },
  { id: "custom", label: "Custom Workflow", hint: "Start from scratch", icon: "custom" },
] as const;

export const RECENT_JOBS = [
  { id: "j_01", title: "Aria · Tokyo rooftop", model: "Wan 2.2", time: "2m", gradient: "from-violet to-pink-400" },
  { id: "j_02", title: "Luna · Paris cafe", model: "FLUX Kontext", time: "12m", gradient: "from-amber-400 to-pink-400" },
  { id: "j_03", title: "Kaito · keynote stage", model: "LTX 2.3", time: "1h", gradient: "from-cyan to-emerald-400" },
  { id: "j_04", title: "Nexus watch · macro", model: "FLUX Dev", time: "1h", gradient: "from-cyan to-indigo-400" },
  { id: "j_05", title: "Iris · neon alley", model: "Wan 2.2", time: "3h", gradient: "from-fuchsia-500 to-cyan" },
  { id: "j_06", title: "Nova · studio portrait", model: "PuLID", time: "5h", gradient: "from-emerald-400 to-cyan" },
];