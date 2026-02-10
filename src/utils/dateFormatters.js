/** Date and time formatting utilities */

/**
 * Format a Date/timestamp to DD/MM/YYYY.
 * @param {string|Date} dateValue
 * @returns {string}
 */
export function formatDate(dateValue) {
    if (!dateValue) return '—';
    const date = new Date(dateValue);
    return date.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

/**
 * Format a Date/timestamp to HH:MM (24-hour).
 * @param {string|Date} dateValue
 * @returns {string}
 */
export function formatTime(dateValue) {
    if (!dateValue) return '—';
    const date = new Date(dateValue);
    return date.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}

/**
 * Format decimal hours into HH:MM string.
 * @param {number} decimalHours
 * @returns {string}
 */
export function formatDuration(decimalHours) {
    if (decimalHours == null || isNaN(decimalHours)) return '—';
    const totalMinutes = Math.round(decimalHours * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Format seconds into HH:MM:SS string (for the live timer).
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatSecondsToTimer(totalSeconds) {
    if (totalSeconds == null || totalSeconds < 0) return '00:00:00';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return [hours, minutes, seconds]
        .map((v) => String(v).padStart(2, '0'))
        .join(':');
}

/**
 * Format a number as Peruvian currency: S/ XX,XXX.XX
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    if (amount == null || isNaN(amount)) return 'S/ 0.00';
    return `S/ ${Number(amount).toLocaleString('es-PE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}
