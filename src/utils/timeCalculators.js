/** Time calculation utilities for jornada tracking */

/**
 * Calculate elapsed seconds from a start timestamp to now,
 * optionally subtracting paused duration.
 * @param {string} startTimestamp  ISO timestamp of jornada start
 * @param {string|null} pauseTimestamp  ISO timestamp when paused (null if not paused)
 * @param {number} accumulatedPauseSeconds  Seconds previously paused
 * @returns {number} elapsed working seconds
 */
export function calculateElapsedSeconds(
    startTimestamp,
    pauseTimestamp = null,
    accumulatedPauseSeconds = 0
) {
    if (!startTimestamp) return 0;

    const startMs = new Date(startTimestamp).getTime();
    const endMs = pauseTimestamp
        ? new Date(pauseTimestamp).getTime()
        : Date.now();

    const totalSeconds = Math.max(0, (endMs - startMs) / 1000);
    return Math.max(0, totalSeconds - accumulatedPauseSeconds);
}

/**
 * Calculate total worked hours (decimal) between start and end,
 * excluding pause duration.
 * @param {string} startTimestamp
 * @param {string} endTimestamp
 * @param {number} pauseSeconds  Total paused duration in seconds
 * @returns {number} decimal hours
 */
export function calculateWorkedHours(startTimestamp, endTimestamp, pauseSeconds = 0) {
    if (!startTimestamp || !endTimestamp) return 0;

    const startMs = new Date(startTimestamp).getTime();
    const endMs = new Date(endTimestamp).getTime();
    const totalSeconds = Math.max(0, (endMs - startMs) / 1000);
    const workedSeconds = Math.max(0, totalSeconds - pauseSeconds);

    return workedSeconds / 3600;
}
