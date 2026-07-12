import { getRouteByPath } from "../routes.js";

const contributorFilters = [
  { slug: "theatre", label: "Theatre" },
  { slug: "books", label: "Books" },
  { slug: "essays", label: "Essays" }
];

function getCategory(fixtures, categoryId) {
  return fixtures.categories.find((category) => category.id === categoryId || category.slug === categoryId) || {
    label: categoryId,
    slug: categoryId
  };
}

const contributorImages = {
  "visceral-contributor": "/media/editorial/editorial-belonging.jpg",
  "sihle-ndlovu": "/media/editorial/editorial-theatre.jpg",
  "mia-van-wyk": "/media/editorial/editorial-books.jpg",
  "thando-jacobs": "/media/editorial/editorial-language.jpg"
};

function contributorCard(fixtures, profile) {
  const works = getPublishedWorksForContributor(fixtures, profile.slug);

  return {
    id: profile.id,
    type: profile.type,
    name: profile.name,
    role: profile.role,
    slug: profile.slug,
    shortBio: profile.shortBio,
    socialLinks: Array.isArray(profile.socialLinks) ? profile.socialLinks : [],
    image: {
      url: contributorImages[profile.id] || "/media/editorial/editorial-language.jpg",
      altText: `Writing workshop representing ${profile.name}'s contribution`
    },
    publishedWorks: works
  };
}

export function getContributorProfiles(fixtures) {
  return fixtures.profiles
    .filter((profile) => profile.type === "contributor")
    .map((profile) => contributorCard(fixtures, profile));
}

export function getPublishedWorksForContributor(fixtures, contributorSlug) {
  const contributor = fixtures.profiles.find((profile) => profile.slug === contributorSlug || profile.id === contributorSlug);

  if (!contributor) {
    return [];
  }

  return fixtures.articles
    .filter((article) => article.status === "published" && article.authorProfileId === contributor.id)
    .map((article) => {
      const category = getCategory(fixtures, article.categoryId);

      return {
        id: article.id,
        title: article.title,
        slug: article.slug,
        dek: article.dek,
        status: article.status,
        publishedAt: article.publishedAt,
        href: `/visceral-mag/${article.slug}`,
        category: {
          id: article.categoryId,
          label: category.label,
          slug: category.slug
        },
        author: {
          id: contributor.id,
          name: contributor.name,
          slug: contributor.slug
        }
      };
    });
}

export function buildContributorsRouteModel(fixtures) {
  const route = getRouteByPath("/contributors");
  const contributors = getContributorProfiles(fixtures);
  const contributorIds = new Set(contributors.map((profile) => profile.id));
  const publishedWorks = fixtures.articles
    .filter((article) => article.status === "published" && contributorIds.has(article.authorProfileId))
    .map((article) => {
      const category = getCategory(fixtures, article.categoryId);
      const author = contributors.find((profile) => profile.id === article.authorProfileId);

      return {
        id: article.id,
        title: article.title,
        slug: article.slug,
        status: article.status,
        publishedAt: article.publishedAt,
        href: `/visceral-mag/${article.slug}`,
        category: {
          id: article.categoryId,
          label: category.label,
          slug: category.slug
        },
        author: {
          id: author ? author.id : article.authorProfileId,
          name: author ? author.name : "Contributor",
          slug: author ? author.slug : "contributor"
        }
      };
    });

  return {
    pageId: "contributors",
    generatedFrom: "contributors-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    hero: {
      eyebrow: "Contributors",
      title: "Writers, reviewers, essayists, and cultural voices.",
      dek: "Meet the writers and critics bringing lived experience, close reading, and independent perspective to every edition."
    },
    tools: {
      search: {
        id: "contributor-search",
        name: "q",
        type: "search",
        label: "Search contributors",
        placeholder: "Search contributors"
      },
      filters: contributorFilters.map((filter) => ({ ...filter, pressed: false }))
    },
    sections: {
      contributorsGrid: contributors.length > 0 ? {
        state: "ready",
        heading: "Contributor Profiles",
        items: contributors
      } : {
        state: "no-results",
        heading: "No contributors match this view",
        body: "Clear the search or reset filters to browse all public contributor profiles.",
        resetHref: "/contributors",
        items: []
      },
      publishedWorks: {
        heading: "Published Works",
        items: publishedWorks
      },
      states: {
        notes: ["contributors-loading", "contributors-error"],
        items: ["loading", "no-results", "reset-filter", "error"]
      }
    }
  };
}
