# Clarity website · handoff

Written 12 Sep 2026 for continuing the build in Cursor. Everything decided so far, what exists, what to build next, and which tools to install. Read this, then `brand/IDENTITY.md`, then `docs/storyboards-v2.html`.

---

## 1. Where things stand

| Item | State |
|---|---|
| Repo | `adam-zhu1/clarity-web`, branch `main`, one commit. Plain HTML/CSS/JS, no build step. |
| Live | GitHub Pages at https://adamzhu.dev/clarity-web/ serves **v1**, which Adam has rejected. **Move to Vercel** (§4) and then disable Pages: `gh api -X DELETE repos/adam-zhu1/clarity-web/pages`. |
| v1 (rejected) | Dark identity page: icon, wordmark, button. Keep the code as reference for the app-window replicas and the motion recipes; the concept is being replaced. |
| v2 direction | Product-in-situ hero on a **light** theme, per the Awwwards App Style pattern. Two storyboards in `docs/storyboards-v2.html`. **Adam has not yet chosen A or B.** Recommendation in that file: build B first; A is B plus a six-second opening. |
| Identity | `brand/IDENTITY.md` + `assets/tokens.css` + `assets/clarity-mark.svg`. **Needs updating** for the light theme and the type change (§3). |
| App repo | `s0hamjain/Clarity`, cloned at `~/Projects/clarity`. The app's UI is HTML/CSS: `desktop/clarity/ui/shared/base.css`, `ui/spotlight/*`, `ui/result/*`. Menu-bar icons in `desktop/assets/menubar_*.png`. Use these to rebuild the windows faithfully on the site. |

---

## 2. Decisions Adam has made (do not re-ask)

- **Two pages only.** Home: one locked, non-scrolling screen. How it works: what it is and how to use it → install steps → GitHub repo link. Nothing else. No footer on home; "How it works" link in the top-right corner.
- **Logo stays.** The magnifying-glass icon is the identity standard. Vector redraw approved for animation (`assets/clarity-mark.svg`); only the magnifier group moves, never the square.
- **Theme changes to light**, modelled on the App Style winners (Invoko, Cooldock, Supaste). Proposed palette in the storyboard file header: paper `#eef2f7`, white, `#e3e9f1`, ink `#121b26`, mint `#5cc6b0` (single accent, download button only), lens `#3d8d90`. Type: **Manrope** 700 wordmark/headings, 400/500 body; **Geist Mono** for hotkeys and commands. (Schibsted Grotesk and Geist were both rejected as "weird" / part of the old look.)
- **Animation rule:** the boot animation plays on **every full page load or reload**. Home → How it works plays the forward transition; back plays the reverse; a switch never replays the boot. ⇒ Build as **one document with two routes** (History API, `/` and `/how-it-works`), so switching never reloads.
- **Approved page-two motions** from the study: P1 keycap demo (⌘ ⇧ E press → dashed selection → result window with the app's 180 ms scale-in), P2 install steps rising 12 px / 560 ms / 70 ms stagger with a mint rail, P3 large GitHub link with arrow travel, underline draw, icon tilt on hover.
- **Approved extras:** D-key hint on the download button; button reports where it's taking you; ambient 90 s drift; glint across the glass.
- **Download** points at https://github.com/s0hamjain/Clarity/releases/latest (no release exists yet). Tagline: "A hotkey that explains any problem on your screen."
- **Hosting: Vercel.** Not GitHub Pages.
- **Process:** minimal commits, Adam sole author (Adam Zhu <adamzhu@andrew.cmu.edu>), no AI attribution trailers. No subagents. Plain HTML/CSS, no framework, no animation library unless CSS can't do a specific motion. Check ~400 px width every section. Keyboard, reduced-motion, slow-network tests before a milestone.

---

## 3. What to build next, in order

1. **Choose A or B** with Adam (storyboards). Default to B.
2. **Restructure to one document.** `index.html` holds both views; `router.js` swaps them with `history.pushState`, runs the forward/reverse transition (laptop slides across and pins; content defocuses out / focuses in; nav pill slides). Reload → boot sequence. Use `document.startViewTransition()` for the swap where supported, with a WAAPI fallback.
3. **Re-theme.** Update `assets/tokens.css` to the light palette and Manrope; keep the dark set as the app's own mode. Update `brand/IDENTITY.md` §3–4 accordingly (light is the site, dark is the app; the icon is the only dark object on the page).
4. **Build the laptop scene** as a reusable component: CSS/SVG laptop (no Apple imagery), a PDF with a real calculus problem, the app's menu-bar icon, then the **Spotlight box** and **result window rebuilt from the app's own CSS** (dimensions: spotlight 680×96, panel `rgba(20,20,24,.92)`, radius 12, thumbnail 64×48, 15 px input, `↵` kbd hint; result 440×680, header "Clarity" + ✕, status line, markdown explanation, video). Sequence: keys → drag → box slides in (180 ms) → typed question → Enter → result appears → explanation lines → clip. Loop ≈ 10 s for B.
5. **Home (B):** wordmark + tagline + download left, laptop right; 0.9 s entrance (text focuses in, laptop rises). **If A:** prepend the film: laptop centred → capture → camera pushes into the menu-bar icon → ring fills viewport → pass through the glass → page focuses in; ≈ 6 s, skippable on click, download button visible top-right from frame one.
6. **How it works:** laptop pinned left, steps right advancing with scroll (P1 states), then install (P2), then GitHub (P3).
7. **Vercel:** add `vercel.json` with a rewrite so `/how-it-works` serves `index.html`; connect the repo in the Vercel dashboard; set the canonical/OG URLs to the Vercel domain; delete the GitHub Pages config.
8. **Audits before calling it done:** accessibility, SEO, Core Web Vitals, web-quality-audit; Lighthouse green ×4; console clean; check the deployed site, not just localhost.

---

## 4. Vercel

`vercel.json` (static, no framework):

```json
{
  "cleanUrls": true,
  "rewrites": [{ "source": "/how-it-works", "destination": "/index.html" }],
  "headers": [{ "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }]
}
```

Then: Vercel dashboard → Add New Project → import `adam-zhu1/clarity-web` → Framework "Other", no build command, output directory `.` → Deploy. Every push to `main` deploys.

---

## 5. Tools to install in Cursor

Cursor reads `SKILL.md` folders from `.cursor/skills/` (project) or `~/.cursor/skills/` (global), and MCP servers from `.cursor/mcp.json`. Check Cursor's current docs for the exact paths; they changed during 2026.

**Skills (copy the folder into `.cursor/skills/`):**

| Skill | Source | Use it for |
|---|---|---|
| `frontend-design` | github.com/anthropics/skills | Setting the light theme so it doesn't read as a template |
| `web-design-guidelines`, `vercel-react-best-practices`, `vercel-composition-patterns` | github.com/vercel-labs/agent-skills | UI review against web interface guidelines (the React ones aren't needed for this site) |
| `emil-design-eng` | github.com/emilkowalski/skills | Polish passes on motion and components |
| `animate`, `find-animation-opportunities`, `improve-animations`, `animation-vocabulary` | search GitHub for the skill name; these were installed as a set | Designing the zoom, the laptop loop, the tab transition |
| GSAP skills (`gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`…) | GreenSock's official skills repo (search "gsap skills" on GitHub) | Only if CSS can't do the scene choreography; the film in A is the one place GSAP might earn its place |
| `accessibility`, `seo`, `performance`, `core-web-vitals`, `best-practices`, `web-quality-audit` | installed together as a web-quality set; search GitHub for `web-quality-audit SKILL.md` | End-of-milestone audits |
| `apple-design` | search GitHub for `apple-design SKILL.md` | Spring/physical motion reference for the laptop windows |

**MCP:** Chrome DevTools MCP — github.com/ChromeDevTools/chrome-devtools-mcp. Add to `.cursor/mcp.json`:

```json
{ "mcpServers": { "chrome-devtools": { "command": "npx", "args": ["-y", "chrome-devtools-mcp@latest"] } } }
```

Use it to open `http://localhost:8000`, screenshot, read the console, resize to 400 px, and run Lighthouse after each meaningful change.

**Local server:** `python3 -m http.server 8000` from the repo root.

---

## 6. Prompt to start the Cursor session

> Read HANDOFF.md, brand/IDENTITY.md and docs/storyboards-v2.html in this repo. We're building version B (or A) of the Clarity website as one HTML document with two routes, light theme, Manrope + Geist Mono, hosted on Vercel. Rules: plain HTML/CSS/JS, no framework; boot animation on every reload, forward/reverse transitions on tab switch; minimal commits authored by Adam Zhu only, no AI attribution. Start with step 2 in HANDOFF §3 and show me a screenshot at 1440 and 400 px after each step.

---

## 7. Reference

- Motion study (research + prototypes for L1–L5, T1–T3, P1–P3, extras): https://claude.ai/code/artifact/17521bfa-592d-4535-a0cf-93ee8a84701a
- v1 site draft (rejected): https://claude.ai/code/artifact/63a670a9-5965-4913-8820-2253d6bf34d1
- v2 storyboards A and B: `docs/storyboards-v2.html` (also published as an artifact)
- App spec for the windows: `~/Projects/clarity/docs/FRD.md` §5 and §15; README "Install" section for the exact install steps.
- Awwwards App Style collection: https://www.awwwards.com/websites/app-style/ — closest references: Invoko (invoko.ai → tryclico.com), Cooldock (cooldock.app), Supaste (supaste.com).
