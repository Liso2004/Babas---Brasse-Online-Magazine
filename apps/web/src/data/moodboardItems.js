const archivePath = (filename) => `/media/moodboard/${encodeURIComponent(filename)}`;

const subjects = {
  "blade-runner": { category: "Architecture", tags: ["blade-runner", "noir", "megablock"], relatedArticleIds: ["concrete-editorial"], relatedContributorIds: ["sable-ord"] },
  cyberpunk: { category: "Architecture", tags: ["cyberpunk", "neon", "infrastructure"], relatedArticleIds: ["signal-layer"], relatedContributorIds: ["ivo-morita"] },
  dune: { category: "Costume", tags: ["dune", "desert", "ceremonial"], relatedArticleIds: ["the-new-uniform"], relatedContributorIds: ["anna-shin"] },
  matrix: { category: "Architecture", tags: ["matrix", "system", "concrete"], relatedArticleIds: ["signal-layer"], relatedContributorIds: ["ivo-morita"] },
  scifi: { category: "Architecture", tags: ["science-fiction", "future", "infrastructure"], relatedArticleIds: ["concrete-editorial"], relatedContributorIds: ["sable-ord"] },
  knight: { category: "Costume", tags: ["knight", "armour", "utility"], relatedArticleIds: ["the-new-uniform"], relatedContributorIds: ["anna-shin"] },
  punk: { category: "Street Culture", tags: ["punk", "streetwear", "print"], relatedArticleIds: ["the-print-is-the-point"], relatedContributorIds: ["nia-kade"] },
  streetwear: { category: "Street Culture", tags: ["streetwear", "style", "uniform"], relatedArticleIds: ["the-new-uniform"], relatedContributorIds: ["anna-shin"] },
  genz: { category: "Street Culture", tags: ["generation-z", "style", "uniform"], relatedArticleIds: ["fit-check-the-archive"], relatedContributorIds: ["nia-kade"] },
  brutalist: { category: "Architecture", tags: ["brutalism", "concrete", "monument"], relatedArticleIds: ["concrete-editorial"], relatedContributorIds: ["sable-ord"] }
};

const definitions = [
  ["blade-runner-architecture-01", "Blade Runner Architecture I", "bladerunner architecture.jpg", "blade-runner"],
  ["blade-runner-architecture-02", "Blade Runner Architecture II", "bladerunner architecture_2.jpg", "blade-runner"],
  ["blade-runner-architecture-03", "Blade Runner Architecture III", "bladerunner architecture_3.jpg", "blade-runner"],
  ["blade-runner-outfit", "Blade Runner Outfit", "Bladerunner outfit.jpg", "blade-runner"],
  ["brutalist-study-01", "Brutalist Study I", "Brutlist_1.jpg", "brutalist"],
  ["cyberpunk-architecture-01", "Cyberpunk Architecture I", "cyberpunk architecture.jpg", "cyberpunk"],
  ["cyberpunk-architecture-02", "Cyberpunk Architecture II", "cyberpunk architecture_2.jpg", "cyberpunk"],
  ["cyberpunk-ninja-outfit", "Cyberpunk Ninja Outfit", "Cyberpunk ninja outfit.jpg", "cyberpunk"],
  ["cyberpunk-outfit", "Cyberpunk Outfit", "Cyberpunk outfit.jpg", "cyberpunk"],
  ["dune-architecture-01", "Dune Architecture I", "dune architecture.jpg", "dune"],
  ["dune-architecture-02", "Dune Architecture II", "dune architecture_2.jpg", "dune"],
  ["dune-architecture-03", "Dune Architecture III", "dune architecture_3.jpg", "dune"],
  ["dune-lisan-al-gaib", "Dune Outfit: Lisan Al-Ghaib", "Dune outfit Lisan Al-Ghaib.jpg", "dune"],
  ["dune-muad-dib", "Dune Outfit: Muad'Dib", "dune outfit Muad'Dib.jpg", "dune"],
  ["dune-reverend-mother", "Dune Outfit: Reverend Mother", "Dune outfit Reverend Mother Superior.jpg", "dune"],
  ["dune-outfit", "Dune Outfit", "Dune outfit.jpg", "dune"],
  ["dune-paul-atreides-01", "Dune: Paul Atreides I", "dune paul atrades.jpg", "dune"],
  ["dune-paul-atreides-02", "Dune: Paul Atreides II", "dune paul atrades_2.jpg", "dune"],
  ["gen-z-outfit", "Gen Z Outfit", "Genz outfit.jpg", "genz"],
  ["knight-hoodie", "Knight Hoodie", "Knight Hoodie.jpg", "knight"],
  ["knight-outfit", "Knight Outfit", "Knight outfit.jpg", "knight"],
  ["matrix-architecture-01", "Matrix Architecture I", "Matrix architecture.jpg", "matrix"],
  ["matrix-architecture-02", "Matrix Architecture II", "Matrix architecture_2.jpg", "matrix"],
  ["matrix-outfit-01", "Matrix Outfit I", "Matrix outfit.jpg", "matrix"],
  ["matrix-outfit-02", "Matrix Outfit II", "Matrix outfit_2.jpg", "matrix"],
  ["matrix-outfit-03", "Matrix Outfit III", "Matrix outfit_3.jpg", "matrix"],
  ["punk-outfit", "Punk Outfit", "Punk outfit.jpg", "punk"],
  ["scifi-architecture-01", "Sci-Fi Architecture I", "Scifi architecture.jpg", "scifi"],
  ["scifi-architecture-02", "Sci-Fi Architecture II", "scifi architecture_2.jpg", "scifi"],
  ["scifi-architecture-03", "Sci-Fi Architecture III", "scifi architecture_3.jpg", "scifi"],
  ["scifi-outfit-01", "Sci-Fi Outfit I", "scifi outfit.jpg", "scifi"],
  ["scifi-outfit-02", "Sci-Fi Outfit II", "scifi outfit_2.jpg", "scifi"],
  ["streetwear-outfit", "Streetwear Outfit", "Strretwear outfit.jpg", "streetwear"]
];

export const moodboardItems = definitions.map(([id, title, filename, subject], index) => {
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
    image: { url: archivePath(filename), altText: `${title} visual research specimen` },
    relatedArticleIds: metadata.relatedArticleIds,
    relatedContributorIds: metadata.relatedContributorIds
  };
});
