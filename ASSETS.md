# Assets and provenance

## Original brand and customer references

Retrieved from https://griddijital.com on 2026-11-01. Brand colors and names remain separate from Perakende Dijital.

- `dist/assets/brand.webp`: original Grid logo, transparent empty margins removed; source `/assets/grid-logo-BcGQy_Uq.png`.
- Original website font downloads are archived as display.woff2/body.woff2. The new site serves the full Outfit and Manrope variable TTF files from the official google/fonts repository with OFL license files, matching the original site’s named font fallbacks and avoiding a dependency on extended-Latin-only subsets.
- Reference thumbnails: `/assets/video-posters/suntep-solar-hd.jpg`, `family-group-enerji-hd.jpg`, `arcelik-bayisi-hd.jpg`, `frekans-hd.jpg`. Original downloads are in `archive/source-assets`; optimized local WebP copies are served.
- Source video IDs: Suntep `j4m6kfkmXHY`, Family Group `0laH1mUQchY`, Arçelik bayisi `Gw3Y4yd2K7w`, Frekans `D6cYJVJP8fY`. Videos are embedded from youtube-nocookie only after a user click, with a YouTube fallback.
- Contact and social destinations are copied from the existing official site. No message was sent during implementation or validation.
- Tabler Icons 3.31.0, MIT licensed, served locally. License is `dist/assets/icons/LICENSE.txt`.

## Earlier generated concept image (not used in the current page)

Built-in imagegen was used. The generated artwork is a conceptual sculpture, not a customer installation. It is served as `dist/assets/solar-sculpture.webp` and `solar-sculpture-small.webp`.

Prompt:

Use case: product-mockup. Create an exceptional high-end 3D editorial sculpture for the hero section of a Turkish solar-growth studio website. Asset is a square studio image on a perfectly uniform very light neutral gray #f4f4f2 background with a soft natural contact shadow. Subject: an elegant miniature architectural composition of THREE physically realistic black photovoltaic solar panels with tiny square silver circuit cells, each mounted on a precise brushed-aluminum slim rectangular frame at progressively ascending heights. They form an abstract staircase growing from lower-left to upper-right, all leaning at a plausible solar collection angle. A large sculptural deep muted red glass sphere floats just above the highest panel as an abstract sun. The red is #bd3d47, not neon. A thin brushed-silver circular halo arcs behind the sphere and modules, like the path of sunlight. Ground is pale neutral matte plaster, no landscape. Unusual 3/4 isometric camera, tasteful medium format product photography, realistic refraction, clean physical material detail, plenty of breathing room. Monochrome silver/charcoal with exactly one red accent. Main sculptural object centered, contained fully in frame, occupies 80 percent. World-class architectural model photography meets minimalist industrial art direction. No text, no letters, no branding, no logos, no watermark, no UI, no extra decorative shapes. This visual symbolizes solar business growth; it is clearly a conceptual art object, not a real client project.

The earlier sunset image and first-direction document were archived after the user requested a fresh start. They are not referenced by the current website.

## Perakende visual transfer — 2026-11-01

- `dist/assets/ges-growth-scene.webp`: generated solar-villa, module and proposal scene on Grid red, optimized to 1200px WebP. Original: `/Users/yigit/.codex/generated_images/01a1972d-9673-71b0-a55c-f84153bf9442/exec-bcbaf5b2-5593-4bd0-9730-5db62d78f59d.png`.
- `dist/assets/solar-cursor.webp`: generated solar module and pointer, transparent background, optimized to 600px WebP. Original: `/Users/yigit/.codex/generated_images/01a1972d-9673-71b0-a55c-f84153bf9442/exec-ffd6790e-be8a-4bb7-be1b-b3664c043acc.png`.
- Both new assets use built-in imagegen. The showcase is explicitly labeled representative; it is not a customer installation or a measured result.
- Geist 400/500/600 and `geist-OFL.txt` are copied from the read-only Perakende project's `public/fonts`. Outfit remains the existing local variable font. Manrope is retained only as an unused prior asset.
- `textures/paper-grain.svg` is copied from Perakende. `solar-texture.svg` and its mobile counterpart are code-native outline drawings adapting the source's placement and line density to roof panels, wiring and proposals.

### Solar showcase prompt

Use case: product-mockup. A premium photorealistic 3D still-life illustration for a Turkish solar marketing agency, wide 4:3 composition. On a perfectly uniform muted crimson red studio background #B93643, arrange a small architectural white villa model with a dark photovoltaic solar roof on the LEFT, a refined freestanding black solar panel on a brushed aluminum stand at CENTER, and a white project folder with a simple embossed roof symbol and a white clipboard with a few abstract gray lines and one red check mark on the RIGHT. A slender silver cable visually connects the objects at ground level, suggesting solar project discovery and proposal. Luxury architectural miniature photography, tactile matte white ceramic, brushed silver metal, tiny precise black solar cells. Perspective is three-quarter front, softly elevated, natural coherent shadows. Compact arrangement fully contained within the middle of the canvas with generous empty RED space around it, especially top and bottom, so edges can fade to a matching red website background. No letters, numbers, brand names, currency, UI, dashboards, people, foliage, or orange/blue/green accents. Objects are off-white, charcoal and silver. Nothing cut off. Make it feel like an exceptionally crafted physical miniature, not a shiny game render. Used as a conceptual GES customer acquisition scene, not a real customer project.

### Inline solar/cursor prompt

Use case: product-mockup. Create a small premium 3D cutout illustration for inline placement beside a headline on a Turkish solar marketing website. A single miniature charcoal photovoltaic solar panel, slightly tilted backwards and to the left, in a slim rounded brushed-silver frame. A large ivory-white computer mouse pointer arrow with a muted crimson red #B93643 beveled edge sits in front of the lower-right panel corner, pointing at one solar cell. The two objects form a tightly composed friendly tangible object. Restrained realistic materials, exact tidy solar cells, soft ambient light and minimal contact shadow. Landscape 3:2 composition with the full objects contained, crisp readable silhouette at 100px wide. Transparent background, no floor, no backdrop, no text, no letters, no additional objects, no blue/purple/green. More like a high-end interface illustration photographed as a physical model, less like a toy.
