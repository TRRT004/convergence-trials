/**
 * Item categories as defined in the requirements (section 8 – Archipelago Logical Model).
 */
export enum ItemCategory {
    MinigameUnlock = "minigame_unlock",
    FinalAccess = "final_access",
    Powerup = "powerup",
    Filler = "filler",
    Trap = "trap",
}

/**
 * A game item definition, shared between the client layer and game runtime.
 */
export interface GameItem {
    id: number;
    name: string;
    category: ItemCategory;
}
