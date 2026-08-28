import React, { createContext, useContext, useState } from 'react';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  onboardingComplete: boolean;
  setOnboardingComplete: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('mrwhite-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [onboardingComplete, setOnboardingComplete] = useState(true);

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1200));
    if (email && _password) {
      const u: AuthUser = {
        id: 'ADMIN-001',
        name: 'Mohamed Omar',
        email,
        role: 'Super Admin',
        photo: '',
      };
      setUser(u);
      localStorage.setItem('mrwhite-user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mrwhite-user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, onboardingComplete, setOnboardingComplete }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth outside AuthProvider');
  return ctx;
};
