import { publicRoutes } from "../routes.js";

export function PublicLayout({ route, children }) {
  return (
    <div className="app-layout public-layout">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand-mark" href="/">Babas & Brasse</a>
        <nav aria-label="Public navigation">
          {publicRoutes.map((item) => (
            <a key={item.id} href={item.path} aria-current={route.path === item.path ? "page" : undefined}>{item.label}</a>
          ))}
        </nav>
      </header>
      <main id="main-content" data-route-id={route.id}>{children}</main>
    </div>
  );
}
