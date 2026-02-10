import React, { useState, useEffect } from 'react';
import {
    DollarSign,
    Package,
    Users,
    TrendingUp as TrendUpIcon,
    Clock,
    Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import MetricCard from '../components/dashboard/MetricCard.jsx';
import FlowChart from '../components/dashboard/FlowChart.jsx';
import Loading from '../components/common/Loading.jsx';
import Alert from '../components/common/Alert.jsx';
import * as metricasService from '../services/metricasService.js';
import { formatCurrency } from '../utils/dateFormatters.js';
import './Dashboard.css';

/**
 * Dashboard page — financial metrics overview with cards and chart.
 */
export default function Dashboard() {
    const { user } = useAuth();
    const [metrics, setMetrics] = useState({
        ingresos: 0,
        costos: 0,
        clientes: { nuevos: 0, recurrentes: 0 },
        utilidad: { utilidad: 0, porcentaje: 0 },
        horas: 0,
        flujo: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        Promise.all([
            metricasService.getIngresos(user.id),
            metricasService.getCostos(user.id),
            metricasService.getClientes(user.id),
            metricasService.getUtilidad(user.id),
            metricasService.getHorasMes(user.id),
            metricasService.getFlujo(user.id),
        ])
            .then(([ingresosRes, costosRes, clientesRes, utilidadRes, horasRes, flujoRes]) => {
                const firstError = [ingresosRes, costosRes, clientesRes, utilidadRes, horasRes, flujoRes]
                    .find((r) => r.error);
                if (firstError?.error) setError(firstError.error);

                setMetrics({
                    ingresos: ingresosRes.data,
                    costos: costosRes.data,
                    clientes: clientesRes.data,
                    utilidad: utilidadRes.data,
                    horas: horasRes.data,
                    flujo: flujoRes.data,
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

    const utilidadIsPositive = metrics.utilidad.utilidad >= 0;

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1>Dashboard</h1>
                <p>Resumen de métricas financieras</p>
            </div>

            {error && <Alert message={error} type="warning" onClose={() => setError(null)} />}

            <div className="dashboard__grid">
                <MetricCard
                    title="Ingresos Totales"
                    value={formatCurrency(metrics.ingresos)}
                    color="success"
                    trendDirection="up"
                    Icon={DollarSign}
                />
                <MetricCard
                    title="Costos Totales"
                    value={formatCurrency(metrics.costos)}
                    color="danger"
                    trendDirection="down"
                    Icon={Package}
                />
                <MetricCard
                    title="Clientes"
                    value={`${metrics.clientes.nuevos + metrics.clientes.recurrentes}`}
                    subtitle={`${metrics.clientes.nuevos} nuevos · ${metrics.clientes.recurrentes} recurrentes`}
                    color="info"
                    Icon={Users}
                />
                <MetricCard
                    title="Utilidad Neta"
                    value={formatCurrency(metrics.utilidad.utilidad)}
                    trend={`${metrics.utilidad.porcentaje.toFixed(1)}%`}
                    trendDirection={utilidadIsPositive ? 'up' : 'down'}
                    color={utilidadIsPositive ? 'success' : 'danger'}
                    Icon={TrendUpIcon}
                />
                <MetricCard
                    title="Horas del Mes"
                    value={`${metrics.horas.toFixed(1)}h`}
                    color="secondary"
                    Icon={Clock}
                />
                <MetricCard
                    title="Rentabilidad"
                    value={metrics.horas > 0 ? formatCurrency(metrics.utilidad.utilidad / metrics.horas) : 'S/ 0.00'}
                    subtitle="Utilidad por hora"
                    color="accent"
                    Icon={Zap}
                />
            </div>

            <FlowChart data={metrics.flujo} />
        </div>
    );
}
