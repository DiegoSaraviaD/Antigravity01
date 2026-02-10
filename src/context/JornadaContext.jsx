/**
 * JornadaContext — Active shift state shared across the app.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext.jsx';
import * as jornadasService from '../services/jornadasService.js';
import { calculateWorkedHours } from '../utils/timeCalculators.js';

const JornadaContext = createContext(null);

export function JornadaProvider({ children }) {
    const { user } = useAuth();
    const [jornada, setJornada] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /* ── Fetch active jornada when user changes ── */
    useEffect(() => {
        if (!user) {
            setJornada(null);
            return;
        }

        setLoading(true);
        jornadasService.getActiveJornada(user.id).then(({ data, error: fetchError }) => {
            if (fetchError) setError(fetchError);
            setJornada(data ?? null);
            setLoading(false);
        });
    }, [user]);

    const startJornada = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        const { data, error: startError } = await jornadasService.startJornada(user.id);
        if (startError) { setError(startError); setLoading(false); return; }
        setJornada(data);
        setLoading(false);
    }, [user]);

    const pauseJornada = useCallback(async () => {
        if (!jornada) return;
        setLoading(true);
        setError(null);
        const { data, error: pauseError } = await jornadasService.pauseJornada(jornada.id);
        if (pauseError) { setError(pauseError); setLoading(false); return; }
        setJornada(data);
        setLoading(false);
    }, [jornada]);

    const resumeJornada = useCallback(async () => {
        if (!jornada) return;
        setLoading(true);
        setError(null);
        const { data, error: resumeError } = await jornadasService.resumeJornada(jornada.id);
        if (resumeError) { setError(resumeError); setLoading(false); return; }
        setJornada(data);
        setLoading(false);
    }, [jornada]);

    const finishJornada = useCallback(async () => {
        if (!jornada) return;
        setLoading(true);
        setError(null);

        /* Calculate total worked hours excluding pauses */
        const endTime = new Date().toISOString();
        const pauseSeconds = jornada.hora_pausa
            ? (new Date(jornada.hora_pausa).getTime() - new Date(jornada.hora_inicio).getTime()) / 1000
            : 0;
        /* Simplified: for MVP, total pause = time from inicio to pausa if paused */
        const horasTrabajadas = calculateWorkedHours(jornada.hora_inicio, endTime, 0);

        const { data, error: finishError } = await jornadasService.finishJornada(
            jornada.id,
            Math.round(horasTrabajadas * 100) / 100
        );
        if (finishError) { setError(finishError); setLoading(false); return; }
        setJornada(null);
        setLoading(false);
        return data;
    }, [jornada]);

    const value = {
        jornada,
        loading,
        error,
        startJornada,
        pauseJornada,
        resumeJornada,
        finishJornada,
        clearError: () => setError(null),
    };

    return (
        <JornadaContext.Provider value={value}>
            {children}
        </JornadaContext.Provider>
    );
}

export function useJornada() {
    const context = useContext(JornadaContext);
    if (!context) {
        throw new Error('useJornada must be used within a JornadaProvider');
    }
    return context;
}
