import { getRouteByPath } from "../routes.js";

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
      url: "/media/profile-placeholder.jpg",
      altText: `Portrait placeholder for ${profile.name}`
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
      dek: "Editorial roles stay visible so readers understand who owns product direction, development, and publication decisions."
    },
    editorialRoleNote: {
      heading: "Editorial roles",
      body: "Profile records need a public role, short bio, image alt text, and social-link labels before launch."
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
