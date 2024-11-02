import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthContextType, User, SignupData } from '../lib/types';
import { api } from '../lib/api';

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = 'movematch_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing token and fetch user profile on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      api.auth.getProfile(token)
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.auth.login(email, password);
    const { token, user } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
    navigate('/dashboard');
  };

  const signup = async (data: SignupData) => {
    const response = await api.auth.signup(data);
    const { token, user } = response.data;
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}