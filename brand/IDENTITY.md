# Clarity identity standards

**Version 2 · 12 September 2026.** Font and colour for anyone building Clarity's UI, on the website or in the desktop app. Values are mirrored in [`assets/tokens.css`](../assets/tokens.css). When either changes, change both.

---

## Font

### Website

| Use | Face | Setting |
|---|---|---|
| Wordmark | **Archivo**, width 122 (expanded), weight 500 | 60–112 px, letter-spacing −0.02em, line-height 0.92. Only the wordmark is set wide. |
| Interface and body text | **Archivo**, width 100, weights 400 / 500 / 600 | Body 16 px / 1.5. Button labels 15 px, weight 600. |
| Slogan, menu links, fine print, hotkeys, labels, code | **Fragment Mono**, weight 400 | Slogan 18–22 px. Menu links 13 px. Fine print 12.5 px. Small labels 12 px uppercase with +0.08em tracking. |
| Maths in sample problems | **STIX Two Text**, italic | Formulae shown as examples only. |
| Inside pictures of the app's windows | System stack: `-apple-system, "SF Pro Text", system-ui` | 13 px / 1.5; the Spotlight input 15 px / 1.4; code `SF Mono` 12 px. The picture must match the real window. |

All three web faces are on Google Fonts:
`https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..600&family=Fragment+Mono&family=STIX+Two+Text:ital@1&display=swap`

Fallback stacks: Archivo → `-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`. Fragment Mono → `ui-monospace, "SF Mono", Menlo, monospace`. STIX → `"Times New Roman", serif`.

### Desktop app

The **system font only**, as today: `-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif` at 13 px / 1.5, the Spotlight input at 15 px / 1.4, code in `"SF Mono", ui-monospace, Menlo` at 12 px. Never load a web font into the app. The DMG background's "Clarity" in SF Rounded at 30 pt stays.

### Rules

- Weight 600 is the heaviest anywhere. No 700.
- Hotkeys are always keycaps (<kbd>⌘</kbd><kbd>⇧</kbd><kbd>E</kbd>) in the mono face: 1 px border, 2 px bottom edge, 5 px radius. Never "Cmd-Shift-E" in prose.
- Not to be used, because they read as template defaults: Inter, DM Sans, Space Grotesk, Manrope, Poppins, Geist, Instrument Sans, and any system font on the web.

---

## Colour

Dark only. Sampled from the app icon.

| Token | Value | Role |
|---|---|---|
| `--c-ink` | `#0e141c` | Ground. Slate, never `#000`. |
| `--c-ink-2` | `#141c26` | Raised surface: code blocks, inputs. |
| `--c-ink-3` | `#1b2531` | Panels, callouts. |
| `--c-slate` | `#3a4553` | Mid-tone of the icon square. |
| `--c-haze` | `#a9b4c3` | Top-left of the icon square. |
| `--c-mist` | `#eaf0f4` | Primary text. |
| `--c-mist-70` | `rgba(234,240,244,.70)` | Secondary text, slogan, menu links at rest. |
| `--c-mist-45` | `rgba(234,240,244,.45)` | Fine print, labels. Only at 12.5 px or larger. |
| `--c-mist-25` | `rgba(234,240,244,.25)` | Keycap borders. |
| `--c-line` | `rgba(234,240,244,.10)` | Hairlines. |
| `--c-line-2` | `rgba(234,240,244,.20)` | Stronger hairlines, dividers. |
| `--c-mint` | `#6fd1bd` | **The accent.** The download button, the caret, focus rings, selection tints at 18%. One mint element per screen. |
| `--c-mint-ink` | `#0b1b18` | Text on mint. |
| `--c-lens` | `#589da1` | Secondary: eyebrow labels, step numbers. |
| `--c-glass-hi` | `#cff8e7` | Emphasis on dark: maths and highlighted terms in explanations. |
| `--c-danger` | `#ff8a8a` | Errors only. |
| `--c-paper` | `#f7f5ef` | Paper cards in demos. Warm, never pure white. |

### The mark's colours

Square gradient `#a9b4c3` → `#3a4553` → `#121b26`. Ring `#ffffff`. Glass `#cff8e7` → `#589da1` → `#2f6b72` with rim `#8ddccb`. Handle `#8fe3cf` → `#5cc2ad`.

### Desktop app

The app's window tokens (`desktop/clarity/ui/shared/base.css`), with one recommended change:

| Variable | Current | Recommended |
|---|---|---|
| `--panel` | `rgba(20,20,24,.92)` | `rgba(14,20,28,.92)` so the panel matches the site and icon |
| `--accent` | `#7aa2ff` | **`#6fd1bd`** |
| `.item.selected` background | `rgba(122,162,255,.18)` | `rgba(111,209,189,.18)` |
| `--text` / `--text-dim` / `--text-faint` | white at `.92` / `.55` / `.38` | keep |
| `--stroke` / `--field` | white at `.10` / `.07` | keep |
| `--danger` | `#ff8a8a` | keep |

### Rules

- One chroma per screen. If two things are mint, one is wrong.
- Hover changes opacity or a hairline, not colour.
- Danger is never decorative.
- Contrast on ink: mist 14:1, mist-70 9:1, mist-45 4.6:1.
