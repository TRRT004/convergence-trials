import { ArchipelagoClient } from "../client/ArchipelagoClient.js";
import { ConnectionConfig } from "../client/types.js";
import { GameItem } from "../shared/items.js";
import { GameRegion, evaluateCondition } from "../shared/regions.js";
import { logger } from "../shared/logger.js";

/**
 * SA3 – Standalone Game Runtime.
 *
 * Manages game state: unlocked regions, received items, and cleared locations.
 * Communicates with the Archipelago server exclusively through ArchipelagoClient (SA4).
 */
export class GameRuntime {
    readonly #client: ArchipelagoClient;
    readonly #regions: Map<string, GameRegion>;
    readonly #unlockedRegions: Set<string> = new Set();
    readonly #receivedItems: GameItem[] = [];
    readonly #receivedItemIds: Set<number> = new Set();
    readonly #clearedLocations: Set<number> = new Set();

    public constructor(regions: GameRegion[], gameName: string = "Convergence Trials") {
        this.#regions = new Map(regions.map((r) => [r.name, r]));
        this.#reevaluateRegions();

        this.#client = new ArchipelagoClient(gameName, {
            onConnected: () => this.#onConnected(),
            onDisconnected: () => this.#onDisconnected(),
            onItemsReceived: (items) => this.#applyItems(items),
        });
    }

    /** Connect to the Archipelago server. */
    public async connect(config: ConnectionConfig): Promise<void> {
        await this.#client.connect(config);
    }

    /** Report a location as cleared. Idempotent. */
    public clearLocation(locationId: number): void {
        if (this.#clearedLocations.has(locationId)) return;
        this.#clearedLocations.add(locationId);
        this.#client.checkLocations(locationId);
    }

    /** Report the final challenge as complete. */
    public reportVictory(): void {
        this.#client.reportGoal();
    }

    public get unlockedRegions(): string[] {
        return [...this.#unlockedRegions];
    }

    public get receivedItems(): GameItem[] {
        return [...this.#receivedItems];
    }

    #onConnected(): void {
        logger.info("GameRuntime", "Connected to Archipelago server.");
    }

    #onDisconnected(): void {
        logger.warn("GameRuntime", "Disconnected from Archipelago server.");
    }

    #applyItems(items: GameItem[]): void {
        for (const item of items) {
            this.#receivedItems.push(item);
            this.#receivedItemIds.add(item.id);
            logger.info("GameRuntime", `Received item: "${item.name}" (id=${item.id}, category=${item.category})`);
        }
        this.#reevaluateRegions();
    }

    /**
     * Re-checks every locked region against the current item set.
     * Iterates until stable so that unlocking a parent minigame in one pass
     * can cascade into unlocking its sub-regions in the next.
     */
    #reevaluateRegions(): void {
        let changed = true;
        while (changed) {
            changed = false;
            for (const region of this.#regions.values()) {
                if (this.#unlockedRegions.has(region.name)) continue;
                if (this.#isAccessible(region)) {
                    this.#unlockedRegions.add(region.name);
                    logger.info("GameRuntime", `Unlocked region: "${region.name}"`);
                    changed = true;
                }
            }
        }
    }

    /** A region is accessible when its own condition is met and its parent (if any) is unlocked. */
    #isAccessible(region: GameRegion): boolean {
        if (!evaluateCondition(region.unlock, this.#receivedItemIds)) return false;
        if (region.minigame != null && !this.#unlockedRegions.has(region.minigame)) return false;
        return true;
    }
}
