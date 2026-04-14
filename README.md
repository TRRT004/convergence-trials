# Convergence Trials

The game client for Convergence Trials — a modular minigame suite built for the [Archipelago Multiworld Randomizer](https://archipelago.gg).

The client is written in TypeScript and communicates with the Archipelago server via [archipelago.js](https://github.com/alwaysintreble/archipelago.js).

## Repository Structure

- `src/client/` — Archipelago WebSocket client wrapper
- `src/game/` — game runtime: region unlocks, item tracking, location checks
- `src/shared/` — types shared between client and runtime (items, locations, regions, logger)
- `src/mockup.ts` — connection mockup for local development

## Prerequisites

- Node.js ≥ 18
- A running Archipelago server with a Convergence Trials slot (see the [infrastructure repo](https://github.com/TRRT004/archipelago_minigame_suite))

## Setup

```bash
npm install
cp .env.example .env
```

## Running the mockup

Use the infrastructure repo's `scripts/run_mockup.sh` to start the Archipelago server and run the mockup together.

To run the mockup on its own against an already-running server:

```bash
npm run mockup
```

Edit `CONNECTION` in `src/mockup.ts` to point at your server.

## Environment variables

See `.env.example` for all available options:

| Variable | Default | Description |
|---|---|---|
| `LOG_LEVEL` | `debug` | Minimum log level (`trace` / `debug` / `info` / `warn` / `error` / `fatal`) |
| `LOG_TAG_WIDTH` | `11` | Column width for log tag alignment |

## Contributing

Please read `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` before opening a pull request.

## License

MIT — see `LICENSE`.
