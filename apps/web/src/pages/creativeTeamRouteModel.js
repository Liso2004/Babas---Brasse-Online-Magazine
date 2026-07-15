import { getRouteByPath } from "../routes.js";

const profileImages = {
  "zubayr-charles": "/media/editorial/editorial-theatre.jpg",
  "zoe-petersen": "/media/editorial/editorial-stagecraft.jpg",
  "naledi-maseko": "/media/editorial/editorial-language.jpg",
  "ayesha-daniels": "/media/editorial/editorial-belonging.jpg"
};

function profileCard(profile) {
  const socialLinks = Array.isArray(profile.socialLinks) ? profile.socialLinks : [];

  return {
    id: profile.id,
    type: profile.type,
    name: profile.name,
    role: profile.role,
    slug: profile.slug,
    shortBio: profile.shortBio,
    image: {
      url: profileImages[profile.id] || "/media/editorial/editorial-theatre.jpg",
      altText: `Editorial setting representing ${profile.name}'s role`
    },
    socialLinks,
    stateNotes: socialLinks.length > 0 ? [] : ["social-links-empty"]
  };
}

export function getCreativeTeamProfiles(fixtures) {
  return fixtures.profiles
    .filter((profile) => profile.type === "creative_team")
    .map(profileCard);
}

export function buildCreativeTeamRouteModel(fixtures) {
  const route = getRouteByPath("/creative-team");
  const teamProfiles = getCreativeTeamProfiles(fixtures);

  return {
    pageId: "creative-team",
    generatedFrom: "creative-team-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    hero: {
      eyebrow: "Creative Team",
      title: "The people shaping Babas & Brasse.",
      dek: "Editors, makers, and visual storytellers working together to publish generous, rigorous cultural writing."
    },
    editorialRoleNote: {
      heading: "How we work",
      body: "Every story moves through conversation: commissioning, close editing, thoughtful visual direction, and a final reading shaped for the web."
    },
    sections: {
      teamGrid: teamProfiles.length > 0 ? {
        state: "ready",
        heading: "Creative Team",
        items: teamProfiles
      } : {
        state: "empty-team",
        heading: "No public creative team profiles are published yet",
        body: "Keep the route available while editorial profiles are drafted in admin.",
        contactHref: "/contact",
        items: []
      },
      states: {
        notes: ["team-loading", "team-error"],
        items: ["loading", "empty", "error", "social"]
      }
    },
    footer: {
      heading: "Team path",
      body: "Readers can continue from the team to contributor profiles or get in touch with the editors.",
      links: [
        { href: "/contributors", label: "Contributors" },
        { href: "/contact", label: "Contact" },
        { href: "/about", label: "About" }
      ]
    }
  };
}
