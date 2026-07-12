import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FigmaSupportPanel } from "../components/FigmaSupportSurface.jsx";
import { buildAdminLoginRouteModel } from "./adminAuthRouteModel.js";

export function AdminLoginPage() {
  const model = buildAdminLoginRouteModel();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Login failed");
      const session = await response.json();
      if (session.role !== "admin") throw new Error("Admin role required");
      navigate("/admin", { replace: true });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="figma-support-page figma-auth-page figma-login-page" data-page="admin-login" data-route={model.route.path} data-support-route="auth">
      <header className="figma-support-header"><a className="brand-mark" href="/">{model.header.brand}</a><p>{model.header.label}</p></header>
      <section className="figma-auth-shell">
        <FigmaSupportPanel as="div" className="figma-support-form-panel">
          <p className="eyebrow">{model.hero.eyebrow}</p>
          <h1>{model.hero.title}</h1>
          <form onSubmit={handleSubmit} data-form={model.form.id} noValidate>
            {model.form.fields.map((field) => <label key={field.name} htmlFor={field.id}>{field.label}<input id={field.id} name={field.name} type={field.type} autoComplete={field.autocomplete} required /></label>)}
            <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Signing in..." : model.form.submitLabel}</button>
            <p className="public-form-status" data-form-status={status} aria-live="polite">{status === "error" ? "The email or password is incorrect, or admin access is not configured." : ""}</p>
          </form>
        </FigmaSupportPanel>
        <FigmaSupportPanel as="aside" className="figma-support-copy-panel"><h2>{model.accessCopy.heading}</h2><p>{model.accessCopy.body}</p><a href="/">Return to public site</a></FigmaSupportPanel>
      </section>
    </section>
  );
}
