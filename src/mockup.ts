/**
 * Connection mockup – demonstrates the client layer wiring.
 *
 * Run with:
 *   npm run mockup
 *
 * Requires a live Archipelago server. Edit CONNECTION below to match your setup.
 */

import "dotenv/config";
import { WebSocket } from "ws";
import { GameRuntime } from "./game/GameRuntime.js";
import { GameRegion } from "./shared/regions.js";
import { logger } from "./shared/logger.js";

// Node.js 20 has no global WebSocket. archipelago.js detects it via
// `global.WebSocket`, so we polyfill it here before any connect() call.
Object.assign(globalThis, { WebSocket });

// ---------------------------------------------------------------------------
// Edit these values to point at a real Archipelago server.
// ---------------------------------------------------------------------------
const CONNECTION = {
    url: "ws://localhost:38281",
    slotName: "Player1",
    password: "",
};

// ---------------------------------------------------------------------------
// Minimal region definitions (stand-ins until the full data layer is built).
// ---------------------------------------------------------------------------
const REGIONS: GameRegion[] = [
    // Top-level regions
    { name: "Menu" },
    { name: "Minigame Alpha" },
    { name: "Minigame Beta",    unlock: { type: "item", itemId: 1001 } },
    { name: "Final Challenge",  unlock: { type: "item", itemId: 1099 }, isFinalChallenge: true },

    // Sub-regions within Minigame Alpha
    { name: "Minigame Alpha - Room 1", minigame: "Minigame Alpha" },
    { name: "Minigame Alpha - Room 2", minigame: "Minigame Alpha", unlock: { type: "item", itemId: 2001 } },
    { name: "Minigame Alpha - Boss",   minigame: "Minigame Alpha", unlock: { type: "all", conditions: [
        { type: "item", itemId: 2001 },
        { type: "item", itemId: 2002 },
    ]}},
];

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
    logger.info("mockup", "Starting Convergence Trials connection mockup...");
    logger.info("mockup", `Connecting to ${CONNECTION.url} as "${CONNECTION.slotName}"`);

    const runtime = new GameRuntime(REGIONS, "Convergence Trials");

    try {
        await runtime.connect(CONNECTION);
    } catch (error) {
        logger.error("mockup", "Connection failed:", error);
        process.exit(1);
    }

    logger.info("mockup", "Unlocked regions at startup:", runtime.unlockedRegions);

    // Simulate the player clearing a location after 2 seconds.
    setTimeout(() => {
        const EXAMPLE_LOCATION_ID = 10001;
        logger.info("mockup", `Simulating location check: id=${EXAMPLE_LOCATION_ID}`);
        runtime.clearLocation(EXAMPLE_LOCATION_ID);
    }, 2000);

    // Keep process alive to receive async item events.
    logger.info("mockup", "Listening for items... (Ctrl+C to exit)");
}

main();
