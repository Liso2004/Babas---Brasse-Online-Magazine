import { useId, useState } from "react";
import { normalizeEmail, submitPublicForm, validateEmail } from "../forms/publicFormClient.js";

const messages = {
  idle: "",
  validation: "Enter a valid email address.",
  submitting: "Submitting your subscription...",
  success: "Thanks. Check your inbox to confirm your subscription.",
  error: "We could not complete your subscription. Please try again."
};

export function NewsletterSignup({ idPrefix = "newsletter", placeholder = "your@email.com" }) {
  const reactId = useId();
  const inputId = `${idPrefix}-${reactId.replace(/:/g, "")}`;
  const statusId = `${inputId}-status`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = normalizeEmail(email);
    if (!validateEmail(normalizedEmail)) {
      setStatus("validation");
      return;
    }

    setStatus("submitting");
    try {
      await submitPublicForm("newsletter", { email: normalizedEmail });
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <form className="newsletter-form" onSubmit={handleSubmit} data-form="newsletter" data-form-status={status} noValidate>
        <label className="newsletter-field" htmlFor={inputId}>
          <span>Email</span>
          <input
            id={inputId}
            name="email"
            type="email"
            value={email}
            placeholder={placeholder}
            autoComplete="email"
            required
            aria-invalid={status === "validation"}
            aria-describedby={statusId}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status === "validation" || status === "error") setStatus("idle");
            }}
          />
        </label>
        <button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      <p id={statusId} className="public-form-status" data-form-status={status} aria-live="polite">
        {messages[status]}
      </p>
    </>
  );
}
