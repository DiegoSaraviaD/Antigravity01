import React from 'react';
import './Button.css';

/**
 * Reusable Button component with variants and loading state.
 *
 * @param {{ children, onClick, variant?, disabled?, loading?, type?, className? }} props
 * variant: 'primary' | 'secondary' | 'danger' | 'ghost'
 */
export default function Button({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    loading = false,
    type = 'button',
    className = '',
}) {
    return (
        <button
            type={type}
            className={`btn btn--${variant} ${loading ? 'btn--loading' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && <span className="btn__spinner" aria-hidden="true" />}
            <span className={`btn__label ${loading ? 'btn__label--hidden' : ''}`}>
                {children}
            </span>
        </button>
    );
}
