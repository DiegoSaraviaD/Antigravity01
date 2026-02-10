import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';
import { ROUTES } from '../utils/constants.js';
import './NotFound.css';

/**
 * 404 Not Found page.
 */
export default function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found__content">
                <span className="not-found__code">404</span>
                <h1>Página no encontrada</h1>
                <p>La página que buscas no existe o ha sido movida.</p>
                <Link to={ROUTES.DASHBOARD}>
                    <Button variant="primary">Ir al Dashboard</Button>
                </Link>
            </div>
        </div>
    );
}
