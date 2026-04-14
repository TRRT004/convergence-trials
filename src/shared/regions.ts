/**
 * A recursive unlock condition supporting single-item, AND, and OR logic.
 *
 * Examples:
 *   Single item:  { type: "item", itemId: 1001 }
 *   All of these: { type: "all", conditions: [...] }
 *   Any of these: { type: "any", conditions: [...] }
 *
 * Omit (or set to null) for regions that are always available.
 */
export type UnlockCondition =
    | { type: "item"; itemId: number }
    | { type: "all";  conditions: UnlockCondition[] }
    | { type: "any";  conditions: UnlockCondition[] };

/** Returns true when the condition is satisfied by the given set of received item ids. */
export function evaluateCondition(
    condition: UnlockCondition | null | undefined,
    receivedItemIds: Set<number>,
): boolean {
    if (condition == null) return true;
    switch (condition.type) {
        case "item": return receivedItemIds.has(condition.itemId);
        case "all":  return condition.conditions.every(c => evaluateCondition(c, receivedItemIds));
        case "any":  return condition.conditions.some(c  => evaluateCondition(c, receivedItemIds));
    }
}

/**
 * A region is any independently-lockable slice of the game: a top-level
 * minigame, a room inside a minigame, or the final challenge.
 *
 * Sub-regions belong to a parent minigame via `minigame`. A sub-region is
 * only accessible when its own `unlock` condition is met AND its parent
 * minigame is also unlocked. This keeps per-region conditions simple while
 * the runtime handles the hierarchy.
 *
 * The region name must match exactly what the apworld declares on the server
 * side (SA1).
 */
export interface GameRegion {
    name: string;
    /**
     * Name of the parent minigame region this belongs to.
     * Omit for top-level regions (standalone minigames, Menu, Final Challenge).
     */
    minigame?: string;
    /**
     * What must be received before this region becomes accessible.
     * Omit or set null for regions available from the start.
     */
    unlock?: UnlockCondition | null;
    /** True only for the final challenge region. */
    isFinalChallenge?: boolean;
}
