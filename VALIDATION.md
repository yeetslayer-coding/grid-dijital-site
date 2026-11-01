# Validation — Perakende visual transfer

2026-11-01, Europe/Istanbul. This supersedes the v1 browser-verification limitation.

## Automated checks

- `npm run check`: app.js and grid-motion.js syntax passed.
- `npm test`: 11 tests passed. Updated the five existing tests and added coverage for inactive-panel focus/ARIA, keyboard modal activation, conveyor pause, one-time 75ms reveals, reduced-motion changes, JavaScript-free content, canvas lifecycle, offscreen drawing, fine/coarse input, frame-rate limits and DPR cap.
- Local HTTP preview: 200. All local HTML assets, anchor targets, ARIA references and icon paths resolve. No duplicate IDs.
- Grid's original official routes, four actual customer video IDs, local brief validation and exact WhatsApp text handoff are retained. No form or message was submitted; no tracking, storage or contact backend was added.
- Perakende source checkout remained clean and unchanged.

## Real-browser verification

Chromium 151.0.7922.34, headless, through the existing local Playwright installation. This is actual browser rendering, separate from jsdom tests. Runner at the visual-transfer revision: `scripts/browser-qa.mjs`. Portable results: `verification/browser-report.json`. Screenshots: local ignored `qa/` folder.

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

This verifies local Chromium behavior and screenshots. Physical iOS/Android devices, Safari and actual YouTube playback remain outside this run. No audience change, DNS change or griddijital.com deployment is part of this work. The private Grid preview keeps noindex/nofollow. This earlier visual-transfer evidence predates the Vercel migration; current delivery is documented below.


## Illustrated selection and 3D GES conveyor — 2026-11-01

The final selection/rail changes passed `npm run check` and all 14 `npm test` cases. The former pause-button case now verifies its absence, ten objects for a seamless loop, offscreen suspension and hidden-document suspension. New city tests cover Turkish/ASCII matching, unmatched queries, canonical-value commits, cancel preservation, arrow navigation, invalid-field focus, live selection summary and the existing exact WhatsApp message handoff.

Actual Chromium 151.0.7922.34 browser checks passed at 320, 390, 768 and 1440px using `scripts/browser-qa.mjs`. Results: `verification/selection-rail-browser.json`. Screenshots in ignored `qa/selection-rail-*-{form,city,rail}.png` were visually reviewed. No horizontal overflow or browser errors occurred. Project cards use one column at 320/390 and two at 768/1440. Captions align across the object family; transparent objects share the rail baseline. City dialogs fit the viewport: 320/390px bottom sheets are 620px high; desktop/tablet windows are 460 × 590px. Search does not change the window height.

Verified in the browser: 81 city results, `istanbul`, `İZMİR`, `sanliurfa` and `AGRI` matching, explicit empty state, unique-result Enter selection, cancel/Escape preserving the old value, arrow/Home/End navigation, modal focus containment/return and instant keyboard opening. The selected project/city appear in the summary and reviewable WhatsApp brief; editing retains them. No message was sent.

The computed conveyor animation runs for 32s when visible and pauses offscreen. Reduced motion displays exactly five static stages. JavaScript disabled at 320px retains the five static objects and the official application route while hiding the interactive form. Touch emulation at 390px supports city/project selection; a 420px-high viewport keeps the city sheet inside the screen. Native video keyboard/Escape behavior still passes with external video transport stubbed. All eight 512px WebP assets have verified transparency; source paths and alpha readback are in `verification/ges-assets.json`.

Limits: Chromium touch emulation is not a physical phone test. Safari, physical devices and real YouTube playback were not tested. The existing source visual-transfer/blur-fallback evidence above remains separate from this scoped change. The Vercel release and live browser evidence are recorded separately after deployment; griddijital.com and DNS are unchanged.
