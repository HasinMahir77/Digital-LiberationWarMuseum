import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'super_admin' | 'archivist' | 'curator' | 'researcher' | 'public';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@museum.gov.bd',
    name: 'Dr. Rahman Ahmed',
    role: 'super_admin',
  },
  {
    id: '2',
    email: 'archivist@museum.gov.bd',
    name: 'Fatima Khan',
    role: 'archivist',
  },
  {
    id: '3',
    email: 'curator@museum.gov.bd',
    name: 'Mohammad Hassan',
    role: 'curator',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('museum_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('museum_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('museum_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};