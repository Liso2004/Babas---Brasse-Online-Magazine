import { getRouteByPath } from "../routes.js";

function findById(items, id) {
  return items.find((item) => item.id === id) || null;
}

function isProfileComplete(profile) {
  return Boolean(profile.name && profile.role && profile.slug && profile.shortBio);
}

function isMediaPublishReady(media) {
  return Boolean(media.altText && media.caption && media.credit);
}

export function getProfileRows(fixtures) {
  return fixtures.profiles.map((profile) => ({
    id: profile.id,
    type: profile.type,
    name: profile.name,
    role: profile.role,
    slug: profile.slug,
    status: "Active",
    completeness: isProfileComplete(profile) ? "Complete" : "Needs work",
    editHref: `/admin/profiles/${profile.slug}/edit`
  }));
}

export function getMediaRows(fixtures) {
  return fixtures.mediaItems.map((media) => {
    const usedByArticles = fixtures.articles.filter((article) => article.featuredImage && article.featuredImage.id === media.id);
    const firstArticle = usedByArticles[0] || null;
    const category = firstArticle ? findById(fixtures.categories, firstArticle.categoryId) : null;

    return {
      id: media.id,
      title: media.title,
      type: media.type,
      url: media.url,
      altText: media.altText,
      caption: media.caption,
      credit: media.credit,
      category: category ? category.label : "Media",
      usageCount: usedByArticles.length,
      publishReady: isMediaPublishReady(media),
      editHref: `/admin/media/${media.id}/edit`
    };
  });
}

export function getProfileMediaStats(fixtures) {
  const profileRows = getProfileRows(fixtures);
  const mediaRows = getMediaRows(fixtures);

  return {
    totalProfiles: profileRows.length,
    contributors: profileRows.filter((profile) => profile.type === "contributor").length,
    creativeTeam: profileRows.filter((profile) => profile.type === "creative_team").length,
    mediaItems: mediaRows.length,
    publishReadyMedia: mediaRows.filter((media) => media.publishReady).length,
    incompleteMedia: mediaRows.filter((media) => !media.publishReady).length
  };
}

function metricItems(stats) {
  return [
    { key: "totalProfiles", label: "Profiles", value: stats.totalProfiles },
    { key: "contributors", label: "Contributors", value: stats.contributors },
    { key: "creativeTeam", label: "Creative Team", value: stats.creativeTeam },
    { key: "mediaItems", label: "Media items", value: stats.mediaItems },
    { key: "publishReadyMedia", label: "Publish ready", value: stats.publishReadyMedia },
    { key: "incompleteMedia", label: "Incomplete media", value: stats.incompleteMedia }
  ];
}

function profileGroups(profileRows) {
  return [
    { key: "contributors", label: "Contributors", rows: profileRows.filter((row) => row.type === "contributor") },
    { key: "creative-team", label: "Creative Team", rows: profileRows.filter((row) => row.type === "creative_team") }
  ];
}

function uploadFields(fixtures) {
  return [
    { id: "media-file", name: "file", type: "file", label: "File", accept: "image/*", required: true },
    { id: "media-alt-text", name: "altText", type: "text", label: "Alt text", required: true },
    { id: "media-caption", name: "caption", type: "textarea", label: "Caption", required: true },
    { id: "media-credit", name: "credit", type: "text", label: "Credit", required: true },
    { id: "media-category", name: "categoryId", type: "select", label: "Category", required: true, options: fixtures.categories.map((category) => ({ value: category.id, label: category.label })) }
  ];
}

export function buildProfileMediaManagementRouteModel(fixtures) {
  const route = getRouteByPath("/admin/profiles-media");
  const profileRows = getProfileRows(fixtures);
  const mediaRows = getMediaRows(fixtures);
  const stats = getProfileMediaStats(fixtures);

  return {
    pageId: "profile-media-management",
    generatedFrom: "profile-media-management-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    auth: {
      required: route.authRequired === true,
      role: "admin",
      loginHref: "/admin/login"
    },
    hero: {
      eyebrow: "Profile / Media Management",
      title: "People and media publishing readiness.",
      dek: "Admin-only access to keep contributors, Creative Team profiles, and public media metadata complete."
    },
    sections: {
      stats: {
        heading: "Profile and media health",
        items: metricItems(stats)
      },
      profileManagement: {
        heading: "Profile management",
        columns: ["name", "role", "status", "profile-completeness", "row-actions"],
        groups: profileGroups(profileRows)
      },
      mediaLibrary: {
        heading: "Media library",
        columns: ["image", "alt-text", "caption", "credit", "category", "usage", "publish-readiness"],
        items: mediaRows
      },
      upload: {
        heading: "Upload / select media",
        action: "/admin/media/upload",
        method: "post",
        enctype: "multipart/form-data",
        dropzone: { id: "media-upload", label: "Drop image, photo, or artwork here" },
        helpText: "Keyboard file input fallback is available below.",
        fields: uploadFields(fixtures),
        submitLabel: "Upload media"
      },
      states: {
        notes: ["media-uploading", "media-missing-metadata", "media-file-error", "media-empty-library", "permission-denied"],
        items: ["uploading", "missing-metadata", "file-error", "empty-library", "permission-denied"],
        permissionHref: "/admin/login",
        metadataCopy: "Missing metadata blocks public media use until alt text, caption, and credit are complete."
      }
    }
  };
}
