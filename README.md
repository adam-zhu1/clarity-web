# clarity-web

The website for [Clarity](https://github.com/s0hamjain/Clarity), a macOS menu-bar app that explains any problem on your screen.

Deploys to Vercel (connect the repo in the Vercel dashboard; `vercel.json` handles `/about`). The old GitHub Pages deploy at adamzhu.dev/clarity-web is stale and should be disabled.

## What's here

```
index.html            One document, two views: home (one locked screen with the real recording) and /about
                      (five sections in Apple's rhythm; two are pinned and driven by scroll).
assets/tokens.css     Identity tokens (font, colour, shape, motion). Single source of truth.
assets/site.css       Page styles.
assets/site.js        Router, boot, scroll-driven sections, the backend step machine, download button.
assets/clarity-mark.svg, og.png, favicon-32.png, apple-touch-icon.png, icon-256.png
brand/IDENTITY.md     Font and colour standards for the site and the desktop app.
assets/icons/         Technology logos (Simple Icons, CC0).
docs/                 Prototypes and studies from the design phase; captures/ has real app captures.
vercel.json           cleanUrls, /about rewrite, asset caching.
dev.py                Local server that mirrors the /about rewrite.
```

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Run locally

```sh
python3 dev.py
# open http://localhost:8000 and http://localhost:8000/about
```

The boot animation plays on every full load. Switching Home and About plays a transition instead. The demo alternates its problem on each load.

## Deploy

Vercel, from `main`. Framework preset "Other", no build command, output directory `.`.
