# Assets Source — README

This folder holds **unprocessed originals only**. Optimized web assets
(resized, compressed, converted) get generated into `public/` later — never
commit processed files here.

## Folder map

```
assets-source/
├── projects/
│   ├── traffic-control/     # AI traffic system
│   ├── ticketflow/          # campus issue tracker
│   ├── scholr/              # book sharing app
│   ├── shieldher/           # in progress
│   ├── fscm/                # sports complex management
│   └── fast-past-papers/    # past papers archive
├── profile/                 # headshot, about-section photo
├── resume/                  # CV PDF(s) offered for download
└── logos/                   # wordmark, monogram, favicon source
```

## Naming convention

`{project}-{asset}-{variant}-{device}.{ext}` — all lowercase, hyphenated,
no spaces, no underscores.

Examples:

- `ticketflow-dashboard-admin-desktop.png`
- `traffic-control-signal-timing-mobile.png`
- `scholr-book-list-desktop.png`
- `profile-headshot-square.jpg`
- `resume-cv-2026.pdf`

Variant words to use: `desktop`, `mobile`, `tablet`, `dark`, `light`,
`cover`, `clip`, `sketch`.

## Required specs

| Asset | Spec |
|---|---|
| Project cover image | 16:9 ratio, min **1600px wide** (2400px preferred). PNG or high-quality JPG. |
| Screenshots | PNG preferred (lossless UI text). Min **1280px wide** for desktop, **1170px** for mobile (3× iPhone). Crop to content, no browser chrome unless it shows the product meaningfully. |
| Screen recording | Max **30 seconds**, max **25 MB** source file. MP4 (H.264) preferred; WebM acceptable. Record at 1080p or lower, 30fps is fine. |
| Architecture sketch | PNG/JPG of a hand-drawn or diagram-tool sketch. Min **1200px wide**. Excalidraw, tldraw, or paper photo all fine — keep it legible. |
| Profile photo | Square crop, min **800×800px**, JPG or PNG. Neutral or softly blurred background. |
| Logo | SVG preferred for wordmark/monogram; PNG fallback at 1024px+. |
| Resume | PDF, under **2 MB**, named `resume-cv-{year}.pdf`. |

## Per-project checklist (summary)

Every project needs: **1 cover · 2–3 screenshots · 1 short clip · 1
architecture sketch**. Full itemized table with status:
`ASSET_CHECKLIST.md`.

Notes per project:

- **traffic-control** — the clip should show live metrics updating on the
  dashboard; the sketch should show the YOLOv8 → PPO → SUMO loop.
- **ticketflow** — screenshots should show the three role views (Reporter,
  Technician, Admin) if possible.
- **scholr** — mobile screenshots (iOS or Android); clip can show the
  real-time messaging.
- **shieldher** — in progress: capture whatever exists; mark clip/sketch
  as optional until there's something to show.
- **fscm** — show role-based dashboards in screenshots.
- **fast-past-papers** — if it's a smaller/personal project, cover +
  2 screenshots + sketch may suffice; clip optional.

## Recommended free tools

| Task | Tool |
|---|---|
| Screen recording (Windows) | **ShareX** (free, also does scrolling captures) or **OBS Studio** |
| Screen recording (cross-platform) | **OBS Studio** |
| GIF/clip creation & trimming | **ScreenToGif** (Windows) or **ffmpeg** |
| Video compression | **HandBrake** (free) or `ffmpeg -crf 28` |
| Image compression before upload | **Squoosh** (web, free, by Google) |
| Screenshots with annotation | **ShareX** (built-in editor) |
| Architecture sketches | **Excalidraw** or **tldraw** (free, exportable PNG/SVG) |
| Mockup/device frames | **Shots.so** or **Smartmockups** (free tiers) |
