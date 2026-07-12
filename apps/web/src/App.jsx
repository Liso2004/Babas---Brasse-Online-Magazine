import { BrowserRouter, MemoryRouter, useLocation } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout.jsx";
import { AuthLayout } from "./layouts/AuthLayout.jsx";
import { PublicLayout } from "./layouts/PublicLayout.jsx";
import { getRouteByPath } from "./routes.js";
import { RouteMetadata } from "./seo/RouteMetadata.jsx";
import { AdminGate } from "./auth/AdminGate.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { VisceralMagPage } from "./pages/VisceralMagPage.jsx";
import { ArticleDetailPage } from "./pages/ArticleDetailPage.jsx";
import { CategoriesSearchPage } from "./pages/CategoriesSearchPage.jsx";
import { FeaturedMediaPage } from "./pages/FeaturedMediaPage.jsx";
import { CreativeTeamPage } from "./pages/CreativeTeamPage.jsx";
import { ContributorsPage } from "./pages/ContributorsPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { AdminDashboardPage } from "./pages/AdminDashboardPage.jsx";
import { ArticleManagementPage } from "./pages/ArticleManagementPage.jsx";
import { ProfileMediaManagementPage } from "./pages/ProfileMediaManagementPage.jsx";
import { CommentsReviewsModerationPage } from "./pages/CommentsReviewsModerationPage.jsx";
import { ContactSubmissionsPage } from "./pages/ContactSubmissionsPage.jsx";
import { AdminLoginPage } from "./pages/AdminLoginPage.jsx";
import { PasswordResetPage } from "./pages/PasswordResetPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { ServerErrorPage } from "./pages/ServerErrorPage.jsx";
import { OfflinePage } from "./pages/OfflinePage.jsx";
import { MediaUploadModalPage } from "./pages/MediaUploadModalPage.jsx";
import { ArticleEditorWorkflowPage } from "./pages/ArticleEditorWorkflowPage.jsx";
import { MobileWireframeCompsPage } from "./pages/MobileWireframeCompsPage.jsx";

function ShellContent({ route }) {
  if (route.id === "home") return <HomePage />;
  if (route.id === "about") return <AboutPage />;
  if (route.id === "visceral-mag") return <VisceralMagPage />;
  if (route.id === "article-detail") return <ArticleDetailPage slug={route.params?.slug} />;
  if (route.id === "search") return <CategoriesSearchPage />;
  if (route.id === "featured") return <FeaturedMediaPage />;
  if (route.id === "creative-team") return <CreativeTeamPage />;
  if (route.id === "contributors") return <ContributorsPage />;
  if (route.id === "contact") return <ContactPage />;
  if (route.id === "admin-dashboard") return <AdminDashboardPage />;
  if (route.id === "article-management") return <ArticleManagementPage />;
  if (route.id === "profile-media-management") return <ProfileMediaManagementPage />;
  if (route.id === "moderation") return <CommentsReviewsModerationPage />;
  if (route.id === "contact-submissions") return <ContactSubmissionsPage />;
  if (route.id === "admin-login") return <AdminLoginPage />;
  if (route.id === "password-reset") return <PasswordResetPage />;
  if (route.id === "not-found") return <NotFoundPage />;
  if (route.id === "server-error") return <ServerErrorPage />;
  if (route.id === "offline") return <OfflinePage />;
  if (route.id === "media-upload") return <MediaUploadModalPage />;
  if (route.id === "article-editor-workflow") return <ArticleEditorWorkflowPage />;
  if (route.id === "mobile-wireframes") return <MobileWireframeCompsPage />;

  return (
    <section className="route-placeholder" data-prototype-file={route.prototypeFile}>
      <p className="eyebrow">Production route</p>
      <h1>{route.label}</h1>
      <p>This route is mapped to <code>{route.prototypeFile}</code>.</p>
    </section>
  );
}

function ResolvedShell({ route }) {
  const isAuthRoute = route.id === "admin-login" || route.id === "password-reset";
  const Layout = isAuthRoute ? AuthLayout : route.area === "admin" || route.authRequired ? AdminLayout : PublicLayout;

  return (
    <div data-app-shell="babas-brasse-web">
      <RouteMetadata route={route} slug={route.params?.slug} />
      <Layout route={route}>
        {route.authRequired ? <AdminGate><ShellContent route={route} /></AdminGate> : <ShellContent route={route} />}
      </Layout>
    </div>
  );
}

function RoutedShell() {
  const location = useLocation();
  const route = getRouteByPath(location.pathname);
  return <ResolvedShell route={route} />;
}

export function AppShell({ pathname }) {
  if (pathname) {
    return (
      <MemoryRouter initialEntries={[pathname]}>
        <RoutedShell />
      </MemoryRouter>
    );
  }

  return (
    <BrowserRouter>
      <RoutedShell />
    </BrowserRouter>
  );
}

export default AppShell;
