import { getRouteByPath } from "../routes.js";

const profileImages = {
  "zubayr-charles": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  "zoe-petersen": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  "naledi-maseko": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
  "ayesha-daniels": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=85"
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
      url: profileImages[profile.id] || "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
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
      title: "The people shaping KASI SUPPLY CO..",
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
