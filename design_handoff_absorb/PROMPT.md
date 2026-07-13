# Claude Code kickoff prompt for Absorb

Setup first (once):
1. Put your existing `CLAUDE.md` at the repo root (Claude Code reads it automatically every session).
2. Put this handoff folder in the repo as `design/` (so `design/README.md`, `design/tokens/`, `design/Absorb Pages.dc.html` exist).

Then start each session with a prompt like the ones below. Because CLAUDE.md is auto-loaded, you never re-explain the rules — you just point at the next slice.

---

## Session 1 prompt (paste this)

```
Read CLAUDE.md fully, then read design/README.md — it is the binding
design spec for Absorb (high-fidelity; the HTML file in design/ is a
reference prototype, not code to copy).

We are on step 1 of the build order in CLAUDE.md §6: scaffold the
Next.js (App Router) + TypeScript project.

Per §0: plan first in plain English and wait for my "go" before
writing any code. One slice only — do not touch Supabase, auth, or
any UI screens yet. While scaffolding, also copy design/tokens/*.css
into the app as global styles and load the three Google Fonts
(Bodoni Moda, Archivo, Space Mono), since every later screen needs
them. Explain the folder structure to me when done and quiz me on it.
```

## Follow-up sessions (same pattern, next slice)

```
Read CLAUDE.md and design/README.md. Last session we finished step N
(<one line on what works>). Today is step N+1: <slice>. Plan first,
wait for my "go", one slice only, teach-back after.
```

Map the design screens onto the CLAUDE.md §6 build order like this:
- Step 2 (Supabase + schema) & step 3 (auth) → build the **Login** screen from the spec as the face of step 3.
- Step 4 (capture one note) → the **"+ Add a note"** card / capture flow on the Day Board.
- Step 5 (shelf / read path) → **Home week row**, **Day Board cards**, then **Calendar**.
- Step 6 (knowledge graph) → the **Graph** screen; remember §0 says YOU write the first draft of buildGraph() and Claude reviews it.

## Tips
- If Claude generates too much at once, say: "Stop — CLAUDE.md §0. Smaller step, explain first."
- When a screen looks off, open design/Absorb Pages.dc.html next to the app and name the specific difference (spacing, font, color token) rather than "make it prettier".
- Ask Claude to use the CSS variables from design/tokens/colors.css by name (var(--surface-card), var(--accent)…) — never hard-coded hex — so the dark "after hours" theme works for free.
```
