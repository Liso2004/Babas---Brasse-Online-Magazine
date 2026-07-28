import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);

function browserLocation() {
  return { pathname: window.location.pathname, search: window.location.search, hash: window.location.hash };
}

function RouterProvider({ initialLocation, children }) {
  const [location, setLocation] = useState(initialLocation || browserLocation);
  const memory = Boolean(initialLocation);

  useEffect(() => {
    if (memory) return undefined;
    const update = () => setLocation(browserLocation());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, [memory]);

  const navigate = useCallback((destination, options = {}) => {
    const target = new URL(String(destination), memory ? "http://memory.local" : window.location.href);
    const next = { pathname: target.pathname, search: target.search, hash: target.hash };
    if (!memory) {
      window.history[options.replace ? "replaceState" : "pushState"]({}, "", `${next.pathname}${next.search}${next.hash}`);
    }
    setLocation(next);
  }, [memory]);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function BrowserRouter({ children }) {
  return <RouterProvider>{children}</RouterProvider>;
}

export function MemoryRouter({ initialEntries = ["/"], children }) {
  const target = new URL(initialEntries[0] || "/", "http://memory.local");
  return (
    <RouterProvider initialLocation={{ pathname: target.pathname, search: target.search, hash: target.hash }}>
      {children}
    </RouterProvider>
  );
}

export function useLocation() {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useLocation must be used inside a router.");
  return context.location;
}

export function useNavigate() {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useNavigate must be used inside a router.");
  return context.navigate;
}

export function Link({ to, onClick, target, children, ...props }) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to);
  };
  return <a {...props} href={to} target={target} onClick={handleClick}>{children}</a>;
}

export function NavLink({ to, className, children, ...props }) {
  const location = useLocation();
  const active = location.pathname === to;
  const resolvedClassName = typeof className === "function" ? className({ isActive: active }) : className;
  return <Link {...props} to={to} className={resolvedClassName} aria-current={active ? "page" : undefined}>{children}</Link>;
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();
  useEffect(() => { navigate(to, { replace }); }, [navigate, replace, to]);
  return null;
}
