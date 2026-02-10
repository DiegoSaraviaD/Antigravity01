import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Clock, History } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants.js';
import './Sidebar.css';

/** Lucide icons mapped by name */
const ICONS = {
    dashboard: <LayoutDashboard size={20} strokeWidth={2} />,
    timer: <Clock size={20} strokeWidth={2} />,
    history: <History size={20} strokeWidth={2} />,
};

/**
 * Sidebar navigation — collapsible on mobile via `isOpen` prop.
 */
export default function Sidebar({ isOpen, onClose }) {
    const location = useLocation();

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

            <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
                <nav className="sidebar__nav">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                            }
                            onClick={onClose}
                        >
                            <span className="sidebar__icon">{ICONS[item.icon]}</span>
                            <span className="sidebar__label">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
