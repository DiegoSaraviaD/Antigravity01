import React from 'react';
import './Input.css';

/**
 * Labeled input with error state. Controlled component.
 *
 * @param {{ label, type?, value, onChange, error?, placeholder?, id?, disabled? }} props
 */
export default function Input({
    label,
    type = 'text',
    value,
    onChange,
    error = '',
    placeholder = '',
    id,
    disabled = false,
}) {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className={`input-group ${error ? 'input-group--error' : ''}`}>
            {label && (
                <label htmlFor={inputId} className="input-group__label">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="input-group__field"
                autoComplete={type === 'password' ? 'current-password' : 'off'}
            />
            {error && <span className="input-group__error">{error}</span>}
        </div>
    );
}
