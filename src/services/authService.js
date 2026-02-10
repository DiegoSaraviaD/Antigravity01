/**
 * Authentication Service — wraps Supabase Auth.
 * All auth operations are centralized here.
 */
import { supabase } from './supabase.js';

/**
 * Register a new user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{data, error}>}
 */
export async function signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: metadata
        }
    });
    if (error) return { data: null, error: error.message };
    return { data, error: null };
}

/**
 * Sign in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{data, error}>}
 */
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { data: null, error: error.message };
    return { data, error: null };
}

/**
 * Sign out the current user.
 * @returns {Promise<{error}>}
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: error.message };
    return { error: null };
}

/**
 * Get the current authenticated user (from session).
 * @returns {Promise<{user, error}>}
 */
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return { user: null, error: error.message };
    return { user, error: null };
}

/**
 * Subscribe to auth state changes.
 * @param {Function} callback  (event, session) => void
 * @returns {{ data: { subscription } }}
 */
export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
}
