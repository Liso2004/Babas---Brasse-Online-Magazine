const categories = [
  { id: "essays", label: "Essays", slug: "essays", description: "Personal and cultural essays." },
  { id: "reviews", label: "Reviews", slug: "reviews", description: "Books, culture, and media reviews." },
  { id: "interviews", label: "Interviews", slug: "interviews", description: "Conversations with artists and cultural voices." },
  { id: "artwork", label: "Artwork", slug: "artwork", description: "Photography, visual art, and media features." }
];

const profiles = [
  {
    id: "zubayr-charles",
    type: "creative_team",
    name: "Zubayr Charles",
    role: "Client / Product Owner",
    slug: "zubayr-charles",
    shortBio: "Approves scope, content direction, and launch readiness.",
    socialLinks: []
  },
  {
    id: "zoe-petersen",
    type: "creative_team",
    name: "Zoe Petersen",
    role: "Developer",
    slug: "zoe-petersen",
    shortBio: "Leads implementation, deployment, and technical decisions.",
    socialLinks: []
  },
  {
    id: "visceral-contributor",
    type: "contributor",
    name: "Visceral Contributor",
    role: "Writer",
    slug: "visceral-contributor",
    shortBio: "Launch contributor placeholder for editorial articles.",
    socialLinks: []
  }
];

const mediaItems = [
  {
    id: "opening-banner",
    title: "Opening Banner Placeholder",
    type: "image",
    url: "/media/opening-banner-placeholder.jpg",
    altText: "Babas and Brasse opening banner placeholder",
    caption: "Hero banner slot for the graphic designer asset.",
    credit: "Client / Designer"
  },
  {
    id: "photography-feature",
    title: "Photography Feature Placeholder",
    type: "image",
    url: "/media/photography-feature-placeholder.jpg",
    altText: "Editorial photography feature placeholder",
    caption: "Featured photography slot.",
    credit: "Contributor"
  },
  {
    id: "artwork-feature",
    title: "Artwork Feature Placeholder",
    type: "image",
    url: "/media/artwork-feature-placeholder.jpg",
    altText: "Artwork feature placeholder",
    caption: "Featured artwork slot.",
    credit: "Contributor"
  }
];

const articles = [
  {
    id: "send-a-text-before-you-knock",
    title: "Send A Text Before You Knock",
    slug: "send-a-text-before-you-knock",
    dek: "Launch sample article for proving the editorial reading flow.",
    status: "published",
    categoryId: "essays",
    authorProfileId: "visceral-contributor",
    publishedAt: "2026-07-01",
    featuredImage: mediaItems[0],
    bodyBlocks: ["Opening paragraph placeholder.", "Body paragraph placeholder."],
    seo: {
      title: "Send A Text Before You Knock | Babas & Brasse",
      description: "A launch sample article for the Babas & Brasse online magazine MVP.",
      ogTitle: "Send A Text Before You Knock",
      ogDescription: "Read the launch sample article on Babas & Brasse."
    }
  },
  {
    id: "culture-review-placeholder",
    title: "Culture Review Placeholder",
    slug: "culture-review-placeholder",
    dek: "Draft review placeholder for admin workflow testing.",
    status: "draft",
    categoryId: "reviews",
    authorProfileId: "visceral-contributor",
    publishedAt: null,
    featuredImage: mediaItems[1],
    bodyBlocks: ["Draft review body placeholder."],
    seo: {
      title: "Culture Review Placeholder | Babas & Brasse",
      description: "Draft review placeholder for MVP testing.",
      ogTitle: "Culture Review Placeholder",
      ogDescription: "Draft review placeholder."
    }
  },
  {
    id: "artist-interview-placeholder",
    title: "Artist Interview Placeholder",
    slug: "artist-interview-placeholder",
    dek: "Interview placeholder for category and profile linking tests.",
    status: "published",
    categoryId: "interviews",
    authorProfileId: "visceral-contributor",
    publishedAt: "2026-07-02",
    featuredImage: mediaItems[2],
    bodyBlocks: ["Interview body placeholder."],
    seo: {
      title: "Artist Interview Placeholder | Babas & Brasse",
      description: "Interview placeholder for the Babas & Brasse MVP.",
      ogTitle: "Artist Interview Placeholder",
      ogDescription: "Interview placeholder."
    }
  }
];

const comments = [
  { id: "comment-1", articleId: "send-a-text-before-you-knock", name: "Reader", body: "Pending comment placeholder.", status: "pending" },
  { id: "comment-2", articleId: "send-a-text-before-you-knock", name: "Editor", body: "Approved comment placeholder.", status: "approved" }
];

const reviews = [
  { id: "review-1", articleId: "send-a-text-before-you-knock", name: "Reviewer", rating: 4, body: "Approved review placeholder.", status: "approved" },
  { id: "review-2", articleId: "send-a-text-before-you-knock", name: "Reviewer", rating: 2, body: "Rejected review placeholder.", status: "rejected" }
];

const contactSubmissions = [
  { id: "submission-1", name: "Reader", email: "reader@example.com", subject: "General inquiry", message: "Contact placeholder.", status: "new" },
  { id: "submission-2", name: "Contributor", email: "contributor@example.com", subject: "Submission", message: "Contribution placeholder.", status: "archived" }
];

module.exports = {
  categories,
  profiles,
  mediaItems,
  articles,
  comments,
  reviews,
  contactSubmissions
};
