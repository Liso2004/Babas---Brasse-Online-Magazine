# Home Media Experience

Date: July 14, 2026

## Scope

This production slice adds the supplied Babas & Brasse collage to a responsive homepage carousel, adapts the React Bits Masonry component for existing editorial media, and adds accessible social placeholders to the public footer. Routing, admin privacy, API behavior, and existing editorial content remain unchanged.

## Carousel

- Three responsive, full-bleed visual slides with HTML copy bands.
- Previous/next controls sit on opposite image edges in their travel direction. Indicators, touch swipe, pause on hover/focus/interaction, reduced-motion handling, fixed image dimensions, and lazy loading after slide one remain available.
- The supplied image is slide one. Two supporting visuals were generated specifically for this project.
- Source images are converted to 1920 by 1080 WebP assets for delivery.

## Featured Media

- Existing media fixtures remain authoritative.
- The React Bits layout uses GSAP only for layout and restrained entry/hover motion.
- Internal React Router links replace demo window.open behavior, and every carousel slide and Masonry tile navigates to its corresponding editorial destination.
- Every item carries title, media type, thumbnail, description, publication date, destination, alt text, and a stable height.
- The production Featured / Media route uses the same React Bits-inspired Masonry as the homepage: images lead on desktop, metadata appears on hover or keyboard focus, and metadata remains visible on touch-sized layouts.
- Masonry cards paint immediately at full opacity, while GSAP is limited to layout, blur, and restrained movement so throttled animation frames cannot hide content.

## Footer Social URLs

Verified Babas & Brasse profile URLs were not supplied. The following records are explicitly marked as placeholders in `PublicLayout.jsx` and must be replaced before launch:

- Instagram: `https://www.instagram.com/`
- Facebook: `https://www.facebook.com/`
- TikTok: `https://www.tiktok.com/`
- YouTube: `https://www.youtube.com/`
- LinkedIn: `https://www.linkedin.com/`

Each link opens in a new tab with `noopener noreferrer`, an accessible platform label, and `data-placeholder="true"`. Social targets keep a 44 by 44 pixel accessible hit area while their visible border, box shadow, and background remain transparent. Admin remains absent from public navigation and the footer.

## Image Generation Prompts

### Theatre and publishing

Create an original premium 16:9 photographic editorial collage focused on live theatre and independent publishing in Cape Town. Use tactile cut-paper edges, a black-box stage opening onto the city, expressive original performers, books, stage lights, fabric, and saturated red, green, yellow, cyan, black, and white. No logo, recognizable celebrity, typography, watermark, interface, or border. Keep the composition legible in a 4:5 mobile crop.

### Johannesburg creative city

Create an original premium 16:9 photographic editorial collage focused on Johannesburg music, street fashion, visual art, and late-night creative community. Layer the skyline and inner-city streets with an original jazz ensemble, a fashion maker, a mural artist, vinyl records, analogue contact sheets, and tactile red, cobalt, emerald, yellow, black, and white paper geometry. No logo, recognizable celebrity, typography, watermark, interface, or border. Keep the composition legible in a 4:5 mobile crop.

## Verification

- Focused contract: npm.cmd run test:home-media-experience
- Full suite: npm.cmd test
- Production build: npm.cmd run build:production
- Browser matrix: npm.cmd run qa:web:screenshots

## Verification Results

- Focused TDD contract: 4 passed, 0 failed.
- Full repository suite: 466 passed, 0 failed.
- Production Vite build: passed with 1,683 modules transformed.
- Route screenshot matrix: 16 desktop/mobile captures completed.
- Focused browser audit: no horizontal overflow at 1440 or 390 pixels; carousel controls occupied opposite image edges; the active image navigated to `/visceral-mag`; all three slide destinations were present; five Featured Masonry items linked to published articles with no overlaps; desktop overlays appeared on focus; mobile overlays remained readable; all cards painted at full opacity; and social links computed with zero borders and transparent backgrounds. No browser errors were present.
- Temporary browser screenshots and conversion helpers were removed after review.
