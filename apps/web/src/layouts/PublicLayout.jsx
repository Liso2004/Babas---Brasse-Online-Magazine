import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, UserRound, X } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";

const finalDesignSections = [
  { label: "Home", href: "/" },
  { label: "Theatre Reviews", href: "/search?category=reviews&topic=theatre" },
  { label: "Book Reviews", href: "/search?category=reviews&topic=books" },
  { label: "Essays", href: "/search?category=essays" },
  { label: "Opinion", href: "/search?category=essays&topic=opinion" }
];

const moreNavigation = [
  { label: "About", to: "/about" },
  { label: "Creative Team", to: "/creative-team" },
  { label: "Contributors", to: "/contributors" },
  { label: "Visceral Mag", to: "/visceral-mag" },
  { label: "Featured", to: "/featured" },
  { label: "Contact", to: "/contact" }
];

export function PublicLayout({ route, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function isSectionActive(item) {
    const [pathname, search = ""] = item.href.split("?");
    if (location.pathname !== pathname) return false;
    if (!search) return location.search === "";

    const expected = new URLSearchParams(search);
    const actual = new URLSearchParams(location.search);
    const allExpectedMatch = [...expected.entries()].every(([key, value]) => actual.get(key) === value);
    const hasUnexpectedTopic = !expected.has("topic") && actual.has("topic");
    return allExpectedMatch && !hasUnexpectedTopic;
  }

  function submitSearch(event) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim() || "";
    navigate(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    setMobileMenuOpen(false);
  }

  return (
    <div className="app-layout public-layout">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header final-design-header">
        <div className="header-topline">
          <Link className="brand-mark" to="/">
            <img className="brand-logo" src="/media/babas-brasse-logo.jpeg" alt="Babas and Brasse" />
          </Link>

          <div className="figma-header-actions">
            <form className="header-search" role="search" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="site-search">Search articles</label>
              <Search size={16} aria-hidden="true" />
              <Input id="site-search" name="q" type="search" placeholder="Search articles..." autoComplete="off" />
            </form>
            <Button className="admin-login-control" asChild variant="ghost" size="icon">
              <Link to="/admin/login" aria-label="Admin login" title="Admin login">
                <UserRound size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button
              className="final-design-menu-toggle"
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={mobileMenuOpen}
              aria-controls="public-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </div>
        </div>

        <div id="public-navigation" className="final-design-navigation" data-mobile-open={mobileMenuOpen ? "true" : "false"}>
          <div className="mobile-navigation-tools">
            <form className="mobile-header-search" role="search" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="mobile-site-search">Search articles</label>
              <Search size={16} aria-hidden="true" />
              <Input id="mobile-site-search" name="q" type="search" placeholder="Search articles..." autoComplete="off" />
            </form>
            <Link to="/admin/login" onClick={() => setMobileMenuOpen(false)}>
              <UserRound size={16} aria-hidden="true" /> Admin login
            </Link>
          </div>
          <nav aria-label="Public navigation">
            {finalDesignSections.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                aria-current={isSectionActive(item) ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <details className="figma-more-navigation">
            <summary>More</summary>
            <nav aria-label="More pages">
              {moreNavigation.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
              ))}
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content" data-route-id={route.id}>{children}</main>

      <footer className="figma-footer" aria-label="Site footer">
        <div className="figma-footer__inner">
          <section className="figma-footer__brand" aria-label="Babas and Brasse summary">
            <img src="/media/babas-brasse-logo.jpeg" alt="Babas and Brasse" />
            <p>A digital magazine celebrating South African literature, theatre, and culture. Featuring critical essays, reviews, and thought-provoking commentary.</p>
          </section>
          <nav aria-label="Footer sections">
            <h2>Sections</h2>
            {finalDesignSections.slice(1).map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}
          </nav>
          <nav aria-label="Footer about links">
            <h2>About</h2>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/contributors">Submit Writing</Link>
            <Link to="/#newsletter">Newsletter</Link>
          </nav>
        </div>
        <p className="figma-footer__legal">Copyright 2026 Babas & Brasse. All rights reserved.</p>
      </footer>
    </div>
  );
}
