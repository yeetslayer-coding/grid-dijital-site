# Grid Dijital

Grid’s Vercel website preview, now using Perakende Dijital’s layout, paper texture, glass surfaces and industrial motion with the approved Grid red palette. Implemented with stitch-design-taste, animate and Sites.

## Run

```sh
npm install
npm run dev
```

Local preview: http://localhost:4317

The buildless deliverable is `dist/`. Run `npm run check` and `npm test` for syntax and DOM interaction checks. Tests are not a substitute for real-browser visual QA.

## Scope

- Self-hosted Outfit/Geist, responsive glass surfaces, generated GES scene, solar texture and anchored canvas grid.
- Keyboard-accessible process tabs, mobile navigation, native FAQ disclosures.
- Four real customer videos loaded only after a click.
- Searchable 81-city native dialog, four illustrated project radio cards, inline validation and explicit WhatsApp brief handoff.
- Thin-framed solar modules with HTML stage labels on the original 32-second conveyor; static reduced-motion and JavaScript-free versions.
- Existing official application and guide destinations.
- No analytics, cookies, contact database or simulated lead success.
- Vercel preview is deliberately noindex. Custom production domain has not changed.

`DESIGN.md` records the design system; `ASSETS.md` records provenance; `VALIDATION.md` records performed checks and limits.

Browser verification: `scripts/browser-qa.mjs` uses Playwright with a running local preview. Set `PLAYWRIGHT_MODULE` and `BROWSER_PATH` if using a separately installed test environment. Screenshots and the detailed report are written to ignored `qa/`; the portable summary is committed under `verification/`. External video playback is outside the automated transport-stub check.

## Vercel deployment

Live URL: https://grid-dijital-studio.vercel.app

Project: `g-class/grid-dijital-studio` (`prj_cTH7ZgouJd9WAt29KG1bs7x5u9eW`). `vercel.json` serves `dist/` as a static site without a remote install or build. The local Vercel link and generated environment files are ignored. Deployment uploads exclude QA, archived assets, documentation and local environment files.

Publish the reviewed checkout with `vercel deploy --prod --scope g-class --project prj_cTH7ZgouJd9WAt29KG1bs7x5u9eW`. The original custom domain is outside this deployment target.
