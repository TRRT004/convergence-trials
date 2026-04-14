# Changelog

All notable changes to the game client will be documented here.

## [Unreleased]

- Initial extraction from `archipelago_minigame_suite` into its own repository.
- TypeScript game client: `ArchipelagoClient`, `GameRuntime`, shared types.
- Structured logger with level filtering, ANSI colours, and tag alignment.
- Region unlock system with recursive `UnlockCondition` (item / all / any).
- Sub-region hierarchy: regions can belong to a parent minigame.
- Environment-based configuration via `.env` (`LOG_LEVEL`, `LOG_TAG_WIDTH`).
- Connection mockup (`src/mockup.ts`) for local development against a live server.
