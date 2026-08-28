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
    role: "Publisher & Product Owner",
    slug: "zubayr-charles",
    shortBio: "Sets the publication vision, commissions new work, and guides each URBAN ANARCHY edition.",
    socialLinks: [
      { label: "Editorial enquiries", url: "/contact" },
      { label: "Read Visceral Mag", url: "/visceral-mag" }
    ]
  },
  {
    id: "zoe-petersen",
    type: "creative_team",
    name: "Zoe Petersen",
    role: "Web Developer",
    slug: "zoe-petersen",
    shortBio: "Builds the reading experience, editorial tools, accessibility systems, and production release.",
    socialLinks: [
      { label: "Project overview", url: "/about" },
      { label: "Technical enquiries", url: "/contact" }
    ]
  },
  {
    id: "naledi-maseko",
    type: "creative_team",
    name: "Naledi Maseko",
    role: "Managing Editor",
    slug: "naledi-maseko",
    shortBio: "Shapes the editorial calendar and works with writers from first pitch through final publication.",
    socialLinks: [
      { label: "Latest essays", url: "/search?category=essays" },
      { label: "Pitch the editors", url: "/contact" }
    ]
  },
  {
    id: "ayesha-daniels",
    type: "creative_team",
    name: "Ayesha Daniels",
    role: "Visual Editor",
    slug: "ayesha-daniels",
    shortBio: "Commissions photography and artwork that gives each story a distinct visual language.",
    socialLinks: [
      { label: "Featured media", url: "/featured" },
      { label: "Submit visual work", url: "/contact" }
    ]
  },
  {
    id: "visceral-contributor",
    type: "contributor",
    name: "Lerato Mokoena",
    role: "Culture Essayist",
    slug: "visceral-contributor",
    shortBio: "Writes intimate cultural essays about hospitality, daily rituals, and the changing shape of community.",
    socialLinks: [
      { label: "Read latest essay", url: "/visceral-mag/send-a-text-before-you-knock" },
      { label: "Contributor enquiries", url: "/contact" }
    ]
  },
  {
    id: "sihle-ndlovu",
    type: "contributor",
    name: "Sihle Ndlovu",
    role: "Theatre Critic",
    slug: "sihle-ndlovu",
    shortBio: "Covers rehearsal processes, performance, and the designers building South African stages.",
    socialLinks: [
      { label: "Theatre reviews", url: "/search?category=reviews&topic=theatre" },
      { label: "Pitch a performance", url: "/contact" }
    ]
  },
  {
    id: "mia-van-wyk",
    type: "contributor",
    name: "Mia van Wyk",
    role: "Books Editor",
    slug: "mia-van-wyk",
    shortBio: "Reviews fiction and criticism with particular attention to translation and multilingual craft.",
    socialLinks: [
      { label: "Book reviews", url: "/search?category=reviews&topic=books" },
      { label: "Recommend a book", url: "/contact" }
    ]
  },
  {
    id: "thando-jacobs",
    type: "contributor",
    name: "Thando Jacobs",
    role: "Essayist & Interviewer",
    slug: "thando-jacobs",
    shortBio: "Writes about belonging, language, and the creative communities making culture across the Cape.",
    socialLinks: [
      { label: "Read essays", url: "/search?category=essays" },
      { label: "Contributor profile", url: "/contributors" }
    ]
  }
];

const mediaItems = [
  {
    id: "editorial-theatre",
    title: "The Rehearsal Room",
    type: "image",
    url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    altText: "A South African theatre ensemble rehearsing on a black-box stage",
    caption: "A new generation finding its voice in rehearsal.",
    credit: "URBAN ANARCHY / ImageGen"
  },
  {
    id: "editorial-books",
    title: "Between Languages",
    type: "image",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    altText: "A reader turning a page at a book-lined wooden table",
    caption: "Reading, translation, and the material life of books.",
    credit: "URBAN ANARCHY / ImageGen"
  },
  {
    id: "editorial-belonging",
    title: "On Belonging",
    type: "image",
    url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=85",
    altText: "Neighbors talking in a colorful Cape Town residential street",
    caption: "Community, memory, and everyday ideas of home.",
    credit: "URBAN ANARCHY / ImageGen"
  },
  {
    id: "editorial-language",
    title: "The Language Workshop",
    type: "image",
    url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    altText: "A diverse writing group discussing pages around a table",
    caption: "Multilingual cultural work built through conversation.",
    credit: "URBAN ANARCHY / ImageGen"
  },
  {
    id: "editorial-stagecraft",
    title: "Stagecraft and Storytelling",
    type: "image",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
    altText: "A theatre designer adjusting a miniature stage model in a workshop",
    caption: "The craft and material imagination behind a performance.",
    credit: "URBAN ANARCHY / ImageGen"
  }
];

const mediaById = Object.fromEntries(mediaItems.map((item) => [item.id, item]));

const articles = [
  {
    id: "send-a-text-before-you-knock",
    title: "Send A Text Before You Knock",
    slug: "send-a-text-before-you-knock",
    dek: "On privacy, hospitality, and why arriving at someone's door now begins with a message.",
    status: "published",
    categoryId: "essays",
    authorProfileId: "visceral-contributor",
    publishedAt: "2026-07-01",
    featuredImage: mediaById["editorial-belonging"],
    bodyBlocks: ["A knock at the door used to be ordinary. Now it can feel like a small interruption in a life coordinated by messages.", "This essay considers privacy, hospitality, and the changing rituals around arriving in someone else's space."],
    seo: {
      title: "Send A Text Before You Knock | URBAN ANARCHY",
      description: "An essay on privacy, hospitality, and the changing rituals of arrival.",
      ogTitle: "Send A Text Before You Knock",
      ogDescription: "Privacy, hospitality, and the changing rituals of arrival."
    }
  },
  {
    id: "baxter-new-voices-review",
    title: "Review: New Voices at the Baxter",
    slug: "baxter-new-voices-review",
    dek: "A draft review of an emerging theatre programme balancing formal ambition with raw new voices.",
    status: "draft",
    categoryId: "reviews",
    authorProfileId: "visceral-contributor",
    publishedAt: null,
    featuredImage: mediaById["editorial-theatre"],
    bodyBlocks: ["The programme puts emerging directors beside established makers and lets their differences remain visible.", "This draft considers where the evening finds a shared theatrical language and where it productively resists one."],
    seo: {
      title: "Review: New Voices at the Baxter | URBAN ANARCHY",
      description: "A draft review of the New Voices theatre programme at the Baxter.",
      ogTitle: "Review: New Voices at the Baxter",
      ogDescription: "Emerging theatre-makers test a shared stage language."
    }
  },
  {
    id: "inside-the-rehearsal-room",
    title: "Inside the Rehearsal Room",
    slug: "inside-the-rehearsal-room",
    dek: "Five theatre-makers talk about trust, process, and the difficult work of building an ensemble.",
    status: "published",
    categoryId: "interviews",
    authorProfileId: "sihle-ndlovu",
    publishedAt: "2026-07-02",
    featuredImage: mediaById["editorial-language"],
    bodyBlocks: ["A rehearsal room is built from attention before it is built from scenery.", "These theatre-makers describe the rituals, disagreements, and shared language behind an ensemble."],
    seo: {
      title: "Inside the Rehearsal Room | URBAN ANARCHY",
      description: "A conversation with South African theatre-makers.",
      ogTitle: "Inside the Rehearsal Room",
      ogDescription: "A conversation from the rehearsal room."
    }
  },
  {
    id: "afrikaans-theatre-revival",
    title: "The Revival of Afrikaans Theatre",
    slug: "afrikaans-theatre-revival",
    dek: "A new generation of playwrights is reimagining traditional narratives for contemporary South African stages.",
    status: "published",
    categoryId: "reviews",
    authorProfileId: "sihle-ndlovu",
    publishedAt: "2026-06-28",
    featuredImage: mediaById["editorial-theatre"],
    bodyBlocks: ["Young theatre-makers are bringing fresh perspectives to familiar forms.", "Their work joins tradition and experimentation without treating either as decoration."],
    seo: { title: "The Revival of Afrikaans Theatre | URBAN ANARCHY", description: "A look at a new generation on South African stages.", ogTitle: "The Revival of Afrikaans Theatre", ogDescription: "A new generation takes the stage." }
  },
  {
    id: "between-languages",
    title: "Between Languages: The Craft of a South African Novel",
    slug: "between-languages",
    dek: "On literary craftsmanship, translation, and the playful possibilities of language.",
    status: "published",
    categoryId: "reviews",
    authorProfileId: "mia-van-wyk",
    publishedAt: "2026-06-24",
    featuredImage: mediaById["editorial-books"],
    bodyBlocks: ["Language shapes both the rhythm and the reach of a novel.", "Reading between languages can reveal what a single vocabulary leaves unsaid."],
    seo: { title: "Between Languages | URBAN ANARCHY", description: "Literary craft across South African languages.", ogTitle: "Between Languages", ogDescription: "The playful possibilities of language." }
  },
  {
    id: "on-belonging",
    title: "On Belonging: Reflections from the Cape Flats",
    slug: "on-belonging",
    dek: "A personal essay about identity, community, memory, and the meaning of home.",
    status: "published",
    categoryId: "essays",
    authorProfileId: "thando-jacobs",
    publishedAt: "2026-06-20",
    featuredImage: mediaById["editorial-belonging"],
    bodyBlocks: ["Belonging is personal, communal, and political.", "The stories of home carry contradiction as honestly as they carry affection."],
    seo: { title: "On Belonging | URBAN ANARCHY", description: "Reflections from the Cape Flats.", ogTitle: "On Belonging", ogDescription: "Identity, community, and home." }
  },
  {
    id: "why-multilingualism-matters",
    title: "Why Multilingualism Matters",
    slug: "why-multilingualism-matters",
    dek: "An argument for cultural spaces that reflect the languages South Africans actually live in.",
    status: "published",
    categoryId: "essays",
    authorProfileId: "thando-jacobs",
    publishedAt: "2026-06-16",
    featuredImage: mediaById["editorial-language"],
    bodyBlocks: ["Multilingualism is a creative resource, not a problem to solve.", "Our cultural institutions should make room for the full texture of public language."],
    seo: { title: "Why Multilingualism Matters | URBAN ANARCHY", description: "A case for multilingual cultural spaces.", ogTitle: "Why Multilingualism Matters", ogDescription: "Language as a cultural resource." }
  },
  {
    id: "stagecraft-and-storytelling",
    title: "Stagecraft and Storytelling",
    slug: "stagecraft-and-storytelling",
    dek: "How set design shapes the emotional and physical world of a performance.",
    status: "published",
    categoryId: "reviews",
    authorProfileId: "sihle-ndlovu",
    publishedAt: "2026-06-12",
    featuredImage: mediaById["editorial-stagecraft"],
    bodyBlocks: ["A set is never only a backdrop.", "The best stagecraft reveals meaning through space, material, light, and movement."],
    seo: { title: "Stagecraft and Storytelling | URBAN ANARCHY", description: "The art of local set design.", ogTitle: "Stagecraft and Storytelling", ogDescription: "How design transforms performance." }
  }
];

const comments = [
  { id: "comment-1", articleId: "send-a-text-before-you-knock", name: "Reader", body: "The shift from unannounced visits to carefully timed messages feels small, but it says so much about how our ideas of privacy have changed.", status: "pending" },
  { id: "comment-2", articleId: "send-a-text-before-you-knock", name: "Editor", body: "I recognised my own family in this essay. We still welcome anyone at the door, but everyone sends a message first.", status: "approved" }
];

const reviews = [
  { id: "review-1", articleId: "send-a-text-before-you-knock", name: "Reviewer", rating: 4, body: "A warm, precise essay that turns an ordinary social habit into a larger reflection on care and boundaries.", status: "approved" },
  { id: "review-2", articleId: "send-a-text-before-you-knock", name: "Reviewer", rating: 2, body: "This response was held for moderation because it did not address the published work.", status: "rejected" }
];

const contactSubmissions = [
  { id: "submission-1", name: "Karabo Dlamini", email: "karabo@example.com", subject: "General inquiry", message: "Could you share the submission window for the next essays edition?", status: "new" },
  { id: "submission-2", name: "Reece Adams", email: "reece@example.com", subject: "Submission", message: "I would like to pitch a photo essay on independent bookshops in Cape Town.", status: "archived" }
];

const fashionCategories = [
  { id: "style", label: "Style Codes", slug: "style", description: "The silhouettes, subcultures, and self-made uniforms of the city." },
  { id: "art", label: "Art & Image", slug: "art", description: "Visual artists, graphic language, and work that demands a second look." },
  { id: "sound", label: "Sound", slug: "sound", description: "The DJs, collectives, and rooms that keep the night in motion." },
  { id: "objects", label: "Objects", slug: "objects", description: "Independent labels, limited editions, and things made with intent." }
];

const fashionMedia = [
  { id: "night-uniform", title: "Drop 01: Night Uniform", type: "image", url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=85", altText: "Streetwear model in a high-contrast black outfit", caption: "A hard cut for the city after dark.", credit: "URBAN ANARCHY / Unsplash" },
  { id: "street-poster", title: "Capsule Image Board", type: "image", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85", altText: "Fashion model wearing bold streetwear in an urban setting", caption: "The campaign starts with the silhouette.", credit: "URBAN ANARCHY / Unsplash" },
  { id: "studio-notes", title: "Heavyweight Details", type: "image", url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1600&q=85", altText: "Fashion portrait showing layered heavyweight clothing", caption: "Built heavy. Cut clean. Worn hard.", credit: "URBAN ANARCHY / Unsplash" },
  { id: "cape-cut", title: "Raw Hem Archive", type: "image", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85", altText: "Urban fashion rack with contemporary clothing", caption: "Limited pieces with a life after the drop.", credit: "URBAN ANARCHY / Unsplash" }
];

const fashionArticles = [
  { id: "the-new-uniform", title: "Heavyweight Shell_01", slug: "the-new-uniform", dek: "400GSM fleece. Oversized boxy cut. Built to take the concrete grid.", status: "published", categoryId: "style", authorProfileId: "visceral-contributor", publishedAt: "2026-08-25", featuredImage: fashionMedia[0], bodyBlocks: ["Style is a language built in public.", "The new uniform is layered, local, and impossible to separate from the person wearing it."] },
  { id: "walls-talk-back", title: "Riot Cargo_X", slug: "walls-talk-back", dek: "Ripstop cargo system with hard hardware and raw street utility.", status: "published", categoryId: "art", authorProfileId: "thando-jacobs", publishedAt: "2026-08-21", featuredImage: fashionMedia[1], bodyBlocks: ["The city is never neutral. Its walls remember everything.", "Artists are using paint, paste, projection, and protest to keep the conversation visible."] },
  { id: "frequency-after-midnight", title: "Choke Chain_03", slug: "frequency-after-midnight", dek: "Cold steel accessory cut from the Urban Anarchy archive.", status: "published", categoryId: "sound", authorProfileId: "sihle-ndlovu", publishedAt: "2026-08-17", featuredImage: fashionMedia[2], bodyBlocks: ["The night has its own editorial calendar.", "Every set, fit, and flyer is part of a living archive."] },
  { id: "made-to-circulate", title: "Graphic Tee_04", slug: "made-to-circulate", dek: "Raw hem cotton graphic from the Drop 01 capsule collection.", status: "published", categoryId: "objects", authorProfileId: "mia-van-wyk", publishedAt: "2026-08-12", featuredImage: fashionMedia[3], bodyBlocks: ["The best objects carry fingerprints.", "These small-run labels are treating every release like a statement of intent."] },
  { id: "the-print-is-the-point", title: "The Print Is the Point", slug: "the-print-is-the-point", dek: "From hand-drawn flyers to limited tees, graphic design is carrying the message.", status: "published", categoryId: "art", authorProfileId: "thando-jacobs", publishedAt: "2026-08-08", featuredImage: fashionMedia[1], bodyBlocks: ["A good print does not decorate the idea. It is the idea.", "We look at the graphic makers building posters, zines, and objects that travel hand to hand."] },
  { id: "fit-check-the-archive", title: "Fit Check: The Archive", slug: "fit-check-the-archive", dek: "Three collectors on clothing, memory, and the pieces that outlive the hype.", status: "published", categoryId: "style", authorProfileId: "visceral-contributor", publishedAt: "2026-08-04", featuredImage: fashionMedia[0], bodyBlocks: ["Every jacket has a previous life.", "For these collectors, the archive is not nostalgia. It is a toolkit for making the next look feel personal."] }
];

export {
  fashionCategories as categories,
  profiles,
  fashionMedia as mediaItems,
  fashionArticles as articles,
  comments,
  reviews,
  contactSubmissions
};
