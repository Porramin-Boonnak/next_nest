"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { logger } from '../lib/logger';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getApiHost = () => {
    if (typeof window === 'undefined') {
      return 'http://localhost:3001';
    }
    return `http://${window.location.hostname}:3001`;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${getApiHost()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
      credentials: 'include', 
    });
      if (res.ok) {
        setUser({ email });
        logger.info({ 
          message: 'Auth success',
          email,
        });
        return true;
      }
      const errorMessage = await res.text().catch(() => 'unknown');
      logger.error({ 
        message: 'Auth failure',
        email,
        status: res.status,
        detail: errorMessage,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch(`${getApiHost()}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  logger.info({ 
    message: 'Logout success' 
  });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
