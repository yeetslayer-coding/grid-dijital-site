# Assets and provenance

## Selected solar-module rail — 2026-11-01

The user selected “Panel yüzeyleri” from the two working Perakende-scale comparisons. The active rail now uses native HTML/CSS: thin module frames, charcoal cell grids and HTML labels. No new bitmap, generated asset or large pictogram is used. The module family builds on the selected comparison, with later portrait, split-array and dark-frame variations recorded in DESIGN.md. Earlier SVG/imagegen files and provenance below are retained as prior iterations; project-card WebP assets remain unchanged.

## Flat vector rail — 2026-11-01

The previous conveyor version used five original hand-authored SVG drawings in `dist/assets/ges-vectors/`: `region.svg`, `advertising.svg`, `application.svg`, `villa.svg` and `proposal.svg`. They depict a flat street map and pin, front-facing advertising display, applicant clipboard, solar-roof house elevation and approved proposal folder. These are native paths and shapes, not traced or embedded raster images. No external artwork or icon library is used.

All five share a 200 × 200 viewBox, 2.5-unit rounded charcoal strokes and a y=196 baseline. Colors are Grid red `#B93643`, ink `#202222`, canvas `#F4F4F2` and mineral `#E9EAE7`. There is no perspective, lighting, shadow, gradient or filter. Stage numbers and names remain HTML. The old image-specific alpha-padding offsets are removed.

The two conveyor groups reuse these SVG files. The four project-selection images—including the previously shared villa WebP—are unchanged. The earlier imagegen provenance below is retained for those images and the replaced rail assets.

## GES object family and selection cards — 2026-11-01

Eight project assets were generated with the built-in imagegen tool, inspected, and converted to 512 × 512 transparent WebP at quality 88. Total served size: 293,362 bytes. All have a transparent alpha channel. No image text, logos or customer-result claims are added. Source originals are retained in the Codex generated-images folder; exact original/output paths and alpha measurements are recorded in `verification/ges-assets.json`.

Final asset directory: `/Users/yigit/Documents/ChatGPT/grid dijital/grid-dijital-site/dist/assets/ges-objects/`.

- `region.webp`: folded map and location pin — Bölge.
- `advertising.webp`: solar advertising display — Reklam.
- `application.webp`: applicant clipboard — Başvuru.
- `villa.webp`: solar-roof villa — Keşif and the Konut & villa selection card.
- `proposal.webp`: approved proposal folder — Teklif.
- `factory.webp`: rooftop solar factory — Ticari çatı selection card.
- `solar-field.webp`: utility solar installation — EPC & proje selection card.
- `irrigation.webp`: solar panel and pump — Tarımsal sulama selection card.

The images are illustrative miniatures, not claimed customer installations. Rail labels are actual HTML. Image alpha was read to calculate CSS baseline offsets; the source raster objects were not retouched during optimization.

### Object-family generation prompts

**region**

Use case: stylized-concept. Create one premium photorealistic 3D miniature object for Grid Dijital's solar energy website, isolated on a genuinely transparent background. Square composition. Consistent family art direction: orthographic three-quarter front view, camera from front-right at 25 degrees elevation, soft large studio key light from upper left, restrained realistic materials. Palette ONLY warm neutral white #F4F4F2, charcoal #202222, brushed silver, muted deep crimson #B93643. Tiny natural contact shadow allowed, no background floor or scenery. The object is entirely within frame, centered, occupies about 85 percent of canvas width or height, base sits at 90 percent of image height. Architectural model photography, precisely crafted miniature, tactile satin surfaces, beautiful silhouette legible at 150px. No text, letters, numbers, logos, watermarks, packaging boxes, floating particles, green vegetation, blue accents, glow, extra decorative props. Subject: a small folded off-white street-map sculpture with thin recessed gray road lines, two low rectangular urban blocks and one prominent upright crimson map pin. It represents the geographic service region.

**advertising**

Use case: stylized-concept. Create one premium photorealistic 3D miniature object for Grid Dijital's solar energy website, isolated on a genuinely transparent background. Square composition. Consistent family art direction: orthographic three-quarter front view, camera from front-right at 25 degrees elevation, soft large studio key light from upper left, restrained realistic materials. Palette ONLY warm neutral white #F4F4F2, charcoal #202222, brushed silver, muted deep crimson #B93643. Tiny natural contact shadow allowed, no background floor or scenery. The object is entirely within frame, centered, occupies about 85 percent of canvas width or height, base sits at 90 percent of image height. Architectural model photography, precisely crafted miniature, tactile satin surfaces, beautiful silhouette legible at 150px. No text, letters, numbers, logos, watermarks, packaging boxes, floating particles, green vegetation, blue accents, glow, extra decorative props. Subject: a slim freestanding portrait digital advertising display with a sculptural off-white housing, narrow silver foot and a muted crimson screen border. On the display only a small realistic solar-panel roof image and a simple unlabelled crimson button shape; absolutely no text or charts. It represents solar-project advertising.

**application**

Use case: stylized-concept. Create one premium photorealistic 3D miniature object for Grid Dijital's solar energy website, isolated on a genuinely transparent background. Square composition. Consistent family art direction: orthographic three-quarter front view, camera from front-right at 25 degrees elevation, soft large studio key light from upper left, restrained realistic materials. Palette ONLY warm neutral white #F4F4F2, charcoal #202222, brushed silver, muted deep crimson #B93643. Tiny natural contact shadow allowed, no background floor or scenery. The object is entirely within frame, centered, occupies about 85 percent of canvas width or height, base sits at 90 percent of image height. Architectural model photography, precisely crafted miniature, tactile satin surfaces, beautiful silhouette legible at 150px. No text, letters, numbers, logos, watermarks, packaging boxes, floating particles, green vegetation, blue accents, glow, extra decorative props. Subject: an upright off-white application clipboard on a discreet silver support, with a crimson circular applicant silhouette at top and three recessed gray form rows, a single small crimson tick near a form row. No legible text. It represents a prospective customer's application. Refined physical paper and metal clips.

**villa**

Use case: stylized-concept. Create one premium photorealistic 3D miniature object for Grid Dijital's solar energy website, isolated on a genuinely transparent background. Square composition. Consistent family art direction: orthographic three-quarter front view, camera from front-right at 25 degrees elevation, soft large studio key light from upper left, restrained realistic materials. Palette ONLY warm neutral white #F4F4F2, charcoal #202222, brushed silver, muted deep crimson #B93643. Tiny natural contact shadow allowed, no background floor or scenery. The object is entirely within frame, centered, occupies about 85 percent of canvas width or height, base sits at 90 percent of image height. Architectural model photography, precisely crafted miniature, tactile satin surfaces, beautiful silhouette legible at 150px. No text, letters, numbers, logos, watermarks, packaging boxes, floating particles, green vegetation, blue accents, glow, extra decorative props. Subject: a beautiful miniature modern two-story off-white villa with a pitched charcoal photovoltaic solar-panel roof, accurate silver cell lines, clear glass balcony, simple warm-gray front entrance and one very small crimson entrance detail. No plants, garden, surrounding landscape or ground slab extending beyond the building. It represents a residential solar installation.

**proposal**

Use case: stylized-concept. Create one premium photorealistic 3D miniature object for Grid Dijital's solar energy website, isolated on a genuinely transparent background. Square composition. Consistent family art direction: orthographic three-quarter front view, camera from front-right at 25 degrees elevation, soft large studio key light from upper left, restrained realistic materials. Palette ONLY warm neutral white #F4F4F2, charcoal #202222, brushed silver, muted deep crimson #B93643. Tiny natural contact shadow allowed, no background floor or scenery. The object is entirely within frame, centered, occupies about 85 percent of canvas width or height, base sits at 90 percent of image height. Architectural model photography, precisely crafted miniature, tactile satin surfaces, beautiful silhouette legible at 150px. No text, letters, numbers, logos, watermarks, packaging boxes, floating particles, green vegetation, blue accents, glow, extra decorative props. Subject: an upright off-white architectural proposal folder with visible thin layers of paper and a brushed silver binder clip, an embossed roof outline on its cover, and a large deep crimson check mark on an attached front sheet. It represents an approved solar-project proposal. It is a flat slim document folder, not a shipping package.

**factory**

Use case: stylized-concept. Create one premium photorealistic 3D miniature object for Grid Dijital's solar energy website, isolated on a genuinely transparent background. Square composition. Consistent family art direction: orthographic three-quarter front view, camera from front-right at 25 degrees elevation, soft large studio key light from upper left, restrained realistic materials. Palette ONLY warm neutral white #F4F4F2, charcoal #202222, brushed silver, muted deep crimson #B93643. Tiny natural contact shadow allowed, no background floor or scenery. The object is entirely within frame, centered, occupies about 85 percent of canvas width or height, base sits at 90 percent of image height. Architectural model photography, precisely crafted miniature, tactile satin surfaces, beautiful silhouette legible at 150px. No text, letters, numbers, logos, watermarks, packaging boxes, floating particles, green vegetation, blue accents, glow, extra decorative props. Subject: a compact industrial factory miniature with three sawtooth roof bays densely covered in charcoal solar modules, off-white precast facades, silver roof trims and one muted crimson loading door. No smokestack, smoke, greenery or surroundings. It represents commercial and industrial rooftop solar.

**solar-field**

Use case: stylized-concept. Create one premium photorealistic 3D miniature object for Grid Dijital's solar energy website, isolated on a genuinely transparent background. Square composition. Consistent family art direction: orthographic three-quarter front view, camera from front-right at 25 degrees elevation, soft large studio key light from upper left, restrained realistic materials. Palette ONLY warm neutral white #F4F4F2, charcoal #202222, brushed silver, muted deep crimson #B93643. Tiny natural contact shadow allowed, no background floor or scenery. The object is entirely within frame, centered, occupies about 85 percent of canvas width or height, base sits at 90 percent of image height. Architectural model photography, precisely crafted miniature, tactile satin surfaces, beautiful silhouette legible at 150px. No text, letters, numbers, logos, watermarks, packaging boxes, floating particles, green vegetation, blue accents, glow, extra decorative props. Subject: a miniature utility-scale photovoltaic installation of three orderly rows of four charcoal solar-panel tables on slender silver legs, all aligned in parallel, on a thin off-white architectural-model base. One tiny crimson utility cabinet near the edge. No green ground or landscape. It represents an EPC solar farm.

**irrigation**

Use case: stylized-concept. Create one premium photorealistic 3D miniature object for Grid Dijital's solar energy website, isolated on a genuinely transparent background. Square composition. Consistent family art direction: orthographic three-quarter front view, camera from front-right at 25 degrees elevation, soft large studio key light from upper left, restrained realistic materials. Palette ONLY warm neutral white #F4F4F2, charcoal #202222, brushed silver, muted deep crimson #B93643. Tiny natural contact shadow allowed, no background floor or scenery. The object is entirely within frame, centered, occupies about 85 percent of canvas width or height, base sits at 90 percent of image height. Architectural model photography, precisely crafted miniature, tactile satin surfaces, beautiful silhouette legible at 150px. No text, letters, numbers, logos, watermarks, packaging boxes, floating particles, green vegetation, blue accents, glow, extra decorative props. Subject: one compact muted crimson agricultural irrigation pump with silver pipes and a simple circular pressure gauge with no numbers, beside one tilted charcoal photovoltaic module mounted on slender silver legs. The two form one balanced miniature solar-powered irrigation installation. No tractor, plants, landscape, water splashes or text.

### Advertising-screen color correction

Edit only the photographic image INSIDE the advertising display screen: turn that photograph into elegant neutral charcoal, silver and off-white grayscale. Remove all yellow/orange sunlight color, green foliage color and blue panel color from the screen photograph. Preserve the muted deep crimson frame and blank button, white housing, exact silhouette, dimensions, camera angle, lighting and fully transparent background. No text, new objects or other changes.

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

## Campaign photographs and province map — 2026-11-01

Generated with the built-in `image_gen.imagegen` tool, one request per scene. No CLI/API fallback. All four final project assets are local 1200 × 800 WebP, quality 83 (format/size conversion with cwebp; no content retouching). Original PNGs are preserved in `/Users/yigit/.codex/generated_images/01a1972d-9673-71b0-a55c-f84153bf9442/`. The photographs are illustrative, not client-project evidence. UI captions explicitly say this; campaign headlines are HTML, never embedded pixels.

| Final file | Original output |
|---|---|
| `dist/assets/campaigns/residential.webp` | `exec-3b5a5660-6ae3-4247-b004-7c6bb1891f27.png` |
| `dist/assets/campaigns/commercial.webp` | `exec-37756a91-41b0-4a6d-a690-00f9f205b0c8.png` |
| `dist/assets/campaigns/epc.webp` | `exec-e9e20887-9ad9-4868-90a5-25a60d240490.png` |
| `dist/assets/campaigns/irrigation.webp` | `exec-090d300d-3215-422b-a50c-4b8a7e617b68.png` |

Each exact prompt is the following prefix, its scene paragraph, then the common suffix.

Prefix: “Use case: ads-marketing. Asset: photo-only editorial campaign showcase for Grid Dijital, a solar-sector marketing agency in Turkey.”

Residential: “An actual full-scale contemporary two-storey cream stucco Mediterranean Turkish villa with a simple sloping roof fitted with precisely aligned dark photovoltaic panels. A few olive trees, understated garden, limestone boundary wall. Architectural photography from a slightly elevated oblique angle, house and panels both clearly visible.”

Commercial: “An actual large Turkish industrial factory, photographed from drone height, a disciplined expanse of charcoal solar panel arrays on its low metal factory roof, concrete yard, loading doors along the lower building facade, minimal industrial surroundings. Authentic industrial architecture, clean geometric composition.”

EPC: “An actual utility-scale solar power installation in the inland Turkish countryside. Long parallel rows of dark photovoltaic panels on realistic metal supports crossing a gently rolling dry plateau. Elevated photography, distant low mountains, plenty of detail, one narrow maintenance road to establish scale.”

Irrigation: “An actual solar-powered agricultural irrigation installation in rural Konya Turkey. In the foreground a practical set of dark photovoltaic panels on low galvanised supports, a small real steel pump head and tidy pipe connection to an irrigated field beyond. Green crop rows and a dry field road. Documentary agricultural engineering photography. No implausible floating pipes or oversized water jets.”

Suffix: “Landscape 3:2 composition, realistic high-end architectural/documentary photograph, natural early morning daylight, subtle warm offwhite and charcoal with restrained realistic greens, neutral sky, photographic texture, sophisticated calm framing. The solar installation is the main subject and stays readable when cropped. Absolutely no typography, no logo, no watermark, no UI, no illustration, no miniature model, no toy-like 3D render, no infographic. It is an illustrative generated photograph, not evidence of an actual client project.”

### Local map geometry

`dist/assets/maps/turkiye.svg` vendors path geometry from [dnomak/svg-turkiye-haritasi](https://github.com/dnomak/svg-turkiye-haritasi). The upstream software notice is MIT, copyright Doğukan Güven Nomak. The original drawing is [Turkey provinces blank gray.svg](https://commons.wikimedia.org/wiki/File:Turkey_provinces_blank_gray.svg), author **6F-6C-63-61-79**, licensed [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The adapted geometry is distributed under that same license.

Changes: merge Istanbul’s three paths into one selection, exclude non-01–81 regions, remove upstream script/styles/markup, simplify IDs/presentation. Only path `d` geometry is carried over; remote scripts are never run. `scripts/vendor-map.mjs` reproduces the build-time import. The browser loads a single local SVG through fragment references, with no external map service. Full MIT notice, source/author, derivative changes and CC BY-SA link are retained in `dist/assets/maps/LICENSE.txt`, linked visibly below the map and embedded as SVG metadata.

### Real customer video sources

The existing four IDs and thumbnails are unchanged. YouTube oEmbed verified the official titles and Grid Dijital authorship on 2026-11-01; `verification/six-features-video-sources.json` records the responses. This checks title provenance, not the truth or generality of performance statements. All generated/demo content is kept separate from these customer dossiers.
