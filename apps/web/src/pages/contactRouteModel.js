import { getRouteByPath } from "../routes.js";

const contactSubjects = [
  { value: "press-release", label: "Press Release" },
  { value: "theatre-review", label: "Theatre Review" },
  { value: "interview-request", label: "Interview Request" },
  { value: "book-review", label: "Book Review" },
  { value: "photography-submissions", label: "Photography Submissions" },
  { value: "artwork-submissions", label: "Artwork Submissions" },
  { value: "literary-submissions", label: "Literary Submissions" },
  { value: "event-coverage-request", label: "Event Coverage Request" },
  { value: "general-enquiry", label: "General Enquiry" }
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
      title: "Contact Us",
      dek: "Send a submission, request coverage, pitch a conversation, or reach the editorial desk."
    },
    sections: {
      inquiryTypes: {
        heading: "Submission types",
        items: ["press releases", "reviews", "interviews", "photography", "artwork", "literary work", "event coverage"]
      },
      info: {
        heading: "Submission guidelines",
        body: [
          "Do you have a burning desire to tell a story? Do you have an opinion on a topic that you would like to share?",
          "Is there a piece of art, fashion, or literature that you would like to have archived? Or would you like one of our resident writers to interview you, cover your next project, or review your work?",
          "Fill in the form with a clear subject line and clearly indicate the nature of your submission, for example: press release, theatre review, interview request, book review, photography submission, artwork submission, literary submission, or event coverage request.",
          "Due to the high volume of submissions, we encourage you to keep your submission concise, with a minimum of 100 words. Thereafter, one of our editors will contact you.",
          "Thank you for choosing Babas and Brasse."
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
        { id: "contact-name", name: "name", type: "text", label: "Name", autocomplete: "name", required: true, placeholder: "Enter your full name" },
        { id: "contact-email", name: "email", type: "email", label: "Email", autocomplete: "email", required: true, placeholder: "you@example.com" },
        { id: "contact-subject", name: "subject", type: "select", label: "Subject", autocomplete: "off", required: true, placeholder: "Select a subject", options: getContactSubjectOptions() },
        { id: "contact-message", name: "message", type: "textarea", label: "Message", rows: 8, autocomplete: "off", required: true, placeholder: "Tell us how we can help..." },
        { id: "contact-website", name: "website", type: "text", label: "Spam protection placeholder", autocomplete: "off", tabIndex: -1, required: false, purpose: "spam-protection" }
      ],
      submitLabel: "Submit contact request"
    }
  };
}
