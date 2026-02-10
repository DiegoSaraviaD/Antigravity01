import React from 'react';
import Card from '../common/Card.jsx';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './MetricCard.css';

/**
 * Dashboard metric card — shows title, value, trend indicator, and mini icon.
 *
 * @param {{ title, value, subtitle?, Icon?, trend?, trendDirection?, color? }} props
 * trendDirection: 'up' | 'down' | 'neutral'
 */
export default function MetricCard({
    title,
    value,
    subtitle = '',
    Icon,
    trend = '',
    trendDirection = 'neutral',
    color = 'primary',
}) {
    const TrendIcon = trendDirection === 'up' ? TrendingUp : trendDirection === 'down' ? TrendingDown : Minus;

    return (
        <Card className={`metric-card metric-card--${color}`}>
            <div className="metric-card__header">
                <span className="metric-card__title">{title}</span>
                {Icon && (
                    <span className="metric-card__icon">
                        <Icon size={20} strokeWidth={1.5} />
                    </span>
                )}
            </div>
            <div className="metric-card__value">{value}</div>
            <div className="metric-card__footer">
                {trend && (
                    <span className={`metric-card__trend metric-card__trend--${trendDirection}`}>
                        <TrendIcon size={14} style={{ marginRight: '4px' }} />
                        {trend}
                    </span>
                )}
                {subtitle && <span className="metric-card__subtitle">{subtitle}</span>}
            </div>
        </Card>
    );
}
