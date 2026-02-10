import React from 'react';
import { Menu, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import './Header.css';

/**
 * Top navigation header — shows app name, user email, and logout button.
 */
export default function Header({ onToggleSidebar }) {
    const { user, signOut } = useAuth();

    return (
        <header className="header">
            <div className="header__left">
                <button
                    className="header__menu-btn"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <Menu size={20} />
                </button>
                <div className="header__brand">
                    <Clock className="header__logo" size={28} strokeWidth={2} color="var(--color-accent-primary)" />
                    <span className="header__title">Control Horario</span>
                </div>
            </div>

            <div className="header__right">
                {user && (
                    <div className="header__user">
                        <div className="header__avatar">
                            {user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="header__email">{user.email}</span>
                    </div>
                )}
                <button className="header__logout" onClick={signOut} title="Cerrar sesión">
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
}
