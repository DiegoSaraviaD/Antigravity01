/**
 * App — Root component.
 * Sets up auth provider, routing, and layout.
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { JornadaProvider } from './context/JornadaContext.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import Layout from './components/layout/Layout.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Jornada from './pages/Jornada.jsx';
import Historial from './pages/Historial.jsx';
import NotFound from './pages/NotFound.jsx';
import { ROUTES } from './utils/constants.js';
import './styles/global.css';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <JornadaProvider>
                    <Routes>
                        {/* Public routes */}
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.SIGNUP} element={<Signup />} />

                        {/* Protected routes — wrapped in Layout */}
                        <Route
                            path={ROUTES.DASHBOARD}
                            element={
                                <ProtectedRoute>
                                    <Layout><Dashboard /></Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={ROUTES.JORNADA}
                            element={
                                <ProtectedRoute>
                                    <Layout><Jornada /></Layout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={ROUTES.HISTORIAL}
                            element={
                                <ProtectedRoute>
                                    <Layout><Historial /></Layout>
                                </ProtectedRoute>
                            }
                        />

                        {/* Root → Dashboard */}
                        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </JornadaProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
