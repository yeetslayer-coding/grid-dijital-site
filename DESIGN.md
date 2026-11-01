# Grid Dijital — Perakende visual-system transfer

Implemented 2026-11-01. The approved direction copies the visual mechanics of `/Users/yigit/Documents/ChatGPT/perakende dijital/perakende-dijital-site` into the existing static Grid site. Perakende is read-only. Grid's brand, actual references, services, guides and contact destinations remain the content source.

## Palette and typography

- Grid Red `#B93643`: primary actions, process background, solar showcase and accents. Hover `#A72C38`.
- Canvas `#F4F4F2`, surface `#FAFAF9`, ink `#202222`, muted `#646664`, mineral `#E9EAE7`, line `#D8DAD5`.
- No Perakende cobalt/lime palette. Source images retain their inherent photographic colors.
- Outfit headings, locally served variable font. Geist body, locally served 400/500/600 weights. OFL files accompany the fonts. Full Turkish glyph coverage.
- Desktop headline clamp(46px, 4.65vw, 67px), opening audience line .59em; mobile headline clamp(34px, 10vw, 68px). Body 16px, supporting desktop hero text 15px. Heading leading 1.065, tracking -.055em.

## Geometry and surfaces

Maximum content width 1280px. Desktop gutters 48px, intermediate 32px, phone 20px. Section spacing 112/88/64px. Hero uses 1.06fr/1fr columns, 66px gap, source browser-frame composition, then one column on phones. Services use the source two-column 1.12fr/1fr glass layout.

Shared `.liquid-glass` supplies neutral translucent fills, inset top/side highlights, a tight 2px/7px shadow and a broad 24px/48px shadow. Radius 22px for principal cards. Blur is 16px on desktop and 8px on phones. Opaque gradients are the default; `@supports` enables transparency. Reduced-transparency also restores opaque surfaces. Header, showcase, service cards, process panels, customer video frames, solutions, guides, FAQ and contact use this system.

Paper grain is copied from the source. Solar modules, roof structures, wiring and proposal outlines replace packaging motifs at the source desktop/mobile density. A separate anchored canvas grid sits behind the content; the red process section has an inverse grid. Decorative layers ignore pointer input and are hidden from assistive technology.

## Composition and content

Hero pairs the Grid message with a glass browser frame containing a generated solar scene. The inline panel/cursor image punctuates the headline. Scene alt text and caption explicitly identify it as representative. The source conveyor geometry now carries Bölge → Reklam → Başvuru → Keşif → Teklif. Its visible pause control is reversible.

Four process tabs use light selected surfaces on a red section. All initialized panels share one CSS grid cell, so even inactive panels contribute to the common height. Inactive panels have hidden, inert, aria-hidden and tabindex=-1. Without JavaScript, all four descriptions appear sequentially.

Actual Grid customer video IDs, service/guide links, phone and WhatsApp destination are preserved. No Perakende calculator, client content, sales promise or food-specific copy is included. Contact prepares a local reviewable note; WhatsApp opens only when the user activates its link. There is no backend, persistence, analytics or remote form submission.

## Motion specification

Native CSS/JavaScript only. Shared curve `cubic-bezier(.23,1,.32,1)`. Button response 140ms; native video dialog 250ms, scale .96 to 1; source reveal duration 700ms with 75ms stagger, revealed once. Keyboard tab and modal transitions are instant. Hover transforms and magnetic grid input require a fine pointer. No custom cursor or scroll hijacking.

Grid port preserves fixed intersections and gently displaced quadratic control points: mass 1, stiffness 100, damping 10; visible midpoint displacement at most 6px. 30fps on fine pointers, 24fps on coarse pointers, DPR cap 1.5. Offscreen surfaces are not painted. Hidden documents cancel the animation frame. One controller owns both canvases, observers and lifecycle cleanup.

Conveyor travels for 32 seconds per loop; rollers rotate every 2 seconds. User pause and hidden-document state pause CSS animation. Reduced motion displays a static wrapped five-stage band, fixed grid and immediate reveals; positional hover animation is disabled. The no-JavaScript version is also static and offers direct YouTube links and the official contact route.

## Delivery boundary

The existing owner-private Grid Site is the deployment target. Keep noindex/nofollow. Do not change griddijital.com, DNS, site access or the Perakende checkout. Browser and behavioral evidence is recorded in VALIDATION.md; generated-asset prompts and licenses in ASSETS.md.
