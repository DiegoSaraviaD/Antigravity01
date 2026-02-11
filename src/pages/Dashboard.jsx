import React, { useState, useEffect } from 'react';
import {
    Clock,
    Calendar,
    Zap,
    TrendingUp,
    History,
    BarChart2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import MetricCard from '../components/dashboard/MetricCard.jsx';
import ProductivityChart from '../components/dashboard/ProductivityChart.jsx';
import Loading from '../components/common/Loading.jsx';
import Alert from '../components/common/Alert.jsx';
import * as metricasService from '../services/metricasService.js';
import './Dashboard.css';

/**
 * Dashboard page — time control and productivity overview.
 */
export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalHorasMes: 0,
        promedioDiario: 0,
        diasTrabajados: 0,
        jornadaMax: 0,
        progreso: { current: 0, target: 40, percentage: 0 },
        grafico: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        Promise.all([
            metricasService.getStatsTiempo(user.id),
            metricasService.getProgresoSemanal(user.id),
            metricasService.getGraficoProductividad(user.id),
        ])
            .then(([statsRes, progresoRes, graficoRes]) => {
                const firstError = [statsRes, progresoRes, graficoRes].find((r) => r.error);
                if (firstError?.error) setError(firstError.error);

                setStats({
                    ...statsRes.data,
                    progreso: progresoRes.data,
                    grafico: graficoRes.data,
                });
                setLoading(false);
            })
            .catch((err) => {
                setError('Error al cargar métricas del dashboard');
                setLoading(false);
            });
    }, [user]);

    if (loading) {
        return (
            <div className="dashboard">
                <Loading size="lg" text="Cargando dashboard..." />
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1>Dashboard</h1>
                <p>Resumen de control horario y productividad</p>
            </div>

            {error && <Alert message={error} type="warning" onClose={() => setError(null)} />}

            <div className="dashboard__grid">
                <MetricCard
                    title="Horas del Mes"
                    value={`${stats.totalHorasMes.toFixed(1)}h`}
                    color="primary"
                    Icon={Clock}
                />
                <MetricCard
                    title="Promedio Diario"
                    value={`${stats.promedioDiario.toFixed(1)}h`}
                    subtitle="Horas por día trabajado"
                    color="secondary"
                    Icon={TrendingUp}
                />
                <MetricCard
                    title="Días Trabajados"
                    value={`${stats.diasTrabajados}`}
                    subtitle="En el mes actual"
                    color="info"
                    Icon={Calendar}
                />
                <MetricCard
                    title="Jornada Máxima"
                    value={`${stats.jornadaMax.toFixed(1)}h`}
                    subtitle="Récord personal"
                    color="accent"
                    Icon={Zap}
                />
                <MetricCard
                    title="Carga Semanal"
                    value={`${stats.progreso.current.toFixed(1)}h`}
                    trend={`${stats.progreso.percentage.toFixed(0)}%`}
                    trendDirection={stats.progreso.percentage >= 80 ? 'up' : 'neutral'}
                    subtitle={`Meta: ${stats.progreso.target}h`}
                    color="success"
                    Icon={BarChart2}
                />
                <MetricCard
                    title="Eficiencia"
                    value={stats.diasTrabajados > 0 ? `${((stats.totalHorasMes / (stats.diasTrabajados * 8)) * 100).toFixed(0)}%` : '0%'}
                    subtitle="Vs jornada de 8h"
                    color="warning"
                    Icon={History}
                />
            </div>

            <ProductivityChart data={stats.grafico} />
        </div>
    );
}
