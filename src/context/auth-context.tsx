import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  currentUser: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from session storage
    const user = sessionStorage.getItem('currentUser');
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simple login - store email as the current user
    sessionStorage.setItem('currentUser', email);
    setCurrentUser(email);
  };

  const logout = async () => {
    // Clear the session storage
    sessionStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const signup = async (email: string, password: string) => {
    // For now, signup works the same as login in this simple implementation
    sessionStorage.setItem('currentUser', email);
    setCurrentUser(email);
  };

  const loginWithGoogle = async () => {
    // Mock Google login
    const mockEmail = 'google-user@example.com';
    sessionStorage.setItem('currentUser', mockEmail);
    setCurrentUser(mockEmail);
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    signup,
    loginWithGoogle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
