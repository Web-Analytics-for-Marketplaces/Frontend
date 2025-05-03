import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login, User } from '../api';

interface AuthContextType {
  user: User | null;
  signin: (username: string, password: string) => Promise<void>;
  signout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function signin(username: string, password: string) {
    try {
      const response = await login(username, password);
      setUser(response.user);
      // Store token in localStorage or secure cookie
      localStorage.setItem('auth_token', response.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  function signout() {
    setUser(null);
    localStorage.removeItem('auth_token');
  }

  const value = {
    user,
    signin,
    signout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}