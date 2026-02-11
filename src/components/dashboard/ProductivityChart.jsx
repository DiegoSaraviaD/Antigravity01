import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import Card from '../common/Card.jsx';
import './FlowChart.css';

/**
 * Productivity Chart — bar chart showing worked hours over time.
 * @param {{ data: Array<{fecha, horas}> }} props
 */
export default function ProductivityChart({ data = [] }) {
    const isEmpty = !data || data.length === 0;

    const formatPeriod = (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="flow-chart__tooltip">
                <p className="flow-chart__tooltip-label">{formatPeriod(label)}</p>
                <p style={{ color: 'var(--color-accent-primary)' }}>
                    Horas: {payload[0].value}h
                </p>
            </div>
        );
    };

    return (
        <Card className="flow-chart">
            <div className="flow-chart__header">
                <h3 className="flow-chart__title">Productividad Semanal</h3>
                <span className="flow-chart__period">Horas trabajadas por día</span>
            </div>

            {isEmpty ? (
                <div className="flow-chart__empty">
                    <p>No hay datos de productividad disponibles</p>
                </div>
            ) : (
                <div className="flow-chart__container">
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis
                                dataKey="fecha"
                                tickFormatter={formatPeriod}
                                stroke="var(--color-text-muted)"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                tickFormatter={(v) => `${v}h`}
                                stroke="var(--color-text-muted)"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                            <Bar
                                dataKey="horas"
                                name="Horas"
                                radius={[4, 4, 0, 0]}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.horas >= 8 ? '#10b981' : 'var(--color-accent-primary)'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </Card>
    );
}
