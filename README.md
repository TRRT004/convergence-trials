# Convergence Trials

Desktop game client project for Convergence Trials — a modular minigame suite built for the [Archipelago Multiworld Randomizer](https://archipelago.gg).

The runtime direction is now C++ with SFML 3.1.

## Status

- The previous TypeScript runtime has been removed.
- A minimal C++ runtime smoke test is committed in `src/main.cpp`.
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

## One-command Build + Run (Windows)

Use the PowerShell helper script to configure, build, and run by target:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run_game.ps1 -Target dev
powershell -ExecutionPolicy Bypass -File .\scripts\run_game.ps1 -Target release -SFMLDir "C:\Libraries\SFML-3.1.0\bin"
powershell -ExecutionPolicy Bypass -File .\scripts\run_game.ps1 -Target runtime-debug -SFMLDir "C:\Libraries\SFML-3.1.0\bin"
```

Targets:

- `dev` configures/builds scaffold-only mode and does not launch an executable.
- `release` maps to the `runtime-release` preset and launches the release runtime.
- `runtime-debug` maps to the debug runtime preset and launches the debug runtime.

Optional: add `-NoRun` to only configure/build.

For runtime targets, `-SFMLDir` accepts the SFML root directory, `bin` directory, or `lib/cmake/SFML` directory.

When using the Visual Studio generator/presets, use an MSVC-built SFML package. MinGW-built SFML binaries can link but fail at runtime.

## Current Local Harness

A minimal in-repo SFML smoke-test runtime is runnable, but full Archipelago client gameplay/network integration is still pending.

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
