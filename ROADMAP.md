# Roadmap

An actionable plan for the Convergence Trials game client.

## Vision

A modular TypeScript minigame suite that integrates with the Archipelago Multiworld Randomizer — each minigame exposes locations and items used for multiworld progression.

## Short-term (MVP)

- [ ] Implement one fully playable minigame with at least 3 locations.
- [ ] Define and stabilise item/location/region ID ranges.
- [ ] Add unit tests for `GameRuntime` unlock logic.
- [ ] Add CI to run `typecheck` and tests on every PR.

### Completed

- TypeScript Archipelago client shim (`ArchipelagoClient`).
- `GameRuntime` with region unlock system and item tracking.
- Sub-region hierarchy with `UnlockCondition` boolean logic.
- Structured logger with level filtering, ANSI colours, and tag alignment.
- Connection mockup (`src/mockup.ts`) for local development.

## Mid-term

- Save/load persistence for received items and cleared locations.
- Reusable minigame base class and developer guide.
- Basic web UI scaffolding for hosting minigames in the browser.

## Long-term

- Support multiple deployment targets (browser, Electron, etc.).
- Tooling to generate Archipelago-compatible slot configuration from game data.
- Publish example seed runs and a demo release.

## Contribution Priorities

Triage issues using labels: `mvp`, `integration`, `docs`, `good-first-issue`.
