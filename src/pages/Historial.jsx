import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import HistorialTable from '../components/jornadas/HistorialTable.jsx';
import * as jornadasService from '../services/jornadasService.js';
import Alert from '../components/common/Alert.jsx';
import './Historial.css';

/**
 * Historial page — displays historical shift records.
 */
export default function Historial() {
    const { user } = useAuth();
    const [jornadas, setJornadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        jornadasService.getHistorial(user.id)
            .then(({ data, error: fetchError }) => {
                if (fetchError) setError(fetchError);
                setJornadas(data || []);
                setLoading(false);
            })
            .catch(() => {
                setError('Error al cargar el historial de jornadas');
                setLoading(false);
            });
    }, [user]);

    return (
        <div className="historial-page">
            <div className="historial-page__header">
                <h1>Historial de Jornadas</h1>
                <p>Registro completo de tus jornadas laborales</p>
            </div>

            {error && <Alert message={error} type="error" onClose={() => setError(null)} />}

            <HistorialTable jornadas={jornadas} loading={loading} />
        </div>
    );
}
