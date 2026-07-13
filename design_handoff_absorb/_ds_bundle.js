/* @ds-bundle: {"format":3,"namespace":"CommonplaceDesignSystem_0504fa","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"EntryCard","sourcePath":"components/journal/EntryCard.jsx"},{"name":"MetaStamp","sourcePath":"components/journal/MetaStamp.jsx"},{"name":"SourceTag","sourcePath":"components/journal/SourceTag.jsx"},{"name":"TakeawayQuote","sourcePath":"components/journal/TakeawayQuote.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a3df6d6c60a4","components/core/Button.jsx":"a51f89ef5fe2","components/core/Divider.jsx":"a269694a7a38","components/core/IconButton.jsx":"2619931e6fe3","components/core/Tabs.jsx":"abb13706af5f","components/forms/Field.jsx":"10a212d535b9","components/forms/Input.jsx":"a0c601fd4b0b","components/forms/Switch.jsx":"3f29e3b0a437","components/forms/Textarea.jsx":"08c8a3d32fbd","components/journal/EntryCard.jsx":"c1d5522b30da","components/journal/MetaStamp.jsx":"7ae73b7b7858","components/journal/SourceTag.jsx":"2c1f8b41a6ac","components/journal/TakeawayQuote.jsx":"0748e492ca9d","ui_kits/journal/AppShell.jsx":"7ae75cbffbbf","ui_kits/journal/ArchiveView.jsx":"bd84d36ff7c2","ui_kits/journal/CaptureSheet.jsx":"679d9d164229","ui_kits/journal/TodayPage.jsx":"383ff4f98bde","ui_kits/journal/data.js":"fbaf54b103a4","ui_kits/journal/icons.js":"37d74871f087"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CommonplaceDesignSystem_0504fa = window.CommonplaceDesignSystem_0504fa || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-badge{
  display:inline-flex; align-items:center; gap:.45em;
  font-family:var(--font-mono); font-weight:var(--weight-medium);
  font-size:var(--text-2xs); letter-spacing:var(--tracking-stamp); text-transform:uppercase;
  padding:3px 8px; border-radius:var(--radius-xs); border:1px solid transparent; line-height:1.4;
}
.cp-badge svg{ width:1.1em; height:1.1em; }
.cp-badge--soft{ background:var(--accent-tint); color:var(--accent-strong); }
.cp-badge--solid{ background:var(--accent); color:var(--accent-onaccent); }
.cp-badge--outline{ background:transparent; color:var(--accent); border-color:currentColor; }
.cp-badge--dot::before{ content:""; width:6px; height:6px; border-radius:999px; background:currentColor; }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-badge-css', CSS);
const TONES = {
  neutral: {
    '--accent': 'var(--ink-500)',
    '--accent-strong': 'var(--ink-700)',
    '--accent-tint': 'var(--surface-sunken)',
    '--accent-onaccent': 'var(--paper-50)'
  },
  accent: {},
  podcast: {
    '--accent': 'var(--source-podcast)',
    '--accent-strong': 'var(--tangerine-700)',
    '--accent-tint': 'var(--source-podcast-tint)'
  },
  book: {
    '--accent': 'var(--source-book)',
    '--accent-strong': 'var(--cobalt-700)',
    '--accent-tint': 'var(--source-book-tint)'
  },
  essay: {
    '--accent': 'var(--source-essay)',
    '--accent-strong': 'var(--magenta-700)',
    '--accent-tint': 'var(--source-essay-tint)'
  },
  video: {
    '--accent': 'var(--source-video)',
    '--accent-strong': 'var(--violet-700)',
    '--accent-tint': 'var(--source-video-tint)'
  }
};

/**
 * Badge — a small mono stamp for counts, statuses, and tags.
 */
function Badge({
  variant = 'soft',
  tone = 'accent',
  dot = false,
  icon = null,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const cls = ['cp-badge', `cp-badge--${variant}`, dot ? 'cp-badge--dot' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      ...(TONES[tone] || {}),
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once, on bundle load. Self-contained: all
   visuals reference the design-system CSS custom properties. */
const CSS = `
.cp-btn{
  --_bg: var(--accent); --_fg: var(--accent-onaccent); --_bd: transparent;
  display:inline-flex; align-items:center; justify-content:center; gap:.5em;
  font-family:var(--font-sans); font-weight:var(--weight-medium);
  border:1.5px solid var(--_bd); background:var(--_bg); color:var(--_fg);
  border-radius:var(--radius-sm); cursor:pointer; white-space:nowrap;
  box-shadow:var(--shadow-xs); transition:transform var(--dur-fast) var(--ease-soft),
    background var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft),
    border-color var(--dur-fast) var(--ease-soft); text-decoration:none;
}
.cp-btn:hover{ filter:saturate(1.05) brightness(.96); }
.cp-btn:active{ transform:translateY(1px); box-shadow:var(--shadow-press); filter:brightness(.92); }
.cp-btn:focus-visible{ outline:none; box-shadow:0 0 0 3px var(--focus-ring); }
.cp-btn[disabled]{ cursor:not-allowed; opacity:.5; filter:none; transform:none; box-shadow:none; }
.cp-btn svg{ width:1.05em; height:1.05em; }

.cp-btn--sm{ font-size:var(--text-sm); padding:6px 12px; }
.cp-btn--md{ font-size:var(--text-base); padding:9px 17px; }
.cp-btn--lg{ font-size:var(--text-md); padding:12px 22px; }

.cp-btn--primary{ --_bg:var(--accent); --_fg:var(--accent-onaccent); }
.cp-btn--secondary{ --_bg:var(--surface-card); --_fg:var(--text-primary); --_bd:var(--border-strong); box-shadow:var(--shadow-sm); }
.cp-btn--secondary:hover{ background:var(--surface-raised); filter:none; }
.cp-btn--ghost{ --_bg:transparent; --_fg:var(--accent); --_bd:transparent; box-shadow:none; }
.cp-btn--ghost:hover{ background:var(--accent-tint); filter:none; }
.cp-btn--quiet{ --_bg:transparent; --_fg:var(--text-secondary); --_bd:transparent; box-shadow:none; }
.cp-btn--quiet:hover{ background:var(--surface-sunken); filter:none; }
.cp-btn--block{ width:100%; }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-btn-css', CSS);

/**
 * Button — the primary action. Settles on press (1px), never bounces.
 */
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  icon = null,
  iconRight = null,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  const Tag = as;
  const cls = ['cp-btn', `cp-btn--${variant}`, `cp-btn--${size}`, block ? 'cp-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), icon, children != null && /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-divider{ border:0; width:100%; }
.cp-divider--hairline{ border-top:1px solid var(--border-hairline); height:0; margin:var(--space-4) 0; }
.cp-divider--rule{ border-top:1.5px solid var(--border-rule); height:0; margin:var(--space-5) 0; }
.cp-divider--double{ border-top:1.5px solid var(--border-rule);
  box-shadow:0 2px 0 -1px var(--border-hairline); height:0; margin:var(--space-5) 0; }
.cp-divider-l{ display:flex; align-items:center; gap:var(--space-3); margin:var(--space-5) 0;
  font-family:var(--font-mono); font-size:var(--text-2xs); letter-spacing:var(--tracking-stamp);
  text-transform:uppercase; color:var(--text-muted); }
.cp-divider-l::before, .cp-divider-l::after{ content:""; flex:1; height:0; border-top:1px solid var(--border-hairline); }
.cp-divider--vertical{ width:0; height:1.1em; border-left:1px solid var(--border-hairline); margin:0 var(--space-3); display:inline-block; }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-divider-css', CSS);

/**
 * Divider — an archival rule. Optionally labelled, like a ledger break.
 */
function Divider({
  variant = 'hairline',
  label = null,
  className = '',
  ...rest
}) {
  if (variant === 'vertical') {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: ['cp-divider--vertical', className].filter(Boolean).join(' ')
    }, rest));
  }
  if (label != null) {
    return /*#__PURE__*/React.createElement("div", _extends({
      className: ['cp-divider-l', className].filter(Boolean).join(' ')
    }, rest), label);
  }
  return /*#__PURE__*/React.createElement("hr", _extends({
    className: ['cp-divider', `cp-divider--${variant}`, className].filter(Boolean).join(' ')
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-iconbtn{
  display:inline-grid; place-items:center; cursor:pointer;
  background:transparent; color:var(--text-secondary);
  border:1px solid transparent; border-radius:var(--radius-sm);
  transition:background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft),
    border-color var(--dur-fast) var(--ease-soft), transform var(--dur-fast) var(--ease-soft);
}
.cp-iconbtn:hover{ background:var(--surface-sunken); color:var(--text-primary); }
.cp-iconbtn:active{ transform:translateY(1px); box-shadow:var(--shadow-press); }
.cp-iconbtn:focus-visible{ outline:none; box-shadow:0 0 0 3px var(--focus-ring); }
.cp-iconbtn[disabled]{ opacity:.45; cursor:not-allowed; }
.cp-iconbtn svg{ width:1.15em; height:1.15em; }
.cp-iconbtn--sm{ width:30px; height:30px; font-size:14px; }
.cp-iconbtn--md{ width:36px; height:36px; font-size:16px; }
.cp-iconbtn--lg{ width:44px; height:44px; font-size:19px; }
.cp-iconbtn--outline{ border-color:var(--border-hairline); background:var(--surface-card); }
.cp-iconbtn--accent{ color:var(--accent); }
.cp-iconbtn--accent:hover{ background:var(--accent-tint); color:var(--accent-strong); }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-iconbtn-css', CSS);

/**
 * IconButton — a square, icon-only control for toolbars & row actions.
 */
function IconButton({
  size = 'md',
  variant = 'plain',
  label,
  className = '',
  children,
  ...rest
}) {
  const cls = ['cp-iconbtn', `cp-iconbtn--${size}`, variant !== 'plain' ? `cp-iconbtn--${variant}` : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label,
    title: label
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-tabs{ display:flex; gap:var(--space-1); border-bottom:1px solid var(--border-hairline); }
.cp-tab{
  appearance:none; background:transparent; border:0; cursor:pointer;
  font-family:var(--font-mono); font-size:var(--text-xs); letter-spacing:var(--tracking-stamp);
  text-transform:uppercase; color:var(--text-muted); padding:10px 12px 12px;
  position:relative; display:inline-flex; align-items:center; gap:.5em;
  transition:color var(--dur-fast) var(--ease-soft);
}
.cp-tab svg{ width:1.15em; height:1.15em; }
.cp-tab:hover{ color:var(--text-secondary); }
.cp-tab[aria-selected="true"]{ color:var(--text-primary); }
.cp-tab[aria-selected="true"]::after{
  content:""; position:absolute; left:8px; right:8px; bottom:-1px; height:2px;
  background:var(--accent); border-radius:2px 2px 0 0;
}
.cp-tab:focus-visible{ outline:none; box-shadow:0 0 0 3px var(--focus-ring); border-radius:var(--radius-xs); }
.cp-tab-count{ font-size:var(--text-2xs); color:var(--text-faint); }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-tabs-css', CSS);

/**
 * Tabs — mono, underlined navigation. Controlled via `value`/`onChange`.
 */
function Tabs({
  items = [],
  value,
  onChange,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['cp-tabs', className].filter(Boolean).join(' '),
    role: "tablist"
  }, rest), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.value,
    role: "tab",
    "aria-selected": value === it.value,
    className: "cp-tab",
    onClick: () => onChange && onChange(it.value),
    type: "button"
  }, it.icon, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
    className: "cp-tab-count"
  }, it.count))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-field{ display:flex; flex-direction:column; gap:6px; }
.cp-field-label{
  display:flex; align-items:baseline; gap:8px;
  font-family:var(--font-mono); font-size:var(--text-2xs); letter-spacing:var(--tracking-stamp);
  text-transform:uppercase; color:var(--text-muted);
}
.cp-field-opt{ font-size:var(--text-2xs); letter-spacing:0; text-transform:none; color:var(--text-faint); }
.cp-field-hint{ font-family:var(--font-sans); font-size:var(--text-sm); color:var(--text-muted); }
.cp-field-error{ font-family:var(--font-sans); font-size:var(--text-sm); color:var(--critical); }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-field-css', CSS);

/**
 * Field — labels a control with a mono caption, optional hint and error.
 */
function Field({
  label,
  optional = false,
  hint = null,
  error = null,
  htmlFor,
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['cp-field', className].filter(Boolean).join(' ')
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    className: "cp-field-label",
    htmlFor: htmlFor
  }, label, optional && /*#__PURE__*/React.createElement("span", {
    className: "cp-field-opt"
  }, "optional")), children, error ? /*#__PURE__*/React.createElement("span", {
    className: "cp-field-error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "cp-field-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-input-wrap{ position:relative; display:flex; align-items:center; }
.cp-input{
  width:100%; box-sizing:border-box; font-family:var(--font-sans); font-size:var(--text-base);
  color:var(--text-primary); background:var(--surface-card);
  border:1.5px solid var(--border-hairline); border-radius:var(--radius-sm);
  padding:9px 12px; box-shadow:var(--shadow-press);
  transition:border-color var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft);
}
.cp-input::placeholder{ color:var(--text-faint); }
.cp-input:hover{ border-color:var(--border-rule); }
.cp-input:focus{ outline:none; border-color:var(--accent); box-shadow:var(--shadow-press), 0 0 0 3px var(--focus-ring); }
.cp-input[disabled]{ opacity:.55; cursor:not-allowed; }
.cp-input--mono{ font-family:var(--font-mono); font-size:var(--text-sm); letter-spacing:.02em; }
.cp-input--hasicon{ padding-left:36px; }
.cp-input-icon{ position:absolute; left:11px; display:grid; place-items:center; color:var(--text-muted); pointer-events:none; }
.cp-input-icon svg{ width:16px; height:16px; }
.cp-input-wrap[data-invalid="true"] .cp-input{ border-color:var(--critical); }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-input-css', CSS);

/**
 * Input — a single-line field, pressed slightly into the page.
 */
function Input({
  icon = null,
  mono = false,
  invalid = false,
  className = '',
  ...rest
}) {
  const cls = ['cp-input', mono ? 'cp-input--mono' : '', icon ? 'cp-input--hasicon' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", {
    className: "cp-input-wrap",
    "data-invalid": invalid ? 'true' : undefined
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "cp-input-icon"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    className: cls,
    "aria-invalid": invalid || undefined
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-switch{ display:inline-flex; align-items:center; gap:10px; cursor:pointer; user-select:none; }
.cp-switch input{ position:absolute; opacity:0; width:0; height:0; }
.cp-switch-track{
  width:40px; height:23px; border-radius:999px; background:var(--surface-sunken);
  border:1.5px solid var(--border-rule); position:relative; flex:none;
  transition:background var(--dur-base) var(--ease-soft), border-color var(--dur-base) var(--ease-soft);
}
.cp-switch-thumb{
  position:absolute; top:1.5px; left:1.5px; width:17px; height:17px; border-radius:999px;
  background:var(--surface-raised); box-shadow:var(--shadow-sm);
  transition:transform var(--dur-base) var(--ease-soft);
}
.cp-switch input:checked + .cp-switch-track{ background:var(--accent); border-color:var(--accent-strong); }
.cp-switch input:checked + .cp-switch-track .cp-switch-thumb{ transform:translateX(17px); background:var(--paper-50); }
.cp-switch input:focus-visible + .cp-switch-track{ box-shadow:0 0 0 3px var(--focus-ring); }
.cp-switch input:disabled + .cp-switch-track{ opacity:.5; }
.cp-switch-label{ font-family:var(--font-sans); font-size:var(--text-base); color:var(--text-primary); }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-switch-css', CSS);

/**
 * Switch — a binary toggle (e.g. "remind me to review this").
 */
function Switch({
  checked,
  onChange,
  label = null,
  disabled = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['cp-switch', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: e => onChange && onChange(e.target.checked, e),
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cp-switch-track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cp-switch-thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "cp-switch-label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-textarea{
  width:100%; box-sizing:border-box; font-family:var(--font-sans); font-size:var(--text-base);
  line-height:var(--leading-normal); color:var(--text-primary); background:var(--surface-card);
  border:1.5px solid var(--border-hairline); border-radius:var(--radius-sm);
  padding:11px 13px; box-shadow:var(--shadow-press); resize:vertical; min-height:84px;
  transition:border-color var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft);
}
.cp-textarea::placeholder{ color:var(--text-faint); }
.cp-textarea:hover{ border-color:var(--border-rule); }
.cp-textarea:focus{ outline:none; border-color:var(--accent); box-shadow:var(--shadow-press), 0 0 0 3px var(--focus-ring); }
.cp-textarea--serif{ font-family:var(--font-serif); font-size:var(--text-md); line-height:var(--leading-snug); }
.cp-textarea[disabled]{ opacity:.55; cursor:not-allowed; }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-textarea-css', CSS);

/**
 * Textarea — multi-line. `serif` mode for writing the takeaway itself.
 */
function Textarea({
  serif = false,
  className = '',
  ...rest
}) {
  const cls = ['cp-textarea', serif ? 'cp-textarea--serif' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("textarea", _extends({
    className: cls
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/journal/MetaStamp.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-stamp{
  display:inline-flex; align-items:center; flex-wrap:wrap; gap:8px;
  font-family:var(--font-mono); font-size:var(--text-2xs); letter-spacing:var(--tracking-stamp);
  text-transform:uppercase; color:var(--text-muted); line-height:1.4;
}
.cp-stamp--plain{ text-transform:none; letter-spacing:.02em; }
.cp-stamp-item{ display:inline-flex; align-items:center; gap:.45em; }
.cp-stamp-item svg{ width:1.2em; height:1.2em; stroke:currentColor; fill:none;
  stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.cp-stamp-sep{ color:var(--text-faint); }
.cp-stamp-strong{ color:var(--text-secondary); }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-stamp-css', CSS);

/**
 * MetaStamp — the logged metadata line: durations, dates, counts.
 * Pass `items` (auto-separated by middots) or children.
 */
function MetaStamp({
  items = null,
  plain = false,
  sep = '\u00B7',
  className = '',
  children,
  ...rest
}) {
  const cls = ['cp-stamp', plain ? 'cp-stamp--plain' : '', className].filter(Boolean).join(' ');
  if (items && items.length) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: cls
    }, rest), items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      className: "cp-stamp-sep",
      "aria-hidden": "true"
    }, sep), /*#__PURE__*/React.createElement("span", {
      className: "cp-stamp-item"
    }, it))));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { MetaStamp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/journal/MetaStamp.jsx", error: String((e && e.message) || e) }); }

// components/journal/SourceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-srctag{
  display:inline-flex; align-items:center; gap:.5em; box-sizing:border-box;
  font-family:var(--font-mono); font-weight:var(--weight-medium);
  letter-spacing:var(--tracking-stamp); text-transform:uppercase; line-height:1;
  border:1px solid transparent; border-radius:var(--radius-pill); white-space:nowrap;
}
.cp-srctag svg{ width:1.15em; height:1.15em; stroke:currentColor; fill:none;
  stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.cp-srctag--sm{ font-size:var(--text-2xs); padding:4px 9px 4px 8px; }
.cp-srctag--md{ font-size:var(--text-xs); padding:6px 12px 6px 10px; }
.cp-srctag--soft{ background:var(--_tint); color:var(--_ink); }
.cp-srctag--outline{ background:var(--surface-card); color:var(--_ink); border-color:var(--_ink); box-shadow:var(--shadow-xs); }
.cp-srctag--solid{ background:var(--_ink); color:var(--paper-50); }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-srctag-css', CSS);

/* Lucide glyphs (mic / book-open / newspaper / video), copied as paths. */
const GLYPHS = {
  podcast: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 10v2a7 7 0 0 1-14 0v-2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "19",
    y2: "22"
  })),
  book: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
  })),
  essay: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "M15 18h-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 14h-8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 6h8v4h-8z"
  })),
  video: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
    d: "m22 8-6 4 6 4V8Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
  }))
};
const META = {
  podcast: {
    label: 'Podcast',
    ink: 'var(--source-podcast)',
    tint: 'var(--source-podcast-tint)'
  },
  book: {
    label: 'Book',
    ink: 'var(--source-book)',
    tint: 'var(--source-book-tint)'
  },
  essay: {
    label: 'Essay',
    ink: 'var(--source-essay)',
    tint: 'var(--source-essay-tint)'
  },
  video: {
    label: 'Short video',
    ink: 'var(--source-video)',
    tint: 'var(--source-video-tint)'
  }
};

/**
 * SourceTag — the brand's signature device. One of four media types,
 * each its own ink, with the matching Lucide glyph.
 */
function SourceTag({
  source = 'podcast',
  variant = 'soft',
  size = 'md',
  showIcon = true,
  label,
  className = '',
  style = {},
  ...rest
}) {
  const meta = META[source] || META.podcast;
  const cls = ['cp-srctag', `cp-srctag--${variant}`, `cp-srctag--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      '--_ink': meta.ink,
      '--_tint': meta.tint,
      ...style
    }
  }, rest), showIcon && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, GLYPHS[source]), label || meta.label);
}
Object.assign(__ds_scope, { SourceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/journal/SourceTag.jsx", error: String((e && e.message) || e) }); }

// components/journal/TakeawayQuote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-take{ display:block; }
.cp-take-kicker{
  font-family:var(--font-mono); font-size:var(--text-2xs); letter-spacing:var(--tracking-stamp);
  text-transform:uppercase; color:var(--_ink, var(--text-muted)); margin-bottom:10px;
}
.cp-take-body{
  font-family:var(--font-serif); color:var(--text-primary); font-weight:var(--weight-regular);
  text-wrap:pretty; margin:0;
}
.cp-take--md .cp-take-body{ font-size:var(--text-lg); line-height:var(--leading-snug); }
.cp-take--lg .cp-take-body{ font-size:var(--text-xl); line-height:1.2; letter-spacing:-0.01em; }
.cp-take--xl .cp-take-body{ font-size:var(--text-2xl); line-height:1.12; letter-spacing:-0.02em; }
.cp-take--ruled{ padding-left:18px; border-left:2px solid var(--_ink, var(--accent)); }
.cp-take-body em{ font-style:italic; color:var(--_ink, var(--accent-strong)); }
.cp-take-attr{
  display:block; margin-top:12px; font-family:var(--font-mono); font-size:var(--text-xs);
  letter-spacing:.04em; color:var(--text-muted);
}
.cp-take-attr b{ font-weight:var(--weight-medium); color:var(--text-secondary); }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-take-css', CSS);
const SOURCE_INK = {
  podcast: 'var(--source-podcast)',
  book: 'var(--source-book)',
  essay: 'var(--source-essay)',
  video: 'var(--source-video)'
};

/**
 * TakeawayQuote — the knowledge itself, set large in the literary serif.
 * The hero of every entry and every daily page.
 */
function TakeawayQuote({
  size = 'lg',
  kicker = null,
  attribution = null,
  ruled = false,
  source = null,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const ink = source ? SOURCE_INK[source] : undefined;
  const cls = ['cp-take', `cp-take--${size}`, ruled ? 'cp-take--ruled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: cls,
    style: ink ? {
      '--_ink': ink,
      ...style
    } : style
  }, rest), kicker && /*#__PURE__*/React.createElement("div", {
    className: "cp-take-kicker"
  }, kicker), /*#__PURE__*/React.createElement("p", {
    className: "cp-take-body"
  }, children), attribution && /*#__PURE__*/React.createElement("figcaption", {
    className: "cp-take-attr"
  }, attribution));
}
Object.assign(__ds_scope, { TakeawayQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/journal/TakeawayQuote.jsx", error: String((e && e.message) || e) }); }

// components/journal/EntryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.cp-entry{
  display:flex; flex-direction:column; gap:var(--space-3);
  background:var(--surface-card); background-image:var(--paper-grain);
  border:1px solid var(--border-hairline); border-radius:var(--radius-md);
  box-shadow:var(--shadow-sm); padding:var(--space-5);
  position:relative; transition:box-shadow var(--dur-base) var(--ease-soft),
    transform var(--dur-base) var(--ease-soft), border-color var(--dur-base) var(--ease-soft);
}
.cp-entry--link{ cursor:pointer; }
.cp-entry--link:hover{ box-shadow:var(--shadow-md); transform:translateY(-2px); border-color:var(--border-rule); }
.cp-entry--link:active{ transform:translateY(0); box-shadow:var(--shadow-sm); }
/* a hair of source ink down the left edge */
.cp-entry::before{ content:""; position:absolute; left:0; top:14px; bottom:14px; width:3px;
  border-radius:0 3px 3px 0; background:var(--_ink, transparent); opacity:.0; transition:opacity var(--dur-base); }
.cp-entry--accented::before{ opacity:.9; }
.cp-entry-head{ display:flex; align-items:center; justify-content:space-between; gap:var(--space-3); }
.cp-entry-note{
  font-family:var(--font-sans); font-size:var(--text-sm); line-height:var(--leading-normal);
  color:var(--text-secondary); padding:var(--space-3) var(--space-4); background:var(--surface-sunken);
  border-radius:var(--radius-sm); border-left:2px solid var(--border-rule);
}
.cp-entry-foot{ display:flex; align-items:center; justify-content:space-between; gap:var(--space-3);
  flex-wrap:wrap; padding-top:var(--space-1); }
.cp-entry-tags{ display:flex; gap:6px; flex-wrap:wrap; }
.cp-entry-tag{ font-family:var(--font-mono); font-size:var(--text-2xs); letter-spacing:.04em;
  color:var(--text-muted); background:var(--surface-sunken); padding:3px 8px; border-radius:var(--radius-xs); }
.cp-entry-conn{ display:inline-flex; align-items:center; gap:.4em; font-family:var(--font-mono);
  font-size:var(--text-2xs); letter-spacing:var(--tracking-stamp); text-transform:uppercase; color:var(--_ink, var(--accent)); }
.cp-entry-conn svg{ width:13px; height:13px; stroke:currentColor; fill:none; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
`;
function ensureStyle(id, text) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = text;
  document.head.appendChild(s);
}
ensureStyle('cp-entry-css', CSS);
const SOURCE_INK = {
  podcast: 'var(--source-podcast)',
  book: 'var(--source-book)',
  essay: 'var(--source-essay)',
  video: 'var(--source-video)'
};

/**
 * EntryCard — one learning, captured. Composes SourceTag + MetaStamp +
 * TakeawayQuote with an optional note, tags, and connection count.
 */
function EntryCard({
  source = 'podcast',
  title,
  takeaway,
  duration,
  loggedAt,
  note = null,
  tags = [],
  connections = 0,
  accented = true,
  onOpen,
  className = '',
  style = {},
  ...rest
}) {
  const ink = SOURCE_INK[source];
  const cls = ['cp-entry', onOpen ? 'cp-entry--link' : '', accented ? 'cp-entry--accented' : '', className].filter(Boolean).join(' ');
  const meta = [];
  if (duration) meta.push(duration);
  if (loggedAt) meta.push(loggedAt);
  return /*#__PURE__*/React.createElement("article", _extends({
    className: cls,
    style: {
      '--_ink': ink,
      ...style
    },
    onClick: onOpen
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cp-entry-head"
  }, /*#__PURE__*/React.createElement(__ds_scope.SourceTag, {
    source: source,
    size: "sm"
  }), meta.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.MetaStamp, {
    items: meta
  })), /*#__PURE__*/React.createElement(__ds_scope.TakeawayQuote, {
    size: "md",
    source: source,
    kicker: title
  }, takeaway), note && /*#__PURE__*/React.createElement("div", {
    className: "cp-entry-note"
  }, note), (tags.length > 0 || connections > 0) && /*#__PURE__*/React.createElement("div", {
    className: "cp-entry-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cp-entry-tags"
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    className: "cp-entry-tag",
    key: t
  }, "#", t))), connections > 0 && /*#__PURE__*/React.createElement("span", {
    className: "cp-entry-conn"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8.59",
    x2: "15.42",
    y1: "13.51",
    y2: "17.49"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15.41",
    x2: "8.59",
    y1: "6.51",
    y2: "10.49"
  })), connections, " link", connections > 1 ? 's' : '')));
}
Object.assign(__ds_scope, { EntryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/journal/EntryCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/journal/AppShell.jsx
try { (() => {
/* AppShell — top bar, tab routing, capture sheet, day-read view, toasts. */
(function () {
  const NS = window.CommonplaceDesignSystem_0504fa;
  const {
    Tabs,
    Button,
    IconButton
  } = NS;
  const Icon = window.Icon;
  const {
    TodayPage,
    ArchiveView,
    CaptureSheet
  } = window;
  function Toast({
    toast
  }) {
    if (!toast) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "toast",
      key: toast.id
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15
    }), /*#__PURE__*/React.createElement("span", null, toast.msg));
  }

  // Build a read-only "day" object from an archive spine.
  function dayFromSpine(d) {
    return {
      numeral: d.numeral,
      monthShort: d.monthShort,
      weekday: d.weekday,
      dateLong: `${d.numeral} ${d.monthShort === 'JUN' ? 'June' : 'May'} 2026`,
      dek: d.headline,
      entries: [{
        id: d.id + '-lead',
        source: d.sources[0],
        title: 'From this day',
        takeaway: d.headline,
        duration: d.minutes + ' min',
        loggedAt: 'Kept ' + d.weekday,
        note: 'One of ' + d.count + ' things kept that day.',
        tags: [],
        connections: 0
      }]
    };
  }
  function AppShell() {
    const data = window.CP_DATA;
    const [tab, setTab] = React.useState('today');
    const [entries, setEntries] = React.useState(data.today.entries);
    const [capture, setCapture] = React.useState(false);
    const [viewDay, setViewDay] = React.useState(null);
    const [toast, setToast] = React.useState(null);
    const flash = msg => {
      const t = {
        id: Date.now(),
        msg
      };
      setToast(t);
      setTimeout(() => setToast(cur => cur && cur.id === t.id ? null : cur), 2600);
    };
    const today = {
      ...data.today,
      entries
    };
    const onSave = entry => {
      setEntries(cur => [entry, ...cur]);
      setCapture(false);
      setTab('today');
      setViewDay(null);
      flash('Kept. You’ll see it again in 3 days.');
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, /*#__PURE__*/React.createElement("header", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("a", {
      className: "brand",
      href: "#",
      onClick: e => {
        e.preventDefault();
        setTab('today');
        setViewDay(null);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "brand-seal"
    }, "C"), /*#__PURE__*/React.createElement("span", {
      className: "brand-word"
    }, "Common", /*#__PURE__*/React.createElement("i", null, "place"))), !viewDay && /*#__PURE__*/React.createElement("nav", {
      className: "topnav"
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: v => setTab(v),
      items: [{
        value: 'today',
        label: 'Today',
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "sun",
          size: 14
        })
      }, {
        value: 'archive',
        label: 'Archive',
        count: 86
      }]
    })), viewDay && /*#__PURE__*/React.createElement("button", {
      className: "backlink",
      onClick: () => setViewDay(null)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 15
    }), " Back to archive"), /*#__PURE__*/React.createElement("div", {
      className: "topbar-actions"
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Search"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search"
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16
      }),
      onClick: () => setCapture(true)
    }, "Capture"))), /*#__PURE__*/React.createElement("main", {
      className: "canvas cp-grain"
    }, /*#__PURE__*/React.createElement("div", {
      className: "page-frame"
    }, viewDay ? /*#__PURE__*/React.createElement(TodayPage, {
      day: viewDay,
      onOpen: () => flash('Marked to review.')
    }) : tab === 'today' ? /*#__PURE__*/React.createElement(TodayPage, {
      day: today,
      onOpen: () => flash('Marked to review.')
    }) : /*#__PURE__*/React.createElement(ArchiveView, {
      weeks: data.weeks,
      onOpen: d => {
        setViewDay(dayFromSpine(d));
        window.scrollTo(0, 0);
      }
    }))), /*#__PURE__*/React.createElement(CaptureSheet, {
      open: capture,
      onClose: () => setCapture(false),
      onSave: onSave
    }), /*#__PURE__*/React.createElement(Toast, {
      toast: toast
    }));
  }
  window.AppShell = AppShell;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/journal/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/journal/ArchiveView.jsx
try { (() => {
/* ArchiveView — the season of past days. Where revisiting happens. */
(function () {
  const NS = window.CommonplaceDesignSystem_0504fa;
  const {
    Divider,
    Badge
  } = NS;
  const Icon = window.Icon;
  const INK = {
    podcast: 'var(--source-podcast)',
    book: 'var(--source-book)',
    essay: 'var(--source-essay)',
    video: 'var(--source-video)'
  };
  function SourceDots({
    sources
  }) {
    return /*#__PURE__*/React.createElement("span", {
      className: "dots"
    }, sources.map((s, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "dot",
      style: {
        background: INK[s]
      }
    })));
  }
  function DaySpine({
    d,
    onOpen
  }) {
    const mins = d.minutes;
    const time = mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;
    return /*#__PURE__*/React.createElement("button", {
      className: "spine",
      onClick: () => onOpen && onOpen(d)
    }, /*#__PURE__*/React.createElement("div", {
      className: "spine-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "spine-numeral"
    }, d.numeral), /*#__PURE__*/React.createElement("span", {
      className: "spine-when"
    }, /*#__PURE__*/React.createElement("b", null, d.weekday), /*#__PURE__*/React.createElement("i", null, d.monthShort))), /*#__PURE__*/React.createElement("p", {
      className: "spine-headline"
    }, d.headline), /*#__PURE__*/React.createElement("div", {
      className: "spine-foot"
    }, /*#__PURE__*/React.createElement(SourceDots, {
      sources: d.sources
    }), /*#__PURE__*/React.createElement("span", {
      className: "spine-meta"
    }, d.count, " \xB7 ", time)));
  }
  function ArchiveView({
    weeks,
    onOpen
  }) {
    const totalDays = weeks.reduce((s, w) => s + w.days.length, 0);
    return /*#__PURE__*/React.createElement("div", {
      className: "archive"
    }, /*#__PURE__*/React.createElement("header", {
      className: "archive-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "archive-title"
    }, "The archive"), /*#__PURE__*/React.createElement("p", {
      className: "archive-sub"
    }, "Everything you\u2019ve kept \u2014 ", totalDays, " days, and counting. Open one before it fades.")), /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      variant: "soft"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 11
    }), " 86 days")), weeks.map(w => /*#__PURE__*/React.createElement("section", {
      className: "week",
      key: w.label
    }, /*#__PURE__*/React.createElement(Divider, {
      label: w.label
    }), /*#__PURE__*/React.createElement("div", {
      className: "week-grid"
    }, w.days.map(d => /*#__PURE__*/React.createElement(DaySpine, {
      key: d.id,
      d: d,
      onOpen: onOpen
    }))))));
  }
  window.ArchiveView = ArchiveView;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/journal/ArchiveView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/journal/CaptureSheet.jsx
try { (() => {
/* CaptureSheet — the add-an-entry flow, as a slide-over sheet. */
(function () {
  const NS = window.CommonplaceDesignSystem_0504fa;
  const {
    Button,
    IconButton,
    Input,
    Textarea,
    Field,
    Switch,
    SourceTag
  } = NS;
  const Icon = window.Icon;
  const SOURCES = [{
    key: 'podcast',
    label: 'Podcast',
    glyph: 'mic'
  }, {
    key: 'book',
    label: 'Book',
    glyph: 'book-open'
  }, {
    key: 'essay',
    label: 'Essay',
    glyph: 'newspaper'
  }, {
    key: 'video',
    label: 'Short video',
    glyph: 'video'
  }];
  const INK = {
    podcast: 'var(--source-podcast)',
    book: 'var(--source-book)',
    essay: 'var(--source-essay)',
    video: 'var(--source-video)'
  };
  function CaptureSheet({
    open,
    onClose,
    onSave
  }) {
    const [source, setSource] = React.useState('podcast');
    const [title, setTitle] = React.useState('');
    const [takeaway, setTakeaway] = React.useState('');
    const [duration, setDuration] = React.useState('');
    const [note, setNote] = React.useState('');
    const [remind, setRemind] = React.useState(true);
    const reset = () => {
      setSource('podcast');
      setTitle('');
      setTakeaway('');
      setDuration('');
      setNote('');
      setRemind(true);
    };
    const save = () => {
      onSave && onSave({
        id: 'new-' + Date.now(),
        source,
        title: title || 'Untitled source',
        takeaway: takeaway || 'A takeaway, in your own words.',
        duration: duration || '—',
        loggedAt: 'Logged just now',
        note,
        tags: [],
        connections: 0
      });
      reset();
    };
    return /*#__PURE__*/React.createElement("div", {
      className: 'sheet-scrim' + (open ? ' is-open' : ''),
      onClick: onClose
    }, /*#__PURE__*/React.createElement("aside", {
      className: 'sheet' + (open ? ' is-open' : ''),
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "sheet-head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "sheet-kicker"
    }, "Capture"), /*#__PURE__*/React.createElement("h2", {
      className: "sheet-title"
    }, "One thing you learned")), /*#__PURE__*/React.createElement(IconButton, {
      label: "Close",
      onClick: onClose
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "sheet-body"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "What kind of source?"
    }, /*#__PURE__*/React.createElement("div", {
      className: "src-picker"
    }, SOURCES.map(s => /*#__PURE__*/React.createElement("button", {
      key: s.key,
      className: 'src-tile' + (source === s.key ? ' is-on' : ''),
      style: {
        '--_ink': INK[s.key]
      },
      onClick: () => setSource(s.key),
      type: "button"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.glyph,
      size: 18
    }), /*#__PURE__*/React.createElement("span", null, s.label))))), /*#__PURE__*/React.createElement("div", {
      className: "sheet-cols"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Title",
      htmlFor: "cs-title",
      hint: "The episode, book, or piece."
    }, /*#__PURE__*/React.createElement(Input, {
      id: "cs-title",
      value: title,
      onChange: e => setTitle(e.target.value),
      placeholder: "The Knowledge Project \u2014 Inversion"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Time spent",
      htmlFor: "cs-dur"
    }, /*#__PURE__*/React.createElement(Input, {
      id: "cs-dur",
      mono: true,
      value: duration,
      onChange: e => setDuration(e.target.value),
      placeholder: "52 min"
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "The one takeaway",
      htmlFor: "cs-take",
      hint: "In your own words \u2014 one sentence. This is the part you\u2019ll reread."
    }, /*#__PURE__*/React.createElement(Textarea, {
      id: "cs-take",
      serif: true,
      value: takeaway,
      onChange: e => setTakeaway(e.target.value),
      placeholder: "Avoid stupidity instead of seeking brilliance."
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Personal note",
      htmlFor: "cs-note",
      optional: true
    }, /*#__PURE__*/React.createElement(Textarea, {
      id: "cs-note",
      value: note,
      onChange: e => setNote(e.target.value),
      placeholder: "Why it mattered, where it connects\u2026"
    })), /*#__PURE__*/React.createElement("div", {
      className: "sheet-remind"
    }, /*#__PURE__*/React.createElement(Switch, {
      checked: remind,
      onChange: setRemind,
      label: "Remind me to review this in 3 days"
    }), /*#__PURE__*/React.createElement(SourceTag, {
      source: source,
      size: "sm"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "sheet-foot"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "quiet",
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 16
      }),
      onClick: save
    }, "Keep this"))));
  }
  window.CaptureSheet = CaptureSheet;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/journal/CaptureSheet.jsx", error: String((e && e.message) || e) }); }

// ui_kits/journal/TodayPage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* TodayPage — the daily composed page. The artifact you revisit. */
(function () {
  const NS = window.CommonplaceDesignSystem_0504fa;
  const {
    EntryCard,
    TakeawayQuote,
    SourceTag,
    MetaStamp,
    Divider
  } = NS;
  const Icon = window.Icon;
  function DayHead({
    day
  }) {
    const totalMin = day.entries.reduce((s, e) => s + (parseInt(e.duration) || 0), 0);
    const hrs = Math.floor(totalMin / 60),
      mins = totalMin % 60;
    const time = hrs ? `${hrs}h ${mins}m` : `${mins} min`;
    const tagCount = new Set(day.entries.flatMap(e => e.tags)).size;
    return /*#__PURE__*/React.createElement("header", {
      className: "day-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "day-head-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "day-numeral-wrap"
    }, /*#__PURE__*/React.createElement("span", {
      className: "day-numeral"
    }, day.numeral), /*#__PURE__*/React.createElement("span", {
      className: "day-month"
    }, day.monthShort)), /*#__PURE__*/React.createElement("div", {
      className: "day-titles"
    }, /*#__PURE__*/React.createElement("div", {
      className: "day-weekday"
    }, day.weekday), /*#__PURE__*/React.createElement("p", {
      className: "day-dek"
    }, day.dek))), /*#__PURE__*/React.createElement("div", {
      className: "day-stats"
    }, /*#__PURE__*/React.createElement(MetaStamp, {
      items: [/*#__PURE__*/React.createElement("span", {
        className: "hl"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "bookmark",
        size: 12
      }), " ", day.entries.length, " sources"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
        name: "clock",
        size: 12
      }), " ", time), /*#__PURE__*/React.createElement("span", null, tagCount, " threads"), /*#__PURE__*/React.createElement("span", null, day.dateLong)]
    })), /*#__PURE__*/React.createElement(Divider, {
      variant: "double"
    }));
  }
  function LeadEntry({
    e
  }) {
    return /*#__PURE__*/React.createElement("section", {
      className: "day-lead"
    }, /*#__PURE__*/React.createElement("div", {
      className: "day-lead-top"
    }, /*#__PURE__*/React.createElement(SourceTag, {
      source: e.source
    }), /*#__PURE__*/React.createElement(MetaStamp, {
      items: [e.duration, e.loggedAt]
    })), /*#__PURE__*/React.createElement(TakeawayQuote, {
      size: "xl",
      source: e.source,
      className: "day-lead-quote"
    }, e.takeaway), /*#__PURE__*/React.createElement("div", {
      className: "day-lead-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "day-lead-title"
    }, e.title), e.note && /*#__PURE__*/React.createElement("p", {
      className: "day-lead-note"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "corner-down-right",
      size: 14
    }), " ", e.note)), /*#__PURE__*/React.createElement("div", {
      className: "day-lead-tags"
    }, e.tags.map(t => /*#__PURE__*/React.createElement("span", {
      className: "thread",
      key: t
    }, "#", t)), e.connections > 0 && /*#__PURE__*/React.createElement("span", {
      className: "thread-conn"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "share",
      size: 12
    }), " ", e.connections, " links")));
  }
  function TodayPage({
    day,
    onOpen
  }) {
    const [lead, ...rest] = day.entries;
    return /*#__PURE__*/React.createElement("article", {
      className: "today"
    }, /*#__PURE__*/React.createElement(DayHead, {
      day: day
    }), /*#__PURE__*/React.createElement(LeadEntry, {
      e: lead
    }), rest.length > 0 && /*#__PURE__*/React.createElement(Divider, {
      label: "Also today"
    }), rest.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "day-grid"
    }, rest.map(e => /*#__PURE__*/React.createElement(EntryCard, _extends({
      key: e.id
    }, e, {
      onOpen: () => onOpen && onOpen(e)
    })))), /*#__PURE__*/React.createElement("footer", {
      className: "day-foot"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 14
    }), /*#__PURE__*/React.createElement("span", null, "Come back to this in 3 days, right before it fades.")));
  }
  window.TodayPage = TodayPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/journal/TodayPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/journal/data.js
try { (() => {
/* Commonplace UI kit — sample data. One rich "today", a season of archive. */
(function () {
  const today = {
    id: '2026-06-11',
    weekday: 'Thursday',
    dateLong: '11 June 2026',
    numeral: '11',
    monthShort: 'JUN',
    dek: 'A day about how the mind fools itself — and how to make knowledge stay.',
    entries: [{
      id: 'e1',
      source: 'podcast',
      title: 'The Knowledge Project · Inversion',
      takeaway: 'Avoid stupidity instead of seeking brilliance.',
      duration: '52 min',
      loggedAt: 'Logged 06:42',
      note: 'Flip the question: not “how do I succeed?” but “what guarantees failure?” — then don’t do that.',
      tags: ['inversion', 'mental-models'],
      connections: 2
    }, {
      id: 'e2',
      source: 'book',
      title: 'Thinking, Fast and Slow · ch.3',
      takeaway: 'System 1 is fast and overconfident; System 2 is lazy and rubber-stamps it.',
      duration: '30 min',
      loggedAt: 'Logged 08:10',
      note: 'Caught myself doing exactly this in standup — agreed before I’d actually thought.',
      tags: ['cognition', 'mental-models'],
      connections: 1
    }, {
      id: 'e3',
      source: 'essay',
      title: 'The forgetting curve',
      takeaway: 'Review right before you’d forget, and the memory hardens.',
      duration: '12 min',
      loggedAt: 'Logged 14:25',
      note: 'This is the whole reason this journal exists. Space the reviews along the curve.',
      tags: ['memory', 'learning'],
      connections: 3
    }, {
      id: 'e4',
      source: 'video',
      title: 'The Feynman technique',
      takeaway: 'Explain it simply, or you don’t actually understand it.',
      duration: '60 sec',
      loggedAt: 'Logged 22:05',
      note: 'Tried explaining the forgetting curve out loud and stalled halfway. Telling.',
      tags: ['learning'],
      connections: 1
    }]
  };

  // Compact archive: each past day = date + the source mix + a headline takeaway.
  const A = (id, wd, num, mon, count, mins, sources, headline) => ({
    id,
    weekday: wd,
    numeral: num,
    monthShort: mon,
    count,
    minutes: mins,
    sources,
    headline
  });
  const archive = [A('2026-06-10', 'Wed', '10', 'JUN', 3, 74, ['podcast', 'book', 'essay'], 'Compounding is just patience with a multiplier.'), A('2026-06-09', 'Tue', '09', 'JUN', 2, 41, ['book', 'video'], 'Constraints don’t limit creativity — they aim it.'), A('2026-06-08', 'Mon', '08', 'JUN', 4, 96, ['podcast', 'essay', 'book', 'video'], 'You don’t rise to your goals; you fall to your systems.'), A('2026-06-07', 'Sun', '07', 'JUN', 1, 18, ['essay'], 'Boredom is the brain defragmenting.'), A('2026-06-06', 'Sat', '06', 'JUN', 3, 63, ['book', 'book', 'essay'], 'The map is not the territory — and you live in maps.'), A('2026-06-05', 'Fri', '05', 'JUN', 2, 55, ['podcast', 'video'], 'Most arguments are two people defining one word differently.'), A('2026-06-04', 'Thu', '04', 'JUN', 3, 71, ['podcast', 'essay', 'book'], 'Write to find out what you think, not to report it.'), A('2026-06-03', 'Wed', '03', 'JUN', 2, 34, ['video', 'essay'], 'Spaced repetition beats cramming by a wide margin.'), A('2026-06-02', 'Tue', '02', 'JUN', 4, 88, ['book', 'podcast', 'essay', 'video'], 'Incentives quietly explain almost everything.'), A('2026-06-01', 'Mon', '01', 'JUN', 1, 22, ['book'], 'Naming a feeling shrinks it.'), A('2026-05-30', 'Fri', '30', 'MAY', 3, 60, ['podcast', 'book', 'essay'], 'Confidence should track evidence, not effort.'), A('2026-05-29', 'Thu', '29', 'MAY', 2, 47, ['essay', 'video'], 'A small daily habit out-earns a heroic burst.'), A('2026-05-28', 'Wed', '28', 'MAY', 3, 69, ['book', 'podcast', 'video'], 'The second-order effect is usually the real story.'), A('2026-05-27', 'Tue', '27', 'MAY', 2, 38, ['podcast', 'essay'], 'Strong opinions, loosely held — emphasis on loosely.'), A('2026-05-26', 'Mon', '26', 'MAY', 4, 102, ['book', 'book', 'essay', 'podcast'], 'Attention is the rarest, most valuable thing you spend.'), A('2026-05-23', 'Fri', '23', 'MAY', 1, 15, ['video'], 'If you can’t teach it, you don’t own it yet.'), A('2026-05-22', 'Thu', '22', 'MAY', 3, 58, ['podcast', 'essay', 'book'], 'Friction is a feature when it protects your focus.'), A('2026-05-21', 'Wed', '21', 'MAY', 2, 44, ['book', 'video'], 'Memory is reconstruction, not playback.')];

  // Group archive rows by ISO-week label for the view.
  const weeks = [{
    label: 'This week',
    days: archive.slice(0, 6)
  }, {
    label: 'Last week',
    days: archive.slice(6, 10)
  }, {
    label: 'Week of 25 May',
    days: archive.slice(10, 15)
  }, {
    label: 'Week of 18 May',
    days: archive.slice(15)
  }];
  window.CP_DATA = {
    today,
    archive,
    weeks
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/journal/data.js", error: String((e && e.message) || e) }); }

// ui_kits/journal/icons.js
try { (() => {
/* Commonplace UI kit — inline icon set (Lucide glyphs, copied as paths).
   A tiny <Icon name size /> avoids Lucide's runtime DOM mutation inside React. */
(function () {
  const P = {
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    'more-horizontal': '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>',
    quote: '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2.5a.5.5 0 0 1 .5.5v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1 1 1 0 0 0 1 1 4 4 0 0 0 4-4V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2.5a.5.5 0 0 1 .5.5v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1 1 1 0 0 0 1 1 4 4 0 0 0 4-4V5a2 2 0 0 0-2-2z"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    newspaper: '<path d="M15 18h-5"/><path d="M18 14h-8"/><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M10 6h8v4h-8z"/>',
    video: '<path d="m22 8-6 4 6 4V8Z"/><path d="M14 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"/>',
    'corner-down-right': '<polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>',
    bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'
  };
  function Icon({
    name,
    size = 18,
    strokeWidth = 2,
    className = '',
    style = {}
  }) {
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      className: 'cp-ico ' + className,
      style: {
        display: 'inline-block',
        flex: 'none',
        ...style
      },
      'aria-hidden': true,
      dangerouslySetInnerHTML: {
        __html: P[name] || ''
      }
    });
  }
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/journal/icons.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.EntryCard = __ds_scope.EntryCard;

__ds_ns.MetaStamp = __ds_scope.MetaStamp;

__ds_ns.SourceTag = __ds_scope.SourceTag;

__ds_ns.TakeawayQuote = __ds_scope.TakeawayQuote;

})();
