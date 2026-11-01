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

### Live Vercel release

Production deployment `dpl_9FGDtvhCTxvHuWNRqhj7miyF5ix6`, source commit `1cc84950541cce436ea903a2cd720439d09986e5`, reached READY and was aliased to https://grid-dijital-studio.vercel.app. Live Chromium checks passed at 390px and 1440px with zero console/page errors and no horizontal overflow. The city search, keyboard/cancel flow, selected-card summary, review/edit/WhatsApp text, active/offscreen conveyor, reduced motion, emulated touch/short viewport, no-JavaScript route and video-modal lifecycle all passed. Live mobile form, desktop rail and city-dialog screenshots were visually reviewed.

`verification/selection-rail-live-browser.json` records the flow checks. `verification/selection-rail-live-assets.json` verifies HTTP 200 and byte-for-byte equality with the deployed local source for HTML, CSS, both scripts and all eight new WebP assets. The release receipt beside the checkout records the deployment ID and the same evidence.

## Flat SVG rail — 2026-11-01

The five conveyor illustrations now use original SVG paths/shapes, with no embedded raster, filter, gradient or perspective. `npm run check`, all 14 tests and `git diff --check` passed. The conveyor test verifies five distinct SVGs repeated in the same order, valid 200 × 200 viewBoxes, absence of raster/filter/gradient elements, removal of per-image offsets, unchanged selection-card villa source and the existing offscreen/hidden-tab behavior.

Actual Chromium 151.0.7922.34 checks passed at 320, 390, 768 and 1440px. Rail screenshots at every width, the reduced-motion layout and the JavaScript-free layout were visually reviewed: crisp consistent outlines, common baseline, separated HTML captions and no page overflow. The two groups meet within 1px at the 32-second loop boundary. Visible/offscreen behavior, exactly five static stages in reduced motion/no JavaScript and the existing contact/video flows all passed with zero page/console errors. Results: `verification/vector-rail-browser.json`; screenshots: ignored `qa/vector-rail-*.png`.

A source comparison confirms HTML outside the production-line section is byte-identical to the prior version, including all project cards. Total size of the five SVG files: 3,495 bytes. Scope remains limited to the ray illustrations and related styling/documentation/tests. Touch checks use Chromium emulation; physical devices, Safari and real video playback are not claimed.

### Live vector release

Deployment `dpl_CHXip7Ymbt46kEbiCHUCj4qEXGzn`, source commit `8252fb969902365fcfa5978ceb92eb1d0a685b11`, reached READY at https://grid-dijital-studio.vercel.app. Live Chromium checks passed at 390px and 1440px with no page/console errors or horizontal overflow, including the loop-boundary position check, offscreen pausing, reduced motion, no JavaScript and existing contact interactions. The live rail screenshots were visually reviewed at both widths. `verification/vector-rail-live-browser.json` records results; `verification/vector-rail-live-assets.json` confirms HTTP 200 and byte equality for HTML, CSS, both scripts and all five SVGs.

## Perakende reference, contact card and design options — 2026-11-01

Read the actual Perakende `production-line.tsx` and location-card source, then captured the live reference rail and location card in Chromium. Its 176 × 112px parcels and 420px location card informed the two isolated rail options and the Grid contact layout. Reference and candidate screenshots were visually compared.

All 14 existing tests, JavaScript syntax checks and whitespace validation passed. `scripts/design-options-qa.mjs` passed on real Chromium 151.0.7922.34 at 320, 390, 768 and 1440px: both variants render without overflow, tab clicks/arrow keys select exactly one variant and retain focus, each rail runs for 32 seconds, reduced motion is static, and the contact card/map/phone work without JavaScript. Map destination resolves the existing street/door in Keşan; phone link remains `tel:+905515062980`. Both contact actions have at least 44px height. No phone call, message or map navigation was initiated. Zero page/console errors. Portable report: `verification/design-options-browser.json`.

The comparison is a separate route; the main rail awaits the user's choice. The location/telephone changes are ready for publication. Source Perakende files remain unmodified. Browser-emulated widths are not physical-device/Safari evidence.

### Selected direction: panel surfaces

The user selected option 02, “Panel yüzeyleri”. The main rail now uses that exact 184 × 132px module design, thin frames/cell grids and integrated HTML stage labels. The five stages and original 32-second loop are retained. Reduced-motion and JavaScript-free modules use 154 × 112px. The comparison page is retained as a reference, marked with the chosen direction and defaults to panels.

Syntax checks, all 14 updated tests and whitespace checks passed. Actual Chromium checks passed again at 320, 390, 768 and 1440px for the final main page: no horizontal overflow, no console/page errors, matching loop endpoints, correct offscreen state, native city/brief interactions, static reduced-motion stages and JavaScript-free contact alternatives. Rail screenshots at all four widths and no-JavaScript screenshots were reviewed against the selected comparison. Report: `verification/panel-final-report.json`.

The preceding contact/comparison release `dpl_AmLk4xym8Gsagfc1X2Phbah2q7Bk` passed live 390/1440px checks and asset byte comparisons; evidence is retained in `verification/design-options-live-report.json` and `verification/design-options-live-assets.json`. Final main-rail deployment evidence follows separately.
