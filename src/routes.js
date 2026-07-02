const publicRoutes = [
  {
    id: "home",
    label: "Home",
    path: "/",
    area: "public",
    purpose: "Introduce the magazine and route readers to lead stories, latest articles, categories, media, and people.",
    file: "src/pages/home.html"
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    area: "public",
    purpose: "Explain mission, vision, and organizational overview.",
    file: "src/pages/about.html"
  },
  {
    id: "creative-team",
    label: "Creative Team",
    path: "/creative-team",
    area: "public",
    purpose: "Show the core team with roles, bios, images, and social links.",
    file: "src/pages/creative-team.html"
  },
  {
    id: "contributors",
    label: "Contributors",
    path: "/contributors",
    area: "public",
    purpose: "Show contributor profiles and connect readers to published works.",
    file: "src/pages/contributors.html"
  },
  {
    id: "visceral-mag",
    label: "Visceral Mag / Articles",
    path: "/visceral-mag",
    area: "public",
    purpose: "Provide the main article archive, category entry points, and latest editorial content.",
    file: "src/pages/visceral-mag.html"
  },
  {
    id: "article-detail",
    label: "Article Detail",
    path: "/visceral-mag/send-a-text-before-you-knock",
    area: "public",
    purpose: "Provide a focused reading page with metadata, rich content, related articles, comments, and reviews.",
    file: "src/pages/article-detail.html"
  },
  {
    id: "categories-search",
    label: "Categories / Search",
    path: "/search",
    area: "public",
    purpose: "Help readers browse by category and search by keyword.",
    file: "src/pages/categories-search.html"
  },
  {
    id: "featured-media",
    label: "Featured / Media",
    path: "/featured",
    area: "public",
    purpose: "Show photography, artwork, media stories, captions, credits, and alt text.",
    file: "src/pages/featured-media.html"
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    area: "public",
    purpose: "Capture reader, contributor, and business inquiries.",
    file: "src/pages/contact.html"
  }
];

const adminRoutes = [
  {
    id: "admin-dashboard",
    label: "Admin Dashboard",
    path: "/admin",
    area: "admin",
    purpose: "Show publishing health, pending work, recent activity, and fast actions.",
    file: "src/pages/admin/dashboard.html"
  },
  {
    id: "article-management",
    label: "Article Management",
    path: "/admin/articles",
    area: "admin",
    purpose: "Create, edit, draft, publish, delete, and manage SEO for articles.",
    file: "src/pages/admin/article-management.html"
  },
  {
    id: "profile-media-management",
    label: "Profile / Media Management",
    path: "/admin/profiles-media",
    area: "admin",
    purpose: "Manage contributors, creative team profiles, and media library metadata.",
    file: "src/pages/admin/profile-media-management.html"
  },
  {
    id: "comments-reviews-moderation",
    label: "Comments / Reviews Moderation",
    path: "/admin/moderation",
    area: "admin",
    purpose: "Approve, reject, delete, search, and filter comments and reviews.",
    file: "src/pages/admin/comments-reviews-moderation.html"
  },
  {
    id: "contact-submissions",
    label: "Contact Submissions",
    path: "/admin/contact-submissions",
    area: "admin",
    purpose: "Review and manage contact form submissions.",
    file: "src/pages/admin/contact-submissions.html"
  }
];

const allRoutes = [...publicRoutes, ...adminRoutes];

module.exports = {
  publicRoutes,
  adminRoutes,
  allRoutes
};
