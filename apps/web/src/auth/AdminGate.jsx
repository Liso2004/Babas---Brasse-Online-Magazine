import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function AdminGate({ children, denied = null }) {
  const [session, setSession] = useState({ status: "loading", role: null });
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    function refreshSession() {
      setSession({ status: "loading", role: null });
      setRevision((current) => current + 1);
    }

    window.addEventListener("babas-admin-session-changed", refreshSession);
    return () => window.removeEventListener("babas-admin-session-changed", refreshSession);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session", { credentials: "include", headers: { Accept: "application/json" } })
      .then(async (response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (active) setSession({ status: payload?.role === "admin" ? "ready" : "denied", role: payload?.role || null });
      })
      .catch(() => {
        if (active) setSession({ status: "denied", role: null });
      });
    return () => { active = false; };
  }, [revision]);

  if (session.status === "loading") {
    return <section className="figma-support-panel" aria-live="polite"><p>Checking admin access...</p></section>;
  }

  if (session.role !== "admin") {
    return denied || <Navigate to="/admin/login" replace />;
  }

  return children;
}
