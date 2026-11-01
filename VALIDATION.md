# Validation — Perakende visual transfer

2026-11-01, Europe/Istanbul. This supersedes the v1 browser-verification limitation.

## Automated checks

- `npm run check`: app.js and grid-motion.js syntax passed.
- `npm test`: 11 tests passed. Updated the five existing tests and added coverage for inactive-panel focus/ARIA, keyboard modal activation, conveyor pause, one-time 75ms reveals, reduced-motion changes, JavaScript-free content, canvas lifecycle, offscreen drawing, fine/coarse input, frame-rate limits and DPR cap.
- Local HTTP preview: 200. All local HTML assets, anchor targets, ARIA references and icon paths resolve. No duplicate IDs.
- Grid's original official routes, four actual customer video IDs, local brief validation and exact WhatsApp text handoff are retained. No form or message was submitted; no tracking, storage or contact backend was added.
- Perakende source checkout remained clean and unchanged.

## Real-browser verification

Chromium 151.0.7922.34, headless, through the existing local Playwright installation. This is actual browser rendering, separate from jsdom tests. Runner: `scripts/browser-qa.mjs`. Portable results: `verification/browser-report.json`. Screenshots: local ignored `qa/` folder.

| Width | Horizontal overflow | Four process-panel heights | Glass blur |
| --- | --- | --- | --- |
| 320px | None | 840.641px each | 8px |
| 390px | None | 789.078px each | 8px |
| 768px | None | 401.047px each | 16px |
| 1440px | None | 390.063px each | 16px |

At every width: only one process panel appears in the accessibility tree; three inactive panels are inert and reject focus. Arrow/Home/End navigation works; keyboard transitions are instant. Offscreen inverse canvas is not painted. Page errors and console errors: zero during the tested flow.

Captured Grid hero, services, process, contact and full-page screenshots at all four widths. Captured the live Perakende hero at the same four widths and visually compared the references: source browser-frame composition, heading hierarchy, 48/32/20px gutters, line density, paper texture, layered glass edges and mobile stacking are retained in Grid red/neutrals. Grid copy is shorter than Perakende's, so its mobile showcase begins earlier. The extra Grid navigation links wrap into a second row at tablet width. These are content adaptations, not overflow.

Additional browser checks passed:

- Native video dialog opens by keyboard, Escape closes it, iframe is removed and focus returns. YouTube transport was stubbed; actual video playback was not tested.
- Conveyor pause/resume changes its actual computed animation state.
- Local contact brief generates correctly from city and project selections; the final WhatsApp link is prepared but not opened.
- Reduced motion: canvas pixel output stays unchanged over time, band animation is disabled and content is revealed immediately.
- Blur fallback: the CSS feature-support gate was forced false; computed blur is none and surface backgrounds are opaque. This is simulated lack of feature support, not a legacy-browser run.
- Touch emulation at 390px and device scale 3: menu and tabs work, magnetic pointer behavior stays disabled, actual canvas backing ratio is capped at 1.5.
- JavaScript disabled at 390px: four process descriptions are readable, navigation stays available, inert controls/form are hidden, four direct YouTube links and the official application link remain, with no horizontal overflow.
- Frame-rate, hidden-document cancellation and reduced-motion preference changes additionally pass deterministic controller tests; these tests simulate those lifecycle signals and are not physical-device performance measurements.

## Scope and limits

This verifies local Chromium behavior and screenshots. Physical iOS/Android devices, Safari and actual YouTube playback remain outside this run. No audience change, DNS change or griddijital.com deployment is part of this work. The private Grid preview keeps noindex/nofollow. Native Sites deployment status is checked separately after packaging.
