# Convergence Trials

Desktop game client project for Convergence Trials — a modular minigame suite built for the [Archipelago Multiworld Randomizer](https://archipelago.gg).

The runtime direction is now C++ with SFML 3.1.

## Status

- The previous TypeScript runtime has been removed.
- A minimal C++ scaffold (`src/main.cpp`) is committed to validate SFML/CMake toolchains.
- Full runtime implementation is still pending.

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

To build the runtime scaffold with SFML 3.1:

```bash
SFML_ROOT=/path/to/SFML-3.1.0 \
cmake -S . -B build/runtime-debug \
	-DCMAKE_BUILD_TYPE=Debug \
	-DCONVERGENCE_TRIALS_ENABLE_RUNTIME=ON \
	-DCMAKE_PREFIX_PATH="$SFML_ROOT"
cmake --build build/runtime-debug --parallel
```

Windows PowerShell + MinGW GCC:

```powershell
$env:SFML_ROOT = "C:\Libraries\SFML-3.1.0"
cmake -S . -B build/runtime-debug-mingw -G "MinGW Makefiles" `
	-DCMAKE_BUILD_TYPE=Debug `
	-DCONVERGENCE_TRIALS_ENABLE_RUNTIME=ON `
	-DCMAKE_PREFIX_PATH="$env:SFML_ROOT"
cmake --build build/runtime-debug-mingw --parallel
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
