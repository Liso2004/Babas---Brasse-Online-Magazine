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
    { label: "Style Codes", href: "/search?category=style" },
    { label: "Art & Image", href: "/search?category=art" },
    { label: "Sound", href: "/search?category=sound" },
    { label: "Objects", href: "/search?category=objects" }
  ];
}

function buildCarouselSlides() {
  return [
    {
      id: "cape-collage",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1800&q=85",
      alt: "Streetwear model in a city fashion editorial",
      eyebrow: "KASI SUPPLY CO. / DROP 01",
      title: "Fashion is a public language.",
      description: "Style, art, sound, and the people turning city life into a visual statement.",
      href: "/visceral-mag",
      cta: "Read the magazine"
    },
    {
      id: "stage-collage",
      image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=85",
      alt: "Fashion editorial with models in an urban location",
      eyebrow: "CAPSULE / ART DIRECTION",
      title: "Art refuses the inside voice.",
      description: "Enter the studios, walls, and makeshift galleries where new image language is built.",
      href: "/search?category=art",
      cta: "Explore art"
    },
    {
      id: "city-collage",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=85",
      alt: "Contemporary streetwear outfit in a city street",
      eyebrow: "ARCHIVE / 021",
      title: "Made for the city after dark.",
      description: "A visual dispatch from the artists, DJs, designers, and makers shaping the present tense.",
      href: "/featured",
      cta: "View featured media"
    }
  ];
}

function buildFeaturedMedia(fixtures, articles) {
  const heights = [640, 500, 720, 560, 680];
  return fixtures.mediaItems.map((item, index) => {
    const article = articles.find((candidate) => candidate.featuredImage?.id === item.id);
    return {
      id: item.id,
      title: item.title,
      category: item.type === "video" ? "Video" : "Visual story",
      thumbnail: item.url,
      alt: item.altText,
      description: item.caption,
      publishedAt: article?.publishedAt || "2026-07-14",
      href: article ? "/visceral-mag/" + article.slug : "/featured",
      label: article ? "Article" : "Media",
      height: heights[index % heights.length]
    };
  });
}
function buildMoreFromMagazine(fixtures, articles) {
  if (articles.length >= 3) {
    return { heading: "More from KASI SUPPLY CO.", items: articles.slice(0, 4) };
  }

  return {
    heading: "More from KASI SUPPLY CO.",
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
      eyebrow: "KASI SUPPLY CO. Online Magazine",
      title: "Fashion. Art. Culture. No soft edges.",
      dek: "KASI SUPPLY CO. is a brutalist field guide to the people and images moving the city."
    },
    sections: {
      leadStory,
      featuredArticle: leadStory,
      carouselSlides: buildCarouselSlides(),
      featuredMedia: buildFeaturedMedia(fixtures, articles),
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
