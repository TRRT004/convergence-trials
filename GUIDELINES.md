# Project Guidelines

Repository-specific standards for the Convergence Trials game client.

Current direction: desktop runtime in C++ with SFML 3.1.
Current state: runtime source is intentionally absent pending migration implementation.

## Source of Truth

- Runtime architecture direction is C++20 + SFML 3.1 + CMake.
- Build configuration source of truth is `CMakeLists.txt` plus `CMakePresets.json`.
- Item, location, and region IDs defined for the game client must stay in sync with the apworld in `archipelago/worlds/convergence_trials/` (in the `archipelago_minigame_suite` repo).
- Any future runtime implementation must preserve Archipelago protocol compatibility.

## Code Standards

- Do not reintroduce TypeScript/Node runtime source files.
- Use modern C++20 language features where they improve clarity and safety.
- Organize source by responsibility (client/network, runtime/gameplay, shared data) and avoid circular dependencies.
- Keep SFML-specific rendering/input code separated from gameplay logic where practical.
- Keep CMake presets cross-platform and avoid hardcoding machine-specific paths.

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
- Keep documentation and implementation status aligned.

## Collaboration

- Be respectful and constructive in all discussions.
- Assume good intent and request clarification before escalating disagreements.
- Follow `CODE_OF_CONDUCT.md` for all project interactions.
