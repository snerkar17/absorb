# Absorb — Product Requirements Document

*Write it · tag it · map it. A daily learning journal that turns a week of notes into a knowledge graph — no AI required.*

Version 1.1 · Owner: [you] · Status: Draft for build

---

## 1. Overview

Absorb is a personal web app for capturing the things you learn each day. For every note you write the insight in your own words, tag it with a **category**, and record the **source** it came from. Each day is its own self-contained page, and your days line up into a visual shelf. After you've logged **7 days**, the app unlocks a **knowledge graph** that connects your notes by category and source — a living map of what you've been learning and where it came from.

The product is deliberately **non-AI**: every feature, including the graph, is produced by deterministic code from the structured data the user enters. This keeps it free to run, private, fast, and fully explainable. The design leans into a **fashion-vintage editorial** feel (see §6) — the design is a core part of the value, not decoration.

---

## 2. Goals & non-goals

**Goals**
- Make daily capture fast and intentional: write, categorize, cite a source.
- Reward the habit with a beautiful, browsable history (the shelf).
- Turn a week of structured notes into a knowledge graph that reveals patterns the user didn't have to label.
- Stay deterministic, private (enforced via per-user access control at the database layer), and low-cost to run.

**Non-goals (v1)**
- No AI/LLM features (no auto-writing, auto-tagging, or summarization).
- No collaboration, sharing, or social feed.
- No cross-day merging of note content — days stay isolated as written.
- No rich-text editor or wiki-style backlinks.

---

## 3. Target user

A naturally curious person who learns scattered things daily and wants a private, attractive place to keep them — and who finds motivation in seeing a streak grow and a personal knowledge map emerge. They value aesthetics, ownership of their data, and a tool that "just works" with a quick sign-in, no cost, and no AI dependence.

---

## 4. Key concepts & data model

| Concept | Description |
|---|---|
| **Note** | One learning, written by the user, with one category and one source. |
| **Day** | A dated page holding that day's notes. Self-contained; one page per calendar date. |
| **Category** | A fixed, app-defined label (with name, color, icon) the user assigns to each note. |
| **Source** | Free-text origin of the note (book, video, person, site), entered by the user. |
| **Streak** | Count of days logged; gates the knowledge-graph unlock at 7. |
| **Knowledge graph** | A deterministic topic map: one bubble per category, sized by note count, linked by how often topics co-occur. |

```
Note   { id, dayId, text, categoryId, source, createdAt }
Day    { id, date, status: "draft" | "finalized", noteIds[], createdAt, finalizedAt }
Category (config) { id, name, color, tint, icon }   // fixed set, not user-created in v1
Source (derived)  { normalizedKey, displayName, count }  // computed from notes
GraphConfig       { cooccurrence: "day" | "week", range: "all" | "last7" }
```

A source is not a stored entity; it's derived by normalizing note `source` strings (trim + case-fold) so "Veritasium" and "veritasium" group together.

---

## 5. Functional requirements

### 5.1 Capture
- **FR-1** The user can create a note by typing its text. Text is required and authored entirely by the user (no AI assistance).
- **FR-2** Each note must be assigned exactly one category from the fixed category set.
- **FR-3** Each note must record a source as free text.
- **FR-4** The user can add multiple notes to the current day in one session.
- **FR-5** The user can edit or delete a note at any time.
- **FR-6** The user can finalize a day to mark it complete; finalized days are visually indicated on the shelf. Finalizing does not lock the day — notes remain editable and deletable per FR-5.
- **FR-7** A note cannot be saved unless text, category, and source are all present.

### 5.2 Day & shelf
- **FR-8** Each day is isolated: note content is never merged or moved across days.
- **FR-9** There is one page per calendar date.
- **FR-10** The shelf displays all logged days, newest first, each showing the date, note count, and the categories present that day.
- **FR-11** The user can open any day to read its notes.
- **FR-12** A clear entry point lets the user start (or resume) the current day's page.

### 5.3 Categories & sources
- **FR-13** The app provides a fixed set of categories, each with a name, color, and icon, used consistently across capture, shelf, and graph.
- **FR-14** Sources are user-entered free text and are normalized (trimmed, case-folded) for grouping in the graph.
- **FR-15** *(v1.1)* The source field offers autocomplete suggestions from previously used sources.

### 5.4 Streak & unlock
- **FR-16** The app tracks the number of days logged (and current streak).
- **FR-17** The knowledge graph is locked until the user has logged 7 days.
- **FR-18** On reaching 7 logged days, the app surfaces an unlock affordance (banner/button); the graph opens only when the user chooses to view it.

### 5.5 Knowledge graph
- **FR-19** The graph is generated **deterministically** from the user's notes. No model, no inference.
- **FR-20** Each **node is a category** that has at least one note. There is exactly one bubble per such category (no per-note nodes, no source nodes).
- **FR-21** **Node size scales with the total number of notes** in that category, so heavily-logged topics appear as larger bubbles. The note count is displayed inside the bubble and the category name beneath it; the bubble uses the category's color.
- **FR-22** An **edge connects two categories that co-occur** — that appear together within the same time bucket at least once. **Edge thickness scales with the number of buckets in which the two categories co-occur** (how correlated they are).
- **FR-23** Topic co-occurrence is defined as appearing on the **same day** (decided default). A same-week option may be offered later as an alternate lens; switching recomputes the edges.
- **FR-24** The layout is force-directed with collision handling so bubbles don't overlap; nodes are draggable and the layout settles to a stable arrangement.
- **FR-25** Hovering or tapping a bubble reveals detail: the category name, its note count, the number of days it spans, and the topics it most often pairs with. A legend and a one-line caption explain the active view.
- **FR-26** The graph has a defined data scope. Default: **all logged days** (the map grows denser over time); the 7-day threshold is the unlock gate, not a cap. *(Scope is configurable — see Open decisions.)*
- **FR-27** The graph updates to reflect newly added notes and days.

### 5.6 Persistence & data ownership
- **FR-28** All data persists in a managed cloud database (Supabase/Postgres), scoped to the signed-in user, so it survives reloads and is available from any device the user signs into.
- **FR-29** *(v1.1)* The user can export their data as JSON and export the graph as an image.
- **FR-30** Every read and write requires an authenticated account; Postgres Row-Level Security scopes all access to `auth.uid() = user_id`, so a user can only ever see or change their own data. There is no anonymous access.

---

## 6. Design & UX specification

The design system is **"Commonplace"** — fashion-vintage Y2K editorial, with a pop. Warm bone magazine stock, vintage near-black ink, and a single acid-lime "pop" accent (black type sits directly on it) carry a printed, magazine-like feel instead of a typical software look. Light ("daylight") is the default surface; dark ("after hours") is an opt-in scope. Everything in capture and the shelf stays restrained; the knowledge graph is where the visual reward lands.

### 6.1 Design principles
1. **Editorial, not sterile** — warm bone paper (never cold white), printed vintage ink, and a single acid-lime pop color instead of a typical software palette.
2. **One signature moment** — the graph is the deliberate "wow"; nothing else competes with it.
3. **Structure is the beauty** — the categories and sources the user enters *are* the visual system; no decoration is invented.
4. **Three type voices** — a high-contrast didone serif for the knowledge itself (headings, takeaways, day numerals), an editorial grotesque for body/UI, and a retro-digital mono for metadata and the "logged" stamp.
5. **Consistency** — one category color language, drawn from four shared "source ink" families, is reused identically across capture, shelf, and graph.

### 6.2 Visual system (design tokens)

**Color**

| Token | Value | Use |
|---|---|---|
| Paper 50 | `#FCFBF6` | Brightest surface (raised cards) |
| Paper 100 | `#F7F4EB` | Card surface |
| Paper 200 | `#F0ECDF` | App background (the page) |
| Paper 300 | `#E6E1CF` | Sunken wells |
| Paper 400 | `#D6CFB7` | Hairline borders |
| Paper 500 | `#BDB49A` | Heavy rules |
| Ink 900 | `#19160F` | Primary text |
| Ink 700 | `#3A352A` | Secondary text |
| Ink 500 | `#6B6454` | Muted text / captions |
| Ink 300 | `#9B9482` | Faint / placeholder text |
| Lime 500 (accent) | `#C7EE2B` | The acid pop — big fills, primary buttons (ink text sits on top) |
| Lime 700 | `#7E9A14` | Accent hover/pressed, focus ring |
| Lime 100 | `#EEF8C2` | Pale tint for selected / unlock chips |

Four "source ink" families carry the rest of the palette — Tangerine, Cobalt, Magenta, Violet — each with a 700/500/300/100 ramp (deep / base / soft / tint). These are reused as the category colors in §6.3.

Shadows are warm-ink-tinted, never grey, from a soft `shadow-xs` up through a `shadow-pop`; plus a signature hard-offset "ink block" shadow (`4px 4px 0` solid ink, no blur) used sparingly for Y2K-editorial emphasis. Corner radii are restrained: 4–6px for standard cards/controls, 16px for large panels, 999px for pills.

**Typography**

| Role | Typeface | Notes |
|---|---|---|
| Display / headings / takeaways / day numerals | **Bodoni Moda** (didone serif) | High-contrast, optical — the "knowledge itself" voice |
| Body / UI / buttons | **Archivo** | Editorial grotesque, 400–600 weight |
| Dates, labels, timestamps | **Space Mono** | Retro-digital "logged" stamp voice, uppercase, wide tracking |

### 6.3 Category & source system

Eight fixed categories, each colored from the four shared source-ink ramps in §6.2 (colors repeat by family, not one unique hue per category) plus a soft tint for chips.

| Category | Color | Tint |
|---|---|---|
| Science | `#2D45C6` (Cobalt 500) | `#D3D8F3` |
| History | `#E2622C` (Tangerine 500) | `#F7DCC9` |
| Psychology | `#7B45C6` (Violet 500) | `#E3D6F3` |
| Finance | `#D32E80` (Magenta 500) | `#F6D2E5` |
| Tech News | `#6E7DDC` (Cobalt 300) | `#D3D8F3` |
| Computer Science | `#EE9265` (Tangerine 300) | `#F7DCC9` |
| Health/Wellness | `#A985DC` (Violet 300) | `#E3D6F3` |
| Other | `#E573A9` (Magenta 300) | `#F6D2E5` |

Sources are user text, shown in Space Mono, rendered as neutral (uncolored) elements so categories carry the color and sources read as connective tissue.

### 6.4 Core components
- **Header bar** — brand wordmark (Bodoni Moda + accent dot) left; streak pill (mono, accent outline) right. Persistent across views.
- **Day card** — date (mono) · large count (Bodoni Moda) · "things learned" · category chips. Hover lifts ~4px with deepened shadow.
- **New-day card** — dashed accent border, "＋ Start day N", invites the next entry.
- **Unlock banner** — dark ink-to-lime gradient with a soft radial highlight, headline + subcopy + pale highlight CTA button. Appears on the shelf once 7 days are logged.
- **Category chip / picker chip** — pill with icon + name; in the picker, selecting fills it with the category color.
- **Capture form** — note textarea, single-select category row, source input, primary "Add note" button (disabled until valid), and a running list of added notes (colored dot + text + "Category · source" in mono).
- **Note (read view)** — colored category dot, the text, and a mono "Category · source" line.
- **Graph canvas** — white rounded panel holding the SVG; nodes, edges, legend, caption, and a hover tooltip.
- **Segmented toggle** — pill container with two options; active option fills ink/white.

### 6.5 Screens & layout

**Shelf (home)** — Header bar; an unlock banner when eligible; an uppercase section label; a responsive grid of day cards (4 columns desktop → 2 tablet → 1 mobile) newest-first, ending with the dashed new-day card.

**Capture (day composer)** — A back link to the shelf; a centered Bodoni Moda title ("Day N · what did you learn?") with one line of subcopy; then three stacked fields — the note text, the category picker row, the source input — followed by the add-note action and the growing list of that day's notes below.

**Day detail (read-only)** — The finalized day's notes rendered in the read view; reached by opening a day card.

**Knowledge graph** — A header with title, one line of subcopy, and a Same-day / Same-week toggle; a small stats row (notes, topics, days, strongest pair); the graph canvas filling the width; a legend beneath it; and a one-line caption explaining the active view. Bubbles are sized by note count with the count shown inside and the category name below; edges thicken with co-occurrence. Nodes are draggable; hovering shows a dark tooltip with the topic's detail.

**Unlock** — Not a separate screen; the banner on the shelf is the entry point, and tapping it routes to the graph.

### 6.6 Navigation & information architecture
Three primary destinations — **Shelf ↔ Capture ↔ Graph** — with the Shelf as home. Capture is reached from the new-day card; the Graph is reached from the unlock banner (after eligibility) or any day card. A persistent back affordance returns to the Shelf from Capture and Graph.

### 6.7 Interaction & motion
- Views cross-fade in with a small upward translate.
- Day cards lift on hover; the graph "Open" hint slides in on hover.
- The graph uses a lightweight force-directed simulation that settles to rest; dragging a node reheats it briefly, then it re-settles.
- The tooltip fades in on node hover/tap and tracks the pointer.
- All motion respects `prefers-reduced-motion` (NFR-8): animations reduce to instant state changes; the graph may render a settled layout without the live simulation.

### 6.8 Responsive behavior
The shelf grid steps 4 → 2 → 1 columns. The graph canvas scales via a fixed SVG viewBox with `preserveAspectRatio`, and the graph masonry/legend stack on narrow screens. Touch targets meet a comfortable minimum; node drag works with touch (pointer events). Minimum supported width ~360px.

---

## 7. Non-functional requirements

- **NFR-1 — No AI:** No feature depends on an LLM or trained model. All outputs, including the graph, are produced by deterministic, auditable logic.
- **NFR-2 — Managed backend:** Core features (capture, shelf, graph) run against a managed Postgres backend (Supabase) over the network; there is no offline mode in v1 — a connection is required to read or write data.
- **NFR-3 — Zero marginal cost:** No per-use inference or token billing; running the app for one user or many costs nothing beyond static hosting.
- **NFR-4 — Performance:** Capture interactions respond in under ~100 ms. The graph renders smoothly (target ~60 fps) for at least ~200 nodes; layout settles within a couple of seconds.
- **NFR-5 — Privacy:** Each user's data is isolated from every other user by Postgres Row-Level Security enforced at the database layer; there is no cross-user visibility, no third-party data sharing, and no tracking of note content.
- **NFR-6 — Aesthetic consistency:** The design system in §6 (palette, type scale, category color/icon set, components) applies uniformly across all views.
- **NFR-7 — Responsive:** Usable on desktop and mobile, down to ~360 px width.
- **NFR-8 — Accessibility:** Keyboard navigation, visible focus states, sufficient color contrast, and respect for reduced-motion. The graph provides a non-visual fallback (e.g. a readable list of nodes and their connections).
- **NFR-9 — Browser support:** Current evergreen browsers (Chrome, Safari, Firefox, Edge).
- **NFR-10 — Data safety:** Capture never silently loses data; in-progress days are autosaved as drafts.
- **NFR-11 — Graceful scaling:** As notes accumulate, the graph stays legible and performant (e.g. via scope/range filtering) rather than degrading into an unreadable hairball.
- **NFR-12 — Maintainability:** The category set and the graph's layout/linking rules are config-driven and modular, so they can be tuned without rewrites.
- **NFR-13 — Security:** Supabase Auth gates every request; Row-Level Security policies enforce per-user isolation on every table; encryption at rest is handled by the managed Postgres provider.

---

## 8. Scope & phasing

**MVP (v1)** — FR-1 to FR-14, FR-16 to FR-28, FR-30; the full §6 design system; NFR-1 to NFR-13.
Daily capture (text + category + source), isolated day pages, the shelf, streak tracking, the 7-day unlock, the knowledge graph (category bubbles sized by note count, co-occurrence edges, day/week toggle, drag/hover/legend), and Supabase-backed persistence scoped to an authenticated account via Row-Level Security — all non-AI.

**v1.1** — Source autocomplete (FR-15), JSON/image export (FR-29), graph scope toggle (all-time vs last-7), reduced-motion polish, basic search/filter on the shelf.

**v2** — Additional graph metrics or filters, optional widgets/streak reminders, offline/local caching for intermittent connectivity.

---

## 9. Success metrics

- **Habit:** days logged per active week; 7-day-unlock completion rate.
- **Engagement:** return visits to the shelf and the graph after unlock.
- **Capture quality:** average notes per day; share of notes with a source recorded.
- **Retention:** percentage of users who keep logging past week one (the unlock should lift this).

---

## 10. Open decisions

1. **Graph scope default** — show *all* logged days (a denser, growing map) or a rolling *last 7 days* (always a clean weekly snapshot)? Current default: all-time, with a scope toggle planned for v1.1.
2. **Bubble-size basis over time** — raw all-time note totals mean long-running topics always dominate; a "recent" sizing option (e.g. last 30 days) could keep newer interests visible. Candidate for v1.1.
3. **Streak strictness** — does the unlock require 7 *consecutive* days, or any 7 logged days? Affects motivation vs. forgiveness.
4. **Custom categories** — whether the user may add categories beyond the fixed eight in §6.3 (v2 candidate).

*Decided:* topic co-occurrence is **same-day** (FR-23) · the category set is the fixed eight in §6.3 · persistence is Supabase/Postgres, scoped per-account via Row-Level Security (no local-only mode).
