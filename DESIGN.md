# Design System: Grid Dijital

## 1. Visual Theme & Atmosphere
A solar growth studio designed with the precision of an architecture practice. Airy neutral canvas, tangible 3D solar objects and asymmetric editorial typography. Confident, calm and unmistakably Grid. DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 3. Created from scratch following stitch-design-taste after the user's restart. The earlier sunset direction is archived and not used.

## 2. Color Palette & Roles
- Studio Canvas (#F4F4F2): main neutral background, consistent throughout.
- Clean Surface (#FAFAF9): elevated contact and interactive surfaces.
- Charcoal Ink (#202222): primary type, inverse component background.
- Secondary Graphite (#646664): readable body copy.
- Mineral Surface (#E9EAE7): visual diagram bases and input fills.
- Structural Line (#D8DAD5): restrained separators.
- Grid Red (#B93643): the only chromatic UI accent, saturation below 80%; buttons, selected tabs, emphasized headline words and focus. White-on-red is above WCAG AA. Source logo colors remain unchanged.
No neon, purple, pure black or inconsistent warm/cool neutral families. Photographic colors are intrinsic to source images.

## 3. Typography Rules
Use self-hosted Outfit (Grid Display) and Manrope (Grid Body) variable fonts from Google Fonts, preserving the original site’s font-family choices and including full Turkish glyph coverage. Display 500-550; body 400-650. Hero clamp(48px,5.2vw,76px), tracking -.055em, leading 1.04. Section heads clamp(36px,4.2vw,60px), tracking -.045em. Body 16px, leading 1.75, maximum 65ch. Labels 12px, navigation 13px. Bold is selective. No Inter or serif. Small contextual solar imagery sits inside the headline as visual punctuation and moves below the full headline on mobile.

## 4. Component Stylings
Buttons: 8px corners, 54px height, flat red with light text, tactile .98 scale on press, 2px lift on hover. One hero CTA. Icons are locally hosted Tabler outline icons with consistent 1.7 stroke width. Media corners 24px. Meaningful group panels 24px; cards are used only for references and the guided contact interaction. Inputs have permanent labels, 52px height, visible errors. Service rows have clear expansion and selected state. Real customer videos open in native dialogs, loaded only on request; the dialog includes a YouTube fallback. Contact generates a reviewable message locally; the user explicitly chooses WhatsApp or the existing official application. Never report a lead as submitted locally.

## 5. Layout Principles
Maximum width 1320px. Desktop gutter 56px; tablet 32px; phone 20px. Hero is 1.1fr/1fr, with all text and the sculptural hero asset in distinct spatial zones. Three controlled headline lines, never covering the artwork. The customer index sits below as real reference links, not fabricated logos. System uses a 5fr/7fr layout with interactive stages. Case studies use a featured 1.25fr/1fr layout. Services use an asymmetric editorial accordion; guides use a two-column layout. All multi-column layouts become one column below 768px. No horizontal scroll or absolute-positioned content overlaps. Mobile touch targets >=44px; spacing clamp(64px,8vw,112px).

## 6. Motion & Interaction
CSS transitions and IntersectionObserver are sufficient for this static presentation site. Motion uses cubic-bezier(.16,1,.3,1), approximating stiffness 100/damping 20. Hero illustration gently floats; only active process markers breathe to show which step is selected. Entry animations stagger opacity and transform by 60ms. No continuous JS render loop, scroll hijacking or custom cursor. Reduced-motion disables continuous movement, reveals content immediately and removes smooth scrolling. Visibility changes pause perpetual animation. Menus and dialogs close on Escape. Process tabs support arrows/Home/End and correctly manage aria-selected, tabindex and hidden panels. Native details for FAQ and services.

## 7. Anti-Patterns (Banned)
No fake client results, invented percentages, fabricated testimonials, made-up partnerships, generic dashboards, emojis, Inter, generic serif, pure black, neon, gradient headlines, custom cursor, overlapping content, three equal feature cards, useless scroll cues or placeholder copy. No fake form success or invented sales guarantee. Generated artwork is conceptual and clearly described in alt/caption. No analytical tracking or third-party iframe before interaction.

## Content provenance and scope
Brand/logo/fonts, services, real reference names/video IDs and official contact destinations were read from griddijital.com on 2026-11-01. The new website is an independent private design preview; official application and guide routes continue to their existing URLs. Do not change griddijital.com or its DNS as part of this preview. Preserve anchor continuity: sistem, kanit, rehber, teklif, garanti, sss, uygunluk.
