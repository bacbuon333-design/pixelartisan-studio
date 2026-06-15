
# Roadmap nâng cấp AI Video Factory → 9.5/10

Mục tiêu: chuyển từ "1 dashboard nhồi 3 sản phẩm" sang **multi-surface SaaS** giống Vercel / Linear / Runway, **project-centric** thay vì asset-centric.

## 1. Tách routes — mỗi surface 1 trang

Hiện tại tất cả render trong `src/components/factory/Dashboard.tsx` ở `/`. Sẽ tách thành route riêng dùng TanStack file-based routing:

```
src/routes/
  index.tsx               -> Dashboard (Quick Generate + Queue + Workers + Recent Jobs)
  projects.tsx            -> Projects list (project-centric workspace)
  projects.$id.tsx        -> Project detail (Characters/Images/Videos/Voice/Workflow/Assets tabs)
  characters.tsx          -> Character Studio (LoRA / InstantID / PuLID)
  assets.tsx              -> Asset Library (Images/Videos/Voices/Subtitles/LoRA)
  agents.tsx              -> Agent Studio (workflow + run/pause/logs/cost)
  factory.tsx             -> Render Farm (Workers/GPU/Colab/Queue)
  analytics.tsx           -> Analytics
  settings.tsx            -> Settings
```

Sidebar đã có sẵn — chỉ cần đổi từ scroll-to-section sang `<Link to=...>` và highlight active route.

## 2. Dashboard `/` — gọn lại

Chỉ giữ:
- **Quick Generate** (rút gọn từ CommandCenter — 1 prompt + model picker + Generate)
- **AI Copilot Actions** (mới — xem mục 6)
- **Active Queue** (compact ActiveJobs)
- **Worker Status** (compact SystemStatus pills)
- **Recent Jobs** (grid 6 thumbnail gần nhất)

Bỏ khỏi `/`: Character Engine, Agent Studio full, Render Farm full, Analytics full, Storage Center → các trang riêng.

## 3. Projects — surface mới (quan trọng nhất)

Trang `/projects`: grid card project ("TikTok MC AI", "Cafe Marketing Campaign"…) với cover, character count, asset count, last activity, status.

Trang `/projects/$id`: layout giống Linear/Vercel project:
- Header: tên project, status, collaborators, settings
- Tabs: **Overview · Characters · Images · Videos · Voice · Workflow · Assets**
- Mỗi tab là 1 view scoped vào project

Data: mock `projects[]` in-memory (chưa cần Cloud cho mockup).

## 4. Character Studio nâng cấp

Mỗi character card thêm metrics vận hành:
- Identity Score (0-100)
- Consistency Score (0-100)
- LoRA Version (v1.2.3)
- Reference Count (24 refs)
- Last Generated (2h ago)
- Storage Used (1.2 GB)

Thêm detail drawer khi click: training history, reference gallery, version list, deploy/retrain actions.

## 5. Asset Library

Trang `/assets` kiểu Runway Assets + Google Drive:
- Sidebar filter: All / Images / Videos / Voices / Subtitles / Characters / LoRA
- Toolbar: search, sort, view toggle (grid/list), upload, new folder
- Grid thumbnails với hover preview, multi-select, bulk actions
- Right panel: metadata khi chọn asset (size, model, prompt, project, tags)

## 6. AI Copilot Actions (thay vì chat float)

Component mới trên Dashboard — **action-first**, không phải chat:

```
What do you want to create today?
[ TikTok Avatar ] [ Marketing Video ] [ YouTube Short ]
[ Product Ad ]    [ AI Influencer ]   [ Custom ... ]
```

Click → mở workflow tương ứng trong Agent Studio với preset đã fill sẵn. CopilotFab cũ chuyển thành secondary (chat hỏi đáp).

## 7. Agent Studio — agent thật

Đổi node graph generic sang pipeline có ý nghĩa:

```
Prompt → Script → Storyboard → Image → Video → Voice → Editor → Publishing
```

Mỗi node hiển thị: model, status (idle/running/done/error), duration, cost.
Toolbar: **Run Workflow · Pause · Resume · Logs · Cost breakdown**.
Side panel Logs với streaming-style log entries (mock).

## 8. Factory `/factory`

Gộp RenderFarm + SystemStatus + queue chi tiết:
- Workers grid (Colab/Ngrok endpoints với status, GPU, VRAM, jobs)
- GPU utilization charts
- Queue Redis/Celery với job list, retry, priority
- Add Worker / Spin up Colab actions

## 9. Visual / polish

Giữ nguyên design system (oklch, aurora gradient, glass). Bổ sung:
- Page header pattern thống nhất (title + description + actions) cho mỗi route
- Breadcrumb cho project detail
- Empty states đẹp cho Projects/Assets khi rỗng
- Skeleton loading

## Technical details

- **Routing**: tạo các file route mới, đổi `Sidebar.tsx` items thành `Link to`, dùng `useRouterState` highlight active. `Dashboard.tsx` cũ sẽ giải thể — các section component được tái dùng trong các route mới.
- **Mock data**: tách `src/components/factory/data/` chứa `projects.ts`, `characters.ts`, `assets.ts`, `agents.ts` để các trang share.
- **Components mới**:
  - `sections/QuickGenerate.tsx`, `sections/CopilotActions.tsx`, `sections/RecentJobs.tsx`
  - `projects/ProjectGrid.tsx`, `projects/ProjectDetail.tsx`, `projects/ProjectTabs.tsx`
  - `assets/AssetLibrary.tsx`, `assets/AssetGrid.tsx`, `assets/AssetMetaPanel.tsx`
  - `characters/CharacterDetail.tsx` (drawer)
  - `agents/AgentPipeline.tsx`, `agents/AgentNode.tsx`, `agents/AgentLogs.tsx`
- **Reuse**: `Analytics.tsx`, `StorageCenter.tsx`, `SettingsSection.tsx` giữ nguyên, chỉ wrap vào route.
- Vẫn frontend-only mockup, chưa cần Lovable Cloud.

## Câu hỏi trước khi build

1. Bạn muốn mình làm **toàn bộ roadmap trong 1 lần** hay chia phase (Phase 1 = tách routes + Projects + Copilot Actions; Phase 2 = Assets + Character upgrade; Phase 3 = Agent pipeline + Factory)?
2. Có muốn mình giữ trang `/` cũ làm "Overview demo" và thêm các route mới song song, hay thay thế hẳn?
