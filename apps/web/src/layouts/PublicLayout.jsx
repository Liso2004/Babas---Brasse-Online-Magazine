import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Facebook, Instagram, Menu, Music2, Pin, X, Youtube } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { FigmaSearchTool } from "../components/FigmaSearchTool.jsx";
import { useCart } from "../cart/CartContext.jsx";

const primaryNavigation = [
  { label: "Drop 01", href: "/" },
  { label: "Our Code", href: "/about" },
  { label: "The Journal", href: "/visceral-mag" },
  { label: "Lookbook", href: "/featured" },
  { label: "Stockists", href: "/contact" }
];

const editorialNavigation = [
  { label: "Shop", href: "/" },
  { label: "Heavyweight Fleece", href: "/search?category=style" },
  { label: "Boxy Cut", href: "/search?category=objects" },
  { label: "Capsule Collection", href: "/search?category=art" },
  { label: "Archive", href: "/search?category=sound" },
  { label: "Visual Research", href: "/moodboard" }
];

const peopleNavigation = [
  { label: "The Crew", href: "/creative-team" },
  { label: "The Archive", href: "/contributors" }
];

// Replace these platform homepages with verified URBAN ANARCHY profile URLs before launch.
const socialNavigation = [
  { label: "Instagram", href: "https://www.instagram.com/urbananarchy", Icon: Instagram },
  { label: "X", href: "https://x.com/urbananarchy", Icon: X },
  { label: "Facebook", href: "https://www.facebook.com/urbananarchy", Icon: Facebook },
  { label: "TikTok", href: "https://www.tiktok.com/@urbananarchy", Icon: Music2 },
  { label: "YouTube", href: "https://www.youtube.com/@urbananarchy", Icon: Youtube },
  { label: "Pinterest", href: "https://www.pinterest.com/urbananarchy", Icon: Pin }
];

export function PublicLayout({ route, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editorialMenuOpen, setEditorialMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();

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
    <div className="app-layout public-layout" data-public-design="visceral-brutalist-archive" data-profile-route={route.id === "profile-detail" ? "true" : undefined}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header final-design-header production-editorial-header" ref={headerRef}>
        <div className="header-topline">
          <Link className="brand-mark" to="/" onClick={closeNavigation}>
            <span className="brand-name">URBAN ANARCHY</span>
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
              <Link className="urban-cart-link" to="/cart" onClick={closeNavigation} aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}>
                Cart <span>{itemCount}</span>
              </Link>
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

            <FigmaSearchTool className="figma-search-tool--overlay" id="site-search" onSubmit={submitSearch} overlay />
            <section
              id="editorial-navigation-panel"
              className="editorial-navigation-panel"
              data-open={editorialMenuOpen ? "true" : "false"}
              aria-label="Explore URBAN ANARCHY"
              hidden={!editorialMenuOpen}
            >
              <div className="editorial-navigation-grid">
                <div className="editorial-navigation-intro">
                  <p className="eyebrow">SYSTEM MALFUNCTION</p>
                  <h2>DROP DATA FOR THE CONCRETE GRID.</h2>
                  <p>HEAVYWEIGHT CUTS, ARCHIVE OBJECTS, AND RAW STREET SIGNALS. NO RESTOCKS.</p>
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
          <section className="figma-footer__brand" aria-label="URBAN ANARCHY summary">
            <p className="brand-name">URBAN ANARCHY</p>
            <p>HEAVYWEIGHT CUTS. RAW HEMS. CAPSULES BUILT FOR THE CONCRETE GRID.</p>
          </section>
          <nav aria-label="Footer sections">
            <h2>Sections</h2>
            <Link to="/visceral-mag">ARCHIVE</Link>
            <Link to="/featured">LOOKBOOK</Link>
            {editorialNavigation.map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}
          </nav>
          <nav aria-label="Footer about links">
            <h2>About</h2>
            <Link to="/about">MANIFESTO</Link>
            <Link to="/contact">CONTACT</Link>
            <Link to="/contributors">THE CREW</Link>
            <Link to="/#newsletter">DROP SIGNAL</Link>
          </nav>
          <section className="figma-footer__socials" aria-label="Social media">
            <h2>Follow</h2>
            <div className="figma-footer__social-links">
              {socialNavigation.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label + " / URBAN ANARCHY (opens in a new tab)"}
                  title={label + " / URBAN ANARCHY"}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
        <p className="figma-footer__legal">Copyright 2026 URBAN ANARCHY. All rights reserved.</p>
      </footer>
    </div>
  );
}
