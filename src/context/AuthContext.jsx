/**
 * AuthContext — Global authentication state.
 * Provides user, loading, signIn, signUp, signOut to all children.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ── Bootstrap: check existing session on mount ── */
    useEffect(() => {
        authService.getCurrentUser().then(({ user }) => {
            setUser(user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = authService.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    /* ── Auth actions ── */
    const handleSignIn = useCallback(async (email, password) => {
        const { data, error } = await authService.signIn(email, password);
        if (error) return { error };
        setUser(data.user);
        return { error: null };
    }, []);

    const handleSignUp = useCallback(async (email, password) => {
        const { data, error } = await authService.signUp(email, password);
        if (error) return { error };
        return { error: null, data };
    }, []);

    const handleSignOut = useCallback(async () => {
        await authService.signOut();
        setUser(null);
    }, []);

    const value = {
        user,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to access auth context. Must be used within AuthProvider.
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
