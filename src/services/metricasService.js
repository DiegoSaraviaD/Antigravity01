/**
 * Métricas de Productividad Service — Read-only queries for work shifts.
 * Focuses on time, attendance, and efficiency.
 */
import { supabase } from './supabase.js';

/**
 * Get core time stats for a user from the productivity table.
 * @param {string} userId
 * @returns {Promise<{data: {totalHorasMes, promedioDiario, diasTrabajados, jornadaMax}, error}>}
 */
export async function getStatsTiempo(userId) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('estadisticas_productividad')
        .select('total_horas_mes, promedio_diario, dias_trabajados, jornada_max')
        .eq('user_id', userId)
        .eq('periodo', startOfMonth)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is code for "no rows found"
        return { data: null, error: error.message };
    }

    if (!data) {
        return {
            data: {
                totalHorasMes: 0,
                promedioDiario: 0,
                diasTrabajados: 0,
                jornadaMax: 0
            },
            error: null
        };
    }

    return {
        data: {
            totalHorasMes: Number(data.total_horas_mes || 0),
            promedioDiario: Number(data.promedio_diario || 0),
            diasTrabajados: Number(data.dias_trabajados || 0),
            jornadaMax: Number(data.jornada_max || 0)
        },
        error: null
    };
}

/**
 * Get productivity chart data (worked hours per day, last 15 days).
 * @param {string} userId
 * @returns {Promise<{data: Array, error}>}
 */
export async function getGraficoProductividad(userId) {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    const fromDate = fifteenDaysAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('jornadas')
        .select('fecha, horas_trabajadas')
        .eq('user_id', userId)
        .eq('estado', 'finalizada')
        .gte('fecha', fromDate)
        .order('fecha', { ascending: true });

    if (error) return { data: [], error: error.message };

    // Group by date in case there are multiple shifts in one day
    const grouped = (data || []).reduce((acc, row) => {
        acc[row.fecha] = (acc[row.fecha] || 0) + Number(row.horas_trabajadas || 0);
        return acc;
    }, {});

    const chartData = Object.keys(grouped).map(date => ({
        fecha: date,
        horas: Number(grouped[date].toFixed(2))
    }));

    return { data: chartData, error: null };
}

/**
 * Calculate weekly progress vs a target (e.g. 40h).
 * @param {string} userId
 * @returns {Promise<{data: {current, target, percentage}, error}>}
 */
export async function getProgresoSemanal(userId) {
    const now = new Date();
    const day = now.getDay(); // 0 is Sun, 1 is Mon...
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    const monday = new Date(now.setDate(diff)).toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('jornadas')
        .select('horas_trabajadas')
        .eq('user_id', userId)
        .eq('estado', 'finalizada')
        .gte('fecha', monday);

    if (error) return { data: { current: 0, target: 40, percentage: 0 }, error: error.message };

    const current = (data || []).reduce((sum, r) => sum + Number(r.horas_trabajadas || 0), 0);
    const target = 40; // Hardcoded or fetch from user settings in the future
    const percentage = Math.min((current / target) * 100, 100);

    return { data: { current, target, percentage }, error: null };
}
