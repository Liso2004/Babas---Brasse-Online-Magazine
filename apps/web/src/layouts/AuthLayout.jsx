import { Link } from "react-router-dom";

export function AuthLayout({ route, children }) {
  return (
    <div className="app-layout auth-layout">
      <a className="skip-link" href="#main-content">Skip to sign in</a>
      <header className="auth-header">
        <Link className="brand-mark" to="/">
          <img className="brand-logo" src="/media/babas-brasse-logo.jpeg" alt="Babas and Brasse" />
        </Link>
        <Link className="auth-back-link" to="/">Back to magazine</Link>
      </header>
      <main id="main-content" data-route-id={route.id}>{children}</main>
    </div>
  );
}
