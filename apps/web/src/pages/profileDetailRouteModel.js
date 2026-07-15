import { getRouteByPath } from "../routes.js";

const profileImages = {
  "zubayr-charles": "/media/editorial/editorial-theatre.jpg",
  "zoe-petersen": "/media/editorial/editorial-stagecraft.jpg",
  "naledi-maseko": "/media/editorial/editorial-language.jpg",
  "ayesha-daniels": "/media/editorial/editorial-belonging.jpg",
  "visceral-contributor": "/media/editorial/editorial-belonging.jpg",
  "sihle-ndlovu": "/media/editorial/editorial-theatre.jpg",
  "mia-van-wyk": "/media/editorial/editorial-books.jpg",
  "thando-jacobs": "/media/editorial/editorial-language.jpg"
};

function profileImage(profile) {
  return {
    url: profile.image?.url || profileImages[profile.id] || "/media/editorial/editorial-language.jpg",
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
