import { Link, NavLink, useNavigate } from "react-router-dom";
import { FileText, Images, Inbox, LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";
import { adminRoutes } from "../routes.js";
import { Button } from "../components/ui/button.jsx";

const adminNavIcons = {
  "admin-dashboard": LayoutDashboard,
  "article-management": FileText,
  "profile-media-management": Images,
  moderation: ShieldCheck,
  "contact-submissions": Inbox
};

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
      window.dispatchEvent(new Event("babas-admin-session-changed"));
      navigate("/admin", { replace: true });
    }
  }

  return (
    <div className="app-layout admin-layout figma-admin-shell" data-admin-design="stitch-private-workspace-v4" data-auth-required={authRequired ? "true" : "false"}>
      <a className="skip-link" href="#main-content">Skip to admin content</a>
      <header className="admin-header figma-admin-header">
        <Link className="brand-mark" to="/admin">
          <strong>B&amp;B</strong>
          <span>Editorial admin</span>
        </Link>
        <nav aria-label="Admin navigation">
          {adminRoutes.map((item) => {
            const Icon = adminNavIcons[item.id] || LayoutDashboard;
            return (
              <NavLink key={item.id} to={item.path} end={item.path === "/admin"} aria-current={route.path === item.path ? "page" : undefined}>
                <span>{item.label}</span>
                <Icon className="admin-nav-icon" size={18} strokeWidth={1.8} aria-hidden="true" />
              </NavLink>
            );
          })}
        </nav>
        <div className="admin-session-label">
          <span aria-hidden="true">A</span>
          <p><strong>Administrator</strong><small>Private workspace</small></p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleLogout}>
          <LogOut size={16} aria-hidden="true" />Sign out
        </Button>
      </header>
      <main id="main-content" data-route-id={route.id}>{children}</main>
    </div>
  );
}
