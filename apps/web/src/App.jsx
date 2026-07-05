import { AdminLayout } from "./layouts/AdminLayout.jsx";
import { PublicLayout } from "./layouts/PublicLayout.jsx";
import { getRouteByPath } from "./routes.js";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { VisceralMagPage } from "./pages/VisceralMagPage.jsx";
import { ArticleDetailPage } from "./pages/ArticleDetailPage.jsx";
import { CategoriesSearchPage } from "./pages/CategoriesSearchPage.jsx";
import { FeaturedMediaPage } from "./pages/FeaturedMediaPage.jsx";
import { CreativeTeamPage } from "./pages/CreativeTeamPage.jsx";
import { ContributorsPage } from "./pages/ContributorsPage.jsx";

function ShellContent({ route }) {
  if (route.id === "home") {
    return <HomePage />;
  }

  if (route.id === "about") {
    return <AboutPage />;
  }

  if (route.id === "visceral-mag") {
    return <VisceralMagPage />;
  }

  if (route.id === "article-detail") {
    return <ArticleDetailPage slug={route.params?.slug} />;
  }

  if (route.id === "search") {
    return <CategoriesSearchPage />;
  }

  if (route.id === "featured") {
    return <FeaturedMediaPage />;
  }

  if (route.id === "creative-team") {
    return <CreativeTeamPage />;
  }

  if (route.id === "contributors") {
    return <ContributorsPage />;
  }

  return (
    <section className="route-placeholder" data-prototype-file={route.prototypeFile}>
      <p className="eyebrow">Sprint 1 App Shell</p>
      <h1>{route.label}</h1>
      <p>This React-ready route is mapped to the tested prototype contract at <code>{route.prototypeFile}</code>.</p>
    </section>
  );
}

export function AppShell({ pathname = window.location.pathname }) {
  const route = getRouteByPath(pathname);
  const Layout = route.area === "admin" || route.authRequired ? AdminLayout : PublicLayout;

  return (
    <div data-app-shell="babas-brasse-web">
      <Layout route={route}>
        <ShellContent route={route} />
      </Layout>
    </div>
  );
}

export default AppShell;








