# CLAUDE.md — Absorb

This file is read automatically at the start of every Claude Code session. It defines what we're building, how we work together, and the rules of the project. Read it fully before doing anything.

---

## 0. How we work together (READ THIS FIRST)

**I am using this project to learn. Optimize for my understanding, not for finishing fast.**

- **Go slow. One small step at a time.** Never build more than one feature or slice in a single turn.
- **Plan before code.** Before writing anything, explain in plain English what you're about to do and why. Wait for me to say "go" before writing code.
- **Teach-back after every step.** After writing code, explain what it does, line by line where it matters, in beginner-friendly language. Then ask me a question or two to check I understood.
- **Don't advance until I confirm.** Do not start the next step until I explicitly say I understand and I'm ready.
- **Let me write the important parts.** For core logic (especially the knowledge-graph code and the data layer), explain the approach, then let ME write a first attempt and you review/correct it. You may fully write boilerplate (config, plumbing) without me typing it.
- **No silent magic.** If you introduce a new library, concept, or pattern, name it and explain it before using it.
- **When I'm confused, slow down further** — use an analogy or a smaller example. Don't just restate the code.

If you ever catch yourself about to generate a large amount of code across multiple files at once, STOP and break it into smaller steps instead.

---

## 1. What we're building

**Absorb** is a personal web app for capturing what you learn each day.

- The user writes a note, tags it with one **category**, and records the **source** it came from.
- Each **day** is its own page; days are isolated and never merged.
- Days appear on a visual **shelf** (a gallery of cards).
- After **7 days logged**, a **knowledge graph** unlocks: a map of the user's learning.

The full requirements live in the PRD (kept alongside this repo). This file is the working summary for the build.

---

## 2. Core principles (do not violate)

1. **No AI. Ever.** Absorb uses zero LLMs, ML models, or inference. Every feature, including the graph, is plain deterministic code. If a task seems to "need AI," it doesn't — ask me.
2. **The UI is derived from data.** We store plain rows (notes, days). We never store rendered components, pages, or the graph. The shelf and the graph are recomputed from the data every time.
3. **Security lives in the database (RLS), not app code.** Each user only ever sees their own rows, enforced by Postgres Row-Level Security.
4. **Keep it simple. No over-engineering.** This is a small app. See §7 for things we deliberately do NOT do.

---

## 3. Tech stack

- **Frontend:** React via **Next.js** (App Router) + **TypeScript**.
- **Hosting:** **Vercel**.
- **Backend + database + auth:** **Supabase** (managed Postgres). The app talks to Supabase directly from the client using the **anon** key. There is **no separate backend server** for the MVP.
- **Graph rendering:** a force-graph library in the browser (we'll choose together — likely `react-force-graph` or D3-force). The graph is computed on the client from the user's notes.

---

## 4. Data model

Two tables, plus the auth-linked profile. Categories are a fixed list in TypeScript config (NOT a table). Sources are just text on a note.

```
profiles  { id (= auth.users.id), created_at }
days      { id, user_id, date, status: "draft" | "finalized", created_at, finalized_at }
            UNIQUE (user_id, date)          -- one page per calendar date
notes     { id, day_id, user_id, text, category, source, created_at }
```

- `user_id` is carried on `notes` too, so RLS is a simple column check (no joins).
- Every table has an RLS policy: a user can only read/write rows where `user_id = auth.uid()`.
- Use **Supabase migrations** (SQL files in the repo), not dashboard clicks, so the schema is reproducible.

---

## 5. The knowledge graph (the centerpiece) — exact spec

Computed deterministically from the user's notes. No AI.

- **Nodes** = each category that has at least one note (one bubble per topic).
- **Node size** = total number of notes in that category. Bigger bubble = more notes. Show the count inside the bubble, the category name beneath.
- **Edges** = connect two categories that appear on the **same day** at least once.
- **Edge thickness** = the number of days those two categories co-occurred (more shared days = thicker line).
- **Node color** = the category's color from the fixed palette.
- **Layout** = force-directed, with collision so bubbles don't overlap; nodes draggable; hover shows the topic's count, days spanned, and top pairings.

Construction is essentially: (1) `GROUP BY category` to get node sizes, (2) for each day, tally every pair of categories that appear together to get edge weights, (3) hand `{nodes, edges}` to the force-graph component. That's the whole algorithm — keep it that simple.

---

## 6. Build order (follow this; one slice per session)

1. **Scaffold** — Next.js + TypeScript project running locally. Understand the folder structure.
2. **Supabase + schema** — connect Supabase; create `days` and `notes` via a migration; add RLS policies. Understand how the client reaches the DB.
3. **Auth** — sign in / sign out. Understand the session and `auth.uid()`.
4. **Capture one note** — write a note (text + category + source) to the DB. The write path.
5. **Shelf** — load and list days as cards. The read path.
6. **Knowledge graph** — `buildGraph(notes)` → `{nodes, edges}` → force-graph render. Last.

Do not jump ahead. Each step must work and be understood before the next.

---

## 7. Things we deliberately do NOT do

- ❌ No Neo4j or any graph database. The graph is tiny; Postgres + compute-on-read is correct.
- ❌ No separate backend server / API tier for the MVP. Supabase + RLS is the backend.
- ❌ No AI, LLM calls, embeddings, or ML pipelines.
- ❌ No agent loops or autonomous agents in the product.
- ❌ No storing of computed visuals (graph, cards) — always recompute from data.
- ❌ Never put the Supabase `service_role` key in client code. Anon key only; RLS does the security.
- ❌ No big multi-file code dumps. Small steps only (see §0).

---

## 8. Conventions

- TypeScript everywhere; prefer explicit types for data shapes (`Note`, `Day`, `Category`).
- Generate Supabase types from the schema (`supabase gen types typescript`) so DB and frontend can't drift.
- Keep all Supabase reads/writes in a small typed data layer (e.g. `lib/data.ts`) — components call those functions, not raw queries.
- Handle the empty state everywhere (no notes yet, fewer than 7 days, etc.).
- Decide and document how "today's date" is determined (timezone) — it affects the `UNIQUE (user_id, date)` rule.

---

## 9. When in doubt

Ask me before assuming. A clarifying question is always better than building the wrong thing or skipping ahead. Remember: the goal is that **I understand every part of this app by the end**, not just that it works.