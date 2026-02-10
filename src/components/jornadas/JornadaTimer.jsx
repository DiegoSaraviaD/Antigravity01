import React, { useState, useEffect, useRef } from 'react';
import { JORNADA_STATUS } from '../../utils/constants.js';
import { calculateElapsedSeconds } from '../../utils/timeCalculators.js';
import { formatSecondsToTimer } from '../../utils/dateFormatters.js';
import './JornadaTimer.css';

/**
 * Live timer showing HH:MM:SS worked time. Updates every second when active.
 *
 * @param {{ jornada: object|null }} props
 */
export default function JornadaTimer({ jornada }) {
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        /* Clear previous interval */
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (!jornada) {
            setElapsed(0);
            return;
        }

        /* If paused, show frozen elapsed time */
        if (jornada.estado === JORNADA_STATUS.PAUSED) {
            const frozenSeconds = calculateElapsedSeconds(
                jornada.hora_inicio,
                jornada.hora_pausa
            );
            setElapsed(frozenSeconds);
            return;
        }

        /* If active, tick every second */
        if (jornada.estado === JORNADA_STATUS.ACTIVE) {
            const tick = () => {
                const seconds = calculateElapsedSeconds(jornada.hora_inicio);
                setElapsed(seconds);
            };
            tick(); // immediate
            intervalRef.current = setInterval(tick, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [jornada?.id, jornada?.estado, jornada?.hora_inicio, jornada?.hora_pausa]);

    const isActive = jornada?.estado === JORNADA_STATUS.ACTIVE;

    return (
        <div className={`jornada-timer ${isActive ? 'jornada-timer--running' : ''}`}>
            <span className="jornada-timer__display">
                {formatSecondsToTimer(elapsed)}
            </span>
            {isActive && <span className="jornada-timer__pulse" />}
        </div>
    );
}
