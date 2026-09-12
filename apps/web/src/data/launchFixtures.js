import { moodboardItems } from "./moodboardItems.js";

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
    name: "Mara Voss",
    role: "Publisher & Product",
    slug: "mara-voss",
    shortBio: "Sets the publication line, commissions difficult work, and keeps each URBAN ANARCHY issue moving through the concrete grid.",
    socialLinks: [
      { label: "Editorial enquiries", url: "/contact" },
      { label: "Read Visceral Mag", url: "/visceral-mag" }
    ]
  },
  {
    id: "zoe-petersen",
    type: "creative_team",
    name: "Liso Hlatshwayo",
    role: "Software Development / Web Development",
    slug: "liso-hlatshwayo",
    shortBio: "Builds the reading experience, editorial tools, accessibility systems, and production release.",
    socialLinks: [
      { label: "Project overview", url: "/about" },
      { label: "Technical enquiries", url: "/contact" }
    ]
  },
  {
    id: "naledi-maseko",
    type: "creative_team",
    name: "Iona Rift",
    role: "Magazine Editor",
    slug: "iona-rift",
    shortBio: "Shapes the editorial calendar and works with writers from first pitch through final publication.",
    socialLinks: [
      { label: "Latest essays", url: "/search?category=essays" },
      { label: "Pitch the editors", url: "/contact" }
    ]
  },
  {
    id: "ayesha-daniels",
    type: "creative_team",
    name: "Nyx Morrow",
    role: "Visual Editor",
    slug: "nyx-morrow",
    shortBio: "Commissions photography and artwork that gives each story a distinct visual language.",
    socialLinks: [
      { label: "Featured media", url: "/featured" },
      { label: "Submit visual work", url: "/contact" }
    ]
  },
  {
    id: "visceral-contributor",
    type: "contributor",
    name: "Amani Vex",
    role: "Culture Critic",
    slug: "amani-vex",
    shortBio: "Writes intimate cultural essays about hospitality, daily rituals, and the changing shape of community.",
    socialLinks: [
      { label: "Read latest essay", url: "/visceral-mag/send-a-text-before-you-knock" },
      { label: "Contributor enquiries", url: "/contact" }
    ]
  },
  {
    id: "sihle-ndlovu",
    type: "contributor",
    name: "Kaya Vance",
    role: "Documentary Photographer",
    slug: "kaya-vance",
    shortBio: "Covers rehearsal processes, performance, and the designers building South African stages.",
    socialLinks: [
      { label: "Theatre reviews", url: "/search?category=reviews&topic=theatre" },
      { label: "Pitch a performance", url: "/contact" }
    ]
  },
  {
    id: "mia-van-wyk",
    type: "contributor",
    name: "Daisuke Sato",
    role: "Design Researcher",
    slug: "daisuke-sato",
    shortBio: "Reviews fiction and criticism with particular attention to translation and multilingual craft.",
    socialLinks: [
      { label: "Book reviews", url: "/search?category=reviews&topic=books" },
      { label: "Recommend a book", url: "/contact" }
    ]
  },
  {
    id: "thando-jacobs",
    type: "contributor",
    name: "Nia Kade",
    role: "Street Culture Writer",
    slug: "nia-kade",
    shortBio: "Writes about belonging, language, and the creative communities making culture across the Cape.",
    socialLinks: [
      { label: "Read essays", url: "/search?category=essays" },
      { label: "Contributor profile", url: "/contributors" }
    ]
  },
  { id: "tariq-k", type: "contributor", name: "Tariq K.", role: "Music Editor", slug: "tariq-k", shortBio: "Maps pirate frequencies, basement systems, and the low-end cultures that move after midnight.", socialLinks: [{ label: "Sound archive", url: "/visceral-mag" }] },
  { id: "anna-shin", type: "contributor", name: "Anna Shin", role: "Fashion Contributor", slug: "anna-shin", shortBio: "Reports on fabric systems, silhouettes, and garments made for surveillance-heavy streets.", socialLinks: [{ label: "Style dispatches", url: "/search?category=style" }] },
  { id: "rook-adebayo", type: "contributor", name: "Rook Adebayo", role: "Film Essayist", slug: "rook-adebayo", shortBio: "Writes film criticism from projection booths, transit nodes, and the edge of the screen.", socialLinks: [{ label: "Film notes", url: "/visceral-mag" }] },
  { id: "ivo-morita", type: "contributor", name: "Ivo Morita", role: "Technology Correspondent", slug: "ivo-morita", shortBio: "Examines networked life, repair cultures, and the hardware politics behind the city signal.", socialLinks: [{ label: "Signal reports", url: "/visceral-mag" }] },
  { id: "sable-ord", type: "contributor", name: "Sable Ord", role: "Architecture Writer", slug: "sable-ord", shortBio: "Studies megastructures, informal additions, and the social weather of concrete.", socialLinks: [{ label: "Built environment", url: "/search?category=art" }] }
];

const mediaItems = [
  {
    id: "editorial-theatre",
    title: "The Rehearsal Room",
    type: "image",
    url: "/media/editorial/editorial-theatre.jpg",
    altText: "A South African theatre ensemble rehearsing on a black-box stage",
    caption: "A new generation finding its voice in rehearsal.",
    credit: "URBAN ANARCHY / ImageGen"
  },
  {
    id: "editorial-books",
    title: "Between Languages",
    type: "image",
    url: "/media/editorial/editorial-books.jpg",
    altText: "A reader turning a page at a book-lined wooden table",
    caption: "Reading, translation, and the material life of books.",
    credit: "URBAN ANARCHY / ImageGen"
  },
  {
    id: "editorial-belonging",
    title: "On Belonging",
    type: "image",
    url: "/media/editorial/editorial-belonging.jpg",
    altText: "Neighbors talking in a colorful Cape Town residential street",
    caption: "Community, memory, and everyday ideas of home.",
    credit: "URBAN ANARCHY / ImageGen"
  },
  {
    id: "editorial-language",
    title: "The Language Workshop",
    type: "image",
    url: "/media/editorial/editorial-language.jpg",
    altText: "A diverse writing group discussing pages around a table",
    caption: "Multilingual cultural work built through conversation.",
    credit: "URBAN ANARCHY / ImageGen"
  },
  {
    id: "editorial-stagecraft",
    title: "Stagecraft and Storytelling",
    type: "image",
    url: "/media/editorial/editorial-stagecraft.jpg",
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
  { id: "comment-2", articleId: "send-a-text-before-you-knock", name: "Editor", body: "I recognised my own family in this essay. We still welcome anyone at the door, but everyone sends a message first.", status: "approved" },
  { id: "comment-3", articleId: "made-to-circulate", name: "Nandi", body: "The print feels like something you would spot across a room and remember later. The restraint makes it work.", status: "approved" },
  { id: "comment-4", articleId: "the-new-uniform", name: "Kabelo", body: "The cut and the weight are exactly right for a piece that has to move through a real day.", status: "approved" },
  { id: "comment-5", articleId: "walls-talk-back", name: "Zee", body: "The connection between the wall and the garment is sharp. Both are carrying the same message.", status: "approved" },
  { id: "comment-6", articleId: "frequency-after-midnight", name: "Mpho", body: "A good reminder that an accessory can set the temperature of an entire look.", status: "approved" },
  { id: "comment-7", articleId: "the-print-is-the-point", name: "Lebo", body: "The hand-made references make this feel lived in rather than over-designed.", status: "approved" },
  { id: "comment-8", articleId: "fit-check-the-archive", name: "Ayanda", body: "The archive as a toolkit is the right idea. Personal style should keep moving.", status: "approved" }
];

const reviews = [
  { id: "review-1", articleId: "send-a-text-before-you-knock", name: "Reviewer", rating: 4, body: "A warm, precise essay that turns an ordinary social habit into a larger reflection on care and boundaries.", status: "approved" },
  { id: "review-2", articleId: "send-a-text-before-you-knock", name: "Reviewer", rating: 2, body: "This response was held for moderation because it did not address the published work.", status: "rejected" },
  { id: "review-3", articleId: "made-to-circulate", name: "Tumi", rating: 5, body: "A concise visual argument for letting the garment do the talking.", status: "approved" },
  { id: "review-4", articleId: "the-new-uniform", name: "Sam", rating: 4, body: "Strong notes on proportion, durability, and the quiet power of a good silhouette.", status: "approved" },
  { id: "review-5", articleId: "walls-talk-back", name: "Reviewer", rating: 4, body: "The article understands that utility can still have a point of view.", status: "approved" },
  { id: "review-6", articleId: "frequency-after-midnight", name: "Lungi", rating: 5, body: "Short, sharp, and properly nocturnal.", status: "approved" },
  { id: "review-7", articleId: "the-print-is-the-point", name: "Reviewer", rating: 4, body: "A clear case for graphic work that travels beyond the screen.", status: "approved" },
  { id: "review-8", articleId: "fit-check-the-archive", name: "Neo", rating: 5, body: "The archive feels useful again, not precious.", status: "approved" }
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
  { id: "night-uniform", archiveItemId: "ua-night-uniform", title: "Drop 01: Night Uniform", type: "image", url: "/media/moodboard/moodboard-collage-subject-a-pair.png", altText: "South African fashion moodboard with paired textile figures", caption: "A hard cut for the city after dark.", credit: "URBAN ANARCHY / Cape Town moodboard" },
  { id: "street-poster", archiveItemId: "ua-capsule-image-board", title: "Capsule Image Board", type: "image", url: "/media/moodboard/moodboard-collage-subject-a-high.png", altText: "South African fashion moodboard with a high-contrast street composition", caption: "The campaign starts with the silhouette.", credit: "URBAN ANARCHY / Cape Town moodboard" },
  { id: "studio-notes", archiveItemId: "ua-heavyweight-details", title: "Heavyweight Details", type: "image", url: "/media/moodboard/moodboard-collage-subject-close.png", altText: "Close South African editorial moodboard detail showing textile and form", caption: "Built heavy. Cut clean. Worn hard.", credit: "URBAN ANARCHY / Cape Town moodboard" },
  { id: "cape-cut", archiveItemId: "ua-raw-hem-archive", title: "Raw Hem Archive", type: "image", url: "/media/moodboard/moodboard-collage-subject-the.png", altText: "South African editorial moodboard showing a raw fashion composition", caption: "Limited pieces with a life after the drop.", credit: "URBAN ANARCHY / Cape Town moodboard" },
  { id: "signal-layer", archiveItemId: "ua-signal-layer", title: "Signal Layer", type: "image", url: "/media/moodboard/moodboard-collage-subject-1.png", altText: "South African street-fashion moodboard with layered graphic forms", caption: "Layered utility for a city in motion.", credit: "URBAN ANARCHY / Cape Town moodboard" },
  { id: "concrete-editorial", archiveItemId: "ua-concrete-editorial", title: "Concrete Editorial", type: "image", url: "/media/moodboard/moodboard-collage-subject-2.png", altText: "South African editorial moodboard with concrete textures and clothing", caption: "A sharper silhouette for the public square.", credit: "URBAN ANARCHY / Cape Town moodboard" }
];

const fashionArticles = [
  { id: "the-new-uniform", title: "Heavyweight Shell_01", slug: "the-new-uniform", dek: "400GSM fleece. Oversized boxy cut. Built to take the concrete grid.", status: "published", categoryId: "style", authorProfileId: "visceral-contributor", publishedAt: "2026-08-25", featuredImage: fashionMedia[0], bodyBlocks: ["Style is a language built in public.", "The new uniform is layered, local, and impossible to separate from the person wearing it."] },
  { id: "walls-talk-back", title: "Riot Cargo_X", slug: "walls-talk-back", dek: "Ripstop cargo system with hard hardware and raw street utility.", status: "published", categoryId: "art", authorProfileId: "thando-jacobs", publishedAt: "2026-08-21", featuredImage: fashionMedia[1], bodyBlocks: ["The city is never neutral. Its walls remember everything.", "Artists are using paint, paste, projection, and protest to keep the conversation visible."] },
  { id: "frequency-after-midnight", title: "Choke Chain_03", slug: "frequency-after-midnight", dek: "Cold steel accessory cut from the Urban Anarchy archive.", status: "published", categoryId: "sound", authorProfileId: "sihle-ndlovu", publishedAt: "2026-08-17", featuredImage: fashionMedia[2], bodyBlocks: ["The night has its own editorial calendar.", "Every set, fit, and flyer is part of a living archive."] },
  { id: "made-to-circulate", title: "Graphic Tee_04", slug: "made-to-circulate", dek: "Raw hem cotton graphic from the Drop 01 capsule collection.", status: "published", categoryId: "objects", authorProfileId: "mia-van-wyk", publishedAt: "2026-08-12", featuredImage: fashionMedia[3], bodyBlocks: ["The best objects carry fingerprints.", "These small-run labels are treating every release like a statement of intent."] },
  { id: "the-print-is-the-point", title: "The Print Is the Point", slug: "the-print-is-the-point", dek: "From hand-drawn flyers to limited tees, graphic design is carrying the message.", status: "published", categoryId: "art", authorProfileId: "thando-jacobs", publishedAt: "2026-08-08", featuredImage: fashionMedia[1], bodyBlocks: ["A good print does not decorate the idea. It is the idea.", "We look at the graphic makers building posters, zines, and objects that travel hand to hand."] },
  { id: "fit-check-the-archive", title: "Fit Check: The Archive", slug: "fit-check-the-archive", dek: "Three collectors on clothing, memory, and the pieces that outlive the hype.", status: "published", categoryId: "style", authorProfileId: "visceral-contributor", publishedAt: "2026-08-04", featuredImage: fashionMedia[0], bodyBlocks: ["Every jacket has a previous life.", "For these collectors, the archive is not nostalgia. It is a toolkit for making the next look feel personal."] }
  ,{ id: "signal-layer", title: "Signal Layer_05", slug: "signal-layer", dek: "A modular overshirt designed to move between late trains, studio floors, and the street.", status: "published", categoryId: "style", authorProfileId: "visceral-contributor", publishedAt: "2026-07-30", featuredImage: fashionMedia[4], bodyBlocks: ["The strongest layers are built for a day that refuses one setting.", "This look keeps its structure while letting the city change around it."] }
  ,{ id: "concrete-editorial", title: "Concrete Editorial_06", slug: "concrete-editorial", dek: "A visual study in hard lines, practical pockets, and the quiet force of a considered silhouette.", status: "published", categoryId: "art", authorProfileId: "thando-jacobs", publishedAt: "2026-07-25", featuredImage: fashionMedia[5], bodyBlocks: ["Concrete gives every outline a sharper edge.", "We follow the visual language of a look made for movement, weather, and attention."] }
];

const products = [
  { id: "drop-night-uniform", slug: "night-uniform", title: "Night Uniform", dek: "400GSM fleece. Oversized boxy cut. Built to take the concrete grid.", price: 999, availability: "sold-out", material: "400GSM heavyweight fleece", image: fashionMedia[0], relatedArticleIds: ["the-new-uniform", "fit-check-the-archive"] },
  { id: "drop-riot-cargo", slug: "riot-cargo", title: "Riot Cargo", dek: "Ripstop cargo system with hard hardware and raw street utility.", price: 1199, availability: "available", material: "Ripstop cotton / metal hardware", image: fashionMedia[1], relatedArticleIds: ["walls-talk-back", "the-print-is-the-point"] },
  { id: "drop-choke-chain", slug: "choke-chain", title: "Choke Chain", dek: "Cold steel accessory cut from the Urban Anarchy archive.", price: 649, availability: "available", material: "Stainless steel", image: fashionMedia[2], relatedArticleIds: ["frequency-after-midnight"] },
  { id: "drop-graphic-tee", slug: "graphic-tee", title: "Graphic Tee", dek: "Raw hem cotton graphic from the Drop 01 capsule collection.", price: 549, availability: "available", material: "Heavyweight cotton jersey", image: fashionMedia[3], relatedArticleIds: ["made-to-circulate"] },
  { id: "drop-signal-layer", slug: "signal-layer", title: "Signal Layer", dek: "A modular overshirt designed for late trains, studio floors, and the street.", price: 899, availability: "available", material: "Layered technical cotton", image: fashionMedia[4], relatedArticleIds: ["signal-layer"] },
  { id: "drop-concrete-editorial", slug: "concrete-editorial", title: "Concrete Editorial", dek: "A visual study in hard lines, practical pockets, and considered silhouette.", price: 799, availability: "available", material: "Structured cotton canvas", image: fashionMedia[5], relatedArticleIds: ["concrete-editorial"] }
];
const articleRelations = {
  "the-new-uniform": { tags: ["uniform", "streetwear", "material"], moodboardItemIds: ["ua-night-uniform", "ua-heavyweight-details", "dune-outfit"], relatedArticleIds: ["fit-check-the-archive", "signal-layer"] },
  "walls-talk-back": { tags: ["street-art", "cargo", "public-space"], moodboardItemIds: ["ua-capsule-image-board", "cape-town-arts-editorial", "punk-outfit"], relatedArticleIds: ["the-print-is-the-point", "concrete-editorial"] },
  "frequency-after-midnight": { tags: ["sound", "nightlife", "accessory"], moodboardItemIds: ["ua-heavyweight-details", "cyberpunk-outfit", "matrix-outfit-01"], relatedArticleIds: ["signal-layer", "the-new-uniform"] },
  "made-to-circulate": { tags: ["objects", "print", "small-run"], moodboardItemIds: ["ua-raw-hem-archive", "punk-outfit", "cape-town-arts-editorial"], relatedArticleIds: ["the-print-is-the-point", "walls-talk-back"] },
  "the-print-is-the-point": { tags: ["print", "graphic-language", "streetwear"], moodboardItemIds: ["punk-outfit", "ua-capsule-image-board", "cape-town-arts-editorial"], relatedArticleIds: ["walls-talk-back", "made-to-circulate"] },
  "fit-check-the-archive": { tags: ["archive", "style", "uniform"], moodboardItemIds: ["streetwear-outfit", "gen-z-outfit", "ua-night-uniform"], relatedArticleIds: ["the-new-uniform", "signal-layer"] },
  "signal-layer": { tags: ["layering", "technology", "uniform"], moodboardItemIds: ["ua-signal-layer", "cyberpunk-outfit", "matrix-outfit-02"], relatedArticleIds: ["the-new-uniform", "frequency-after-midnight"] },
  "concrete-editorial": { tags: ["architecture", "concrete", "city"], moodboardItemIds: ["ua-concrete-editorial", "brutalist-study-01", "blade-runner-outfit"], relatedArticleIds: ["walls-talk-back", "the-print-is-the-point"] }
};

const publicationArticles = fashionArticles.map((article) => ({ ...article, issue: "004", ...articleRelations[article.id] }));
export {
  fashionCategories as categories,
  profiles,
  fashionMedia as mediaItems,
  publicationArticles as articles,
  comments,
  reviews,
  contactSubmissions,
  moodboardItems,
  products
};
