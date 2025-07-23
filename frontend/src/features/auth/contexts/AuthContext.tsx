import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, User } from "../types/auth";
import { authApi } from "../apis/auth";

const AuthContext = createContext<AuthContextType|null>(null);

export { AuthContext };

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuthStatus = async() => {
        try {
            const response = await authApi.getUser();
            setUser(response);
        } catch (error) {
            console.error("Authentication check failed:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authApi.login({ email, password });
            setUser(response.data);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await authApi.register({
                name,
                email,
                password,
                password_confirmation: password,
            });
            setUser(response.data);
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }
    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
