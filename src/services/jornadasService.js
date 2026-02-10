/**
 * Jornadas Service — CRUD operations for the jornadas table.
 */
import { supabase } from './supabase.js';
import { JORNADA_STATUS } from '../utils/constants.js';

/**
 * Start a new work shift.
 * @param {string} userId
 * @returns {Promise<{data, error}>}
 */
export async function startJornada(userId) {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('jornadas')
        .insert({
            user_id: userId,
            fecha: now.split('T')[0],
            hora_inicio: now,
            estado: JORNADA_STATUS.ACTIVE,
        })
        .select()
        .single();

    if (error) return { data: null, error: error.message };
    return { data, error: null };
}

/**
 * Pause the current active shift.
 * @param {string} jornadaId
 * @returns {Promise<{data, error}>}
 */
export async function pauseJornada(jornadaId) {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('jornadas')
        .update({
            hora_pausa: now,
            estado: JORNADA_STATUS.PAUSED,
            updated_at: now,
        })
        .eq('id', jornadaId)
        .select()
        .single();

    if (error) return { data: null, error: error.message };
    return { data, error: null };
}

/**
 * Resume a paused shift (set back to active, clear hora_pausa).
 * @param {string} jornadaId
 * @returns {Promise<{data, error}>}
 */
export async function resumeJornada(jornadaId) {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('jornadas')
        .update({
            hora_pausa: null,
            estado: JORNADA_STATUS.ACTIVE,
            updated_at: now,
        })
        .eq('id', jornadaId)
        .select()
        .single();

    if (error) return { data: null, error: error.message };
    return { data, error: null };
}

/**
 * Finish a work shift.
 * @param {string} jornadaId
 * @param {number} horasTrabajadas  Decimal hours worked
 * @returns {Promise<{data, error}>}
 */
export async function finishJornada(jornadaId, horasTrabajadas) {
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from('jornadas')
        .update({
            hora_fin: now,
            horas_trabajadas: horasTrabajadas,
            estado: JORNADA_STATUS.FINISHED,
            updated_at: now,
        })
        .eq('id', jornadaId)
        .select()
        .single();

    if (error) return { data: null, error: error.message };
    return { data, error: null };
}

/**
 * Get the currently active shift for a user.
 * @param {string} userId
 * @returns {Promise<{data, error}>}
 */
export async function getActiveJornada(userId) {
    const { data, error } = await supabase
        .from('jornadas')
        .select('*')
        .eq('user_id', userId)
        .in('estado', [JORNADA_STATUS.ACTIVE, JORNADA_STATUS.PAUSED])
        .limit(1)
        .maybeSingle();

    if (error) return { data: null, error: error.message };
    return { data, error: null };
}

/**
 * Get shift history (most recent first).
 * @param {string} userId
 * @param {number} limit
 * @returns {Promise<{data, error}>}
 */
export async function getHistorial(userId, limit = 50) {
    const { data, error } = await supabase
        .from('jornadas')
        .select('id, fecha, hora_inicio, hora_fin, horas_trabajadas, estado')
        .eq('user_id', userId)
        .order('fecha', { ascending: false })
        .order('hora_inicio', { ascending: false })
        .limit(limit);

    if (error) return { data: null, error: error.message };
    return { data: data || [], error: null };
}
