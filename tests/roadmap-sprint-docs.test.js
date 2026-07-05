const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8").replace(/^\uFEFF/, "");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

test("updated roadmap captures current MVP status and preview command", () => {
  const roadmap = read("docs/IMPLEMENTATION_PLAN_JULY_2026.md");

  assert.match(roadmap, /Date: July 2, 2026/i);
  assert.match(roadmap, /214 passing tests/i);
  assert.match(roadmap, /14 core route artifacts/i);
  assert.match(roadmap, /8 support routes/i);
  assert.match(roadmap, /preview:mvp/i);
  assert.match(roadmap, /http:\/\/localhost:4173\/__routes/i);
  assert.match(roadmap, /React production app boundary/i);
  assert.match(roadmap, /July 31, 2026/i);
});

test("updated roadmap replaces old completed phases with production integration phases", () => {
  const roadmap = read("docs/IMPLEMENTATION_PLAN_JULY_2026.md");

  assert.match(roadmap, /Phase A: Boundary And App Shell/i);
  assert.match(roadmap, /Phase B: Public React Routes/i);
  assert.match(roadmap, /Phase C: Admin React Routes/i);
  assert.match(roadmap, /Phase D: Auth Persistence And Mutations/i);
  assert.match(roadmap, /Phase E: QA Launch And Rollback/i);
  assert.doesNotMatch(roadmap, /Current verification: 5 tests pass/i);
  assert.doesNotMatch(roadmap, /Open Design MCP daemon still unreachable/i);
});

test("compressed sprint plan exists and covers July launch windows", () => {
  assert.ok(exists("docs/SPRINT_PLAN_JULY_2026.md"));
  const sprintPlan = read("docs/SPRINT_PLAN_JULY_2026.md");

  assert.match(sprintPlan, /Sprint Plan/i);
  assert.match(sprintPlan, /July 31, 2026/i);
  assert.match(sprintPlan, /Sprint 0: Complete/i);
  assert.match(sprintPlan, /Sprint 1: July 3-7/i);
  assert.match(sprintPlan, /Sprint 2: July 8-12/i);
  assert.match(sprintPlan, /Sprint 3: July 13-17/i);
  assert.match(sprintPlan, /Sprint 4: July 18-23/i);
  assert.match(sprintPlan, /Sprint 5: July 24-31/i);
  assert.match(sprintPlan, /TDD gates/i);
  assert.match(sprintPlan, /Launch readiness/i);
});

test("frontend scaffold and Open Design docs reflect the completed wireframe handoff", () => {
  const scaffold = read("docs/FRONTEND_SCAFFOLD_PLAN.md");
  const openDesign = read("docs/OPEN_DESIGN_STATUS.md");

  assert.match(scaffold, /Current status: completed prototype scaffold/i);
  assert.match(scaffold, /React production migration/i);
  assert.match(scaffold, /preview:mvp/i);
  assert.match(openDesign, /complete local Open Design wireframe handoff/i);
  assert.match(openDesign, /23 screens/i);
  assert.match(openDesign, /fetch failed/i);
});

test("plan status points to sprint plan and production app boundary as the next work", () => {
  const status = read("docs/PLAN_STATUS.md");

  assert.match(status, /Sprint Plan Refresh - July 2, 2026/i);
  assert.match(status, /docs\/SPRINT_PLAN_JULY_2026\.md/i);
  assert.match(status, /production React app boundary/i);
  assert.match(status, /214 passing tests/i);
});










