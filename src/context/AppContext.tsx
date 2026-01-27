import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  balance: number;
  wins: number;
  losses: number;
  streak: number;
}

interface Prediction {
  option: string;
  amount: number;
  marketId: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  prediction: Prediction | null;
  setPrediction: (prediction: Prediction | null) => void;
  isAuthenticated: boolean;
  login: (method: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const login = (method: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      username: method === 'anonymous' ? 'Guest123' : `User_${Math.floor(Math.random() * 1000)}`,
      balance: 500,
      wins: 12,
      losses: 8,
      streak: 3,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    setPrediction(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        prediction,
        setPrediction,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
