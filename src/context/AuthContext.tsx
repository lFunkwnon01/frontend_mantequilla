import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authservice";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ahorrista_user");
    if (stored) {
      const userData = JSON.parse(stored);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    const userData = { email: data.email, token: data.token };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("ahorrista_user", JSON.stringify(userData));
  };

  const register = async (email: string, password: string) => {
    const data = await authService.register(email, password);
    const userData = { email: data.email, token: data.token };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("ahorrista_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("ahorrista_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}