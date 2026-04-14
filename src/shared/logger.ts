const RESET = "\x1b[0m";
const DIM   = "\x1b[2m";

const LEVEL_COLOR: Record<Level, string> = {
    trace: "\x1b[90m", // dark gray
    debug: "\x1b[36m", // cyan
    info:  "\x1b[32m", // green
    warn:  "\x1b[33m", // yellow
    error: "\x1b[31m", // red
    fatal: "\x1b[35m", // magenta
};

type Level = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

const LEVELS: Level[] = ["trace", "debug", "info", "warn", "error", "fatal"];

function getTagWidth(): number {
    const v = parseInt(process.env.LOG_TAG_WIDTH ?? "", 10);
    return isNaN(v) ? 11 : v;
}

function getMinLevel(): Level {
    const v = (process.env.LOG_LEVEL ?? "trace").toLowerCase() as Level;
    return LEVELS.includes(v) ? v : "trace";
}

function emit(level: Level, tag: string, ...args: unknown[]): void {
    if (LEVELS.indexOf(level) < LEVELS.indexOf(getMinLevel())) return;
    const time  = new Date().toISOString();
    const color = LEVEL_COLOR[level];
    const label = `${color}${level.toUpperCase().padEnd(5)}${RESET}`;
    const tagBlock = `[${tag}]:`.padEnd(getTagWidth() + 3); // +3 for "[", "]", ":"
    const prefix = `${DIM}${time}${RESET} ${label} ${DIM}${tagBlock}${RESET}`;
    // Route warn/error/fatal through the matching console method so they appear
    // in stderr and remain filterable in tools that understand log levels.
    const fn = level === "warn" ? console.warn
             : level === "error" || level === "fatal" ? console.error
             : console.log;
    fn(prefix, ...args);
}

export const logger = {
    trace: (tag: string, ...args: unknown[]) => emit("trace", tag, ...args),
    debug: (tag: string, ...args: unknown[]) => emit("debug", tag, ...args),
    info:  (tag: string, ...args: unknown[]) => emit("info",  tag, ...args),
    warn:  (tag: string, ...args: unknown[]) => emit("warn",  tag, ...args),
    error: (tag: string, ...args: unknown[]) => emit("error", tag, ...args),
    fatal: (tag: string, ...args: unknown[]) => emit("fatal", tag, ...args),
};
