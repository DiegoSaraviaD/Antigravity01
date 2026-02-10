import React from 'react';
import './Loading.css';

/**
 * Loading indicator — spinner or skeleton.
 *
 * @param {{ type?, size?, text? }} props
 * type: 'spinner' | 'skeleton'
 */
export default function Loading({ type = 'spinner', size = 'md', text = '' }) {
    if (type === 'skeleton') {
        return (
            <div className={`skeleton skeleton--${size}`}>
                <div className="skeleton__line skeleton__line--title" />
                <div className="skeleton__line skeleton__line--body" />
                <div className="skeleton__line skeleton__line--body skeleton__line--short" />
            </div>
        );
    }

    return (
        <div className={`loading loading--${size}`}>
            <div className="loading__spinner" />
            {text && <span className="loading__text">{text}</span>}
        </div>
    );
}
