import { getRouteByPath } from "../routes.js";

const contactSubjects = [
  { value: "general", label: "General contact" },
  { value: "submission", label: "Contributor submission" },
  { value: "correction", label: "Correction" },
  { value: "business", label: "Business inquiry" }
];

export function getContactSubjectOptions() {
  return contactSubjects.map((subject) => ({ ...subject }));
}

export function buildContactRouteModel(fixtures) {
  void fixtures;
  const route = getRouteByPath("/contact");

  return {
    pageId: "contact",
    generatedFrom: "contact-route-model",
    route: {
      id: route.id,
      label: route.label,
      path: route.path,
      prototypeFile: route.prototypeFile
    },
    hero: {
      eyebrow: "Contact",
      title: "Reach Babas & Brasse.",
      dek: "Send an editorial query, pitch a contribution, suggest a correction, or simply tell us what you have been reading and watching."
    },
    sections: {
      inquiryTypes: {
        heading: "Inquiry types",
        items: ["editorial queries", "contributor submissions", "corrections", "business notes", "general contact"]
      },
      info: {
        heading: "What happens next",
        body: [
          "Editorial queries and corrections are reviewed by the team member closest to the story.",
          "Contributor pitches receive a considered reply when the proposed work fits an upcoming edition."
        ]
      },
      states: {
        notes: ["contact-validation", "contact-success", "contact-submit-error", "contact-rate-limit", "contact-pending"],
        items: ["validation", "success", "error", "rate-limit", "pending"],
        recoveryCopy: "Submit error should preserve message text and let the reader retry.",
        accessibilityCopy: "Validation and success states move focus to the next useful message."
      }
    },
    form: {
      id: "contact-form",
      action: "/contact",
      method: "post",
      adminTarget: "contact-submissions",
      subjects: getContactSubjectOptions(),
      fields: [
        { id: "contact-name", name: "name", type: "text", label: "Name", autocomplete: "name", required: true },
        { id: "contact-email", name: "email", type: "email", label: "Email", autocomplete: "email", required: true },
        { id: "contact-subject", name: "subject", type: "select", label: "Subject", autocomplete: "off", required: true, options: getContactSubjectOptions() },
        { id: "contact-message", name: "message", type: "textarea", label: "Message", rows: 8, autocomplete: "off", required: true },
        { id: "contact-website", name: "website", type: "text", label: "Spam protection placeholder", autocomplete: "off", tabIndex: -1, required: false, purpose: "spam-protection" }
      ],
      submitLabel: "Submit contact request"
    },
    newsletter: {
      id: "newsletter",
      heading: "Newsletter",
      body: "Occasional notes on new essays, reviews, performances, and books worth spending time with.",
      placeholder: "your@email.com",
      action: "/subscribe",
      states: ["newsletter-invalid", "newsletter-success"]
    }
  };
}
