# Contributing Guide

Thank you for helping improve Convergence Trials.

## Before You Start

1. Check open issues to avoid duplicate work.
2. Open an issue first for major changes so direction can be discussed.
3. Read `CODE_OF_CONDUCT.md` and `GUIDELINES.md`.

## Local Setup

1. Clone the repository (or the parent `archipelago_minigame_suite` to also get the server).
2. Install dependencies:

```bash
npm install
cp .env.example .env
```

## Branch and Commit Conventions

- Create a branch from `main`.
- Use descriptive branch names, for example:
  - `feat/region-unlock-logic`
  - `fix/client-reconnect`
  - `chore/update-dependencies`
- Use clear commit messages in imperative form with a type prefix.

Examples:

- `feat: add sub-region unlock support`
- `fix: handle disconnection before items are received`
- `chore: update archipelago.js to 2.2.0`

## Pull Request Checklist

Before opening a PR, verify all items below:

- [ ] The change has a clear purpose and scope.
- [ ] TypeScript compiles without errors: `npm run typecheck`
- [ ] Item/location/region IDs are kept in sync with the apworld in `archipelago/worlds/convergence_trials/`.
- [ ] The PR description explains what changed and why.

## Review Process

1. A maintainer reviews the PR for technical quality and project fit.
2. Requested updates should be addressed in follow-up commits.
3. Once approved, a maintainer merges the PR.
