function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getAuthSupportRoutes() {
  return [
    { id: "admin-login", label: "Admin Login", path: "/admin/login", file: "src/pages/admin/login.html" },
    { id: "password-reset", label: "Password Reset", path: "/admin/password-reset", file: "src/pages/admin/password-reset.html" }
  ];
}

function renderAuthHeader(label) {
  return `<header data-section="auth-support-header">
    <a class="brand-mark" href="/admin/login">B&amp;B Admin</a>
    <p>${escapeHtml(label)}</p>
  </header>`;
}

function renderAdminLoginPage() {
  return `<section data-page="admin-login" data-route="/admin/login" data-area="support" data-generated="admin-auth-renderer" data-wireframe-source="auth-login.html" data-support-route="auth" data-responsive="desktop-split mobile-stacked">
  ${renderAuthHeader("Secure sign in")}

  <section data-section="login-form-shell">
    <div class="login-form-panel">
      <p class="eyebrow">Editor login</p>
      <h1>Sign in to Babas &amp; Brasse Admin.</h1>
      <form action="/admin/login" method="post" data-form="admin-login">
        <label for="login-email">Email</label>
        <input id="login-email" name="email" type="email" autocomplete="email" required>

        <label for="login-password">Password</label>
        <input id="login-password" name="password" type="password" autocomplete="current-password" required>

        <button type="submit" data-action="sign-in">Sign in</button>
      </form>
      <a href="/admin/password-reset">Forgot password</a>
    </div>
    <aside data-section="login-access-copy">
      <h2>Access is limited to editors.</h2>
      <p>Never reveal whether email exists. Show the same secure response shape for unknown accounts and incorrect passwords.</p>
      <a href="/">Return to public site</a>
    </aside>
  </section>

  <section data-section="login-states" data-state-note="login-invalid" data-state-note="login-locked" data-state-note="login-loading" data-state-note="login-redirect">
    <h2>Login states</h2>
    <article data-state="invalid">Invalid credentials show an error summary and focus the first invalid field.</article>
    <article data-state="locked">Locked account explains that the editor should retry later or contact support.</article>
    <article data-state="loading">Loading disables the submit button while the sign-in request is pending.</article>
    <article data-state="redirect">Successful login redirects to <a href="/admin">Admin Dashboard</a>.</article>
  </section>

  <section data-section="login-recovery-links">
    <h2>Recovery links</h2>
    <a href="/admin/password-reset">Forgot password</a>
    <a href="/">Return to public site</a>
  </section>

  <section data-section="login-security" data-security-note="role-check" data-security-note="session-expiry" data-security-note="csrf-protection" data-security-note="audit-logging">
    <h2>Security handoff</h2>
    <article data-security="role-check">Role check runs after authentication before admin routes unlock.</article>
    <article data-security="session-expiry">Session expiry returns editors to this login route.</article>
    <article data-security="csrf-protection">CSRF protection is required for credential submission.</article>
    <article data-security="audit-logging">Audit logging records successful and failed admin access attempts.</article>
  </section>
</section>`;
}

function renderPasswordResetPage() {
  return `<section data-page="password-reset" data-route="/admin/password-reset" data-area="support" data-generated="admin-auth-renderer" data-wireframe-source="password-reset.html" data-support-route="auth" data-responsive="desktop-split mobile-stacked">
  ${renderAuthHeader("Password reset")}

  <section data-section="reset-request">
    <div class="reset-request-panel">
      <p class="eyebrow">Request reset</p>
      <h1>Reset admin access.</h1>
      <form action="/admin/password-reset/request" method="post" data-form="password-reset-request">
        <label for="reset-email">Email</label>
        <input id="reset-email" name="email" type="email" autocomplete="email" required>
        <button type="submit" data-action="request-reset">Send reset link</button>
      </form>
      <p>Neutral confirmation copy is shown whether or not the email belongs to an editor account.</p>
    </div>
  </section>

  <section data-section="reset-confirm" data-security-note="token-expiry" data-security-note="rate-limit">
    <h2>Confirm reset</h2>
    <form action="/admin/password-reset/confirm" method="post" data-form="password-reset-confirm">
      <label for="reset-token">Reset token</label>
      <input id="reset-token" name="token" type="text" autocomplete="one-time-code" required>

      <label for="reset-password">New password</label>
      <input id="reset-password" name="password" type="password" autocomplete="new-password" required>

      <label for="reset-password-confirm">Confirm password</label>
      <input id="reset-password-confirm" name="passwordConfirm" type="password" autocomplete="new-password" required>

      <p>Password strength guidance checks length, uniqueness, and common-password risk.</p>
      <button type="submit" data-action="confirm-reset">Update password</button>
    </form>
  </section>

  <section data-section="reset-states" data-state-note="reset-email-sent" data-state-note="reset-token-expired" data-state-note="reset-password-mismatch" data-state-note="reset-success">
    <h2>Password reset states</h2>
    <article data-state="email-sent">Email sent state uses neutral confirmation copy.</article>
    <article data-state="token-expired">Expired token prompts the editor to request a new link.</article>
    <article data-state="password-mismatch">Password mismatch focuses the confirmation field.</article>
    <article data-state="success">Reset success returns the editor to <a href="/admin/login">Admin Login</a>.</article>
  </section>

  <section data-section="reset-return">
    <h2>Return path</h2>
    <a href="/admin/login">Back to login</a>
    <p>Support note keeps editors from getting trapped in the auth flow.</p>
  </section>
</section>`;
}

module.exports = {
  getAuthSupportRoutes,
  renderAdminLoginPage,
  renderPasswordResetPage
};
