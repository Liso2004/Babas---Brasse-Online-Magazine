import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, MemoryRouter, useLocation } from "react-router-dom";
import * as launchFixtures from "./data/launchFixtures.js";
import { PublicLayout } from "./layouts/PublicLayout.jsx";
import { getRouteByPath } from "./routes.js";
import { RouteMetadata } from "./seo/RouteMetadata.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ContentPage } from "./pages/ContentPage.jsx";
import { VisceralMagPage } from "./pages/VisceralMagPage.jsx";
import { ArticleDetailPage } from "./pages/ArticleDetailPage.jsx";
import { CategoriesSearchPage } from "./pages/CategoriesSearchPage.jsx";
import { FeaturedMediaPage } from "./pages/FeaturedMediaPage.jsx";
import { MediaDetailPage } from "./pages/MediaDetailPage.jsx";
import { CreativeTeamPage } from "./pages/CreativeTeamPage.jsx";
import { ContributorsPage } from "./pages/ContributorsPage.jsx";
import { ProfileDetailPage } from "./pages/ProfileDetailPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { ServerErrorPage } from "./pages/ServerErrorPage.jsx";
import { OfflinePage } from "./pages/OfflinePage.jsx";

const AdminLayout = lazy(() => import("./layouts/AdminLayout.jsx").then((module) => ({ default: module.AdminLayout })));
const AuthLayout = lazy(() => import("./layouts/AuthLayout.jsx").then((module) => ({ default: module.AuthLayout })));
const AdminGate = lazy(() => import("./auth/AdminGate.jsx").then((module) => ({ default: module.AdminGate })));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage.jsx").then((module) => ({ default: module.AdminDashboardPage })));
const ArticleManagementPage = lazy(() => import("./pages/ArticleManagementPage.jsx").then((module) => ({ default: module.ArticleManagementPage })));
const ProfileMediaManagementPage = lazy(() => import("./pages/ProfileMediaManagementPage.jsx").then((module) => ({ default: module.ProfileMediaManagementPage })));
const CommentsReviewsModerationPage = lazy(() => import("./pages/CommentsReviewsModerationPage.jsx").then((module) => ({ default: module.CommentsReviewsModerationPage })));
const ContactSubmissionsPage = lazy(() => import("./pages/ContactSubmissionsPage.jsx").then((module) => ({ default: module.ContactSubmissionsPage })));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage.jsx").then((module) => ({ default: module.AdminLoginPage })));
const PasswordResetPage = lazy(() => import("./pages/PasswordResetPage.jsx").then((module) => ({ default: module.PasswordResetPage })));
const MediaUploadModalPage = lazy(() => import("./pages/MediaUploadModalPage.jsx").then((module) => ({ default: module.MediaUploadModalPage })));
const ArticleEditorWorkflowPage = lazy(() => import("./pages/ArticleEditorWorkflowPage.jsx").then((module) => ({ default: module.ArticleEditorWorkflowPage })));

function ShellContent({ route, fixtures }) {
  if (route.id === "home") return <HomePage fixtures={fixtures} />;
  if (route.id === "about") return <AboutPage fixtures={fixtures} />;
  if (route.id === "content") return <ContentPage fixtures={fixtures} />;
  if (route.id === "visceral-mag") return <VisceralMagPage fixtures={fixtures} />;
  if (route.id === "article-detail") return <ArticleDetailPage slug={route.params?.slug} fixtures={fixtures} />;
  if (route.id === "search") return <CategoriesSearchPage fixtures={fixtures} />;
  if (route.id === "photography" || route.id === "featured") return <FeaturedMediaPage fixtures={fixtures} routePath={route.path} />;
  if (route.id === "media-detail") return <MediaDetailPage mediaId={route.params?.mediaId} fixtures={fixtures} />;
  if (route.id === "creative-team") return <CreativeTeamPage fixtures={fixtures} />;
  if (route.id === "contributors") return <ContributorsPage fixtures={fixtures} />;
  if (route.id === "profile-detail") return <ProfileDetailPage slug={route.params?.slug} fixtures={fixtures} />;
  if (route.id === "contact") return <ContactPage fixtures={fixtures} />;
  if (route.id === "admin-dashboard") return <AdminDashboardPage fixtures={fixtures} />;
  if (route.id === "article-management") return <ArticleManagementPage fixtures={fixtures} />;
  if (route.id === "profile-media-management") return <ProfileMediaManagementPage fixtures={fixtures} />;
  if (route.id === "moderation") return <CommentsReviewsModerationPage fixtures={fixtures} />;
  if (route.id === "contact-submissions") return <ContactSubmissionsPage fixtures={fixtures} />;
  if (route.id === "admin-login") return <AdminLoginPage />;
  if (route.id === "password-reset") return <PasswordResetPage />;
  if (route.id === "not-found") return <NotFoundPage />;
  if (route.id === "server-error") return <ServerErrorPage />;
  if (route.id === "offline") return <OfflinePage />;
  if (route.id === "media-upload") return <MediaUploadModalPage />;
  if (route.id === "article-editor-workflow") return <ArticleEditorWorkflowPage />;

  return (
    <section className="route-placeholder" data-prototype-file={route.prototypeFile}>
      <p className="eyebrow">Production route</p><h1>{route.label}</h1>
      <p>This route is mapped to <code>{route.prototypeFile}</code>.</p>
    </section>
  );
}

function ResolvedShell({ route, fixtures }) {
  const content = <ShellContent route={route} fixtures={fixtures} />;

  if (route.id === "admin-dashboard") {
    return (
      <div data-app-shell="babas-brasse-web">
        <RouteMetadata route={route} slug={route.params?.slug} fixtures={fixtures} />
        <Suspense fallback={<section className="route-loading-state" aria-live="polite"><p>Preparing this page...</p></section>}>
          <AdminGate denied={<AuthLayout route={route}><AdminLoginPage /></AuthLayout>}>
            <AdminLayout route={route}>{content}</AdminLayout>
          </AdminGate>
        </Suspense>
      </div>
    );
  }

  const isAuthRoute = route.id === "admin-login" || route.id === "password-reset";
  const Layout = isAuthRoute ? AuthLayout : route.area === "admin" || route.authRequired ? AdminLayout : PublicLayout;

  return (
    <div data-app-shell="babas-brasse-web">
      <RouteMetadata route={route} slug={route.params?.slug} fixtures={fixtures} />
      <Suspense fallback={<section className="route-loading-state" aria-live="polite"><p>Preparing this page...</p></section>}>
        <Layout route={route}>
          {route.authRequired ? <AdminGate>{content}</AdminGate> : content}
        </Layout>
      </Suspense>
    </div>
  );
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);
  return null;
}

function mergeCollection(fallbackItems = [], incomingItems = [], keyFn = (item) => item?.id || item?.slug) {
  const merged = [];
  const indexes = new Map();

  for (const item of fallbackItems || []) {
    const key = keyFn(item);
    if (!key) continue;
    indexes.set(key, merged.length);
    merged.push(item);
  }

  for (const item of incomingItems || []) {
    const key = keyFn(item);
    if (!key) continue;
    const index = indexes.get(key);
    if (index === undefined) {
      indexes.set(key, merged.length);
      merged.push(item);
    } else {
      merged[index] = { ...merged[index], ...item };
    }
  }

  return merged;
}

function mergePublicationFixtures(payload) {
  const categories = mergeCollection(launchFixtures.categories, payload?.categories, (item) => item?.id || item?.slug);
  const articles = mergeCollection(launchFixtures.articles, payload?.articles, (item) => item?.id || item?.slug);
  const comments = mergeCollection(launchFixtures.comments, payload?.comments, (item) => item?.id);
  const reviews = mergeCollection(launchFixtures.reviews, payload?.reviews, (item) => item?.id);
  const profiles = mergeCollection(launchFixtures.profiles, payload?.profiles, (item) => item?.id || item?.slug).map((profile, index) => {
    const fallback = launchFixtures.profiles.find((item) => item.id === profile.id || item.slug === profile.slug) || launchFixtures.profiles[index] || {};
    const name = profile.name || fallback.name || "this contributor";
    return {
      ...fallback,
      ...profile,
      image: profile.image || fallback.image || { url: "/media/profile-placeholder.jpg", altText: "Portrait of " + name }
    };
  });
  const mediaItems = mergeCollection(launchFixtures.mediaItems, payload?.mediaItems, (item) => item?.id || item?.url).map((item, index) => {
    const fallback = launchFixtures.mediaItems.find((candidate) => candidate.id === item.id || candidate.url === item.url) || launchFixtures.mediaItems[index] || {};
    return {
      ...fallback,
      ...item,
      url: item.url || fallback.url || "/media/profile-placeholder.jpg",
      altText: item.altText || fallback.altText || "Editorial image"
    };
  });

  return {
    ...launchFixtures,
    ...payload,
    categories,
    articles,
    comments,
    reviews,
    profiles,
    mediaItems
  };
}

function RoutedShell() {
  const location = useLocation();
  const route = getRouteByPath(location.pathname);
  const [fixtures, setFixtures] = useState(launchFixtures);

  useEffect(() => {
    let active = true;
    fetch("/api/content", { headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) throw new Error("Publication content is unavailable");
        return response.json();
      })
      .then((payload) => {
        if (!active) return;
        setFixtures(mergePublicationFixtures(payload));
      })
      .catch(() => {
        if (active) setFixtures(launchFixtures);
      });
    return () => { active = false; };
  }, []);

  return <><ScrollToTop /><ResolvedShell route={route} fixtures={fixtures} /></>;
}

export function AppShell({ pathname }) {
  if (pathname) {
    return <MemoryRouter initialEntries={[pathname]}><RoutedShell /></MemoryRouter>;
  }
  return <BrowserRouter><RoutedShell /></BrowserRouter>;
}

export default AppShell;
