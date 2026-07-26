import { createContext, useContext, useEffect, useState } from "react";
import API_URL from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Authentication check failed:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}