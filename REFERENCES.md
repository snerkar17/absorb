# Absorb — References feature (add-on spec)

Adds two things to the existing Absorb app: **(1)** an optional URL on every note, **(2)** a `/references` page — a gallery of every saved link, grouped by recency.

Design system: same Commonplace tokens as the rest of the app (`tokens/*.css` already in the repo). Everything below uses those variables by name.

## 1. URL on notes
- Add nullable `url text` column to `notes`.
- Capture form ("Add a note"): one extra optional field, mono uppercase label `LINK (OPTIONAL)`, standard Input, placeholder `https://…`. Validate it's a URL if present.
- Day Board card **back**: under the Source value, if the note has a url, show a link line in deep lime (`var(--lime-700)`), underlined, mono 11px: `Open the link ↗` — opens in a new tab.

## 2. /references page
Header (same app chrome as other pages):
- Quiet back button `← Back to your week`.
- Mono kicker in deep lime: `REFERENCES · N LINKS SAVED`.
- Serif h1 (Bodoni Moda, 46px, weight 500): "Everything worth going back to".
- Muted subline: "Every link you attach to a note lands here, filed by when you saved it."
- Right-aligned mono hint: `OPEN A CLIPPING TO REVISIT THE SOURCE`.
- Entry point on Home: ghost button "Your saved references →" next to the calendar link.

### Sections (in order, each only if non-empty)
1. **From the past week** — last 7 days
2. **From the past month** — last 30 days, excluding the past week
3. **From the past year** — last 365 days, excluding the above
Each section header: italic serif 22px title (left) + mono uppercase date-range stamp (right), then the archival double-rule Divider, then the grid.

### Card grid
`grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`, 16px gap, 18px below the rule, 38px between sections.

### Clipping card (an `<a>`, opens url in new tab)
- Raised surface, 1px hairline border, radius 6, shadow-sm; hover = translateY(-2px) + shadow-md, 180ms ease.
- **Thumbnail area (118px tall, hairline bottom border):** the page's **og:image / link preview**, `object-fit: cover`, with the brand's warm slightly-faded treatment (e.g. `filter: sepia(.12) contrast(.95)`) so screenshots sit on the paper like magazine clippings.
  - **Fallback (no og:image):** tint block `color-mix(in oklab, <category ink> 14%, var(--surface-sunken))` with the domain's first letter in serif 56px in the category ink at 85% opacity.
  - Overlaid top-left: a small pill (card surface, hairline border) with mono 9px uppercase `● CATEGORY` in the category ink.
  - Bottom-right: mono `↗` in muted ink.
- **Body (13px padding):** serif title 17px/1.3 weight 500 (the note's source title, or the page title), then a row with mono 10px domain (left, ellipsized) and mono uppercase `SAVED JUL 8` stamp (right, faint).

### Behavior & data
- Fetch: all of the user's notes where `url IS NOT NULL`, newest first; derive domain from the url; bucket by `created_at` into the three sections client-side.
- Thumbnails: fetch og:image server-side (Next.js route handler or edge function that reads the page's `<meta property="og:image">` — never from the client, CORS) and cache the resolved image URL on the note row (`preview_image text`, populated on note save, fire-and-forget). If fetching fails, use the letter fallback.
- Empty page state: dashed sunken panel, mono `REFERENCES · EMPTY`, serif line "Attach a link to a note and it will be filed here."
- No pagination needed until it hurts; sections cap naturally by recency.

Reference prototype: the References tab in `Absorb Pages.dc.html` (letter-fallback thumbnails only — production uses real preview images).
