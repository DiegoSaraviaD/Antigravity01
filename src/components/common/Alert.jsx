import React, { useState, useEffect } from 'react';
import './Alert.css';

/**
 * Toast-style alert notification.
 *
 * @param {{ message, type?, onClose?, autoClose? }} props
 * type: 'success' | 'error' | 'warning' | 'info'
 */
export default function Alert({
    message,
    type = 'info',
    onClose,
    autoClose = 5000,
}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!autoClose) return;
        const timer = setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, autoClose);
        return () => clearTimeout(timer);
    }, [autoClose, onClose]);

    if (!visible || !message) return null;

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };

    return (
        <div className={`alert alert--${type}`} role="alert">
            <span className="alert__icon">{icons[type]}</span>
            <span className="alert__message">{message}</span>
            {onClose && (
                <button
                    className="alert__close"
                    onClick={() => { setVisible(false); onClose(); }}
                    aria-label="Cerrar alerta"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
