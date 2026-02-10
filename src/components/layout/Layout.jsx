import React, { useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import './Layout.css';

/**
 * Main layout shell: Header + Sidebar + Content area.
 * Wraps all authenticated pages.
 */
export default function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="layout">
            <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <main className="layout__content">
                {children}
            </main>
        </div>
    );
}
