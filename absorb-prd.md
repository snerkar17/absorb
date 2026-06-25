# Absorb — Product Requirements Document

*Write it · tag it · map it. A daily learning journal that turns a week of notes into a knowledge graph — no AI required.*

Version 1.1 · Owner: [you] · Status: Draft for build

---

## 1. Overview

Absorb is a personal web app for capturing the things you learn each day. For every note you write the insight in your own words, tag it with a **category**, and record the **source** it came from. Each day is its own self-contained page, and your days line up into a visual shelf. After you've logged **7 days**, the app unlocks a **knowledge graph** that connects your notes by category and source — a living map of what you've been learning and where it came from.

The product is deliberately **non-AI**: every feature, including the graph, is produced by deterministic code from the structured data the user enters. This keeps it free to run, private, fast, and fully explainable. It is also deliberately **minimal and calm** — the design is a core part of the value, not decoration.

---

## 2. Goals & non-goals

**Goals**
- Make daily capture fast and intentional: write, categorize, cite a source.
- Reward the habit with a beautiful, browsable history (the shelf).
- Turn a week of structured notes into a knowledge graph that reveals patterns the user didn't have to label.
- Stay deterministic, private, offline-capable, and zero-marginal-cost.

**Non-goals (v1)**
- No AI/LLM features (no auto-writing, auto-tagging, or summarization).
- No collaboration, sharing, or social feed.
- No cross-day merging of note content — days stay isolated as written.
- No rich-text editor or wiki-style backlinks.

---

## 3. Target user

A naturally curious person who learns scattered things daily and wants a private, attractive place to keep them — and who finds motivation in seeing a streak grow and a personal knowledge map emerge. They value aesthetics, ownership of their data, and a tool that "just works" without accounts, cost, or AI dependence.

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
- **FR-5** The user can edit or delete a note while the day is still a draft.
- **FR-6** The user can finalize the day; finalized days appear on the shelf and become read-only.
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
- **FR-28** All data persists locally so it survives reloads (local-first).
- **FR-29** *(v1.1)* The user can export their data as JSON and export the graph as an image.
- **FR-30** *(v2)* Optional account creation with cloud sync across devices.

---

## 6. Design & UX specification

The design is "quiet by default, with one expressive payoff." Everything in capture and the shelf is restrained and precise; the knowledge graph is where the visual reward lands.

### 6.1 Design principles
1. **Calm minimalism** — generous whitespace, soft paper background, hairline borders, restraint with color and emphasis.
2. **One signature moment** — the graph is the deliberate "wow"; nothing else competes with it.
3. **Structure is the beauty** — the categories and sources the user enters *are* the visual system; no decoration is invented.
4. **Warmth through type** — a literary serif for headings keeps a journal-like feel inside an otherwise clean interface.
5. **Consistency** — one category color/icon language is reused identically across capture, shelf, and graph.

### 6.2 Visual system (design tokens)

**Color**

| Token | Value | Use |
|---|---|---|
| Paper | `#F4F4F0` | App background |
| Card | `#FFFFFF` | Surfaces (cards, inputs, graph canvas) |
| Ink | `#1B1E19` | Primary text, primary buttons |
| Muted | `#8E908A` | Secondary text |
| Faint | `#B9BAB4` | Placeholders, source-node outlines |
| Line | `#E6E6DF` | Borders |
| Line-soft | `#EFEFEA` | Inner dividers |
| Accent | `#5C6E4A` | Moss accent, links, active states |
| Accent-deep | `#465739` | Accent hover/pressed |
| Highlight | `#E7EFD2` | Pale wash for selected / unlock chips |

Shadows: resting `0 1px 2px rgba(27,30,25,.04), 0 8px 24px rgba(27,30,25,.06)`; lifted `0 2px 6px …, 0 24px 60px rgba(27,30,25,.14)`. Corner radius: 14px cards, 18px large panels, 999px pills.

**Typography**

| Role | Typeface | Notes |
|---|---|---|
| Display / headings / day titles | **Fraunces** (serif) | 500–600 weight, tight letter-spacing |
| Body / UI / buttons | **Hanken Grotesk** | 400–600 |
| Dates, labels, counts | **Spline Sans Mono** | uppercase, wide tracking for eyebrows |

### 6.3 Category & source system

Eight fixed categories, each with an ink color, a soft tint (for chips/icon chips), and a line icon. This palette is intentionally desaturated so eight colors still read as one calm family.

| Category | Ink | Tint |
|---|---|---|
| Science | `#3E6B57` | `#E9F0EC` |
| History | `#8A6B47` | `#F1ECE3` |
| Language | `#4E5E86` | `#EBEEF5` |
| Money | `#5C6E4A` | `#EEF1E8` |
| Tech | `#3E6675` | `#E7EFF1` |
| Health | `#8A5A55` | `#F1ECEB` |
| Idea | `#897A3C` | `#F2EFE3` |
| Nature | `#4A6B4A` | `#E8F0E8` |

Sources are user text, shown in monospace, rendered as neutral (uncolored) elements so categories carry the color and sources read as connective tissue.

### 6.4 Core components
- **Header bar** — brand wordmark (Fraunces + accent dot) left; streak pill (mono, accent outline) right. Persistent across views.
- **Day card** — date (mono) · large count (Fraunces) · "things learned" · category chips. Hover lifts ~4px with deepened shadow.
- **New-day card** — dashed accent border, "＋ Start day N", invites the next entry.
- **Unlock banner** — dark ink-to-green gradient with a soft radial highlight, headline + subcopy + pale highlight CTA button. Appears on the shelf once 7 days are logged.
- **Category chip / picker chip** — pill with icon + name; in the picker, selecting fills it with the category color.
- **Capture form** — note textarea, single-select category row, source input, primary "Add note" button (disabled until valid), and a running list of added notes (colored dot + text + "Category · source" in mono).
- **Note (read view)** — colored category dot, the text, and a mono "Category · source" line.
- **Graph canvas** — white rounded panel holding the SVG; nodes, edges, legend, caption, and a hover tooltip.
- **Segmented toggle** — pill container with two options; active option fills ink/white.

### 6.5 Screens & layout

**Shelf (home)** — Header bar; an unlock banner when eligible; an uppercase section label; a responsive grid of day cards (4 columns desktop → 2 tablet → 1 mobile) newest-first, ending with the dashed new-day card.

**Capture (day composer)** — A back link to the shelf; a centered Fraunces title ("Day N · what did you learn?") with one line of subcopy; then three stacked fields — the note text, the category picker row, the source input — followed by the add-note action and the growing list of that day's notes below.

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
- **NFR-2 — Offline-capable:** Core features (capture, shelf, graph) work with no network connection and require no external API.
- **NFR-3 — Zero marginal cost:** No per-use inference or token billing; running the app for one user or many costs nothing beyond static hosting.
- **NFR-4 — Performance:** Capture interactions respond in under ~100 ms. The graph renders smoothly (target ~60 fps) for at least ~200 nodes; layout settles within a couple of seconds.
- **NFR-5 — Privacy:** By default, all data stays on the user's device; no third-party data sharing or tracking of note content.
- **NFR-6 — Aesthetic consistency:** The design system in §6 (palette, type scale, category color/icon set, components) applies uniformly across all views.
- **NFR-7 — Responsive:** Usable on desktop and mobile, down to ~360 px width.
- **NFR-8 — Accessibility:** Keyboard navigation, visible focus states, sufficient color contrast, and respect for reduced-motion. The graph provides a non-visual fallback (e.g. a readable list of nodes and their connections).
- **NFR-9 — Browser support:** Current evergreen browsers (Chrome, Safari, Firefox, Edge).
- **NFR-10 — Data safety:** Capture never silently loses data; in-progress days are autosaved as drafts.
- **NFR-11 — Graceful scaling:** As notes accumulate, the graph stays legible and performant (e.g. via scope/range filtering) rather than degrading into an unreadable hairball.
- **NFR-12 — Maintainability:** The category set and the graph's layout/linking rules are config-driven and modular, so they can be tuned without rewrites.
- **NFR-13 — Security (when sync is added):** Standard authentication and encryption at rest for any cloud-stored data.

---

## 8. Scope & phasing

**MVP (v1)** — FR-1 to FR-14, FR-16 to FR-28; the full §6 design system; NFR-1 to NFR-12.
Daily capture (text + category + source), isolated day pages, the shelf, streak tracking, the 7-day unlock, the knowledge graph (category bubbles sized by note count, co-occurrence edges, day/week toggle, drag/hover/legend), and local-first persistence — all non-AI and offline-capable.

**v1.1** — Source autocomplete (FR-15), JSON/image export (FR-29), graph scope toggle (all-time vs last-7), reduced-motion polish, basic search/filter on the shelf.

**v2** — Accounts + cloud sync (FR-30, NFR-13), additional graph metrics or filters, optional widgets/streak reminders.

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
3. **Category set** — finalize the exact fixed list and whether the user may add custom categories later (v2 candidate).
4. **Streak strictness** — does the unlock require 7 *consecutive* days, or any 7 logged days? Affects motivation vs. forgiveness.
5. **Persistence layer** — which local store (e.g. IndexedDB) for the MVP, and the migration path to cloud sync in v2.

*Decided:* topic co-occurrence is **same-day** (FR-23).
