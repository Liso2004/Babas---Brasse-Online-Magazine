# TDD Workflow

This project will use test-driven development for every implemented slice.

## Working Rule

1. Document the intended behavior or screen contract.
2. Write or update a failing test that describes that behavior.
3. Implement the smallest useful change that satisfies the test.
4. Run the test.
5. Record the result in `docs/TESTING_LOG.md`.
6. Refactor only after the test is green.

## Current Test Layers

- Wireframe contract tests: verify that required MVP screens, admin flows, states, and documentation exist.
- Future frontend tests: route rendering, component behavior, forms, validation, search, moderation, and admin permissions.
- Future integration tests: content CRUD, contact submissions, comments/reviews moderation, SEO metadata, and deployment smoke checks.

## MVP TDD Priorities

- Public reading and discovery must be tested before visual polish.
- Admin content workflows must be tested before styling details.
- Forms must have validation, success, error, and empty states covered.
- Moderation must prove that comments and reviews stay hidden until approved.
- Launch checks must prove SEO, responsive layout, and contact delivery are ready.

## Definition Of Green

A slice is green only when:

- The relevant test passes locally.
- The implementation is documented.
- The testing log records command, result, and next risk.
- The screen or workflow is still aligned with the July 31, 2026 MVP launch scope.
