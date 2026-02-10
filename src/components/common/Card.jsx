import React from 'react';
import './Card.css';

/**
 * Glassmorphism-style card container.
 *
 * @param {{ children, className?, onClick? }} props
 */
export default function Card({ children, className = '', onClick }) {
    return (
        <div
            className={`card ${className}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}
