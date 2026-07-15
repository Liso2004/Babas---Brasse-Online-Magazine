import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { buildAdminLoginRouteModel } from "./adminAuthRouteModel.js";

export function AdminLoginPage() {
  const model = buildAdminLoginRouteModel();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [showPassword, setShowPassword] = useState(false);

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
      window.dispatchEvent(new Event("babas-admin-session-changed"));
      navigate("/admin", { replace: true });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className="stitch-admin-login"
      data-page="admin-login"
      data-route={model.route.path}
      data-design-reference="admin-login-v4"
    >
      <aside className="stitch-login-manifesto" aria-label="Babas and Brasse editorial access">
        <div className="stitch-login-lockup">
          <span className="stitch-login-monogram">B/B</span>
          <p>Babas &amp; Brasse</p>
        </div>
        <div className="stitch-login-statement">
          <LockKeyhole size={42} strokeWidth={1.5} aria-hidden="true" />
          <p>Private</p>
          <p>Editorial</p>
          <p>Access</p>
        </div>
        <p className="stitch-login-edition">Johannesburg / 2026</p>
      </aside>

      <div className="stitch-login-stage">
        <div className="stitch-login-heading">
          <p className="eyebrow"><ShieldCheck size={15} aria-hidden="true" /> Admin only</p>
          <h1>{model.hero.title}</h1>
          <p>{model.accessCopy.body}</p>
        </div>

        <form className="stitch-login-form" onSubmit={handleSubmit} data-form={model.form.id} noValidate>
          {model.form.fields.map((field) => {
            const isPassword = field.type === "password";
            return (
              <label key={field.name} htmlFor={field.id}>
                <span>{field.label}</span>
                <span className={isPassword ? "stitch-password-field" : undefined}>
                  <input
                    id={field.id}
                    name={field.name}
                    type={isPassword && showPassword ? "text" : field.type}
                    autoComplete={field.autocomplete}
                    aria-invalid={status === "error" ? "true" : undefined}
                    required
                  />
                  {isPassword ? (
                    <button
                      className="stitch-password-toggle"
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((visible) => !visible)}
                    >
                      {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                    </button>
                  ) : null}
                </span>
              </label>
            );
          })}
          <button className="stitch-login-submit" type="submit" disabled={status === "submitting"}>
            <span>{status === "submitting" ? "Signing in..." : model.form.submitLabel}</span>
            <ArrowRight aria-hidden="true" />
          </button>
          <p className="stitch-login-status" data-form-status={status} aria-live="polite">
            {status === "error" ? "The email or password is incorrect, or admin access is not configured." : ""}
          </p>
        </form>

        <div className="stitch-login-footer">
          <p><ShieldCheck size={16} aria-hidden="true" /> Protected administrator session</p>
          <Link to="/">Return to the magazine</Link>
        </div>
      </div>
    </section>
  );
}
