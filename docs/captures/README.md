# Captures of the Clarity desktop app

Re-taken 2026-09-12 (evening) from the CURRENT UI: commit `481d266`
("Add a Tutor/Answer toggle on the spotlight prompt"), which is the tip of
`origin/main`. The code was exported with `git archive` to a scratch folder and
run there against a stub coordinator; the Clarity repo itself was not touched.
2x Retina display (1512×982 pt). PNGs are window-only captures with transparent
background and no system shadow (`screencapture -l<windowid> -o`).

| File | What it is | Pixel size |
|---|---|---|
| `spotlight-rest@2x.png` | Spotlight box after a capture: thumbnail, "What's confusing you?", Tutor/Answer toggle, ↓ ↵ keycaps | 1360×192 |
| `spotlight-typed@2x.png` | Same box with the question typed | 1360×192 |
| `result-status@2x.png` | Result window: mint spinner dial + "Writing explanation…", – and ✕ header buttons | 880×1360 |
| `result-explanation@2x.png` | Explanation rendered, dial + "Rendering scene 2 of 3…" | 880×1360 |
| `result-video@2x.png` | "Done", explanation + video with the Pop out / full-screen / Save actions | 880×1360 |
| `problem-capture.png` | The dragged region as the app sends it to the server | 1568×536 |
| `capture-flow@2x.mp4` | 19 s, muted, H.264, full screen 3024×1964: glow overlay fades in, crosshair drag, spotlight box, typing, Enter (glow fades out), result window filling in, video playing | 3024×1964 |
| `capture-flow-poster@2x.png` | Frame near the end of the recording | 3024×1964 |
| `placeholder-scene.mp4` | The clip playing inside the result window in these captures | 1280×720, 12 s |

## What is real and what is not

- **Real:** every pixel of the overlay, spotlight box and result window. They
  are the app's own pywebview windows, launched through
  `clarity.session.Session.capture_and_ask()` — the exact hotkey code path —
  polling `GET /api/jobs/{id}` every second. The drag is a real
  `screencapture -i` region select driven by synthetic mouse events.
- **Overlay made recordable:** the real app sets the overlay window's sharing
  type to `NSWindowSharingNone`, which hides it from every screen recording
  (by design, so it never ends up in the user's capture). For this recording
  that one line was disabled in the scratch copy. Everything else about the
  overlay (CSS, timing, level, click-through) is unchanged.
- **One bug hidden for the stills:** at `481d266` the "Playing in its own
  window. / Bring it back" notice is visible in every result box from the
  first poll, because `.popped { display: flex }` in result.css overrides the
  `hidden` attribute. The scratch copy adds `.popped[hidden]{display:none}`.
  Reported to Adam; not fixed in the repo here.
- **Stub backend:** local stub answering API.md §2.1/2.2. `FAKE_AGENT` /
  `FAKE_RENDER` no longer exist.
- **Explanation text:** the coordinator's fake-pipeline sample explanation
  (the only explanation ever logged on this machine), footer removed. No real
  Explainer output was available locally.
- **Video:** `placeholder-scene.mp4` is NOT a Manim render; drawn with PIL +
  ffmpeg in the app's palette (mint #6fd1bd on #0e141c). Replace with a real
  render when one exists.
- **Editor window:** the light "binary_search.py" window is a mock-up page.
  The dark wallpaper is a plain gradient window placed above the Dock.
