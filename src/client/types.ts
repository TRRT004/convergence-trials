import { GameItem } from "../shared/items.js";

/**
 * Configuration passed to ArchipelagoClient.connect().
 */
export interface ConnectionConfig {
    /** Websocket URL of the Archipelago server, e.g. "ws://localhost:38281". */
    url: string;
    /** Slot name for this game client. */
    slotName: string;
    /** Optional room password. */
    password?: string;
}

/**
 * Callbacks the game runtime provides to the client layer.
 * This is how the client layer (SA2) delivers events to the game runtime (SA3)
 * without the two subsystems depending on each other directly.
 */
export interface ClientCallbacks {
    /** Called when items are received from the multiworld. */
    onItemsReceived: (items: GameItem[]) => void;
    /** Called when the connection is fully authenticated and ready. */
    onConnected: () => void;
    /** Called when the connection is lost. */
    onDisconnected: () => void;
}
