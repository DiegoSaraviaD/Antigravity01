import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loading from '../common/Loading.jsx';
import { ROUTES } from '../../utils/constants.js';

/**
 * ProtectedRoute — renders children only if user is authenticated.
 * Redirects to /login otherwise.
 */
export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Loading size="lg" text="Verificando sesión..." />
            </div>
        );
    }

    if (!user) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
}
