import { getRouteByPath } from "../routes.js";

export function getAuthSupportRoutes() {
  return [
    { id: "admin-login", label: "Admin Login", path: "/admin/login", file: "src/pages/admin/login.html" },
    { id: "password-reset", label: "Password Reset", path: "/admin/password-reset", file: "src/pages/admin/password-reset.html" }
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
    recoveryLinks: [ { href: "/admin/password-reset", label: "Forgot password" }, { href: "/", label: "Return to public site" } ],
    sections: {
      states: { notes: ["login-invalid", "login-locked", "login-loading", "login-redirect"], items: ["invalid", "locked", "loading", "redirect"], redirectHref: "/admin" },
      security: { notes: ["role-check", "session-expiry", "csrf-protection", "audit-logging"], items: ["role-check", "session-expiry", "csrf-protection", "audit-logging"] }
    }
  };
}

export function buildPasswordResetRouteModel() {
  const route = getRouteByPath("/admin/password-reset");
  return {
    pageId: "password-reset",
    generatedFrom: "admin-auth-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    header: { brand: "B&B Admin", label: "Password reset", href: "/admin/login" },
    hero: { eyebrow: "Request reset", title: "Reset admin access." },
    request: { action: "/admin/password-reset/request", method: "post", neutralCopy: "Neutral confirmation copy is shown whether or not the email belongs to the administrator account.", fields: [ { id: "reset-email", name: "email", type: "email", label: "Email", autocomplete: "email", required: true } ], submitAction: "request-reset", submitLabel: "Send reset link" },
    confirm: { action: "/admin/password-reset/confirm", method: "post", strengthCopy: "Password strength guidance checks length, uniqueness, and common-password risk.", fields: [
      { id: "reset-token", name: "token", type: "text", label: "Reset token", autocomplete: "one-time-code", required: true },
      { id: "reset-password", name: "password", type: "password", label: "New password", autocomplete: "new-password", required: true },
      { id: "reset-password-confirm", name: "passwordConfirm", type: "password", label: "Confirm password", autocomplete: "new-password", required: true }
    ], submitAction: "confirm-reset", submitLabel: "Update password" },
    returnLink: { href: "/admin/login", label: "Back to login" },
    sections: { states: { notes: ["reset-email-sent", "reset-token-expired", "reset-password-mismatch", "reset-success"], items: ["email-sent", "token-expired", "password-mismatch", "success"] }, security: { notes: ["token-expiry", "rate-limit"] } }
  };
}
