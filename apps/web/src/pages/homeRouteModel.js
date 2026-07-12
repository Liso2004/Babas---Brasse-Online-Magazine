import { getRouteByPath } from "../routes.js";

function publishedArticles(fixtures) {
  return fixtures.articles.filter((article) => article.status === "published");
}

function publicArticleSummary(article) {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    dek: article.dek,
    status: article.status,
    categoryId: article.categoryId,
    publishedAt: article.publishedAt,
    href: `/visceral-mag/${article.slug}`,
    featuredImage: article.featuredImage
  };
}

function buildSectionShortcuts() {
  return [
    { label: "Theatre Reviews", href: "/search?category=reviews&topic=theatre" },
    { label: "Book Reviews", href: "/search?category=reviews&topic=books" },
    { label: "Essays", href: "/search?category=essays" },
    { label: "Opinion", href: "/search?category=essays&topic=opinion" }
  ];
}

function buildMoreFromMagazine(fixtures, articles) {
  if (articles.length >= 3) {
    return { heading: "More from Babas & Brasse", items: articles.slice(0, 4) };
  }

  return {
    heading: "More from Babas & Brasse",
    items: [
      ...fixtures.categories.map((category) => ({
        id: `category-${category.id}`,
        label: category.label,
        title: category.description,
        href: `/search?category=${category.slug}`
      })),
      ...fixtures.mediaItems.map((item) => ({
        id: `media-${item.id}`,
        label: "Featured / Media",
        title: item.title,
        href: "/featured"
      }))
    ].slice(0, 6)
  };
}

export function buildHomeRouteModel(fixtures) {
  const route = getRouteByPath("/");
  const articles = publishedArticles(fixtures).map(publicArticleSummary);
  const leadStory = articles.find((article) => article.id === "send-a-text-before-you-knock") || articles[0] || null;
  const recentArticles = articles.filter((article) => article.id !== leadStory?.id).slice(0, 3);
  const recentIds = new Set(recentArticles.map((article) => article.id));
  const moreArticles = articles.filter((article) => article.id !== leadStory?.id && !recentIds.has(article.id));

  return {
    pageId: "home",
    generatedFrom: "home-route-model",
    designSource: "figma-author-website-design",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    hero: {
      eyebrow: "Babas & Brasse Online Magazine",
      title: "Culture, essays, reviews, interviews, photography, and artwork.",
      dek: "Launch-ready discovery hub for the July 31, 2026 MVP."
    },
    sections: {
      leadStory,
      featuredArticle: leadStory,
      recentArticles,
      latestArticles: articles.slice(0, 3),
      sectionShortcuts: buildSectionShortcuts(),
      categoryAccess: fixtures.categories.map((category) => ({
        id: category.id,
        label: category.label,
        slug: category.slug,
        href: `/search?category=${category.slug}`
      })),
      mediaPreview: fixtures.mediaItems.slice(0, 3).map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        altText: item.altText,
        caption: item.caption,
        credit: item.credit
      })),
      peoplePreview: fixtures.profiles.slice(0, 4).map((profile) => ({
        id: profile.id,
        name: profile.name,
        role: profile.role,
        type: profile.type,
        slug: profile.slug
      })),
      moreFromMagazine: buildMoreFromMagazine(fixtures, moreArticles)
    },
    newsletter: {
      id: "newsletter",
      action: "/subscribe",
      states: ["newsletter-invalid", "newsletter-success"]
    }
  };
}
