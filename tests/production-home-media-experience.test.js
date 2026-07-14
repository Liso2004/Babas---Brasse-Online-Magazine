const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
const readJson = (relativePath) => JSON.parse(read(relativePath));

test("homepage model exposes three branded carousel slides and data-driven featured media", async () => {
  const { buildHomeRouteModel } = await import(pathToFileURL(path.join(root, "apps/web/src/pages/homeRouteModel.js")).href);
  const fixtures = await import(pathToFileURL(path.join(root, "apps/web/src/data/launchFixtures.js")).href);
  const model = buildHomeRouteModel(fixtures);

  assert.equal(model.sections.carouselSlides.length, 3);
  assert.equal(model.sections.carouselSlides[0].image, "/media/carousel/babas-brasse-cape-collage.webp");
  assert.ok(model.sections.carouselSlides.every((slide) => slide.alt && slide.title && slide.href));
  assert.ok(model.sections.featuredMedia.length >= 5);
  assert.ok(model.sections.featuredMedia.every((item) => item.title && item.category && item.thumbnail && item.href));
});

test("homepage renders the carousel and accessible React Bits masonry", () => {
  const home = read("apps/web/src/pages/HomePage.jsx");
  const carousel = read("apps/web/src/components/HomeCarousel.jsx");
  const masonry = read("apps/web/src/components/Masonry.jsx");

  assert.match(home, /<HomeCarousel slides=\{sections\.carouselSlides\}/);
  assert.match(home, /data-section="home-featured-media"/);
  assert.match(home, /<Masonry items=\{sections\.featuredMedia\}/);
  assert.match(home, /blurToFocus=\{false\}/);
  assert.match(carousel, /aria-roledescription="carousel"/);
  assert.match(carousel, /aria-label="Previous slide"/);
  assert.match(carousel, /aria-label="Next slide"/);
  assert.match(carousel, /home-carousel__control--previous/);
  assert.match(carousel, /home-carousel__control--next/);
  assert.match(carousel, /className="home-carousel__media-link"/);
  assert.match(carousel, /to=\{slide\.href\}/);
  assert.match(carousel, /onPointerDown/);
  assert.match(carousel, /prefers-reduced-motion/);
  assert.match(carousel, /loading=\{index === 0 \? "eager" : "lazy"\}/);
  assert.match(carousel, /tabIndex=\{active \? 0 : -1\}/);
  assert.match(masonry, /import \{ gsap \} from "gsap"/);
  assert.match(masonry, /<Link/);
  assert.match(masonry, /prefers-reduced-motion/);
  assert.doesNotMatch(masonry, /opacity:\s*0/, "Masonry media must paint even when animation frames are throttled");
  assert.doesNotMatch(masonry, /window\.open/);
});

test("public footer exposes accessible social placeholders without exposing admin", () => {
  const layout = read("apps/web/src/layouts/PublicLayout.jsx");

  for (const network of ["Instagram", "Facebook", "TikTok", "YouTube", "LinkedIn"]) {
    assert.match(layout, new RegExp('label: "' + network + '"'));
  }
  assert.match(layout, /className="figma-footer__socials"/);
  assert.match(layout, /target="_blank"/);
  assert.match(layout, /rel="noopener noreferrer"/);
  assert.match(layout, /placeholder: true/);
  assert.doesNotMatch(layout, /to="\/admin|href="\/admin/);
});

test("home media experience is scoped, packaged, documented, and asset-complete", () => {
  const css = read("apps/web/src/home-media-experience.css");
  const main = read("apps/web/src/main.jsx");
  const pkg = readJson("apps/web/package.json");
  const docs = read("docs/HOME_MEDIA_EXPERIENCE_JULY_2026.md");
  const assets = [
    "apps/web/public/media/carousel/babas-brasse-cape-collage.webp",
    "apps/web/public/media/carousel/babas-brasse-stage-collage.webp",
    "apps/web/public/media/carousel/babas-brasse-city-collage.webp"
  ];

  assert.equal(pkg.dependencies.gsap.startsWith("^"), true);
  assert.match(main, /home-media-experience\.css/);
  assert.match(css, /\.home-carousel/);
  assert.match(css, /\.home-media-masonry/);
  assert.match(css, /data-variant="overlay"/);
  assert.match(css, /__item:focus \.home-media-masonry__body/);
  assert.match(css, /\.figma-footer__social-links a\s*\{[^}]*border:\s*0/s);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(docs, /Image generation prompts/i);
  for (const asset of assets) {
    assert.ok(fs.statSync(path.join(root, asset)).size > 20000, asset + " should be production-sized");
  }
});