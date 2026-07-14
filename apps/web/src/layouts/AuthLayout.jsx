import { Link } from "react-router-dom";

export function AuthLayout({ route, children }) {
  return (
    <div className="app-layout auth-layout" data-auth-design="stitch-private-login-v4">
      <a className="skip-link" href="#main-content">Skip to sign in</a>
      <header className="auth-header">
        <Link className="brand-mark" to="/" aria-label="Babas and Brasse home">
          <img className="brand-logo" src="/media/babas-brasse-logo.jpeg" alt="Babas and Brasse" />
        </Link>
        <p>Private workspace</p>
        <Link className="auth-back-link" to="/">Back to magazine</Link>
      </header>
      <main id="main-content" data-route-id={route.id}>{children}</main>
    </div>
  );
}
