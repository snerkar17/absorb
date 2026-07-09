# Build Phases — Absorb

Status: ✅ done · 🔜 next · ⬜ upcoming

Follows the build order in CLAUDE.md §6. One phase per session; each must work and be understood before the next.

## Phase 0 — Scaffold ✅
Next.js + TypeScript + Tailwind app running locally. Repo split into `frontend/` (the Next.js app) and `backend/` (Supabase artifacts only — no custom server, per CLAUDE.md §7). Docs stay at repo root.

## Phase 1 — Tooling: Chrome DevTools MCP ✅
MCP server (`.mcp.json`) that drives a real Chrome browser — navigate, screenshot, console/network access. This is what makes the visual self-validation loop in Phases 4–6 possible.

## Phase 2 — Supabase 🔜
`supabase init` in `backend/`; migration for `profiles` / `days` / `notes` (CLAUDE.md §4) with RLS policies so each table only allows `user_id = auth.uid()`. Then you create the actual Supabase project (your account), we link it and drop keys into `frontend/.env.local`, and generate a typed client.

## Phase 3 — Auth ⬜
Sign in / sign out. Understand the session and `auth.uid()` — what RLS checks against.

## Phase 4 — Capture (write path) ⬜
First real screen: note text + category + source → DB. First use of the self-validation loop: build → run dev server → Chrome DevTools MCP screenshot → grade against `absorb-ui-part1/2.html` and the PRD's design tokens (§6.2, §6.4) → iterate until it matches.

## Phase 5 — Shelf (read path) ⬜
Load and list days as cards. Same build → screenshot → grade → iterate loop, applied to the day-card grid.

## Phase 6 — Knowledge graph ⬜
`buildGraph(notes)` → `{nodes, edges}` → force-graph render. Heaviest use of the visual-fidelity loop (bubble sizing, edge thickness, force layout, hover tooltip). Last slice — the centerpiece.
