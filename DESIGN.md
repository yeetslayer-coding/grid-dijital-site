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

Hero pairs the Grid message with a glass browser frame containing a generated solar scene. The inline panel/cursor image punctuates the headline. Scene alt text and caption explicitly identify it as representative. The source conveyor geometry now carries Bölge → Reklam → Başvuru → Keşif → Teklif. The user-selected rail uses a restrained solar-module family with charcoal cell surfaces and compact HTML labels along the lower edge. Bölge and Başvuru retain the 184 × 132px silver frame; Reklam uses a 140 × 174px portrait module with a red caption; Keşif uses a 216 × 122px split array; Teklif uses a 184 × 144px dark frame with a small red corner mark. Cell rows/columns vary with the module construction. Each label has its stage number, name and a small Grid-red arrow. The same five stages repeat in two groups, with 48px minimum gaps and a shared baseline. Reduced-motion/no-JavaScript modules are 154 × 112px. There are no large illustrative icons or pause button.

The red process section uses its original four-tab presentation: region, message, qualification and sales follow-up. Process, advertising and delivery tabs share one CSS grid cell, so inactive panels contribute to a stable height. Inactive panels have hidden, inert, aria-hidden and tabindex=-1. Without JavaScript, all four advertising examples and the four process descriptions remain readable.

Actual Grid customer video IDs, service/guide links, phone and WhatsApp destination are preserved. No Perakende calculator, client content, sales promise or food-specific copy is included. Contact prepares a local reviewable note; WhatsApp opens only when the user activates its link. There is no backend, persistence, analytics or remote form submission.

## Motion specification

Native CSS/JavaScript only. Shared curve `cubic-bezier(.23,1,.32,1)`. Button response 140ms; native video dialog 250ms, scale .96 to 1; source reveal duration 700ms with 75ms stagger, revealed once. Keyboard tab and modal transitions are instant. Hover transforms and magnetic grid input require a fine pointer. No custom cursor or scroll hijacking.

Grid port preserves fixed intersections and gently displaced quadratic control points: mass 1, stiffness 100, damping 10; visible midpoint displacement at most 6px. 30fps on fine pointers, 24fps on coarse pointers, DPR cap 1.5. Offscreen surfaces are not painted. Hidden documents cancel the animation frame. One controller owns both canvases, observers and lifecycle cleanup.

Conveyor travels for 32 seconds per loop; rollers rotate every 2 seconds. An IntersectionObserver pauses the conveyor outside the viewport; hidden-document state also pauses CSS animation. Reduced motion displays a static wrapped five-stage band, fixed grid and immediate reveals; positional hover animation is disabled. The no-JavaScript version is also static and offers direct YouTube links and the official contact route.

## Delivery boundary

The active deployment target is `g-class/grid-dijital-studio` at https://grid-dijital-studio.vercel.app. The earlier owner-private ChatGPT Site remains a separate previous preview. Keep noindex/nofollow. Do not change griddijital.com, DNS, site access or the Perakende checkout. Browser and behavioral evidence is recorded in VALIDATION.md; generated-asset prompts and licenses in ASSETS.md.


## Visual selection and city search

The contact panel retains its heading and local-only two-field brief. A numbered city group opens a native dialog with an 81-city search. A numbered project group uses native radio inputs styled as image cards: two columns at desktop/tablet, one column below 768px. Each card has a realistic miniature, short explanation and a visible selected check. Selected city/project appear in a live summary before the unchanged primary action.

City search is a fixed-height compact desktop dialog and a mobile bottom sheet. Filtering preserves the window height. Turkish case and diacritics are normalized for ASCII search; only canonical city-list values are committed. Escape, backdrop and cancel retain the previous choice. Native dialog owns focus containment; Arrow keys/Home/End navigate results, unique-result Enter selects, and closing returns focus to the trigger. Search has no network dependency. No backend or persistent state is added.

Cards and the city trigger use 140ms response. The city dialog uses the existing 250ms curve; keyboard-initiated transitions are instant. Reduced motion removes positional transitions. No-JavaScript preserves official contact and the static five-stage rail. Selection-card WebP images remain unchanged; the rail is HTML/CSS. Asset provenance is in ASSETS.md.

## Contact placement and rail comparison

The contact-copy column now uses Perakende's location-card structure and measurements: 420px maximum width, 22/24px padding, 44px location marker, 25px location heading, 14px address and a 48px map link. Grid red replaces Perakende blue. A labelled telephone row sits within this card, beneath the map action; the free-standing number is removed. Footer location is a compact link back to the card. The address and telephone are Grid's existing values.

`/ray-ornekleri/` is an isolated, working comparison page. “Proje dosyaları” uses small labelled project folders, source-scale 176 × 112px parts and one red stage; “Panel yüzeyleri” uses thin-framed solar modules with integrated stage labels. Both retain the original rail, rollers, 32-second loop and reduced-motion/offscreen behavior. The switch is instant and keyboard-accessible. The user selected “Panel yüzeyleri”; that exact module design is now used in the main rail. The comparison page remains as a reference and defaults to the selected direction.


## Six interactive features — 2026-11-01

- **Regional selection:** a local 81-province SVG map above the existing location/phone card. Only the selected province is red. Istanbul’s pieces share one province selection. Small geographic targets have an equivalent 44px city-list/search control; SVG paths are supplementary pointer targets, while the native search dialog provides the full keyboard and touch route. Closing returns focus to the actual opener. The map never implies coverage, exclusivity or demand.
- **Advertising showcase:** four native tab buttons, one photo-led composition per project. Photo and HTML campaign message occupy the left column; need, qualification questions and the explicit apply-project action occupy the right. Photos are generated, labeled representative and delivered as local 1200×800 WebP. Browsing tabs is isolated from the contact state.
- **Process presentation (restored at user request):** the original red section with four light selected tabs and matching red glass panels replaces the removed CRM demo. Original copy, diagrams, native keyboard navigation and common panel height are preserved.
- **Optional startup analysis:** native details/summary contains four radio groups. Pure rules prioritize first response, capacity, tracking and campaign setup; three unique recommendations are always returned for complete answers. Recommendations enter the brief only on explicit opt-in. Any answer change invalidates and removes an included result.
- **Customer dossiers:** existing lazy YouTube dialog extended with customer name, attributed official video title, related service and a source note. Published claims remain customer narration, not general performance claims.
- **Delivery examples:** one native dialog with four HTML documents. Service-card buttons open the relevant document; keyboard tabs switch documents without changing the window height. No form is submitted from the sample application.

The selection model in `dist/selection.js` owns canonical city, project and included analysis. `app.js` retains existing navigation/city/brief/video/rail behavior. `features.js` owns only the added interactions; advertising browsing stays separate from contact selections. All data resets with a reload. No API, storage, analytics, cookie or new library was added.

Feedback uses existing 140ms/250ms tokens. Keyboard actions are immediate; reduced motion removes new positional effects. Native dialogs are explicitly fixed to the viewport. Small-screen documents turn the tracking table into labelled record blocks. Source map geometry and its derivative remain CC BY-SA 3.0, with MIT adaptation notice retained.


## CRM demo removal — 2026-11-01

At the user’s request, restore the exact `#sistem` presentation from source revision `a75538d`: “Bölgenizi tanıyoruz”, “Doğru mesajı kuruyoruz”, “Talebi nitelendiriyoruz” and “Satışı takip ediyoruz”. Remove the CRM board, sample-record controller and its unused CSS. Retain the other five additions, the approved panel rail and existing CRM service/educational copy, including the read-only delivery-document example. No new assets or libraries.
