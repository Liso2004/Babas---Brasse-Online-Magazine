import { getRouteByPath } from "../routes.js";

const aboutCopy = {
  mission: "Babas & Brasse creates a home for cultural writing, criticism, interviews, photography, and artwork with a voice rooted in lived experience.",
  vision: "The magazine exists to make theatre, books, essays, opinion, and culture feel close, discussable, and worth returning to.",
  organisation: "The launch MVP keeps the publication structure lean: a public magazine, contributor profiles, featured media, contact paths, and an editor-controlled admin area."
};

const pillarFallbacks = [
  { slug: "theatre", label: "Theatre", description: "Stage work, performance notes, and cultural scenes that deserve slower attention." },
  { slug: "books", label: "Books", description: "Reading culture, reviews, interviews, and writer-focused editorial work." },
  { slug: "culture", label: "Culture", description: "Essays, artwork, opinion, and media features from the Babas & Brasse world." }
];

const routeCards = [
  { href: "/creative-team", label: "Creative Team", body: "Meet the people shaping the publication." },
  { href: "/contributors", label: "Contributors", body: "Browse writers and their published work." },
  { href: "/contact", label: "Contact", body: "Send editorial queries, corrections, submissions, and general notes." }
];

export function buildAboutRouteModel(fixtures) {
  const route = getRouteByPath("/about");
  const fixturePillars = fixtures.categories
    .filter((category) => ["essays", "interviews"].includes(category.slug))
    .map((category) => ({
      slug: category.slug,
      label: category.label,
      description: category.description
    }));

  return {
    pageId: "about",
    generatedFrom: "about-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    hero: {
      eyebrow: "About Babas & Brasse",
      title: "Mission, vision, and the shape of the publication.",
      dek: "The MVP About page introduces the magazine without turning the screen into a marketing landing page."
    },
    sections: {
      overview: {
        stateNote: "about-empty-stub",
        mission: aboutCopy.mission,
        vision: aboutCopy.vision,
        organisation: aboutCopy.organisation,
        image: {
          url: "/media/opening-banner-placeholder.jpg",
          altText: "Babas and Brasse publication image placeholder"
        }
      },
      editorialPillars: [...pillarFallbacks, ...fixturePillars],
      routeCards
    },
    newsletter: {
      id: "newsletter",
      action: "/subscribe",
      states: ["newsletter-invalid", "newsletter-success"],
      footerLinks: ["/visceral-mag", "/about", "/contact", "/submit-writing"]
    }
  };
}
