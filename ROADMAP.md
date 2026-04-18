# Roadmap

An actionable plan for the Convergence Trials game client.

## Vision

A modular desktop C++ game client built on SFML 3.1 that integrates with the Archipelago Multiworld Randomizer.

## Short-term (MVP)

- [ ] Add CMake project scaffolding for the desktop runtime.
- [ ] Define runtime module boundaries (network/client, gameplay runtime, shared IDs/data).
- [ ] Implement one fully playable minigame with at least 3 locations.
- [ ] Define and stabilise item/location/region ID ranges.
- [ ] Add initial CI for C++ formatting/lint/build checks.

### Completed

- Removed the previous TypeScript runtime implementation to prepare for C++/SFML 3.1 migration.
- Updated repository documentation to migration-first status.
- Added initial CMake scaffold (`CMakeLists.txt`, `CMakePresets.json`) with runtime target gating.

## Mid-term

- Save/load persistence for received items and cleared locations.
- Reusable minigame base class and developer guide.
- Add a desktop menu flow and session configuration UX.

## Long-term

- Support multiple desktop deployment targets (Linux, Windows, macOS).
- Tooling to generate Archipelago-compatible slot configuration from game data.
- Publish example seed runs and a demo release.

## Contribution Priorities

Triage issues using labels: `mvp`, `integration`, `docs`, `good-first-issue`.
