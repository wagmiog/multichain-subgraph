export function errorColor(str) {
    // Add ANSI escape codes to display text in red.
    return `\x1b[31m${str}\x1b[0m`;
}

export function successColor(str) {
    // Add ANSI escape codes to display text in red.
    return `\u001b[32m${str}\u001b[32m`;
}