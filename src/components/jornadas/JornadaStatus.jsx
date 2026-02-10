import React from 'react';
import { JORNADA_STATUS } from '../../utils/constants.js';
import './JornadaStatus.css';

/**
 * Visual status indicator for the current jornada.
 *
 * @param {{ jornada: object|null }} props
 */
export default function JornadaStatus({ jornada }) {
    if (!jornada) {
        return (
            <div className="jornada-status jornada-status--none">
                <div className="jornada-status__dot" />
                <span>No hay jornada activa</span>
            </div>
        );
    }

    const statusConfig = {
        [JORNADA_STATUS.ACTIVE]: { label: 'Jornada en curso', className: 'active' },
        [JORNADA_STATUS.PAUSED]: { label: 'Jornada pausada', className: 'paused' },
        [JORNADA_STATUS.FINISHED]: { label: 'Jornada finalizada', className: 'finished' },
    };

    const config = statusConfig[jornada.estado] || statusConfig[JORNADA_STATUS.FINISHED];

    return (
        <div className={`jornada-status jornada-status--${config.className}`}>
            <div className="jornada-status__dot" />
            <span>{config.label}</span>
        </div>
    );
}
