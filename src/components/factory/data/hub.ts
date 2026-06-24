export type WorkerStatus = "online" | "warming" | "throttled" | "offline" | "error";
export type WorkerPlatform = "Colab" | "Local" | "RunPod" | "Lambda";

export type Worker = {
  id: string;
  alias: string;
  account: string;
  platform: WorkerPlatform;
  region: string;
  gpu: string;
  vramUsed: number;
  vramTotal: number;
  utilization: number;
  temp: number;
  uptime: string;
  jobs: number;
  role: "flux1-dev" | "qwen3-4b" | "wan2.1" | "whisper" | "comfy-ui";
  roleLabel: string;
  tunnel: string;
  latency: number;
  status: WorkerStatus;
};

export const WORKERS: Worker[] = [
  { id: "w_01", alias: "nebula-01", account: "vinh.ai+01@gmail.com", platform: "Colab", region: "us-central1", gpu: "Tesla T4 · 16GB", vramUsed: 11.2, vramTotal: 16, utilization: 78, temp: 67, uptime: "2h 14m", jobs: 24, role: "flux1-dev", roleLabel: "FLUX.1 Dev · ComfyUI", tunnel: "ngrok-a7f2.io", latency: 84, status: "online" },
  { id: "w_02", alias: "nebula-02", account: "vinh.ai+02@gmail.com", platform: "Colab", region: "us-central1", gpu: "Tesla T4 · 16GB", vramUsed: 14.6, vramTotal: 16, utilization: 96, temp: 74, uptime: "1h 42m", jobs: 31, role: "wan2.1",   roleLabel: "Wan 2.1 · Video", tunnel: "ngrok-b3e1.io", latency: 102, status: "online" },
  { id: "w_03", alias: "pulsar-01", account: "vinh.ai+03@gmail.com", platform: "Colab", region: "asia-southeast1", gpu: "Tesla T4 · 16GB", vramUsed: 4.8, vramTotal: 16, utilization: 22, temp: 54, uptime: "38m", jobs: 6, role: "qwen3-4b", roleLabel: "Qwen3 · Planner", tunnel: "ngrok-c9d4.io", latency: 61, status: "online" },
  { id: "w_04", alias: "quasar-01", account: "studio.gpu@local", platform: "Local", region: "vn-hcm-rig", gpu: "RTX 4090 · 24GB", vramUsed: 18.4, vramTotal: 24, utilization: 88, temp: 71, uptime: "11h 02m", jobs: 142, role: "flux1-dev", roleLabel: "FLUX.1 Dev · Hi-Res", tunnel: "direct://10.0.0.4", latency: 4, status: "online" },
  { id: "w_05", alias: "comet-01", account: "runpod://pod-xz9", platform: "RunPod", region: "eu-ro-1", gpu: "RTX A5000 · 24GB", vramUsed: 9.1, vramTotal: 24, utilization: 41, temp: 62, uptime: "3h 21m", jobs: 18, role: "whisper", roleLabel: "Whisper · LatentSync", tunnel: "pod-xz9.runpod.net", latency: 138, status: "online" },
  { id: "w_06", alias: "nova-02", account: "vinh.ai+05@gmail.com", platform: "Colab", region: "us-east1", gpu: "Tesla T4 · 16GB", vramUsed: 0, vramTotal: 16, utilization: 0, temp: 41, uptime: "warming", jobs: 0, role: "comfy-ui", roleLabel: "ComfyUI · Boot", tunnel: "—", latency: 0, status: "warming" },
  { id: "w_07", alias: "halley-01", account: "vinh.ai+06@gmail.com", platform: "Colab", region: "us-west1", gpu: "Tesla T4 · 16GB", vramUsed: 6.2, vramTotal: 16, utilization: 38, temp: 58, uptime: "44m", jobs: 9, role: "qwen3-4b", roleLabel: "Qwen3 · Critic", tunnel: "ngrok-h2k1.io", latency: 92, status: "throttled" },
  { id: "w_08", alias: "orion-01", account: "vinh.ai+07@gmail.com", platform: "Colab", region: "us-central1", gpu: "Tesla T4 · 16GB", vramUsed: 0, vramTotal: 16, utilization: 0, temp: 39, uptime: "—", jobs: 0, role: "flux1-dev", roleLabel: "FLUX.1 Dev", tunnel: "—", latency: 0, status: "offline" },
];

export const GATEWAY_METRICS = {
  workersOnline: WORKERS.filter((w) => w.status === "online").length,
  workersTotal: WORKERS.length,
  queueDepth: 27,
  throughput: 142,
  ngrokTunnels: 6,
  sandboxes: 4,
  costPerHour: 0.34,
  selfHealEvents: 18,
};

export type LangNode = {
  id: string;
  label: string;
  role: "Architect" | "Coder" | "Sandbox" | "Critic" | "Fixer" | "Publisher";
  model: string;
  status: "idle" | "running" | "done" | "error";
  x: number;
  y: number;
  meta: string;
};

export const LANG_NODES: LangNode[] = [
  { id: "n1", label: "Architect", role: "Architect", model: "Gemini 3.5 Pro", status: "done", x: 6,  y: 50, meta: "Plan JSON · 1.4s" },
  { id: "n2", label: "Coder",     role: "Coder",     model: "Gemini 3.5 Flash", status: "done", x: 28, y: 28, meta: "Patch · 3 files" },
  { id: "n3", label: "Sandbox",   role: "Sandbox",   model: "Docker · py3.11",  status: "running", x: 50, y: 50, meta: "pytest · 12/18" },
  { id: "n4", label: "Critic",    role: "Critic",    model: "Qwen3-4B",         status: "idle", x: 28, y: 72, meta: "awaiting logs" },
  { id: "n5", label: "Fixer",     role: "Fixer",     model: "Gemini 3.5 Pro",   status: "idle", x: 72, y: 28, meta: "stand-by" },
  { id: "n6", label: "Publisher", role: "Publisher", model: "Gateway · FastAPI", status: "idle", x: 94, y: 50, meta: "ngrok ready" },
];

export const LANG_EDGES: [string, string][] = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "n5"], ["n5", "n3"], ["n3", "n6"],
];

export type Container = {
  id: string;
  name: string;
  image: string;
  profile: string;
  cpu: number;
  mem: number;
  memTotal: number;
  status: "running" | "exited" | "restarting";
  uptime: string;
};

export const CONTAINERS: Container[] = [
  { id: "c_01", name: "gemini-cli-alpha",  image: "gemini-cli:latest", profile: "~/.gemini-alpha",  cpu: 38, mem: 1.8, memTotal: 4, status: "running", uptime: "2h 11m" },
  { id: "c_02", name: "gemini-cli-bravo",  image: "gemini-cli:latest", profile: "~/.gemini-bravo",  cpu: 62, mem: 2.4, memTotal: 4, status: "running", uptime: "1h 28m" },
  { id: "c_03", name: "gemini-cli-charlie",image: "gemini-cli:latest", profile: "~/.gemini-charlie",cpu: 12, mem: 0.9, memTotal: 4, status: "running", uptime: "44m" },
  { id: "c_04", name: "sandbox-pytest",    image: "python:3.11-slim",  profile: "/sandbox/run-218", cpu: 84, mem: 3.1, memTotal: 4, status: "running", uptime: "11s" },
  { id: "c_05", name: "sandbox-canary",    image: "python:3.11-slim",  profile: "/sandbox/run-217", cpu: 0,  mem: 0.2, memTotal: 4, status: "exited",  uptime: "—" },
];

export const CONSOLE_LOG: { ts: string; level: "INFO" | "OK" | "WARN" | "ERR" | "AI"; tag: string; msg: string }[] = [
  { ts: "23:42:18.214", level: "INFO", tag: "gateway",   msg: "POST /api/workers/register  alias=nebula-01  role=flux1-dev" },
  { ts: "23:42:18.402", level: "OK",   tag: "ngrok",     msg: "tunnel established  https://ngrok-a7f2.io  → 127.0.0.1:8000" },
  { ts: "23:42:19.117", level: "AI",   tag: "architect", msg: "plan generated · 6 steps · est. 42s · cost $0.014" },
  { ts: "23:42:20.880", level: "AI",   tag: "coder",     msg: "patch applied · app/services/render.py +18 -4 · 2 files touched" },
  { ts: "23:42:21.044", level: "INFO", tag: "sandbox",   msg: "spawn container=python:3.11-slim profile=/sandbox/run-218" },
  { ts: "23:42:24.512", level: "WARN", tag: "sandbox",   msg: "pytest fail · tests/test_render.py::test_lora_mix · AssertionError" },
  { ts: "23:42:24.611", level: "AI",   tag: "critic",    msg: "log parsed · root cause: missing tensor dtype cast" },
  { ts: "23:42:25.310", level: "AI",   tag: "fixer",     msg: "surgical patch · render.py:142  to(torch.float16)" },
  { ts: "23:42:27.901", level: "OK",   tag: "sandbox",   msg: "pytest green · 18/18 · 2.61s · run-218 ready to publish" },
  { ts: "23:42:28.011", level: "INFO", tag: "queue",     msg: "job j_142 → worker nebula-01 · priority=high" },
  { ts: "23:42:28.402", level: "OK",   tag: "worker",    msg: "nebula-01 ack · ComfyUI graph compiled · 1024x1536 FLUX.1 Dev" },
  { ts: "23:42:29.118", level: "ERR",  tag: "worker",    msg: "halley-01 throttled by Colab · failover → quasar-01 (local RTX 4090)" },
  { ts: "23:42:29.620", level: "AI",   tag: "publisher", msg: "asset stored · r2://characters/aria/lora_v3.2.1.safetensors" },
];