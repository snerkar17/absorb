# Handoff: Absorb — Login, Home, Day Board, Calendar, Knowledge Graph

## Overview
Five screens for **Absorb**, a personal learning journal: users log daily notes (text + category + source), browse them as flippable index cards, revisit past days via a calendar, and — after 7 logged days — unlock a deterministic knowledge graph of their categories.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, **not production code to copy**. Recreate these designs in the target codebase: **Next.js (App Router) + TypeScript + Supabase**, per the repo's CLAUDE.md. `Absorb Pages.dc.html` is the interactive prototype; `tokens/` contains the real CSS custom properties — copy these token files into the app verbatim.

## Fidelity
**High-fidelity.** Colors, type, spacing, radii, shadows, and copy voice are final (Commonplace Design System). Recreate pixel-faithfully.

## Design system (binding)
- **Fonts (Google Fonts):** Bodoni Moda (serif — headlines, big numerals, note text), Archivo (sans — body/UI), Space Mono (mono — ALL-CAPS metadata "stamps", letter-spacing 0.14em, 10–11px).
- **Surfaces:** warm bone paper, never white/grey. Page `#F0ECDF`, card `#F7F4EB`, raised `#FCFBF6`, sunken `#E6E1CF`. Ink text `#19160F` / `#3A352A` / `#6B6454` / `#9B9482`.
- **Accent:** acid lime `#C7EE2B` with **black text on it** (`#19160F`); deep lime `#7E9A14` for text-on-paper accents.
- **Category inks:** Tangerine `#E2622C`, Cobalt `#2D45C6`, Magenta `#D32E80`, Violet `#7B45C6` (+ lime-700 in the prototype for a 5th).
- **Borders:** hairline `#D6CFB7` (1px), rule `#BDB49A` (1.5px), dashed for empty/locked states.
- **Radii:** 6px cards, 8–10px panels, pills only for tiny badges. **Shadows:** warm ink-tinted, low (`0 1px 2px rgba(43,32,23,.08)`-ish sm; slightly larger md on hover).
- **Motion:** settle, don't bounce — 120–340ms ease-out; hover = lift 2px + shadow-md.
- **Dark theme ("after hours")** is opt-in via `[data-theme="dark"]`; use the semantic tokens in `tokens/colors.css` and everything flips automatically.
- **Voice:** quiet, second person, sentence case; mono labels UPPERCASE. No emoji, no gamification.

## Screens

### 1. Login
- Centered column on page surface: CSS "C/A" seal (double ring, serif glyph), mono kicker `EST. 2026 · A DAILY PRACTICE`, serif masthead **Absorb** (72px, weight 500) with a lime dot, italic serif dek.
- Card (max-width 380px, card surface, hairline border, radius 8, shadow-md, 28px padding): Email + Password inputs with mono uppercase labels, full-width lime primary button **Sign in** (black text), footer links "Create an account" / "Forgot password".
- Footer stamp: `NO AI · YOUR WORDS ONLY`.
- **Behavior:** Supabase Auth (email/password). Success → Home.

### 2. Home / Greeting
- Header (shared by all app pages): wordmark + lime dot (left, links home); mono stamp `WEEK NN · N DAYS LOGGED` + quiet "Sign out" (right); 1.5px rule beneath. Content column max-width 1060px.
- Greeting: mono date stamp in deep lime, serif h1 ~52px ("Welcome back. Day 4 is open."), muted subline with real counts.
- **Week row:** 7-column grid (`repeat(7, 1fr)`, 12px gap), Sunday–Saturday. Each logged day = clickable card: mono day label, big serif date numeral (34px), category-color dots (unique categories that day), mono count "2 NOTES". Today gets a 1.5px ink border + lime `TODAY` pill. Unlogged days = dashed border, faint, non-clickable, "NOT YET".
- Ghost link under the grid: "Browse past notes in the calendar →".
- **Graph panel — locked (< 7 days):** sunken surface, dashed border, radius 10. Mono `KNOWLEDGE GRAPH · LOCKED`, serif line "Add notes for N more days and your week gets mapped.", 7 progress dots (lime = filled), "UNLOCKS AT 7 DAYS".
- **Graph panel — unlocked (7 days):** inverse (near-black) panel, lime mono kicker `KNOWLEDGE GRAPH · UNLOCKED`, serif line, lime primary button "Open your knowledge graph".

### 3. Day Board (index cards)
- Quiet back button (returns to Home or Calendar, whichever opened it). Mono stamp `DAY 04 · JULY 8 · 2 NOTES`, serif h1 = weekday name (46px). Right-aligned hint `TAP A CARD TO FLIP IT`. Archival double-rule divider.
- Card grid: `repeat(auto-fill, minmax(300px, 1fr))`, 18px gap, min-height 230px per card.
- **Card front:** raised surface, hairline border, **4px left edge in the category ink**, radius 6, shadow-sm. Header row: mono `● CATEGORY` in the ink + card number `01`. Body: ruled-paper background (repeating 30px hairlines) with the note in serif 21px/30px. Footer: `FROM · SOURCE` mono + flip glyph `↻`.
- **Card back (on click):** sunken body with stacked mono-labeled fields — Source (serif italic 18px), Category (mono, ink color), Logged (mono time). Click flips back. (In production: 3D flip or swap is fine; state is per-card.)
- **Add card:** dashed lime border, "+ ADD A NOTE", hover lime tint. Opens the capture flow.

### 4. Calendar
- Same header pattern; mono kicker `CALENDAR · N DAYS LOGGED THIS MONTH`, serif h1 "July 2026", hint `OPEN A DAY TO REVISIT ITS NOTES`, double-rule divider.
- Mono DOW header row (SUN–SAT), then a 7×5 grid (10px gap), min-height 96px cells.
- Logged day cell: card surface, serif date numeral 22px, category dots, mono note count; hover lifts; click → Day Board for that date. Today = ink border + lime pill.
- Empty day: dashed hairline, faint numeral, non-clickable. Out-of-month cells: invisible.
- Caption: `DOTS ARE CATEGORIES · DASHED DAYS HAVE NOTHING LOGGED`.

### 5. Knowledge Graph
- Kicker `KNOWLEDGE GRAPH · WEEK 28`, serif h1 "What your mind keeps circling", muted explainer.
- White-card panel containing the graph. **Nodes** = categories with ≥1 note; radius scales with note count; count in serif inside the bubble (light paper color), category name in mono beneath. **Edges** = categories co-occurring on the same day; stroke width = number of co-occurring days; color = border-rule, ~55% opacity, behind nodes.
- Legend row: dot + `CATEGORY · N` per node. Right caption: `DETERMINISTIC · NO AI · RECOMPUTED FROM YOUR NOTES`.
- Locked state (direct nav with < 7 days): dashed sunken panel with the lock line.
- **Production:** force-directed layout (d3-force or react-force-graph) with collision; draggable nodes; hover tooltip (count, days spanned, top pairings). The prototype uses fixed SVG positions — treat those as the target *look*, not the layout algorithm.

## Interactions & Behavior
- Login → Home; week-day card → Day Board; calendar cell → Day Board (back button returns to wherever you came from); graph button → Graph.
- Card flip: click toggles front/back, per-card state.
- Hover on any clickable card: `translateY(-2px)` + shadow-md, 180ms ease.
- Empty states everywhere: unlogged days dashed, graph locked with progress dots, calendar dashes.

## State & Data (Supabase — see repo CLAUDE.md §4–5)
- Tables: `days` (user_id, date, status) and `notes` (day_id, user_id, text, category, source, created_at); RLS `user_id = auth.uid()` on both; anon key only.
- Categories = fixed TS config mapping name → ink token (e.g. Science→cobalt, History→tangerine, Money→lime-700, Tech→magenta, Language→violet in the prototype; adjust to the product's real category list and the four source inks).
- Home: fetch this week's days + note counts + distinct categories per day. Graph unlock = `COUNT(days) >= 7` for the week.
- Day Board: fetch notes for one `day_id`.
- Graph: fetch all notes → client-side `buildGraph(notes)`: group by category for nodes; per-day category pairs tallied for edge weights. Never stored — recomputed on read.

## Files
- `Absorb Pages.dc.html` — interactive prototype (all 5 pages; bottom pill switcher is prototype chrome only — do not build it).
- `tokens/` — colors.css (light + dark), typography.css, spacing.css, elevation.css, texture.css, fonts.css. Copy into the app as global CSS.
- `PROMPT.md` — the kickoff prompt to paste into Claude Code.
