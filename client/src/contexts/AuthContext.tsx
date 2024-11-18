// contexts/AuthContext.tsx
import React, { createContext, useContext } from 'react';
import { useSessionCheck } from '../hooks/auth/useSessionCheck';

interface AuthContextProps {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, loading, error } = useSessionCheck();

    const logout = () => {
        localStorage.removeItem('token'); // Удаляем токен из локального хранилища при выходе
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, error, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
