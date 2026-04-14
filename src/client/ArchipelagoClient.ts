import { Client, itemsHandlingFlags } from "archipelago.js";
import { GameItem, ItemCategory } from "../shared/items.js";
import { ClientCallbacks, ConnectionConfig } from "./types.js";

/**
 * SA2 – Embedded Archipelago Client Layer.
 *
 * Wraps archipelago.js and acts as the sole communication bridge between the
 * Archipelago server and the game runtime. The game runtime must not access
 * the archipelago.js Client directly (SA4 boundary rule).
 */
export class ArchipelagoClient {
    readonly #client: Client;
    readonly #callbacks: ClientCallbacks;
    readonly #gameName: string;

    public constructor(gameName: string, callbacks: ClientCallbacks) {
        this.#gameName = gameName;
        this.#callbacks = callbacks;
        this.#client = new Client();

        this.#client.items.on("itemsReceived", (items) => {
            const mapped: GameItem[] = items.map((item) => ({
                id: item.id,
                name: item.name,
                category: this.#resolveCategory(item),
            }));
            this.#callbacks.onItemsReceived(mapped);
        });

        this.#client.socket.on("disconnected", () => {
            this.#callbacks.onDisconnected();
        });
    }

    /** Returns true when connected and authenticated. */
    public get connected(): boolean {
        return this.#client.authenticated;
    }

    /**
     * Connect and authenticate to an Archipelago server.
     * Resolves once the session is fully authenticated.
     */
    public async connect(config: ConnectionConfig): Promise<void> {
        await this.#client.login(config.url, config.slotName, this.#gameName, {
            password: config.password ?? "",
            items: itemsHandlingFlags.all,
        });

        this.#callbacks.onConnected();
    }

    /**
     * Report one or more location ids as checked to the server.
     * Only locations in the server's missing-locations list are sent.
     */
    public checkLocations(...locationIds: number[]): void {
        this.#client.check(...locationIds);
    }

    /**
     * Signal to the server that the player has met the victory condition.
     */
    public reportGoal(): void {
        this.#client.goal();
    }

    /** Map archipelago.js item flags to our ItemCategory enum. */
    #resolveCategory(item: { trap: boolean; filler: boolean; progression: boolean; useful: boolean }): ItemCategory {
        if (item.trap) return ItemCategory.Trap;
        if (item.filler) return ItemCategory.Filler;
        // Progression and useful items may unlock minigames or grant final access;
        // the game runtime is responsible for distinguishing them by id.
        if (item.progression) return ItemCategory.MinigameUnlock;
        return ItemCategory.Powerup;
    }
}
