import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { adminRoutes } from "../routes.js";
import { Button } from "../components/ui/button.jsx";

export function AdminLayout({ route, children }) {
  const authRequired = route.authRequired === true;
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" }
      });
    } finally {
      navigate("/admin/login", { replace: true });
    }
  }

  return (
    <div className="app-layout admin-layout figma-admin-shell" data-auth-required={authRequired ? "true" : "false"}>
      <a className="skip-link" href="#main-content">Skip to admin content</a>
      <header className="admin-header figma-admin-header">
        <Link className="brand-mark" to="/admin">B&B Admin</Link>
        <nav aria-label="Admin navigation">
          {adminRoutes.map((item) => (
            <NavLink key={item.id} to={item.path} end={item.path === "/admin"} aria-current={route.path === item.path ? "page" : undefined}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
          <LogOut size={16} aria-hidden="true" />Sign out
        </Button>
      </header>
      <main id="main-content" data-route-id={route.id}>{children}</main>
    </div>
  );
}
