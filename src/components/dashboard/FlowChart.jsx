import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import Card from '../common/Card.jsx';
import './FlowChart.css';

/**
 * Flow chart — area chart showing income vs expenses over time.
 *
 * @param {{ data: Array<{periodo, ingresos, egresos}> }} props
 */
export default function FlowChart({ data = [] }) {
    const isEmpty = !data || data.length === 0;

    /* Format period label to short date */
    const formatPeriod = (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
    };

    const formatCurrency = (value) => `S/ ${Number(value).toLocaleString('es-PE')}`;

    /* Custom tooltip component */
    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="flow-chart__tooltip">
                <p className="flow-chart__tooltip-label">{formatPeriod(label)}</p>
                {payload.map((entry) => (
                    <p key={entry.name} style={{ color: entry.color }}>
                        {entry.name}: {formatCurrency(entry.value)}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <Card className="flow-chart">
            <div className="flow-chart__header">
                <h3 className="flow-chart__title">Flujo de Ingresos y Egresos</h3>
                <span className="flow-chart__period">Últimos 7 días</span>
            </div>

            {isEmpty ? (
                <div className="flow-chart__empty">
                    <p>No hay datos de flujo disponibles</p>
                </div>
            ) : (
                <div className="flow-chart__container">
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradientIngresos" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradientEgresos" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="periodo"
                                tickFormatter={formatPeriod}
                                stroke="var(--color-text-muted)"
                                fontSize={12}
                                tickLine={false}
                            />
                            <YAxis
                                tickFormatter={(v) => `S/${v}`}
                                stroke="var(--color-text-muted)"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                iconType="circle"
                                formatter={(value) => <span style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}>{value}</span>}
                            />
                            <Area
                                type="monotone"
                                dataKey="ingresos"
                                name="Ingresos"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="url(#gradientIngresos)"
                            />
                            <Area
                                type="monotone"
                                dataKey="egresos"
                                name="Egresos"
                                stroke="#ef4444"
                                strokeWidth={2}
                                fill="url(#gradientEgresos)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    );
}
