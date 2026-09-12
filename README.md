# clarity-web

The website for [Clarity](https://github.com/s0hamjain/Clarity), a macOS menu-bar app that explains any problem on your screen.

Live at **https://adamzhu.dev/clarity-web/**

## What's here

```
index.html            One locked screen: mark, wordmark, one line, download.
how-it-works.html     What it is and how to use it · install · the repository.
assets/
  tokens.css          Identity tokens (colour, type, motion). Single source of truth.
  site.css            Page styles.
  site.js             Optional behaviour: launch flag, demo, download button.
  clarity-mark.svg    Vector redraw of the icon; the magnifier group can move on its own.
  og.png, favicon-32.png, apple-touch-icon.png, icon-256.png
brand/
  IDENTITY.md         Identity standards for the site and the desktop app.
```

Plain HTML and CSS. No build step, no framework, no dependencies.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

The launch animation plays on the first visit only. To see it again, clear the `clarity:seen` key from localStorage in DevTools, or open a private window.

## Deploy

GitHub Pages serves the `main` branch root. Push to `main` and the site updates within a minute.
