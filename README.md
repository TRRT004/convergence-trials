# Convergence Trials

Desktop game client project for Convergence Trials — a modular minigame suite built for the [Archipelago Multiworld Randomizer](https://archipelago.gg).

The runtime direction is now C++ with SFML 3.1.

## Status

- The previous TypeScript runtime has been removed.
- No C++ runtime implementation is committed yet.
- This repository currently contains migration docs and CMake scaffolding.

## Planned Runtime Stack

- Language: C++20
- Multimedia framework: SFML 3.1
- Build system: CMake
- Target: native desktop application

## Prerequisites

- CMake 3.24+
- C++20 compiler
- SFML 3.1 development package
- A running Archipelago server with a Convergence Trials slot (see the [infrastructure repo](https://github.com/TRRT004/archipelago_minigame_suite))

## CMake Setup

Configure the migration scaffold (no runtime executable target):

```bash
cmake --preset dev
cmake --build --preset dev
```

To enable the runtime target later (once `src/main.cpp` exists and SFML 3.1 is installed), use:

```bash
cmake --preset runtime-debug
cmake --build --preset runtime-debug
```

## Current Local Harness

There is no runnable in-repo client yet.

Use the infrastructure repository to start a local Archipelago server harness:

```bash
cd ../archipelago_minigame_suite
./scripts/run_mockup.sh
```

Windows PowerShell:

```powershell
cd ..\archipelago_minigame_suite
powershell -ExecutionPolicy Bypass -File .\scripts\run_mockup.ps1
```

That script now starts only the server side and waits for connections from external clients.

## Repository Structure

- `src/` — C++ runtime sources (placeholder directory)
- `include/` — public/internal headers (placeholder directory)
- `assets/` — desktop runtime assets (placeholder directory)
- `CMakeLists.txt` — CMake entrypoint
- `CMakePresets.json` — cross-platform configure/build presets

## Contributing

Please read `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` before opening a pull request.

Do not reintroduce TypeScript or Node-based runtime files.

## License

MIT — see `LICENSE`.
