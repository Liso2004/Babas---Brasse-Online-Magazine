import { getRouteByPath } from "../routes.js";

function getReplyHref(submission) { return `mailto:${submission.email}?subject=${encodeURIComponent(`Re: ${submission.subject}`)}`; }
export function getSubmissionRows(fixtures) { return fixtures.contactSubmissions.map((submission) => ({ id: submission.id, sender: submission.name, email: submission.email, subject: submission.subject, message: submission.message, status: submission.status, receivedDate: "Contact inbox", replyHref: getReplyHref(submission) })); }
export function getSubmissionStats(fixtures) { const rows = getSubmissionRows(fixtures); return { totalSubmissions: rows.length, newSubmissions: rows.filter((row) => row.status === "new").length, readSubmissions: rows.filter((row) => row.status === "read").length, archivedSubmissions: rows.filter((row) => row.status === "archived").length }; }
function metricItems(stats) { return [ { key: "totalSubmissions", label: "Total", value: stats.totalSubmissions }, { key: "newSubmissions", label: "New", value: stats.newSubmissions }, { key: "readSubmissions", label: "Read", value: stats.readSubmissions }, { key: "archivedSubmissions", label: "Archived", value: stats.archivedSubmissions } ]; }
export function buildContactSubmissionsRouteModel(fixtures) {
  const route = getRouteByPath("/admin/contact-submissions");
  const rows = getSubmissionRows(fixtures);
  const stats = getSubmissionStats(fixtures);
  return {
    pageId: "contact-submissions",
    generatedFrom: "contact-submissions-route-model",
    route: { id: route.id, label: route.label, path: route.path, prototypeFile: route.prototypeFile },
    auth: { required: route.authRequired === true, role: "admin", loginHref: "/admin/login" },
    nav: { newCount: stats.newSubmissions },
    hero: { eyebrow: "Contact Submissions", title: "Public contact inbox triage.", dek: "Admin-only access to search, read, reply to, and archive public contact messages." },
    sections: {
      stats: { heading: "Inbox health", items: metricItems(stats) },
      filters: { heading: "Inbox filters", search: { name: "submission-search", type: "search", placeholder: "Search sender, subject, email, or message" }, filters: [ { name: "status", label: "Status", options: ["all", "new", "read", "archived"] }, { name: "subject", label: "Subject", type: "search" }, { name: "sender-email", label: "Sender email", type: "email" }, { name: "received-date", label: "Received date", type: "date" } ] },
      inbox: { heading: "Inbox", columns: ["sender", "email", "subject", "status", "received-date", "row-actions"], items: rows, selectedSubmission: rows.find((row) => row.status === "new") || rows[0] },
      statuses: { heading: "Status actions", actions: [ { action: "mark-read", label: "Mark read" }, { action: "archive", label: "Archive" }, { action: "reply", label: "Reply" } ], copy: "Reply actions preserve original message context." },
      states: { notes: ["submissions-loading", "submissions-empty", "submission-archive-success", "submissions-error", "permission-denied"], items: ["loading", "empty", "archive-success", "error", "permission-denied"], permissionHref: "/admin/login" }
    }
  };
}
