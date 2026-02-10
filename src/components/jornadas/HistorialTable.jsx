import React from 'react';
import { History } from 'lucide-react';
import Card from '../common/Card.jsx';
import { formatDate, formatTime, formatDuration } from '../../utils/dateFormatters.js';
import { JORNADA_STATUS } from '../../utils/constants.js';
import './HistorialTable.css';

/**
 * Table (desktop) / Card list (mobile) showing past shifts.
 *
 * @param {{ jornadas: Array, loading: boolean }} props
 */
export default function HistorialTable({ jornadas = [], loading }) {
    if (loading) {
        return <div className="historial-table__empty">Cargando historial...</div>;
    }

    if (jornadas.length === 0) {
        return (
            <div className="historial-table__empty">
                <History size={48} strokeWidth={1.5} color="var(--color-text-muted)" />
                <p>No hay jornadas registradas</p>
            </div>
        );
    }

    const statusBadge = (estado) => {
        const styles = {
            [JORNADA_STATUS.ACTIVE]: 'badge--active',
            [JORNADA_STATUS.PAUSED]: 'badge--paused',
            [JORNADA_STATUS.FINISHED]: 'badge--finished',
        };
        const labels = {
            [JORNADA_STATUS.ACTIVE]: 'Activa',
            [JORNADA_STATUS.PAUSED]: 'Pausada',
            [JORNADA_STATUS.FINISHED]: 'Finalizada',
        };
        return (
            <span className={`historial-badge ${styles[estado] || ''}`}>
                {labels[estado] || estado}
            </span>
        );
    };

    return (
        <>
            {/* Desktop table */}
            <div className="historial-table__desktop">
                <table className="historial-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Duración</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jornadas.map((jornada) => (
                            <tr key={jornada.id}>
                                <td>{formatDate(jornada.fecha)}</td>
                                <td>{formatTime(jornada.hora_inicio)}</td>
                                <td>{formatTime(jornada.hora_fin)}</td>
                                <td>{formatDuration(jornada.horas_trabajadas)}</td>
                                <td>{statusBadge(jornada.estado)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="historial-table__mobile">
                {jornadas.map((jornada) => (
                    <Card key={jornada.id} className="historial-card">
                        <div className="historial-card__header">
                            <span className="historial-card__date">{formatDate(jornada.fecha)}</span>
                            {statusBadge(jornada.estado)}
                        </div>
                        <div className="historial-card__details">
                            <div className="historial-card__detail">
                                <span className="historial-card__label">Inicio</span>
                                <span>{formatTime(jornada.hora_inicio)}</span>
                            </div>
                            <div className="historial-card__detail">
                                <span className="historial-card__label">Fin</span>
                                <span>{formatTime(jornada.hora_fin)}</span>
                            </div>
                            <div className="historial-card__detail">
                                <span className="historial-card__label">Duración</span>
                                <span>{formatDuration(jornada.horas_trabajadas)}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
}
