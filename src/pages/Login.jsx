import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import Alert from '../components/common/Alert.jsx';
import { validateEmail, validatePassword } from '../utils/validators.js';
import { ROUTES } from '../utils/constants.js';
import './Auth.css';

/**
 * Login page — email/password form with validation and error handling.
 */
export default function Login() {
    const { user, signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    /* If already authenticated, redirect to dashboard */
    if (user) return <Navigate to={ROUTES.DASHBOARD} replace />;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setServerError('');

        /* Client-side validation */
        const emailResult = validateEmail(email);
        const passwordResult = validatePassword(password);
        const newErrors = {};

        if (!emailResult.valid) newErrors.email = emailResult.message;
        if (!passwordResult.valid) newErrors.password = passwordResult.message;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        const { error } = await signIn(email, password);
        if (error) {
            setServerError('Credenciales incorrectas. Verifica tu email y contraseña.');
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-card__header">
                    <Clock className="auth-card__logo" size={48} strokeWidth={1.5} color="var(--color-accent-primary)" />
                    <h1 className="auth-card__title">Iniciar Sesión</h1>
                    <p className="auth-card__subtitle">Accede a tu cuenta de Control Horario</p>
                </div>

                {serverError && <Alert message={serverError} type="error" onClose={() => setServerError('')} />}

                <form className="auth-card__form" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        placeholder="tu@email.com"
                        id="login-email"
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        placeholder="Tu contraseña"
                        id="login-password"
                    />
                    <Button type="submit" loading={loading} className="auth-card__submit">
                        Iniciar Sesión
                    </Button>
                </form>

                <p className="auth-card__footer">
                    ¿No tienes cuenta? <Link to={ROUTES.SIGNUP}>Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
}
