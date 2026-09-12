# Captures of the Clarity desktop app

Taken 2026-09-12 from the real app windows (`desktop/clarity/ui`, branch
`p4/sprint-4-app-bundle-dmg`, identical to `main` for base.css) on a 2x Retina
display (1512×982 pt). Every PNG is a window-only capture with a transparent
background and no system shadow (`screencapture -l<windowid> -o`), so it drops
straight onto any page background.

| File | What it is | Pixel size |
|---|---|---|
| `spotlight-rest@2x.png` | Spotlight box just after a capture: thumbnail, placeholder, ↓ and ↵ hints | 1360×192 (680×96 pt) |
| `spotlight-typed@2x.png` | Same box with the question typed | 1360×192 |
| `result-status@2x.png` | Result window, status line only ("Writing explanation… •") | 880×1360 (440×680 pt) |
| `result-explanation@2x.png` | Explanation rendered, status "Rendering scene 2 of 3… •" | 880×1360 |
| `result-video@2x.png` | Explanation + video playing, status "Done" | 880×1360 |
| `problem-capture.png` | The dragged region exactly as the app sends it to the server (downscaled PNG) | 1568×536 |
| `capture-flow@2x.mp4` / `.mov` | ~19.5 s recording: drag over the code, spotlight box, typing, Enter, result window filling in, video playing | 2400×1740 |
| `capture-flow-poster@2x.png` | Frame from the end of the recording for a poster image | 2400×1740 |
| `placeholder-scene.mp4` | The clip that plays inside the result window in these captures | 1280×720, 12 s |

## What is real and what is not

- **Real:** every pixel of the spotlight box and result window. They are the
  app's own pywebview windows, launched through `clarity.session.Session`,
  polling `GET /api/jobs/{id}` every second exactly as in production. The drag
  in the recording is a real `screencapture -i` region select (driven by
  synthetic mouse events), and the thumbnail is the app's own downscale of it.
- **Stub backend:** the coordinator was a local stub answering API.md §2.1/2.2
  (the `FAKE_AGENT`/`FAKE_RENDER` flags were deleted in Sprint 4). Job states
  were stepped by hand for the PNGs and on a timer for the recording.
- **Explanation text:** the binary-search explanation is the sample text the
  coordinator's fake pipeline produced in every local end-to-end run (it is
  what `recents.json` holds for all nine local jobs). The only local "real
  output" ends with a footer saying it is sample data; that footer is removed
  here. No real Explainer output was logged on this machine.
- **Video:** `placeholder-scene.mp4` is NOT a Manim render. It was drawn with
  PIL and encoded with ffmpeg to look like a scene (array cells, lo/hi/mid
  markers, accent #7aa2ff on the panel colour). Replace it with a real render
  from the pre-warmed cache once one exists.
- **Editor window:** the light "binary_search.py" window behind the drag is a
  mock-up page, not a real editor.
