# Data Governance Decisions

The application stores administrator credentials, contact messages, comments, reviews, and editorial records. The production data owner must approve the values below before launch.

| Data | Purpose | Proposed retention | Owner decision |
| --- | --- | --- | --- |
| Contact submissions | Respond to editorial enquiries | Delete or anonymize after the enquiry is resolved and the approved retention period expires | [ ] |
| Pending/rejected comments and reviews | Moderation and abuse handling | Use the shortest operationally useful period | [ ] |
| Approved comments and reviews | Public editorial record | Retain while published or until a valid removal decision | [ ] |
| Admin security events | Detect abuse and diagnose access failures | Set through the hosting log policy | [ ] |
| Editorial content and media metadata | Publish and maintain the magazine | Retain while required by editorial policy and rights agreements | [ ] |

Before launch:

- [ ] Publish an approved privacy notice explaining collection, purpose, retention, access, and deletion channels.
- [ ] Identify the person handling access, correction, and deletion requests.
- [ ] Confirm contact forms collect only necessary fields.
- [ ] Approve moderation and takedown procedures.
- [ ] Confirm database and log access follows least privilege.
- [ ] Confirm the production region and any cross-border processing with the organization's privacy adviser.
- [ ] Record the backup/restore retention window.

This is an engineering checklist, not legal advice. Final wording and retention periods require the organization's authorized decision-maker.
