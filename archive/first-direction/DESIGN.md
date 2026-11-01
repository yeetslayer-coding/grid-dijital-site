# Design System: Grid Dijital

## 1. Visual Theme & Atmosphere
An ambitious solar-growth studio with the precision of an architecture practice. Gallery-airy editorial composition, generous negative space, confident asymmetric typography and tangible solar imagery. DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 3. The existing Grid logo, red identity, Turkish voice, GES focus and navigation names remain. This is an independent redesign preview; existing production routes remain linked at griddijital.com.

## 2. Color Palette & Roles
- Paper (#F6F5F2): primary light canvas.
- Charcoal Ink (#202121): headings and body.
- Secondary Graphite (#626361): supporting copy.
- Grid Red (#BC343E): sole chromatic UI accent, primary buttons, selected tabs and focus. The existing brand red is calibrated for readable text.
- Stone Surface (#ECEBE7): elevated panels, form and inputs.
- Quiet Border (#D7D7D2): structural separators.
- Dark mode swaps Paper to #191A1A, Ink to #F2F1ED, Graphite to #B4B6B1, Stone to #232525, Border to #414442 and Red to #F08088. Button fill stays #BC343E with #F6F5F2 text. Photography retains its natural colors.

## 3. Typography Rules
Use the existing self-hosted Grid Display and Grid Body variable fonts, with their Turkish glyphs preserved. Display headlines weight 520, tracking -0.045em, line-height 1.06. Hero 42-82px via clamp; section heads 34-58px. Body 16px with 1.7 line-height, maximum 65ch. Navigation 13px/600. Functional labels 12px, modest tracking. Inline solar photography provides visual punctuation in the hero; on mobile the small image moves below the headline. Never Inter or a generic serif.

## 4. Component Stylings
Buttons have 8px corners, 52px minimum height, a flat Grid Red surface and no glow. Press feedback scales to .98; hover translates by 2px. One primary hero CTA. Photography is never covered by text; captions sit below. Large media and meaningful panels use 20px corners. The original logo is cropped only to remove transparent empty margins. Services are open editorial rows, not interchangeable cards. Forms use persistent labels, inline errors and native controls. Contact handoff opens the existing official application; no simulated successful submission. Video dialogs load the real source videos only on request, with explicit close and fallback YouTube link. Native details provide FAQ disclosure.

## 5. Layout Principles
Maximum width 1360px, 56px desktop and 20px mobile gutters. Hero is left-aligned, two-line editorial type with a separate description/CTA row and cinematic wide image underneath. Use CSS Grid, not percentage arithmetic. Navigation keeps Hizmetler, Çözümler, Rehberler, Referanslar, Hakkımızda. All multi-column content collapses to a single column below 768px. Minimum touch target 44px. No horizontal page overflow. Section space clamp(64px,8vw,112px). Keep system, kanit, rehber, teklif, garanti, sss and uygunluk anchors for continuity.

## 6. Motion & Interaction
Use native CSS and IntersectionObserver for subtle opacity/transform entry cascades. Cubic-bezier(.16,1,.3,1) approximates a spring with stiffness 100 and damping 20. Active process nodes have restrained opacity breathing to communicate the selected stage; informational content remains still. No scroll hijacking or custom cursor. Honor reduced motion with static nodes, immediate reveals and instant scrolling. Pause decorative motion when hidden. Keyboard arrow navigation on process tabs, Escape to close menus/dialogs, visible focus, and one coherent auto/light/dark theme. Layer scale: content 0, header 20, modal native top layer.

## 7. Anti-Patterns (Banned)
No invented clients, metrics, testimonials, fake dashboards, emojis, Inter, pure black, neon, purple, gradient headings, overlapping content, three equal feature cards, scroll instructions, generic marketing filler or fake form success. Never present generated solar imagery as a customer project. Existing commercial claims must retain all conditions or link to the official source. No direct lead transmission from this design preview.

## Source and implementation notes
Audited https://griddijital.com on 2026-11-01. Public logo, fonts, reference thumbnails, four YouTube IDs, office and contact destinations are sourced there. Current source has a charcoal/red hero, extensive service/guide routes, a seven-step application and four customer videos. Redesign improves the photographic storytelling, reading hierarchy and process exploration. Source URLs remain explicit for downstream pages and application, preserving real functionality without changing the production site.

The hero is an imagegen-generated conceptual solar landscape, optimized into local WebP sizes. It is not a commissioned installation claim. See ASSETS.md for provenance and generation prompt.
