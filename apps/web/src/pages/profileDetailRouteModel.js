import { getRouteByPath } from "../routes.js";

const profileImages = {
  "zubayr-charles": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  "zoe-petersen": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  "naledi-maseko": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
  "ayesha-daniels": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=85",
  "visceral-contributor": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=85",
  "sihle-ndlovu": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  "mia-van-wyk": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
  "thando-jacobs": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85"
};

function profileImage(profile) {
  return {
    url: profile.image?.url || profileImages[profile.id] || "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    altText: profile.image?.altText || `Editorial portrait representing ${profile.name}`
  };
}

function publishedWork(fixtures, profile, article) {
  const category = fixtures.categories.find((item) => item.id === article.categoryId || item.slug === article.categoryId);

  return {
    ...article,
    href: `/visceral-mag/${article.slug}`,
    category: {
      id: article.categoryId,
      label: category?.label || article.categoryId,
      slug: category?.slug || article.categoryId
    },
    author: {
      id: profile.id,
      name: profile.name,
      slug: profile.slug,
      href: `/people/${profile.slug}`
    }
  };
}

export function buildProfileDetailRouteModel(fixtures, slug) {
  const route = getRouteByPath("/people/:slug");
  const profile = fixtures.profiles.find((item) => item.slug === slug || item.id === slug);

  if (!profile) {
    return {
      pageId: "profile-detail",
      generatedFrom: "profile-detail-route-model",
      state: "not-found",
      route,
      profile: null,
      publishedWorks: [],
      backHref: "/contributors"
    };
  }

  const backHref = profile.type === "creative_team" ? "/creative-team" : "/contributors";
  const publishedWorks = fixtures.articles
    .filter((article) => article.status === "published" && article.authorProfileId === profile.id)
    .sort((left, right) => String(right.publishedAt || "").localeCompare(String(left.publishedAt || "")))
    .map((article) => publishedWork(fixtures, profile, article));

  return {
    pageId: "profile-detail",
    generatedFrom: "profile-detail-route-model",
    state: "ready",
    route,
    backHref,
    profile: {
      ...profile,
      fullBio: profile.fullBio || profile.shortBio,
      image: profileImage(profile),
      socialLinks: Array.isArray(profile.socialLinks) ? profile.socialLinks : []
    },
    publishedWorks
  };
}
