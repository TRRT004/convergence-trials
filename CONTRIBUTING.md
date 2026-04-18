# Contributing Guide

Thank you for helping improve Convergence Trials.

This repository is currently in a migration phase: the TypeScript runtime has been removed, and the C++/SFML 3.1 runtime has not been implemented yet.

## Before You Start

1. Check open issues to avoid duplicate work.
2. Open an issue first for major changes so direction can be discussed.
3. Read `CODE_OF_CONDUCT.md` and `GUIDELINES.md`.

## Local Setup

1. Clone the repository (or the parent `archipelago_minigame_suite` to also get the server harness).
2. Review migration direction in `README.md`, `GUIDELINES.md`, and `ROADMAP.md`.
3. Use the parent repository script to boot a local Archipelago server for integration work:

```bash
cd ../archipelago_minigame_suite
./scripts/run_mockup.sh
```

Windows PowerShell:

```powershell
cd ..\archipelago_minigame_suite
powershell -ExecutionPolicy Bypass -File .\scripts\run_mockup.ps1
```

4. Validate CMake scaffold configuration:

```bash
cmake --preset dev
cmake --build --preset dev
```

## Branch and Commit Conventions

- Create a branch from `main`.
- Use descriptive branch names, for example:
  - `feat/region-unlock-logic`
  - `fix/client-reconnect`
  - `chore/update-dependencies`
- Use clear commit messages in imperative form with a type prefix.

Examples:

- `feat: scaffold cmake project structure`
- `fix: document sfml dependency requirements`
- `chore: align id mapping notes with apworld`

## Pull Request Checklist

Before opening a PR, verify all items below:

- [ ] The change has a clear purpose and scope.
- [ ] Item/location/region IDs are kept in sync with the apworld in `archipelago/worlds/convergence_trials/`.
- [ ] TypeScript/Node runtime artifacts were not reintroduced.
- [ ] CMake scaffold still configures and builds via the `dev` preset.
- [ ] Documentation is updated to match migration state and current implementation status.
- [ ] The PR description explains what changed and why.

## Review Process

1. A maintainer reviews the PR for technical quality and project fit.
2. Requested updates should be addressed in follow-up commits.
3. Once approved, a maintainer merges the PR.
