import { adminRoutes } from "../routes.js";

export function AdminLayout({ route, children }) {
  const authRequired = route.authRequired === true;

  return (
    <div className="app-layout admin-layout" data-auth-required={authRequired ? "true" : "false"}>
      <a className="skip-link" href="#main-content">Skip to admin content</a>
      <header className="admin-header">
        <a className="brand-mark" href="/admin">B&B Admin</a>
        <nav aria-label="Admin navigation">
          {adminRoutes.map((item) => (
            <a key={item.id} href={item.path} aria-current={route.path === item.path ? "page" : undefined}>{item.label}</a>
          ))}
        </nav>
        <a className="editor-access" href="/admin/login">Editor access</a>
      </header>
      <main id="main-content" data-route-id={route.id}>{children}</main>
    </div>
  );
}
