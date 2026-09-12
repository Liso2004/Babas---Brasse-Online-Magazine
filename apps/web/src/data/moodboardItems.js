const archivePath = (filename) => filename.startsWith("/") ? filename : `/media/moodboard/${encodeURIComponent(filename)}`;

const subjects = {
  "blade-runner": { category: "Architecture", tags: ["blade-runner", "noir", "megablock"], relatedArticleIds: ["concrete-editorial"], relatedContributorIds: ["sable-ord"] },
  cyberpunk: { category: "Architecture", tags: ["cyberpunk", "neon", "infrastructure"], relatedArticleIds: ["signal-layer"], relatedContributorIds: ["ivo-morita"] },
  dune: { category: "Costume", tags: ["dune", "desert", "ceremonial"], relatedArticleIds: ["the-new-uniform"], relatedContributorIds: ["anna-shin"] },
  matrix: { category: "Architecture", tags: ["matrix", "system", "concrete"], relatedArticleIds: ["signal-layer"], relatedContributorIds: ["ivo-morita"] },
  scifi: { category: "Architecture", tags: ["science-fiction", "future", "infrastructure"], relatedArticleIds: ["concrete-editorial"], relatedContributorIds: ["sable-ord"] },
  knight: { category: "Costume", tags: ["knight", "armour", "utility"], relatedArticleIds: ["the-new-uniform"], relatedContributorIds: ["anna-shin"] },
  punk: { category: "Street Culture", tags: ["punk", "streetwear", "print"], relatedArticleIds: ["the-print-is-the-point"], relatedContributorIds: ["thando-jacobs"] },
  streetwear: { category: "Street Culture", tags: ["streetwear", "style", "uniform"], relatedArticleIds: ["the-new-uniform"], relatedContributorIds: ["anna-shin"] },
  genz: { category: "Street Culture", tags: ["generation-z", "style", "uniform"], relatedArticleIds: ["fit-check-the-archive"], relatedContributorIds: ["thando-jacobs"] },
  brutalist: { category: "Architecture", tags: ["brutalism", "concrete", "monument"], relatedArticleIds: ["concrete-editorial"], relatedContributorIds: ["sable-ord"] },
  "urban-anarchy": { category: "Style Codes", tags: ["urban-anarchy", "uniform", "signal"], relatedArticleIds: ["the-new-uniform", "signal-layer", "concrete-editorial"], relatedContributorIds: ["anna-shin", "thando-jacobs"] },
  "cape-town-arts": { category: "Art & Image", tags: ["cape-town", "art", "editorial"], relatedArticleIds: ["walls-talk-back", "the-print-is-the-point"], relatedContributorIds: ["thando-jacobs", "mia-van-wyk"] }
};

const definitions = [
  ["blade-runner-architecture-01", "Blade Runner Architecture I", "bladerunner architecture.jpg", "blade-runner", "wide"], ["blade-runner-architecture-02", "Blade Runner Architecture II", "bladerunner architecture_2.jpg", "blade-runner", "portrait"], ["blade-runner-architecture-03", "Blade Runner Architecture III", "bladerunner architecture_3.jpg", "blade-runner", "wide"], ["blade-runner-outfit", "Blade Runner Outfit", "Bladerunner outfit.jpg", "blade-runner", "portrait"],
  ["brutalist-study-01", "Brutalist Study I", "Brutlist_1.jpg", "brutalist", "feature"], ["cyberpunk-architecture-01", "Cyberpunk Architecture I", "cyberpunk architecture.jpg", "cyberpunk", "wide"], ["cyberpunk-architecture-02", "Cyberpunk Architecture II", "cyberpunk architecture_2.jpg", "cyberpunk", "portrait"], ["cyberpunk-ninja-outfit", "Cyberpunk Ninja Outfit", "Cyberpunk ninja outfit.jpg", "cyberpunk", "portrait"], ["cyberpunk-outfit", "Cyberpunk Outfit", "Cyberpunk outfit.jpg", "cyberpunk", "portrait"],
  ["dune-architecture-01", "Dune Architecture I", "dune architecture.jpg", "dune", "wide"], ["dune-architecture-02", "Dune Architecture II", "dune architecture_2.jpg", "dune", "wide"], ["dune-architecture-03", "Dune Architecture III", "dune architecture_3.jpg", "dune", "wide"], ["dune-lisan-al-gaib", "Dune Outfit: Lisan Al-Ghaib", "Dune outfit Lisan Al-Ghaib.jpg", "dune", "portrait"], ["dune-muad-dib", "Dune Outfit: Muad'Dib", "dune outfit Muad'Dib.jpg", "dune", "portrait"], ["dune-reverend-mother", "Dune Outfit: Reverend Mother", "Dune outfit Reverend Mother Superior.jpg", "dune", "portrait"], ["dune-outfit", "Dune Outfit", "Dune outfit.jpg", "dune", "portrait"], ["dune-paul-atreides-01", "Dune: Paul Atreides I", "dune paul atrades.jpg", "dune", "portrait"], ["dune-paul-atreides-02", "Dune: Paul Atreides II", "dune paul atrades_2.jpg", "dune", "portrait"],
  ["gen-z-outfit", "Gen Z Outfit", "Genz outfit.jpg", "genz", "portrait"], ["knight-hoodie", "Knight Hoodie", "Knight Hoodie.jpg", "knight", "portrait"], ["knight-outfit", "Knight Outfit", "Knight outfit.jpg", "knight", "portrait"], ["matrix-architecture-01", "Matrix Architecture I", "Matrix architecture.jpg", "matrix", "wide"], ["matrix-architecture-02", "Matrix Architecture II", "Matrix architecture_2.jpg", "matrix", "wide"], ["matrix-outfit-01", "Matrix Outfit I", "Matrix outfit.jpg", "matrix", "portrait"], ["matrix-outfit-02", "Matrix Outfit II", "Matrix outfit_2.jpg", "matrix", "portrait"], ["matrix-outfit-03", "Matrix Outfit III", "Matrix outfit_3.jpg", "matrix", "portrait"],
  ["punk-outfit", "Punk Outfit", "Punk outfit.jpg", "punk", "portrait"], ["scifi-architecture-01", "Sci-Fi Architecture I", "Scifi architecture.jpg", "scifi", "wide"], ["scifi-architecture-02", "Sci-Fi Architecture II", "scifi architecture_2.jpg", "scifi", "wide"], ["scifi-architecture-03", "Sci-Fi Architecture III", "scifi architecture_3.jpg", "scifi", "wide"], ["scifi-outfit-01", "Sci-Fi Outfit I", "scifi outfit.jpg", "scifi", "portrait"], ["scifi-outfit-02", "Sci-Fi Outfit II", "scifi outfit_2.jpg", "scifi", "portrait"], ["streetwear-outfit", "Streetwear Outfit", "Strretwear outfit.jpg", "streetwear", "portrait"],
  ["ua-night-uniform", "Night Uniform", "/media/moodboard/moodboard-collage-subject-a-pair.png", "urban-anarchy", "wide"], ["ua-capsule-image-board", "Capsule Image Board", "/media/moodboard/moodboard-collage-subject-a-high.png", "urban-anarchy", "feature"], ["ua-heavyweight-details", "Heavyweight Details", "/media/moodboard/moodboard-collage-subject-close.png", "urban-anarchy", "square"], ["ua-raw-hem-archive", "Raw Hem Archive", "/media/moodboard/moodboard-collage-subject-the.png", "urban-anarchy", "portrait"], ["ua-signal-layer", "Signal Layer", "/media/moodboard/moodboard-collage-subject-1.png", "urban-anarchy", "portrait"], ["ua-concrete-editorial", "Concrete Editorial", "/media/moodboard/moodboard-collage-subject-2.png", "urban-anarchy", "wide"],
  ["ua-figure-study-01", "Sector Figure Study I", "/media/moodboard/moodboard-collage-subject-a-1.png", "urban-anarchy", "portrait"], ["ua-figure-study-02", "Sector Figure Study II", "/media/moodboard/moodboard-collage-subject-a-2.png", "urban-anarchy", "portrait"], ["ua-figure-study-03", "Sector Figure Study III", "/media/moodboard/moodboard-collage-subject-a-3.png", "urban-anarchy", "portrait"], ["ua-figure-study-04", "Sector Figure Study IV", "/media/moodboard/moodboard-collage-subject-a-4.png", "urban-anarchy", "portrait"], ["cape-town-arts-editorial", "Cape Town Arts Editorial", "/media/moodboard/south-african-arts-editorial-moodboard.png", "cape-town-arts", "feature"]
];

export const moodboardItems = definitions.map(([id, title, filename, subject, layout], index) => {
  const metadata = subjects[subject];
  return {
    id,
    slug: id,
    title,
    subject,
    category: metadata.category,
    tags: metadata.tags,
    issue: "004",
    specimen: String(index + 1).padStart(3, "0"),
    layout,
    image: { url: archivePath(filename), altText: `${title} visual research specimen` },
    caption: `${title} is a ${metadata.category.toLowerCase()} reference filed for the Issue 004 research archive.`,
    credit: "URBAN ANARCHY / Visual Research Archive",
    source: filename.startsWith("/") ? "URBAN ANARCHY media archive" : "moodboard_items source archive",
    relatedArticleIds: metadata.relatedArticleIds,
    relatedContributorIds: metadata.relatedContributorIds,
    relatedMoodboardIds: definitions.filter((definition) => definition[3] === subject && definition[0] !== id).map((definition) => definition[0])
  };
});
