import { useState } from "react";
import * as launchFixtures from "../data/launchFixtures.js";
import { NewsletterSignup } from "../components/NewsletterSignup.jsx";
import { submitPublicForm, validateEmail } from "../forms/publicFormClient.js";
import { buildContactRouteModel } from "./contactRouteModel.js";

const contactMessages = {
  idle: "",
  validation: "Complete the required fields with a valid email address.",
  submitting: "Sending your message...",
  success: "Thanks. Your message was submitted to the editorial team.",
  error: "We couldn't send your message. Your text is still here, so you can try again."
};

function ContactField({ field, className = "" }) {
  if (field.purpose === "spam-protection") {
    return (
      <div hidden aria-hidden="true" data-field={field.purpose}>
        <label htmlFor={field.id}>
          {field.label}
          <input id={field.id} name={field.name} type={field.type} autoComplete="off" tabIndex="-1" />
        </label>
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <label className={className} htmlFor={field.id} data-field={field.purpose || field.name}>
        <span>{field.label}</span>
        <select id={field.id} name={field.name} autoComplete={field.autocomplete || "off"} required={field.required}>
          {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className={className} htmlFor={field.id} data-field={field.name}>
        <span>{field.label}</span>
        <textarea id={field.id} name={field.name} rows={field.rows} autoComplete={field.autocomplete || "off"} required={field.required} />
      </label>
    );
  }

  return (
    <label className={className} htmlFor={field.id} data-field={field.purpose || field.name}>
      <span>{field.label}</span>
      <input id={field.id} name={field.name} type={field.type} autoComplete={field.autocomplete} required={field.required} tabIndex={field.tabIndex} />
    </label>
  );
}

export function ContactPage({ fixtures = launchFixtures }) {
  const model = buildContactRouteModel(fixtures);
  const { hero, sections, form, newsletter } = model;
  const [contactStatus, setContactStatus] = useState("idle");

  async function handleContactSubmit(event) {
    event.preventDefault();
    const contactForm = event.currentTarget;
    const payload = Object.fromEntries(new FormData(contactForm).entries());

    if (payload.website) {
      contactForm.reset();
      setContactStatus("success");
      return;
    }

    if (!payload.name?.trim() || !validateEmail(payload.email) || !payload.subject || !payload.message?.trim()) {
      setContactStatus("validation");
      return;
    }

    setContactStatus("submitting");
    try {
      await submitPublicForm("contact", {
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        subject: payload.subject,
        message: payload.message.trim()
      });
      contactForm.reset();
      setContactStatus("success");
    } catch {
      setContactStatus("error");
    }
  }

  return (
    <section className="figma-public-page figma-contact-page" data-page="contact" data-design-reference="contact-dispatch-v4" data-route={model.route.path} data-generated={model.generatedFrom} data-prototype-file={model.route.prototypeFile}>
      <header data-section="contact-intro" className="figma-page-intro">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.dek}</p>
        <div className="contact-inquiry-strip">
          <strong>{sections.inquiryTypes.heading}:</strong>
          <ul className="figma-inline-list">
            {sections.inquiryTypes.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </header>

      <section className="figma-contact-layout">
        <aside data-section="contact-info" className="figma-contact-info-panel">
          <h2>{sections.info.heading}</h2>
          {sections.info.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </aside>

        <form
          className="figma-contact-form-panel"
          data-section="contact-form"
          data-admin-target={model.form.adminTarget}
          data-form-status={contactStatus}
          action={form.action}
          method={form.method}
          onSubmit={handleContactSubmit}
          noValidate
        >
          <div className="contact-identity-fields">
            {form.fields.slice(0, 2).map((field) => <ContactField key={field.name} field={field} />)}
          </div>
          {form.fields.slice(2).map((field) => <ContactField key={field.name} field={field} />)}
          <button type="submit" disabled={contactStatus === "submitting"}>
            {contactStatus === "submitting" ? "Sending..." : form.submitLabel}
          </button>
          <p className="public-form-status" data-form-status={contactStatus} aria-live="polite">
            {contactMessages[contactStatus]}
          </p>
        </form>
      </section>

      <section data-section="contact-states" className="figma-state-grid" hidden data-state-note="contact-validation" data-state-note-secondary="contact-success">
        {sections.states.items.map((state) => <span key={state} data-state={state}>{state}</span>)}
      </section>

      <section data-section="newsletter-footer" className="figma-newsletter-panel" id={newsletter.id}>
        <h2>{newsletter.heading}</h2>
        <p>{newsletter.body}</p>
        <NewsletterSignup idPrefix="contact-newsletter" placeholder={newsletter.placeholder} />
      </section>
    </section>
  );
}
