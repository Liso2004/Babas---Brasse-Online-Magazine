import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Facebook, Instagram, Menu, Music2, Pin, X as CloseIcon } from "lucide-react";
import { Button } from "../components/ui/button.jsx";

const primaryNavigation = [
  { label: "About", href: "/about" },
  { label: "Photography", href: "/search?topic=photography" },
  { label: "Media", href: "/featured" },
  { label: "Contact Us", href: "/contact" }
];

const homeDropdownNavigation = [
  { label: "Theater", href: "/search?category=reviews&topic=theatre" },
  { label: "Essays", href: "/search?category=essays" },
  { label: "Short Stories", href: "/search?category=short-stories" },
  { label: "Literature", href: "/search?category=reviews&topic=books" },
  { label: "Interviews", href: "/search?category=interviews" },
  { label: "Opinion Pieces", href: "/search?category=opinion" }
];

const articleDropdownNavigation = [
  { label: "Fashion", href: "/search?category=articles&topic=fashion" },
  { label: "Music", href: "/search?category=articles&topic=music" },
  { label: "Art", href: "/search?category=articles&topic=art" }
];

// Replace these platform homepages with verified Babas & Brasse profile URLs before launch.
const socialNavigation = [
  { label: "Facebook", href: "https://www.facebook.com/", placeholder: true, Icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/", placeholder: true, Icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/", placeholder: true, Icon: Music2 },
  { label: "Pinterest", href: "https://www.pinterest.com/", placeholder: true, Icon: Pin }
];

export function PublicLayout({ route, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [articleMenuOpen, setArticleMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

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
    setHomeMenuOpen(false);
    setArticleMenuOpen(false);
    setMobileMenuOpen(false);
  }

  function closeHomeMenu() {
    setHomeMenuOpen(false);
    setArticleMenuOpen(false);
  }

  function handleDropdownBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeHomeMenu();
    }
  }

  useEffect(() => {
    closeNavigation();
  }, [location.pathname, location.search]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") closeNavigation();
    }

    function handlePointerDown(event) {
      if ((homeMenuOpen || articleMenuOpen) && !headerRef.current?.contains(event.target)) {
        closeHomeMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [homeMenuOpen, articleMenuOpen]);

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
                <div
                  className="primary-nav-dropdown"
                  onMouseEnter={() => setHomeMenuOpen(true)}
                  onMouseLeave={closeHomeMenu}
                  onFocus={() => setHomeMenuOpen(true)}
                  onBlur={handleDropdownBlur}
                >
                  <div className="primary-nav-dropdown__topline">
                    <Link to="/" aria-current={location.pathname === "/" ? "page" : undefined} onClick={closeNavigation}>
                      Home
                    </Link>
                    <button
                      type="button"
                      className="primary-nav-dropdown__toggle"
                      aria-label="Toggle Home sections"
                      aria-expanded={homeMenuOpen}
                      aria-controls="home-navigation-menu"
                      onClick={() => setHomeMenuOpen((open) => !open)}
                    >
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>
                  </div>
                  <div id="home-navigation-menu" className="primary-nav-menu" data-open={homeMenuOpen ? "true" : "false"} hidden={!homeMenuOpen}>
                    {homeDropdownNavigation.map((item) => (
                      <Link key={item.href} to={item.href} aria-current={isSectionActive(item) ? "page" : undefined} onClick={closeNavigation}>
                        {item.label}
                      </Link>
                    ))}
                    <div
                      className="primary-nav-submenu"
                      onMouseEnter={() => setArticleMenuOpen(true)}
                      onMouseLeave={() => setArticleMenuOpen(false)}
                      onFocus={() => setArticleMenuOpen(true)}
                      onBlur={handleDropdownBlur}
                    >
                      <button
                        type="button"
                        aria-expanded={articleMenuOpen}
                        aria-controls="articles-navigation-menu"
                        onClick={() => setArticleMenuOpen((open) => !open)}
                      >
                        Articles <ChevronDown size={15} aria-hidden="true" />
                      </button>
                      <div id="articles-navigation-menu" className="primary-nav-submenu__panel" data-open={articleMenuOpen ? "true" : "false"} hidden={!articleMenuOpen}>
                        {articleDropdownNavigation.map((item) => (
                          <Link key={item.href} to={item.href} aria-current={isSectionActive(item) ? "page" : undefined} onClick={closeNavigation}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {primaryNavigation.map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    to={item.href}
                    aria-current={isSectionActive(item) ? "page" : undefined}
                    onClick={closeNavigation}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <nav className="header-social-navigation" aria-label="Social media">
              {socialNavigation.map(({ label, href, placeholder, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-placeholder={placeholder ? "true" : undefined}
                  aria-label={`${label}${placeholder ? " placeholder profile" : ""} (opens in a new tab)`}
                  title={label}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </nav>
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
              closeHomeMenu();
            }}
          >
            {mobileMenuOpen ? <CloseIcon size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="sr-only">{mobileMenuOpen ? "Close navigation" : "Open navigation"}</span>
          </Button>
        </div>
      </header>

      <main id="main-content" data-route-id={route.id}>{children}</main>

      <footer className="figma-footer" aria-label="Site footer">
        <div className="figma-footer__inner">
          <section className="figma-footer__brand" aria-label="Babas and Brasse summary">
            <img src="/media/babas-brasse-logo.jpeg" alt="Babas and Brasse" />
            <p>Stories with nerve, care, and a point of view.</p>
          </section>
          <section className="figma-footer__copyright" aria-label="Copyright">
            <p>Copyright 2026 Babas & Brasse. All rights reserved.</p>
          </section>
          <section className="figma-footer__socials" aria-label="Social media">
            <div className="figma-footer__social-links">
              {socialNavigation.map(({ label, href, placeholder, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-placeholder={placeholder ? "true" : undefined}
                  aria-label={label + (placeholder ? " placeholder profile" : "") + " (opens in a new tab)"}
                  title={label + (placeholder ? " placeholder profile" : "")}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
