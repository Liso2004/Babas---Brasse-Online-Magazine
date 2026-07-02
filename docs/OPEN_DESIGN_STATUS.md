# Open Design Status

Last checked: July 2, 2026.

## Current Result

The complete local Open Design wireframe handoff is available in this workspace at `designs/open-design-wireframes/`.

The local handoff validates as 23 screens:

- 9 public routes
- 5 admin routes
- 8 support screens/subflows
- 1 route overview

This handoff is the design source of truth for the current prototype and the next React production migration.

## Historical MCP Note

Earlier live MCP calls to Open Design returned `fetch failed` even though `codex mcp list` showed the `open-design` server as enabled. That daemon issue did not block the project because the Open Design project export was provided and copied locally.

Keep this historical `fetch failed` note so older tests and handoff context remain understandable.

## Working Decision

Use `designs/open-design-wireframes/` plus the generated artifacts in `src/pages/` as the source of truth. Sync back to Open Design only when the Open Design daemon is reachable and doing so will not replace tested route/screen contracts.

## Preview

Wireframe overview:

```text
designs/open-design-wireframes/mvp-wireframes.html
```

Generated MVP prototype:

```powershell
npm.cmd run preview:mvp
```

Then visit:

```text
http://localhost:4173/__routes
```

## Recovery Steps If Live MCP Sync Is Needed

1. Fully close Open Design.
2. Reopen Open Design.
3. Restart or reload Codex.
4. Retry `get_active_context` and `list_projects`.
5. If those work, sync only changes that preserve the tested MVP route and screen contracts.
