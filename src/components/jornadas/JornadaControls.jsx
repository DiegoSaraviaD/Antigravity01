import React from 'react';
import { Play, Pause, Square } from 'lucide-react';
import Button from '../common/Button.jsx';
import { JORNADA_STATUS } from '../../utils/constants.js';
import './JornadaControls.css';

/**
 * Control buttons for starting, pausing, resuming, and finishing a jornada.
 *
 * @param {{ jornada, loading, onStart, onPause, onResume, onFinish }} props
 */
export default function JornadaControls({
    jornada,
    loading,
    onStart,
    onPause,
    onResume,
    onFinish,
}) {
    const hasActiveJornada = !!jornada;
    const isActive = jornada?.estado === JORNADA_STATUS.ACTIVE;
    const isPaused = jornada?.estado === JORNADA_STATUS.PAUSED;

    return (
        <div className="jornada-controls">
            {!hasActiveJornada && (
                <Button
                    variant="primary"
                    onClick={onStart}
                    loading={loading}
                    className="jornada-controls__btn jornada-controls__btn--start"
                >
                    <Play size={18} style={{ marginRight: '8px' }} />
                    Iniciar Jornada
                </Button>
            )}

            {isActive && (
                <>
                    <Button
                        variant="secondary"
                        onClick={onPause}
                        loading={loading}
                        className="jornada-controls__btn"
                    >
                        <Pause size={18} style={{ marginRight: '8px' }} />
                        Pausar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onFinish}
                        loading={loading}
                        className="jornada-controls__btn"
                    >
                        <Square size={18} style={{ marginRight: '8px' }} />
                        Finalizar
                    </Button>
                </>
            )}

            {isPaused && (
                <>
                    <Button
                        variant="primary"
                        onClick={onResume}
                        loading={loading}
                        className="jornada-controls__btn"
                    >
                        <Play size={18} style={{ marginRight: '8px' }} />
                        Reanudar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onFinish}
                        loading={loading}
                        className="jornada-controls__btn"
                    >
                        <Square size={18} style={{ marginRight: '8px' }} />
                        Finalizar
                    </Button>
                </>
            )}
        </div>
    );
}
