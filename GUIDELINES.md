# Project Guidelines

Repository-specific standards for the Convergence Trials game client.

## Source of Truth

- TypeScript source lives in `src/`.
- Item, location, and region IDs defined here must stay in sync with the apworld in `archipelago/worlds/convergence_trials/` (in the `archipelago_minigame_suite` repo).
- The logger in `src/shared/logger.ts` is the only logging interface — do not use `console.*` directly.

## Code Standards

- All source files are TypeScript; do not add plain `.js` files to `src/`.
- Use private class fields (`#field`) over `private` keyword for true encapsulation.
- Prefer explicit types over `any`. Avoid type assertions unless there is no alternative.
- Keep modules focused: client, runtime, and shared code must not circularly depend on each other.

## ID Ranges (provisional)

| Range | Purpose |
|---|---|
| `8650000–8650099` | Minigame unlock items |
| `8650200–8650299` | Sub-region unlock items |
| `8650900–8650999` | Filler items |
| `8651000–8651999` | Minigame Alpha locations |
| `8652000–8652999` | Minigame Beta locations |

Update this table and the apworld in sync whenever IDs change.

## Pull Request Quality Bar

- Explain intent, scope, and rationale in the PR description.
- Keep changes focused — split unrelated work into separate PRs.
- Run `npm run typecheck` before pushing.

## Collaboration

- Be respectful and constructive in all discussions.
- Assume good intent and request clarification before escalating disagreements.
- Follow `CODE_OF_CONDUCT.md` for all project interactions.
