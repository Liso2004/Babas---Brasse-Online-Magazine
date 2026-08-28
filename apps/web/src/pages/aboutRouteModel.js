import { getRouteByPath } from "../routes.js";

const aboutCopy = {
  mission: "URBAN ANARCHY documents the friction between fashion, art, and culture with a point of view rooted in the street.",
  vision: "We make room for difficult images, independent voices, and the people who build culture before anyone calls it a movement.",
  organisation: "URBAN ANARCHY is an independent visual culture magazine for style obsessives, art kids, and city makers."
};

const pillarFallbacks = [
  { slug: "style", label: "Style Codes", description: "The silhouettes and self-made uniforms that turn a pavement into a runway." },
  { slug: "art", label: "Art & Image", description: "Visual artists and image-makers changing what the city looks like." },
  { slug: "sound", label: "Sound", description: "The rooms, rhythms, and collectives keeping culture in motion." }
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
      eyebrow: "About URBAN ANARCHY",
      title: "A hard-edged magazine for a living city.",
      dek: "URBAN ANARCHY tracks the collision of fashion, art, and culture across South Africa and beyond."
    },
    sections: {
      overview: {
        stateNote: "about-empty-stub",
        mission: aboutCopy.mission,
        vision: aboutCopy.vision,
        organisation: aboutCopy.organisation,
        image: {
          url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=85",
          altText: "Neighbors in conversation on a Cape Town street"
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
