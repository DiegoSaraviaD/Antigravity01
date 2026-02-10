/** Form validation utilities */

/**
 * Validate email format.
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export function validateEmail(email) {
    if (!email || !email.trim()) {
        return { valid: false, message: 'El email es requerido' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return { valid: false, message: 'Formato de email inválido' };
    }
    return { valid: true, message: '' };
}

/**
 * Validate password strength.
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
    if (!password) {
        return { valid: false, message: 'La contraseña es requerida' };
    }
    if (password.length < 6) {
        return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }
    return { valid: true, message: '' };
}

/**
 * Validate that two passwords match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        return { valid: false, message: 'Las contraseñas no coinciden' };
    }
    return { valid: true, message: '' };
}
