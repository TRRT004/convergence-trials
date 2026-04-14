/**
 * A check location definition.
 * Each minigame exposes multiple intermediate checks and one completion location.
 */
export interface GameLocation {
    id: number;
    name: string;
    /** The region (minigame) this location belongs to. */
    region: string;
    /** Whether this is the completion location for its region. */
    isCompletion: boolean;
}
