import React from 'react';
import { useJornada } from '../context/JornadaContext.jsx';
import JornadaStatus from '../components/jornadas/JornadaStatus.jsx';
import JornadaTimer from '../components/jornadas/JornadaTimer.jsx';
import JornadaControls from '../components/jornadas/JornadaControls.jsx';
import Alert from '../components/common/Alert.jsx';
import Card from '../components/common/Card.jsx';
import { formatTime } from '../utils/dateFormatters.js';
import './Jornada.css';

/**
 * Jornada page — start, pause, resume, finish a work shift with live timer.
 */
export default function Jornada() {
    const {
        jornada,
        loading,
        error,
        startJornada,
        pauseJornada,
        resumeJornada,
        finishJornada,
        clearError,
    } = useJornada();

    const handleFinish = async () => {
        const result = await finishJornada();
        /* result is the finished jornada data (or undefined on error) */
    };

    return (
        <div className="jornada-page">
            <div className="jornada-page__header">
                <h1>Registro de Jornada</h1>
                <p>Controla tu tiempo de trabajo</p>
            </div>

            {error && <Alert message={error} type="error" onClose={clearError} />}

            <Card className="jornada-page__card">
                <div className="jornada-page__status-row">
                    <JornadaStatus jornada={jornada} />
                    {jornada && (
                        <span className="jornada-page__start-time">
                            Inicio: {formatTime(jornada.hora_inicio)}
                        </span>
                    )}
                </div>

                <JornadaTimer jornada={jornada} />

                <JornadaControls
                    jornada={jornada}
                    loading={loading}
                    onStart={startJornada}
                    onPause={pauseJornada}
                    onResume={resumeJornada}
                    onFinish={handleFinish}
                />
            </Card>
        </div>
    );
}
