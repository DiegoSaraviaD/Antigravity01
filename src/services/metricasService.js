/**
 * Métricas Financieras Service — read-only queries for dashboard metrics.
 * Column mapping matches the `metricas_financieras` table:
 *   periodo, ingresos, egresos, clientes_nuevos, clientes_recurrentes
 */
import { supabase } from './supabase.js';

/**
 * Get total income for a user (sum of all periods).
 * @param {string} userId
 * @returns {Promise<{data: number, error}>}
 */
export async function getIngresos(userId) {
    const { data, error } = await supabase
        .from('metricas_financieras')
        .select('ingresos')
        .eq('user_id', userId);

    if (error) return { data: 0, error: error.message };
    const total = (data || []).reduce((sum, row) => sum + Number(row.ingresos || 0), 0);
    return { data: total, error: null };
}

/**
 * Get total costs for a user.
 * @param {string} userId
 * @returns {Promise<{data: number, error}>}
 */
export async function getCostos(userId) {
    const { data, error } = await supabase
        .from('metricas_financieras')
        .select('egresos')
        .eq('user_id', userId);

    if (error) return { data: 0, error: error.message };
    const total = (data || []).reduce((sum, row) => sum + Number(row.egresos || 0), 0);
    return { data: total, error: null };
}

/**
 * Get client counts (new + recurring).
 * @param {string} userId
 * @returns {Promise<{data: {nuevos, recurrentes}, error}>}
 */
export async function getClientes(userId) {
    const { data, error } = await supabase
        .from('metricas_financieras')
        .select('clientes_nuevos, clientes_recurrentes')
        .eq('user_id', userId);

    if (error) return { data: { nuevos: 0, recurrentes: 0 }, error: error.message };
    const nuevos = (data || []).reduce((s, r) => s + Number(r.clientes_nuevos || 0), 0);
    const recurrentes = (data || []).reduce((s, r) => s + Number(r.clientes_recurrentes || 0), 0);
    return { data: { nuevos, recurrentes }, error: null };
}

/**
 * Get net profit (ingresos – egresos) and profit percentage.
 * Computed client-side from ingresos & egresos columns.
 * @param {string} userId
 * @returns {Promise<{data: {utilidad, porcentaje}, error}>}
 */
export async function getUtilidad(userId) {
    const { data, error } = await supabase
        .from('metricas_financieras')
        .select('ingresos, egresos')
        .eq('user_id', userId);

    if (error) return { data: { utilidad: 0, porcentaje: 0 }, error: error.message };

    const totalIngresos = (data || []).reduce((s, r) => s + Number(r.ingresos || 0), 0);
    const totalEgresos = (data || []).reduce((s, r) => s + Number(r.egresos || 0), 0);
    const utilidad = totalIngresos - totalEgresos;
    const porcentaje = totalIngresos > 0 ? (utilidad / totalIngresos) * 100 : 0;

    return { data: { utilidad, porcentaje }, error: null };
}

/**
 * Get flow data for chart (ingresos & egresos per period, last 7 days).
 * @param {string} userId
 * @returns {Promise<{data: Array, error}>}
 */
export async function getFlujo(userId) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fromDate = sevenDaysAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('metricas_financieras')
        .select('periodo, ingresos, egresos')
        .eq('user_id', userId)
        .gte('periodo', fromDate)
        .order('periodo', { ascending: true });

    if (error) return { data: [], error: error.message };

    const chartData = (data || []).map((row) => ({
        periodo: row.periodo,
        ingresos: Number(row.ingresos || 0),
        egresos: Number(row.egresos || 0),
    }));

    return { data: chartData, error: null };
}

/**
 * Get total worked hours for a user in the current month.
 * @param {string} userId
 * @returns {Promise<{data: number, error}>}
 */
export async function getHorasMes(userId) {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const { data, error } = await supabase
        .from('jornadas')
        .select('horas_trabajadas')
        .eq('user_id', userId)
        .eq('estado', 'finalizada')
        .gte('fecha', firstDay.split('T')[0]);

    if (error) return { data: 0, error: error.message };
    const total = (data || []).reduce((sum, row) => sum + Number(row.horas_trabajadas || 0), 0);
    return { data: total, error: null };
}
