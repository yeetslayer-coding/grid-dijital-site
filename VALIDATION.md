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

### Final live panel/contact release

Deployment `dpl_GpADKe35H49jWpaaZeTuEkioSJ4p`, source commit `581340c1df8494c40307d37e7e75714ee15fd6cb`, reached READY at https://grid-dijital-studio.vercel.app. The selected rail is directly linked at `/#akis`; the contact card is at `/#location-heading`. Both live runners passed at 390px and 1440px with no errors or horizontal overflow. Live rail and contact screenshots were visually reviewed at both widths. Evidence: `verification/panel-final-live-report.json`, `verification/panel-contact-live-report.json` and `verification/panel-final-live-assets.json`. HTML, CSS, both app scripts and comparison-page files are byte-identical to the tested local release. No call, form submission or message was sent.

## Solar-module variety — 2026-11-01

Kept two standard modules and varied the other three: portrait/red label, wide split array and dark frame/red corner detail. No new image, script or dependency was added. A source comparison confirms all HTML outside the rail is unchanged. The two repeat groups carry identical variants in the same order.

Syntax, all 14 tests and whitespace checks passed. Actual Chromium checks passed at 320/390/768/1440px with zero page/console errors and no horizontal overflow. Rail screenshots at each width and the no-JavaScript fallback were visually reviewed: shared lower baseline, legible captions, distinct module proportions and cell layouts. The 32-second loop still joins within 1px; offscreen/reduced-motion behavior and existing form/video interactions pass. Static fallbacks retain the compact 154 × 112px footprint while preserving frame/cell/caption differences. Report: `verification/panel-variety-browser.json`.

Live variety release `dpl_42zWyK2J5tm7tzeHLFsUqRNQiJC5` (source `15a05442130e90da6e8ef43fa01c98c2da2851af`) is READY at https://grid-dijital-studio.vercel.app. Live Chromium checks passed at 390px and 1440px with zero errors and no overflow; both rail screenshots were visually reviewed. Reports: `verification/panel-variety-live-report.json` and `verification/panel-variety-live-assets.json`. Served HTML/CSS/scripts match the local release byte-for-byte.

## Six interactive features — candidate verification, 2026-11-01

Implemented province selection, project advertising showcase, local mini CRM, optional startup analysis, attributed customer dossiers and four delivery documents. The approved module rail HTML and `grid-motion.js` are byte-identical to the preceding release; Perakende and the custom domain are untouched.

`npm run check`, all 21 Node/jsdom tests and `git diff --check` pass. Added checks cover all 81 canonical provinces (including unified Istanbul), map/search state synchronization, advertising browsing versus explicit project application, all three CRM records advancing/resetting, exact legacy WhatsApp text, opt-in recommendations and invalidation, sample document keyboard navigation, focus return and customer/demo separation. All 81 complete analysis-answer combinations return exactly three distinct priorities in the specified order; incomplete and invalid input return no result. Storage, cookies and remote submission remain absent.

Actual Chromium 151.0.7922.34 checks passed at 320, 390, 768 and 1440px. `scripts/features-qa.mjs` verifies pointer selection on real SVG geometry, list selection/return focus, project transfer, full analysis-to-brief/edit flow, CRM stage/task/count/reset, fixed panel heights, native modal bounds, keyboard tabs and dismissal. Advertising panels, document stacks and CRM workspace keep equal heights across their tested states at each width. No page or dialog horizontal overflow and no page/console errors. The browser made no external requests before a deliberate video-open action; video transport was then stubbed.

`verification/six-features-browser.json` records these checks. `verification/six-features-regression.json` records existing rail, city search, brief and lazy video regression checks at all four widths: 32-second loop, seam within 1px, pause outside the viewport, Turkish search/cancel/errors/focus, reduced motion and JavaScript-free alternatives. `verification/six-features-targets.json` records full-size controls at least 44px; geographic SVG shapes use the equivalent full-size native city-list route.

Screenshots under ignored `qa/six-features-*.png` were visually inspected at every width, including ad photography/copy, selected province, mobile CRM, output documents, analysis results and customer dossiers. The long-document mobile dialog was corrected to explicit viewport-fixed placement; its close heading stays visible while scrolling. Long CRM titles/tasks reserve space, removing layout shifts. No-JavaScript keeps four readable campaigns, three static records, five solar modules and direct official/contact/video links. Disabled static cards retain full contrast.

Reduced motion, immediate keyboard windows, touch-emulated city selection, and opaque-glass fallback were checked. Opaque fallback is a CSS simulation, not a claim of testing an old engine. Touch/mobile widths are Chromium emulation, not physical device or Safari evidence. Video dialog lifecycle was tested with a local response stub; actual YouTube playback was not tested. Four official titles/authors were independently fetched from YouTube oEmbed and recorded in `verification/six-features-video-sources.json`; this is attribution evidence, not independent verification of customer results. No phone call, application or WhatsApp message was sent.

All four customer dossier windows were additionally checked at both 390px and 1440px, including bounds, no inner overflow, sticky close controls after scrolling and return focus (`verification/six-features-dossiers.json`). The four video titles live with their owning video controller, avoiding a cross-script initialization dependency.

### Live six-feature release

Deployment `dpl_ssSDpn66uoeyx3e9PmaPUD7H9LRV`, source commit `fe0f86a74825adf0dadbf10fe3016e4a655fa5e6`, reached READY at https://grid-dijital-studio.vercel.app. Immutable release: https://grid-dijital-studio-begp95tzv-g-class.vercel.app.

All three live browser runners passed at 390px and 1440px: new feature workflows, existing rail/city/brief regression, and all four customer dossiers. No page/console errors or horizontal overflow; stable advertising/document/CRM heights; return focus, review-before-WhatsApp, opt-in invalidation, touch emulation, reduced motion and no-JavaScript alternatives passed. Live screenshots of the mobile advertising showcase, map, documents, customer dossiers and desktop CRM were visually inspected. The four video requests are deliberate click-triggered test requests with stubbed responses; playback remains untested.

Reports: `verification/six-features-live-browser.json`, `verification/six-features-live-regression.json`, `verification/six-features-live-dossiers.json`. `verification/six-features-live-assets.json` verifies HTTP 200 and byte equality for all 14 release files checked: HTML, both stylesheets, all four scripts, four new WebP photographs, local map geometry, province metadata and license. No custom-domain/DNS change or outbound contact action occurred.

## Remove CRM demo and restore the process section — 2026-11-01

At the user’s request, removed the interactive CRM board and its record controller/styles. Restored the exact `#sistem` section and keyboard tab controller from `a75538d`. A source comparison confirms the restored section is byte-identical to that version; HTML outside it is unchanged apart from removing the obsolete no-JavaScript CRM style. The other five additions, read-only delivery samples, contact flow, panel rail, palette and textures remain.

Syntax checks, all 21 interaction/rule tests and whitespace checks passed. The former CRM test now checks the restored four-panel keyboard navigation, inactive hidden/inert panels and absence of the demo. Actual Chromium 151.0.7922.34 passed at 320, 390, 768 and 1440px: each process state keeps the same panel height, only the selected panel is exposed, Home/End navigation works and there is no horizontal overflow or page/console error. All four responsive process screenshots were visually reviewed. The shared feature runner also verifies that the retained map, ad-project transfer, optional analysis/WhatsApp review, documents and lazy customer dossiers still work. Reduced motion, touch emulation and no-JavaScript fallbacks passed; all four process descriptions remain available without JavaScript. Evidence: `verification/process-restored-browser.json`; screenshots under ignored `qa/process-restored-*.png`. External video transport was stubbed; playback and physical-device testing are not claimed.

### Live process restoration

Deployment `dpl_6iLFHUJ3Fsv8wwnVSVDhUD9Bpvgt` (source `91ace6a5fb6ce5ecaf16619e63c1bb98e2806e96`) is READY at https://grid-dijital-studio.vercel.app. Live Chromium checks at 390px and 1440px confirm the CRM demo is absent, all four original process tabs work with equal panel height, keyboard navigation works, and there are no page/console errors or horizontal overflow. Retained advertising tabs and city search also pass. All four process descriptions remain available with JavaScript disabled. Final mobile/desktop screenshots were inspected after the reveal transition completed. `verification/process-restored-live-browser.json` records results; `verification/process-restored-live-assets.json` confirms HTTP 200 and byte equality for HTML, both stylesheets and all four scripts.


## One city-selection area — 2026-11-01

Removed the repeated city selector from the right-hand form. The map is now step 01 and owns the only city-search opener; the form begins with the step 02 project cards. The hidden canonical city value remains associated with the brief through `form="brief-form"`. The shared summary and WhatsApp draft retain the selected city. Missing-city validation appears under the map and focuses its list button. Dialog cancellation preserves the choice and returns focus to that button. Editing a completed note focuses the selected project. Advertising CTAs scroll to the map when the city is missing and to the selected project otherwise.

All 21 Node interaction/rule tests, JavaScript syntax checks and whitespace checks pass. Updated assertions cover a single city-dialog opener, form association, error and edit focus, map/search synchronization, canonical values and project-CTA focus. HTML outside the contact area is unchanged.

Actual Chromium 151.0.7922.34 passed at 320, 390, 768 and 1440px: one search control, actual SVG selection, Turkish/ASCII search, empty search, cancellation, Escape and keyboard focus containment, correct brief/WhatsApp text, and visible focus after the advertising CTA. No horizontal overflow or page/console errors. All four complete contact screenshots were visually reviewed after reveal transitions finished. Reduced motion, touch emulation and a short mobile viewport passed. With JavaScript disabled the inert list opener is hidden and official contact/telephone alternatives remain. Existing rail behavior and lazy video modal checks also passed. Video transport was stubbed; physical-device and video-playback testing are not claimed.

Evidence: `verification/single-city-browser.json`; screenshots in ignored `qa/single-city-*.png`. The screenshot runner explicitly visits both contact columns before capture so its one-time reveal assertions also work in the mobile stacked layout.


### Live single-city release

Deployment `dpl_EwZiujM2j8XdcZb6paASntCMiGj9` (source `cff1d9eb25b448b73018b17172c1e05521e2c17e`) is READY at https://grid-dijital-studio.vercel.app; immutable release https://grid-dijital-studio-o1qrq0xdh-g-class.vercel.app. Live Chromium checks passed at 390px and 1440px, including one city opener, real map clicks, search/cancel/Escape, validation, visible CTA focus, edit focus, draft/WhatsApp synchronization and no overflow or page/console errors. Reduced motion, touch emulation, no-JavaScript contact and existing rail/video-modal checks passed. Mobile form and desktop contact screenshots were visually reviewed; the mobile form capture confirms all four project images and text are fully rendered. `verification/single-city-live-browser.json` records the checks and `verification/single-city-live-assets.json` verifies HTTP 200 and byte equality for all seven HTML/CSS/JavaScript files checked. No external message was sent.
