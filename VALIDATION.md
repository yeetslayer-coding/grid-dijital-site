# Validation

Date: 2026-11-01 (Europe/Istanbul)

- `npm run check`: JavaScript syntax passed.
- `npm test`: 5 DOM tests passed. Covers mobile navigation state and Escape focus, process tabs and keyboard navigation, invalid and valid contact briefs, exact WhatsApp encoding and edit state, video creation/cleanup, local assets/anchors/ARIA references and link safety.
- HTTP preview at localhost:4317 returned 200.
- Ten unique official service/guide/contact destination URLs returned HTTP 200. No form or message was submitted.
- Original source customer videos and names were used; no customer quotes, metrics or sales outcomes were invented.
- No external video iframe is created before the user clicks. There is no analytics, contact persistence or remote form submission.
- Preview has noindex/nofollow. The existing production domain is unchanged.
- CSS includes single-column mobile layouts, reduced-motion and reduced-transparency behavior, visible keyboard focus, and 44px+ primary interaction targets.

## Verification limits

Browser-control tools became unavailable after the restart. The new website has not had real-browser screenshot, viewport, video-playback or physical-device QA. DOM tests validate behavior in jsdom, not visual layout, network video playback or actual Safari/Chrome behavior. The user-facing preview was queued through Codex. Deployment verification is recorded after publication.
