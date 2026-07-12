import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function AdminGate({ children }) {
  const [session, setSession] = useState({ status: "loading", role: null });

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
  }, []);

  if (session.status === "loading") {
    return <section className="figma-support-panel" aria-live="polite"><p>Checking admin access...</p></section>;
  }

  if (session.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
