import { getRouteByPath } from "../routes.js";

export function getAuthSupportRoutes() {
  return [
    { id: "admin-login", label: "Admin Login", path: "/admin/login", file: "src/pages/admin/login.html" }
  ];
}
export function buildAdminLoginRouteModel() {
  const route = getRouteByPath("/admin/login");
  return {
    pageId: "admin-login",
    generatedFrom: "admin-auth-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    header: { brand: "B&B Admin", label: "Secure sign in", href: "/admin/login" },
    hero: { eyebrow: "Admin login", title: "Sign in to Babas & Brasse Admin." },
    form: { action: "/admin/login", method: "post", id: "admin-login", fields: [
      { id: "login-email", name: "email", type: "email", label: "Email", autocomplete: "email", required: true },
      { id: "login-password", name: "password", type: "password", label: "Password", autocomplete: "current-password", required: true }
    ], submitAction: "sign-in", submitLabel: "Sign in" },
    accessCopy: { heading: "Access is limited to the administrator.", body: "Only the Babas & Brasse administrator can sign in and edit publication content." },
    recoveryLinks: [ { href: "/", label: "Return to public site" } ],
    sections: {
      states: { notes: ["login-invalid", "login-locked", "login-loading", "login-redirect"], items: ["invalid", "locked", "loading", "redirect"], redirectHref: "/admin" },
      security: { notes: ["role-check", "session-expiry", "csrf-protection", "audit-logging"], items: ["role-check", "session-expiry", "csrf-protection", "audit-logging"] }
    }
  };
}
