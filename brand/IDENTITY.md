# Clarity identity standards

**Version 2 · 12 September 2026.** The reference for anyone touching how Clarity looks: the website, the desktop app's windows and menu-bar icon, the DMG, release notes, screenshots. It records what the identity is, why, and the exact values, so the app and the site read as one product.

Machine-readable values live in [`assets/tokens.css`](../assets/tokens.css). If this document and that file disagree, fix the file first, then this. **Whenever a font, colour, spacing, motion value or line of copy changes anywhere, update both in the same change.**

What changed from v1: theme confirmed dark; type moved from Geist to **Archivo + Fragment Mono**; slogan set; the floating glass menu added; the app's own window tokens recorded; the "site shows the app" rules added (§7).

---

## 1. What Clarity is

A macOS menu-bar app for students. Press ⌘⇧E on any problem on your screen, get a written explanation in seconds and a custom animation about a minute later.

**Slogan:** *A tutor, one key away.*

**The identity idea:** the name is the behaviour. Things arrive out of focus and become clear. Every visual and motion choice below serves that.

**Mood in three words:** quiet, precise, glass.

---

## 2. The mark

The icon is the standard. It predates this document and nothing here changes it.

| Part | What it is | Colour |
|---|---|---|
| Square | Rounded slate square, macOS icon proportions (corner radius 22.37% of the side). Gradient from haze at top-left to ink at bottom-right. | `#a9b4c3` → `#3a4553` → `#121b26` |
| Ring | Thick white C, open at the lower right. The letter and the magnifier's rim at once. | `#ffffff` |
| Glass | The lens, inside the ring, slightly right of centre. Radial gradient with a highlight at upper left. | `#cff8e7` → `#589da1` → `#2f6b72`, rim `#8ddccb` |
| Handle | Short, thick, rounded, mint. Exits through the ring's gap. | `#8fe3cf` → `#5cc2ad` |

**Files**

- App repo, `desktop/assets/`: `icon.png` and `icon.icns` (the painted master; use at rest, in the bundle, on the DMG), `menubar_idle(@2x).png`, `menubar_working(@2x).png`, `dmg_background.png`, `logo.svg` (wraps the raster).
- This repo, [`assets/clarity-mark.svg`](../assets/clarity-mark.svg): a vector redraw for places the mark must be crisp at any size or move. Group `#mag` is ring, glass and handle together.

**Rules**

- Minimum size 24 px. In the site's menu it is 24 px with a 6 px radius.
- Clear space around the mark equals the ring's stroke width.
- The square never rotates, skews or recolours. The mark never sits on mint.
- No outlines or baked-in shadows. Surfaces apply their own shadow.

---

## 3. Colour

Dark is the theme. The app's windows are dark panels and the icon is a dark object; the site keeps that world. There is no light mode on the site. (Light values were explored and dropped on 12 Sep; if the app ever needs a light mode, derive it from the icon's haze `#a9b4c3` toward white, and darken mint to `#3fb39b` for contrast.)

| Token | Value | Role |
|---|---|---|
| `--c-ink` | `#0e141c` | Ground. Slate, never `#000`. Carries the icon's blue cast. |
| `--c-ink-2` | `#141c26` | Raised surface: code blocks, inputs. |
| `--c-ink-3` | `#1b2531` | Panels, callouts. |
| `--c-mist` | `#eaf0f4` | Primary text. |
| `--c-mist-70` | `rgba(234,240,244,.70)` | Secondary text, the slogan, menu links at rest. |
| `--c-mist-45` | `rgba(234,240,244,.45)` | Fine print, labels. Only at 12.5 px or larger. |
| `--c-mist-25` | `rgba(234,240,244,.25)` | Keycap borders. |
| `--c-line` / `--c-line-2` | `.10` / `.20` white | Hairlines, dividers. |
| `--c-mint` | `#6fd1bd` | **The accent.** The handle's colour. The download button, the caret, focus rings. One mint element per screen. |
| `--c-mint-ink` | `#0b1b18` | Text on mint. |
| `--c-lens` | `#589da1` | Secondary: eyebrow labels, step numbers. |
| `--c-glass-hi` | `#cff8e7` | Emphasis on dark: maths and highlighted terms inside explanations. |
| `--c-danger` | `#ff8a8a` | Errors only. |
| `--c-paper` | `#f7f5ef` | The "problem set" card in demos. Warm paper, never pure white, so it reads as a document, not a UI. |

**Rules**

- One chroma per screen. If two things are mint, one is wrong.
- Hover changes opacity or a hairline, not colour. Menu items get a `rgba(255,255,255,.10)` pill on hover.
- Semantic colour (danger) is never decorative.
- Contrast: mist on ink 14:1; mist-70 9:1; mist-45 4.6:1.

### The app's window tokens

These are what `desktop/clarity/ui/shared/base.css` uses today, recorded so the site can rebuild the windows faithfully. **One change is recommended for the app:** the accent.

| App variable | Current | Recommended |
|---|---|---|
| `--panel` | `rgba(20,20,24,.92)` | `rgba(14,20,28,.92)` (ink at 92%, so the panel matches the site and icon) |
| `--accent` | `#7aa2ff` (blue, predates the icon) | **`#6fd1bd`** (mint) |
| `.item.selected` | `rgba(122,162,255,.18)` | `rgba(111,209,189,.18)` |
| `--text` / `--text-dim` / `--text-faint` | `.92` / `.55` / `.38` white | keep |
| `--stroke` / `--field` | `.10` / `.07` white | keep |
| `--radius` | `12px` | keep |
| `.panel` shadow | `0 12px 32px rgba(0,0,0,.45)` | keep |
| `--danger` | `#ff8a8a` | keep |

---

## 4. Typography

Three faces on the web, one rule in the app.

| Role | Face | Setting |
|---|---|---|
| Wordmark | **Archivo**, width 122, weight 500 | `clamp(60px, 7.8vw, 112px)`, letter-spacing −0.02em, line-height 0.92. The expanded width is the wordmark's signature; nothing else on the site is set wide. |
| Interface and body | **Archivo**, width 100, weights 400 / 500 / 600 | Body 16 px / 1.5. Button labels 15 px 600. |
| Slogan, menu links, fine print, hotkeys, labels, code | **Fragment Mono** 400 | Slogan `clamp(18px, 1.5vw, 22px)`. Menu links 13 px, +0.01em. Fine print 12.5 px, +0.01em. Eyebrows 12 px uppercase, +0.08em. |
| Maths in sample problems | **STIX Two Text** italic | Only for formulae shown as examples. |
| Inside replicas of the app's windows | the system stack (`-apple-system, "SF Pro Text"`) | 13 px / 1.5; the Spotlight input 15 px / 1.4; code `SF Mono` 12 px. The replica must look like the real window. |

**In the app:** the system font only, as today. Never load a web font into the app. The DMG background draws "Clarity" in SF Rounded at 30 pt; that is fine and stays.

**Rules**

- Weight 600 is the heaviest anywhere. No 700.
- Faces that are off-limits because they read as template defaults: Inter, DM Sans, Space Grotesk, Manrope, Poppins, Geist, Instrument Sans, and any system stack on the web.
- Running text stays under about 65 characters a line.
- Tabular numerals wherever digits line up.
- Hotkeys are always keycaps: <kbd>⌘</kbd><kbd>⇧</kbd><kbd>E</kbd>, set in Fragment Mono, 1 px border with a 2 px bottom edge, 5 px radius. Never "Cmd-Shift-E" in prose.

---

## 5. Layout

**Page one** is one screen and never scrolls. Two columns on desktop: copy on the left (wordmark, slogan, download button, fine print, top-aligned as a stack), the product on the right (§7). Single column below 860 px, copy first.

**The floating glass menu** sits top centre, 16 px from the top: a pill, 50 px tall, `rgba(255,255,255,.055)` fill, `blur(22px) saturate(1.5)` behind, 1 px `rgba(255,255,255,.12)` border, a 1 px light edge inside the top and a 1 px dark edge inside the bottom, `0 14px 40px rgba(0,0,0,.45)` shadow. Contents left to right: the mark at 24 px, "Clarity" in Archivo 500 15 px, a 1 px divider, then links in Fragment Mono 13 px. This is the macOS Tahoe toolbar language, so the site feels like the app's own chrome.

**The download button:** 48 px tall, mint, 10 px radius, Archivo 600 15 px, the Apple mark at 15 × 18 px on the left, a <kbd>D</kbd> keycap on the right (pressing D on the page downloads). Hover lifts 1 px and deepens the shadow. Under it, one line of fine print: `Clarity.dmg · macOS 14+ · Apple Silicon · free, open source`.

**Depth:** a fine film grain over the ground at 6% (SVG turbulence, three-step jitter every 900 ms), and one soft mint glow behind the product column. Nothing else decorates the page.

---

## 6. Motion

**Curves** (from `tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.2,.7,.2,1)` | Anything arriving |
| `--ease-in` | `cubic-bezier(.6,0,.9,.4)` | Anything leaving. Exits are shorter than entrances. |
| `--ease-io` | `cubic-bezier(.65,0,.35,1)` | Things moving while already on screen (the stage tilt) |

**Durations**

| Token | Value | Use |
|---|---|---|
| `--t-tap` | 100 ms | Keycap press: 2 px down, bottom edge thins, mint tint |
| `--t-hover` | 160 ms | Hover, the menu pill |
| `--t-spot-in` / `--t-spot-out` | 180 / 120 ms | **The app's Spotlight box:** opacity 0→1 and scale .96→1 in on ease-out; .98 and out on ease-in. The oldest motion in the product. |
| `--t-result` | 150 ms | **The app's result window** fading in |
| `--t-word` | 640 ms | The wordmark's blur-in |

**The boot** (every full page load, never on an in-page navigation)

1. The wordmark alone: opacity 0→1, blur 8 px→0, rises 6 px, 640 ms ease-out. Nothing else moves.
2. At 380 ms the slogan starts the same move; the button at 520 ms; fine print and menu fade at 640 ms; the problem card rises at 700 ms. Each starts while the previous is still finishing so there are no gaps.
3. At about 1.4 s the product demo begins (§7).

**Rules**

- Blur-to-focus starts at 8 px and never above 12. Pair it with a small rise or scale; blur alone reads as a fade.
- Under 300 ms for anything the user triggers repeatedly.
- Nothing is parked invisible waiting for JavaScript. Pages read fully with scripts off.
- Ambient motion (grain, glow) never draws the eye. No loops the user would watch.
- The stage tilts at most 6° toward the pointer, 320 ms ease-io, and returns on leave. Pointer only.
- Under `prefers-reduced-motion`: no movement, no blur; 200 ms opacity fades at most. The app already does this in `base.css`.
- Retired on 12 Sep and not to return: the magnifier spin, the lens hunt, the selection-frame boot, the maths-symbol typewriter.

---

## 7. Showing the app

The site's hero is the app answering a problem on the page. Rules for depicting the product anywhere:

- Rebuild the windows from the app's own CSS and tokens (§3), at the real proportions: Spotlight box 680 × 96 pt, result window 440 × 680 pt, both 12 px radius, `.5px` stroke, the app's shadow. Never invent chrome the app doesn't have.
- Use the app's real status strings, in order: *Reading the problem…* → *Writing explanation…* → *Planning the animation…* → *Rendering scene N of 3…* → *Done*. A working status carries the mint pulse dot; *Done* is faint.
- Explanations use the app's shape: bold **Step N — lead.**, inline code, one fenced code block, 3–4 steps.
- The Spotlight placeholder is the app's: *Add context… (why is my binary search not working?)*, with ↓ and ↵ keycap hints.
- The problem lives on a paper card (`--c-paper`), with a mono uppercase header and a dashed selection around the region. Demos alternate between a calculus problem and a code problem on successive loads.
- **Provisional content is provisional.** The app is in development. Explanation text, the rendered clip, and the window layouts are placeholders until real output exists, and must live in one data object so they swap in one edit. Say so in the source.

---

## 8. Voice

- Plain, specific sentences. Say what happens.
- The slogan is *A tutor, one key away.* It appears once, under the wordmark. No other taglines.
- Name things by what the user recognises: the box, the window, the key, a recent. Not the coordinator, the job, the agent.
- Errors say what went wrong and what to do. Never a traceback, never an apology.
- Quiet failures stay quiet: *The animation didn't render this time.* in fine print, not red.
- No exclamation marks. No wordplay on the name beyond the slogan's "key".

---

## 9. Checklist before shipping any surface

- [ ] One mint element per screen, and it's the primary action.
- [ ] Ground is `#0e141c` or a panel token, never `#000`.
- [ ] Web: Archivo for text, Fragment Mono for slogan/labels/hotkeys, STIX for maths. App: system font.
- [ ] Wordmark is Archivo width 122, weight 500. Nothing else is set wide.
- [ ] Every entrance is `--ease-out`, every exit `--ease-in`, exits shorter.
- [ ] Blur-to-focus starts at 8 px, paired with movement.
- [ ] Reduced motion tested: nothing moves, nothing blurs.
- [ ] App windows shown on the site match the app's real tokens and status strings.
- [ ] Hotkeys are keycaps. Copy has no exclamation marks.
- [ ] The square in the mark did not rotate.
