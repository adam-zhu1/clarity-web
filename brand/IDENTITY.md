# Clarity identity standards

The reference for anyone touching Clarity's look: the website, the desktop app's two windows, the menu-bar icon, release notes, screenshots. It records what the identity is, why, and the exact values, so the app and the site stay the same object.

Machine-readable values live in [`assets/tokens.css`](../assets/tokens.css). If this document and that file disagree, fix the file first, then this.

---

## 1. What Clarity is, in one line

A macOS menu-bar app for students. Press ⌘⇧E on any problem on your screen, read a written explanation in seconds, watch a custom animation a minute later.

**The identity idea:** the name is the behaviour. Things start out of focus and become clear. Every visual and motion decision below serves that one idea.

Three words for the mood: **quiet, precise, glass.**

---

## 2. The mark

The icon is the identity standard. It predates this document and nothing here changes it.

| Part | What it is | Colour |
|---|---|---|
| Square | Rounded slate square, macOS icon proportions (corner radius 22.37% of the side). Gradient from haze at top-left to ink at bottom-right. | `#a9b4c3` → `#3a4553` → `#121b26` |
| Ring | Thick white C, open at the lower right. The C is both the letterform and the magnifier's rim. | `#ffffff` |
| Glass | The lens, sitting inside the ring, slightly right of centre. Radial gradient, highlight at upper left. | `#cff8e7` → `#589da1` → `#2f6b72`, rim `#8ddccb` |
| Handle | Short, thick, rounded, mint. Exits through the ring's gap toward the corner. | `#8fe3cf` → `#5cc2ad` |

**Files**

- `desktop/assets/icon.png` and `icon.icns` in the app repo: the painted master. Use for the app bundle, the DMG, and anywhere the icon appears at rest.
- [`assets/clarity-mark.svg`](../assets/clarity-mark.svg) in this repo: the vector redraw. Use wherever the magnifier has to move on its own (the website's launch, the page-to-page flight, hover). The group `#mag` is the ring, glass and handle together; rotate it around `50 49` and the square stays still.

**Rules**

- Minimum size 24 px. Below that use the square alone with the ring, no glass highlight.
- Clear space around the mark equals the ring's stroke width on all sides.
- The square never rotates, skews, or changes colour. Only the magnifier group moves, and only as described in §5.
- Never place the mark on mint. On light backgrounds it sits as is; it carries its own dark ground.
- No outlines, no drop shadows baked into the asset. Shadows are applied by the surface (see §5 for the website's).

---

## 3. Colour

Sampled from the icon. Dark is the native state: the app's windows are dark translucent panels and the icon is a dark object.

### Dark (default)

| Token | Hex | Role |
|---|---|---|
| `--c-ink` | `#0e141c` | Ground. Never pure black; this carries the icon's blue-slate cast. |
| `--c-ink-2` | `#141c26` | Raised surface (code blocks, inputs). |
| `--c-ink-3` | `#1b2531` | Panels, callouts. |
| `--c-mist` | `#eaf0f4` | Primary text. |
| `--c-mist-70` | `rgba(234,240,244,.70)` | Secondary text. |
| `--c-mist-44` | `rgba(234,240,244,.44)` | Labels, fine print. |
| `--c-line` / `--c-line-2` | `rgba(234,240,244,.10 / .20)` | Hairlines. |
| `--c-mint` | `#6fd1bd` | **The accent.** The handle's colour. One primary button and one link per screen, plus focus rings. |
| `--c-mint-ink` | `#0b1b18` | Text on mint. |
| `--c-lens` | `#589da1` | Secondary. Eyebrow labels, step numbers, small chrome. |
| `--c-glass-hi` | `#cff8e7` | Emphasis on dark: math, highlighted terms in explanations. |
| `--c-danger` | `#ff8a8a` | Errors only. |

### Light (documented for the app's future light mode; the website is dark only)

| Token | Hex |
|---|---|
| `--c-paper` | `#f3f6f8` |
| `--c-paper-2` | `#ffffff` |
| `--c-ink-on-paper` | `#121b26` |
| `--c-mint-on-paper` | `#3fb39b` (mint darkened for contrast on white) |
| `--c-lens-on-paper` | `#3d8d90` |

### Rules

- One chroma per screen. Mint is for the action the screen exists for. If two things are mint, one of them is wrong.
- Hover changes opacity or a hairline, not colour.
- Semantic colours (danger) are separate from the accent and never used decoratively.
- Contrast: body text on ink is 14:1; mist-70 is 9:1; mist-44 is 4.6:1 and is only used at 13 px or above.

### Mapping to the app today

`desktop/clarity/ui/shared/base.css` currently uses a blue accent that predates the icon. To align:

| App variable | Current | Change to |
|---|---|---|
| `--panel` | `rgba(20,20,24,.92)` | `rgba(14,20,28,.92)` (`--c-ink` at 92%) |
| `--accent` | `#7aa2ff` | `#6fd1bd` (`--c-mint`) |
| `.item.selected` background | `rgba(122,162,255,.18)` | `rgba(111,209,189,.18)` |
| `#input` caret | `var(--accent)` | unchanged (inherits mint) |
| `.explanation a` | `var(--accent)` | unchanged (inherits mint) |
| `--danger` | `#ff8a8a` | unchanged |

The text, stroke and field variables already match this palette and stay.

---

## 4. Typography

| Role | Website | Desktop app | Why |
|---|---|---|---|
| Interface and body | **Geist** 400 / 500 / 600 | **SF Pro Text** via the system stack | Geist is the closest web face to SF Pro's precision without being the system default. The app should use the system font like every good Mac app. |
| Code, hotkeys, commands | **Geist Mono** 400 / 500 | **SF Mono** via `ui-monospace` | Hotkeys (⌘⇧E), file names, terminal commands, step numbers, eyebrow labels. |
| Math in samples | **STIX Two Text** italic | rendered by the explanation's markdown | Only for problem statements and formulae shown as examples. |

**Scale and setting**

- Body 16 px / 1.55. Small 14 px. Micro 12 px (mono, uppercase, letter-spacing .08em for eyebrows).
- The wordmark "Clarity" is Geist 600 with letter-spacing −.04em. On the website's first page it is `clamp(64px, 12vw, 128px)`. It is never bold (700); 600 is the ceiling everywhere.
- Section headings 28–40 px, 600, letter-spacing −.03em, line-height 1.1.
- Running text stays under about 65 characters per line.
- Numbers that line up (timings, sizes) use `font-variant-numeric: tabular-nums`.
- Never use the system stack on the website, and never load a web font in the app.

---

## 5. Motion

Motion is the identity's most visible part, so it has the tightest rules.

**Curves** (from `tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(.2,.7,.2,1)` | Anything arriving |
| `--ease-in` | `cubic-bezier(.6,0,.9,.4)` | Anything leaving. Exits are shorter than entrances. |
| `--ease-io` | `cubic-bezier(.65,0,.35,1)` | Things moving while already on screen |
| `--ease-land` | `cubic-bezier(.34,1.25,.5,1)` | The magnifier landing (small overshoot). Nothing else. |

**Durations**

| Token | Value | Use |
|---|---|---|
| `--t-tap` | 120 ms | Pressed states, keycaps |
| `--t-hover` | 180 ms | Hover, focus. **Also the app's spotlight box:** opacity 0→1, scale .96→1, 180 ms ease-out in; 120 ms ease-in out. This is the oldest motion in the product and the website borrows it. |
| `--t-enter` | 420 ms | Content arriving on a page |
| `--t-page` | 560 ms | The icon's flight between website pages |

**The three signature recipes**

1. **Focus-in.** `filter: blur(14px) → 0`, `opacity .25 → 1`, and for a wordmark `letter-spacing .08em → −.04em`, on `--ease-out`. Blur alone reads as a fade; the scale or tracking change is what makes it read as focus. Keep blur radii at or under 20 px, animate `blur(Npx) → blur(0px)` (never to `none`), and toggle `will-change: filter` on only for the duration.
2. **Spin-land.** The magnifier group rotates from −300° to 0° over 1050 ms on `--ease-land`. The square does not rotate. Used once, on the website's first visit. In the app, a smaller version (−24° → 0, 300 ms) may be used when the menu-bar icon changes from idle to working.
3. **Spotlight in / out.** 180 ms in, 120 ms out, opacity and scale .96 / .98. Every floating surface in the app arrives and leaves this way. Result boxes fade in over 150 ms.

**Rules**

- Under 300 ms for anything the user triggers repeatedly. Under 1.2 s for anything on load, with one exception: the website's first-visit launch is 2.4 s and plays once. Return visits get a 650 ms glint on the glass and nothing else.
- Nothing is parked at `opacity: 0` waiting for JavaScript. Pages read fully with scripts off.
- Ambient motion (the drifting glow behind the website hero) runs on a 90 s loop so the eye never tracks it.
- Under `prefers-reduced-motion: reduce`: no movement, no blur; a 200 ms opacity fade at most. The app already does this globally in `base.css`.
- Never animate `letter-spacing` on more than one word, or `filter` on a full viewport.

---

## 6. Voice

- Plain, specific sentences. Say what happens. "Reading the problem…", "Writing explanation…", "Rendering scene 2 of 3…", "Done".
- No taglines, no wordplay, no exclamation marks. The one approved line is: **"A hotkey that explains any problem on your screen."**
- Name things by what the user recognises: the box, the window, the hotkey, a recent. Not the coordinator, the job, the agent.
- Errors say what went wrong and what to do: "Can't reach the server." with the window left open. Never a traceback, never an apology.
- Failures that aren't the user's fault are quiet: "The animation didn't render this time." in fine print, not red.
- Hotkeys are always set as keycaps: <kbd>⌘</kbd><kbd>⇧</kbd><kbd>E</kbd>, never "Cmd-Shift-E".

---

## 7. The website, specifically

- Two pages. `index.html` is one locked screen: mark, wordmark, one line, download button, fine print, a "How it works" link in the top-right corner. Nothing scrolls. `how-it-works.html` has three blocks in order: what it is and how to use it, install, the repository.
- The mark on both pages carries `view-transition-name: mark`, so the browser flies it from the hero into the top bar on navigation.
- Dark only. The site is the icon's world; a light theme would be a different site.
- Plain HTML and CSS. No framework, no animation library. `site.js` is optional behaviour.

---

## 8. Checklist before shipping any surface

- [ ] One mint element per screen, and it's the primary action.
- [ ] Ground is `#0e141c` or a panel token, never `#000`.
- [ ] Type is Geist (web) or the system font (app). 600 is the heaviest weight used.
- [ ] Every entrance uses `--ease-out`, every exit `--ease-in`, exits shorter than entrances.
- [ ] Reduced motion tested: nothing moves, nothing blurs.
- [ ] Hotkeys are keycaps. Copy has no exclamation marks.
- [ ] The square in the mark did not rotate.
