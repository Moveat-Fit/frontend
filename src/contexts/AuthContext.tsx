// src/contexts/AuthContext.tsx
"use client";

import { DecodedToken } from "@/components/AuthenticationForm/types";
import { } from "@/services/auth/types";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
    user: DecodedToken | null;
    setUser: (user: DecodedToken | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<DecodedToken | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            const decoded: DecodedToken = jwtDecode(token);
            setUser(decoded);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
