import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";

const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Visceral Mag", href: "/visceral-mag" },
  { label: "Featured / Media", href: "/featured" },
  { label: "Contact", href: "/contact" }
];

const editorialNavigation = [
  { label: "Theatre Reviews", href: "/search?category=reviews&topic=theatre" },
  { label: "Book Reviews", href: "/search?category=reviews&topic=books" },
  { label: "Essays", href: "/search?category=essays" },
  { label: "Opinion", href: "/search?category=essays&topic=opinion" }
];

const peopleNavigation = [
  { label: "Creative Team", href: "/creative-team" },
  { label: "Contributors", href: "/contributors" }
];

export function PublicLayout({ route, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editorialMenuOpen, setEditorialMenuOpen] = useState(false);
  const headerRef = useRef(null);
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

  function closeNavigation() {
    setEditorialMenuOpen(false);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    closeNavigation();
  }, [location.pathname, location.search]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") closeNavigation();
    }

    function handlePointerDown(event) {
      if (editorialMenuOpen && !headerRef.current?.contains(event.target)) {
        setEditorialMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [editorialMenuOpen]);

  function submitSearch(event) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim() || "";
    navigate(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    closeNavigation();
  }

  return (
    <div className="app-layout public-layout" data-public-design="visceral-brutalist-archive">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header final-design-header production-editorial-header" ref={headerRef}>
        <div className="header-topline">
          <Link className="brand-mark" to="/" onClick={closeNavigation}>
            <img className="brand-logo" src="/media/babas-brasse-logo.jpeg" alt="Babas and Brasse" />
          </Link>

          <div
            id="public-navigation"
            className="final-design-navigation"
            data-mobile-open={mobileMenuOpen ? "true" : "false"}
          >
            <div className="primary-navigation-cluster">
              <nav className="primary-public-navigation" aria-label="Public navigation">
                {primaryNavigation.map((item, index) => (
                  <Fragment key={item.href}>
                    {index > 0 && <span className="primary-nav-separator" aria-hidden="true">///</span>}
                    <Link
                      to={item.href}
                      aria-current={isSectionActive(item) ? "page" : undefined}
                      onClick={closeNavigation}
                    >
                      {item.label}
                    </Link>
                  </Fragment>
                ))}
              </nav>

              <span className="primary-nav-separator primary-nav-separator--sections" aria-hidden="true">///</span>
              <Button
                className="editorial-menu-trigger"
                type="button"
                variant="ghost"
                aria-expanded={editorialMenuOpen}
                aria-controls="editorial-navigation-panel"
                onClick={() => setEditorialMenuOpen((open) => !open)}
              >
                Sections <ChevronDown size={17} aria-hidden="true" />
              </Button>
            </div>

            <form className="header-search" role="search" onSubmit={submitSearch}>
              <label className="sr-only" htmlFor="site-search">Search articles</label>
              <Input id="site-search" name="q" type="search" placeholder="Search articles..." autoComplete="off" />
              <Button type="submit" variant="ghost" size="icon" aria-label="Search articles">
                <Search size={19} aria-hidden="true" />
              </Button>
            </form>
            <section
              id="editorial-navigation-panel"
              className="editorial-navigation-panel"
              data-open={editorialMenuOpen ? "true" : "false"}
              aria-label="Explore Babas and Brasse"
              hidden={!editorialMenuOpen}
            >
              <div className="editorial-navigation-grid">
                <div className="editorial-navigation-intro">
                  <p className="eyebrow">Explore the magazine</p>
                  <h2>Stories with nerve, care, and a point of view.</h2>
                  <p>South African literature, theatre, art, and culture, edited for readers who want to stay with an idea.</p>
                </div>
                <nav aria-label="Editorial sections">
                  <h2>Read</h2>
                  {editorialNavigation.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      aria-current={isSectionActive(item) ? "page" : undefined}
                      onClick={closeNavigation}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <nav aria-label="People">
                  <h2>People</h2>
                  {peopleNavigation.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      aria-current={isSectionActive(item) ? "page" : undefined}
                      onClick={closeNavigation}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </section>
          </div>

          <Button
            className="final-design-menu-toggle"
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={mobileMenuOpen}
            aria-controls="public-navigation"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setEditorialMenuOpen(false);
            }}
          >
            {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="sr-only">{mobileMenuOpen ? "Close navigation" : "Open navigation"}</span>
          </Button>
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
            <Link to="/visceral-mag">Visceral Mag</Link>
            <Link to="/featured">Featured / Media</Link>
            {editorialNavigation.map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}
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
