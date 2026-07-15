import { useEffect, useMemo, useState } from "react";
import * as launchFixtures from "../data/launchFixtures.js";
import { buildProfileMediaManagementRouteModel } from "./profileMediaManagementRouteModel.js";

const newProfile = {
  id: "",
  name: "",
  role: "",
  slug: "",
  type: "contributor",
  shortBio: "",
  fullBio: "",
  socialLinks: []
};

export function ProfileMediaManagementPage({ fixtures = launchFixtures }) {
  const [editorial, setEditorial] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [requestState, setRequestState] = useState("loading");
  const [statusMessage, setStatusMessage] = useState("");
  const [mediaQuery, setMediaQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/editorial", { credentials: "include", headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load profiles and media");
        return response.json();
      })
      .then((payload) => {
        if (active) {
          setEditorial(payload);
          setRequestState("ready");
        }
      })
      .catch(() => { if (active) setRequestState("error"); });
    return () => { active = false; };
  }, []);

  const liveFixtures = useMemo(() => editorial ? { ...fixtures, ...editorial } : fixtures, [editorial, fixtures]);
  const model = buildProfileMediaManagementRouteModel(liveFixtures);
  const { hero, sections } = model;
  const selectedProfile = creatingProfile
    ? newProfile
    : liveFixtures.profiles.find((profile) => profile.id === selectedProfileId) || null;
  const visibleMedia = sections.mediaLibrary.items.filter((item) => {
    const query = mediaQuery.trim().toLowerCase();
    return !query || [item.title, item.id, item.altText, item.credit, item.category].some((value) => String(value || "").toLowerCase().includes(query));
  });

  function editProfile(id) {
    setCreatingProfile(false);
    setSelectedProfileId(id);
    setStatusMessage("");
  }

  async function saveProfile(event) {
    event.preventDefault();
    if (!selectedProfile) return;
    setRequestState("saving");
    setStatusMessage("");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      payload.socialLinks = payload.socialLinksJson.trim() ? JSON.parse(payload.socialLinksJson) : [];
      if (!Array.isArray(payload.socialLinks)) throw new Error("Social links must be a JSON array.");
      delete payload.socialLinksJson;
      if (creatingProfile) payload.id = payload.slug;
      const endpoint = creatingProfile ? "/api/admin/profiles" : `/api/admin/profiles/${encodeURIComponent(selectedProfile.id)}`;
      const response = await fetch(endpoint, {
        method: creatingProfile ? "POST" : "PUT",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Unable to save profile");
      }
      const updated = await response.json();
      setEditorial((current) => ({
        ...current,
        profiles: current.profiles.some((item) => item.id === updated.id)
          ? current.profiles.map((item) => item.id === updated.id ? updated : item)
          : [...current.profiles, updated]
      }));
      setCreatingProfile(false);
      setSelectedProfileId(updated.id);
      setRequestState("ready");
      setStatusMessage("Profile saved.");
    } catch (error) {
      setRequestState("error");
      setStatusMessage(error instanceof SyntaxError ? "Social links must be valid JSON." : error.message);
    }
  }

  async function deleteProfile(profile) {
    if (!window.confirm(`Delete profile "${profile.name}" permanently? Profiles with articles are protected.`)) return;
    setRequestState("saving");
    setStatusMessage("");
    try {
      const response = await fetch(`/api/admin/profiles/${encodeURIComponent(profile.id)}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Accept: "application/json" }
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Unable to delete profile");
      }
      setEditorial((current) => ({ ...current, profiles: current.profiles.filter((item) => item.id !== profile.id) }));
      if (selectedProfileId === profile.id) setSelectedProfileId(null);
      setRequestState("ready");
      setStatusMessage("Profile deleted.");
    } catch (error) {
      setRequestState("error");
      setStatusMessage(error.message);
    }
  }

  async function saveMedia(event) {
    event.preventDefault();
    setRequestState("saving");
    setStatusMessage("");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Unable to register media");
      }
      const saved = await response.json();
      setEditorial((current) => ({
        ...current,
        mediaItems: current.mediaItems.some((item) => item.id === saved.id)
          ? current.mediaItems.map((item) => item.id === saved.id ? saved : item)
          : [...current.mediaItems, saved]
      }));
      event.currentTarget.reset();
      setRequestState("ready");
      setStatusMessage("Media metadata saved.");
    } catch (error) {
      setRequestState("error");
      setStatusMessage(error.message);
    }
  }

  async function deleteMedia(media) {
    if (!window.confirm(`Delete media "${media.title}" permanently? Media used by an article is protected.`)) return;
    setRequestState("saving");
    setStatusMessage("");
    try {
      const response = await fetch(`/api/admin/media/${encodeURIComponent(media.id)}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Accept: "application/json" }
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Unable to delete media");
      }
      setEditorial((current) => ({ ...current, mediaItems: current.mediaItems.filter((item) => item.id !== media.id) }));
      setRequestState("ready");
      setStatusMessage("Media deleted.");
    } catch (error) {
      setRequestState("error");
      setStatusMessage(error.message);
    }
  }

  return (
    <section className="figma-admin-page figma-profile-media-management-page" data-page="profile-media-management" data-design-reference="admin-media-library-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile} data-auth-required={model.auth.role}>
      <header className="figma-admin-page-intro" data-section="profile-media-intro">
        <p className="eyebrow">{hero.eyebrow}</p><h1>{hero.title}</h1><p>{hero.dek}</p>
      </header>

      <section className="figma-admin-section" data-section="profile-media-stats">
        <h2>{sections.stats.heading}</h2>
        {sections.stats.items.map((metric) => <article key={metric.key} className="metric" data-metric={metric.key} data-value={metric.value}><p className="eyebrow">{metric.label}</p><strong>{metric.value}</strong></article>)}
      </section>

      <p className="public-form-status" data-form-status={requestState} aria-live="polite">
        {requestState === "loading" ? "Loading profiles and media..." : requestState === "saving" ? "Saving changes..." : statusMessage}
      </p>

      <section className="figma-admin-table-panel" data-section="profile-management">
        <div className="section-heading-row">
          <h2>{sections.profileManagement.heading}</h2>
          <button type="button" onClick={() => { setCreatingProfile(true); setSelectedProfileId(null); }}>Create profile</button>
        </div>
        {sections.profileManagement.groups.map((group) => (
          <article key={group.key} data-group={group.key} className="profile-group">
            <h3>{group.label}</h3>
            <div className="profile-table" role="table" aria-label={`${group.label} profile management`}>
              <div role="row" className="table-header">{sections.profileManagement.columns.map((column) => <span key={column} role="columnheader" data-column={column}>{column}</span>)}</div>
              {group.rows.map((row) => {
                const profile = liveFixtures.profiles.find((item) => item.id === row.id);
                return (
                  <div key={row.id} role="row" className="profile-row" data-profile-id={row.id} data-profile-type={row.type} data-status={row.status.toLowerCase()} data-completeness={row.completeness}>
                    <span role="cell"><strong>{row.name}</strong><small>{row.slug}</small></span><span role="cell">{row.role}</span>
                    <span role="cell">{row.status}</span><span role="cell">{row.completeness}</span>
                    <span role="cell" className="row-actions"><button type="button" onClick={() => editProfile(row.id)}>Edit profile</button><button type="button" className="danger-button" onClick={() => deleteProfile(profile)}>Delete profile</button></span>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </section>

      {selectedProfile ? (
        <section className="figma-admin-editor-panel" data-section="profile-editor">
          <h2>{creatingProfile ? "Create profile" : `Edit: ${selectedProfile.name}`}</h2>
          <form key={creatingProfile ? "new-profile" : selectedProfile.id} onSubmit={saveProfile}>
            <label>Name<input name="name" required defaultValue={selectedProfile.name} /></label>
            <label>Role<input name="role" required defaultValue={selectedProfile.role} /></label>
            <label>Slug<input name="slug" required pattern="[a-z0-9-]+" defaultValue={selectedProfile.slug} /></label>
            <label>Profile type<select name="type" defaultValue={selectedProfile.type}><option value="contributor">Contributor</option><option value="creative_team">Creative Team</option></select></label>
            <label>Short biography<textarea name="shortBio" required defaultValue={selectedProfile.shortBio} /></label>
            <label>Full biography<textarea name="fullBio" required defaultValue={selectedProfile.fullBio || selectedProfile.shortBio} /></label>
            <label>Social links JSON<textarea name="socialLinksJson" defaultValue={JSON.stringify(selectedProfile.socialLinks || [], null, 2)} /></label>
            <button type="submit" disabled={requestState === "saving"}>Save profile</button>
          </form>
        </section>
      ) : null}

      <section className="figma-admin-table-panel" data-section="media-library">
        <div className="section-heading-row media-library-heading">
          <div><p className="eyebrow">Asset management / archive</p><h2>{sections.mediaLibrary.heading}</h2></div>
          <label className="media-library-search" htmlFor="media-library-search">Search assets
            <input id="media-library-search" type="search" value={mediaQuery} onChange={(event) => setMediaQuery(event.target.value)} placeholder="Search assets..." />
          </label>
        </div>
        <div className="media-table" role="table" aria-label="Media library metadata">
          <div role="row" className="table-header">{sections.mediaLibrary.columns.map((column) => <span key={column} role="columnheader" data-column={column}>{column}</span>)}</div>
          {visibleMedia.map((row) => (
            <div key={row.id} role="row" className="media-row" data-media-id={row.id} data-publish-ready={row.publishReady}>
              <span role="cell" className="media-asset-cell">{row.type === "image" ? <img src={row.url} alt="" /> : <span className="media-file-mark" aria-hidden="true">FILE</span>}<span><strong>{row.title}</strong><small>{row.id}</small></span></span><span role="cell">{row.altText}</span>
              <span role="cell">{row.caption}</span><span role="cell">{row.credit}</span><span role="cell">{row.category}</span>
              <span role="cell">{row.usageCount} article{row.usageCount === 1 ? "" : "s"}</span>
              <span role="cell">{row.publishReady ? "Ready" : "Missing metadata"}<button type="button" className="danger-button" disabled={requestState === "saving" || row.usageCount > 0} onClick={() => deleteMedia(row)}>Delete media</button></span>
            </div>
          ))}
          {visibleMedia.length === 0 ? <p className="media-library-empty">No media assets match “{mediaQuery}”.</p> : null}
        </div>
      </section>

      <section className="figma-admin-upload-panel" data-section="upload-select">
        <h2>Register media metadata</h2>
        <form data-form="media-upload" onSubmit={saveMedia}>
          <label>Media ID<input name="id" required pattern="[a-z0-9-]+" /></label>
          <label>Title<input name="title" required /></label>
          <label>Media URL<input name="url" type="text" required placeholder="/media/editorial/image.jpg" /></label>
          <label>Type<select name="type" defaultValue="image"><option value="image">Image</option><option value="video">Video</option><option value="audio">Audio</option></select></label>
          <label>Alt text<input name="altText" required /></label>
          <label>Caption<textarea name="caption" required /></label>
          <label>Credit<input name="credit" required /></label>
          <label>Category<select name="categoryId" defaultValue="">{[{ id: "", label: "Media" }, ...liveFixtures.categories].map((category) => <option key={category.id || "media"} value={category.id}>{category.label}</option>)}</select></label>
          <button type="submit" data-action="upload-media" disabled={requestState === "saving"}>Save media metadata</button>
        </form>
        <p>Binary uploads remain disabled until deployment object storage and file validation are configured.</p>
      </section>

    </section>
  );
}
