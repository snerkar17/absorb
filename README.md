# Absorb

*Write it · tag it · map it.*

We absorb content from all kinds of sources every day. What we keep coming back to says something about who we are — our thoughts, our interests, our opinions. Absorb is a small tool for noticing that pattern.

Absorb is a personal web app for capturing what you learn each day. You write a note, tag it with a category, and record where it came from. Every day is its own page. After 7 days logged, a **knowledge graph** unlocks — a map connecting the topics you've been learning, built entirely from your own data.


---

## What it does

- **Capture** — write a note, assign it one category (Science, History, Psychology, Finance, Tech News, Computer Science, Health/Wellness, Other), record its source as free text, and optionally attach the URL it came from.
- **Shelf** — logged days appear as cards on a home gallery, newest first, each showing its date, note count, and categories touched.
- **Day pages** — each day is self-contained. Notes never merge or move across days.
- **Calendar** — a month-grid view of every day you've logged, dotted by category, so you can jump back to any past day.
- **References** — every note with a URL attached is filed here too, grouped into past week / month / year, so sources you want to revisit don't get buried inside a specific day.
- **Streak & unlock** — the app counts days logged. At 7 days, the knowledge graph unlocks.
- **Knowledge graph** — a force-directed map of your topics: one bubble per category, colored and sized by how many notes it has, connected by edges where two categories showed up on the same day (thicker = more shared days). Nodes are draggable, and hovering one shows its note count, days spanned, and its top co-occurring categories.

---

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | [Next.js](https://nextjs.org) (App Router) + TypeScript, React 19 |
| Styling | Tailwind CSS v4 |
| Backend / DB / Auth | [Supabase](https://supabase.com) (managed Postgres, Auth, Row-Level Security) |
| Graph computation | Plain TypeScript (`GROUP BY`-style aggregation, no library) |
| Graph rendering | [`d3-force`](https://github.com/d3/d3-force) force-directed simulation, rendered to SVG |
| Hosting | [Vercel](https://vercel.com) |

There is no separate backend server. The Next.js app talks to Supabase directly from the browser using the public anon key; access control is enforced entirely by Postgres Row-Level Security, not application code.

---

## System design

```
Browser (Next.js client)
   │
   │  Supabase JS client, anon key
   ▼
Supabase
   ├─ Postgres (profiles, days, notes) — RLS enforced
   └─ Auth (session, auth.uid())
```

There's no separate backend server or API tier — the Next.js app talks to Supabase directly, and Postgres Row-Level Security (scoped to `auth.uid()`) is what keeps each user's data private, not application code. Nothing is computed or stored server-side: the shelf, calendar, and knowledge graph are all recomputed from the raw `notes`/`days` rows on every load, so the UI can never drift out of sync with what was actually written. The graph itself is plain aggregation (group notes by category for node size, tally same-day category pairs for edge weight) handed to a `d3-force` simulation for layout — no AI, no external calls.


