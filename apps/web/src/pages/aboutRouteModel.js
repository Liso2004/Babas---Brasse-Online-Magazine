import { getRouteByPath } from "../routes.js";

const aboutCopy = {
  whoWeAre: [
    "Babas and Brasse is an inclusive non-profit arts, fashion, and literary platform and collective created to showcase, archive, and celebrate local creative work.",
    "Created in 2026 as a response to the gatekeeping often found in mainstream media and online publishing spaces, Babas and Brasse aims to support creatives who may not always have access to the resources, visibility, and archive needed to share their stories, build their profiles, and reach wider audiences.",
    "Beyond art, fashion, and literature, we are committed to giving voice to individuals from marginalised communities and creating a space where their lived experiences, creativity, and contributions can be seen, heard, and celebrated."
  ],
  name: [
    "Baba is the Afrikaans word for baby, a term of endearment often used to refer to someone affectionately, while brasse is a colloquial word for brother, friend, or close companion. Both terms are gender-neutral and can be used to warmly describe another.",
    "Creative Director and Editor-in-Chief Zubayr Charles purposefully chose this localised name to align with the platform and collective brand and vision. Through Babas and Brasse, the team aims to capture the spirit of a local platform and collective that promotes pride in South African art, fashion, literature, and language through community, inclusivity, and belonging."
  ],
  collective: "Our collective is for all the babas and brasse out there: the artists, misfits, writers, makers and shakers, and lovers of all things creative who are hustling through the gatekeeping and kapping aan despite the many challenges of life in South Africa."
};

const routeCards = [
  { href: "/creative-team", label: "Creative Team", body: "Meet the people shaping the publication." },
  { href: "/contributors", label: "Contributors", body: "Browse writers and their published work." },
  { href: "/contact", label: "Submissions", body: "Send pitches, requests, corrections, and media submissions." }
];

function teamCard(profile) {
  return {
    id: profile.id,
    name: profile.name,
    role: profile.role,
    slug: profile.slug,
    href: "/people/" + profile.slug,
    shortBio: profile.shortBio,
    image: profile.image || { url: "/media/profile-placeholder.jpg", altText: "Portrait of " + profile.name }
  };
}

export function buildAboutRouteModel(fixtures) {
  const route = getRouteByPath("/about");

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
      title: "About Page",
      dek: "A literary vessel, cultural anchor, and inclusive platform for South African arts, fashion, literature, and lived experience."
    },
    sections: {
      overview: {
        stateNote: "about-content-updated",
        whoWeAre: aboutCopy.whoWeAre,
        name: aboutCopy.name,
        collective: aboutCopy.collective,
        image: {
          url: "/media/carousel/babas-brasse-cape-collage-replacement.jpeg",
          altText: "Babas and Brasse collage banner with Table Mountain and South African cultural symbols"
        }
      },
      creativeTeam: fixtures.profiles.filter((profile) => profile.type === "creative_team").map(teamCard),
      routeCards
    }
  };
}
