import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import Alert from '../components/common/Alert.jsx';
import { validateEmail, validatePassword, validatePasswordMatch } from '../utils/validators.js';
import { ROUTES } from '../utils/constants.js';
import './Auth.css';

/**
 * Signup page — registration form with email, password, confirm password.
 */
export default function Signup() {
    const { user, signUp } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (user) return <Navigate to={ROUTES.DASHBOARD} replace />;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setServerError('');
        setSuccessMessage('');

        /* Client-side validation */
        const emailResult = validateEmail(email);
        const passwordResult = validatePassword(password);
        const matchResult = validatePasswordMatch(password, confirmPassword);
        const newErrors = {};

        if (!emailResult.valid) newErrors.email = emailResult.message;
        if (!passwordResult.valid) newErrors.password = passwordResult.message;
        if (!matchResult.valid) newErrors.confirmPassword = matchResult.message;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        /* Pass name in metadata for the profiles trigger */
        const { data, error } = await signUp(email, password, {
            name: email.split('@')[0],
        });

        if (error) {
            setServerError(error);
            setLoading(false);
            return;
        }

        setSuccessMessage('¡Cuenta creada! Revisa tu email para verificar tu cuenta antes de iniciar sesión.');
        setLoading(false);
        setTimeout(() => navigate(ROUTES.LOGIN), 5000);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-card__header">
                    <Clock className="auth-card__logo" size={48} strokeWidth={1.5} color="var(--color-accent-primary)" />
                    <h1 className="auth-card__title">Crear Cuenta</h1>
                    <p className="auth-card__subtitle">Regístrate en Control Horario</p>
                </div>

                {serverError && <Alert message={serverError} type="error" onClose={() => setServerError('')} />}
                {successMessage && <Alert message={successMessage} type="success" />}

                <form className="auth-card__form" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        placeholder="tu@email.com"
                        id="signup-email"
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        placeholder="Mínimo 6 caracteres"
                        id="signup-password"
                    />
                    <Input
                        label="Confirmar Contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        placeholder="Repite tu contraseña"
                        id="signup-confirm-password"
                    />
                    <Button type="submit" loading={loading} className="auth-card__submit">
                        Crear Cuenta
                    </Button>
                </form>

                <p className="auth-card__footer">
                    ¿Ya tienes cuenta? <Link to={ROUTES.LOGIN}>Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}
