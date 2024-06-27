import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axiosInstance from '../lib/axiosConfig';

interface User {
  _id: string
  membername: string
  isAdmin: boolean
  name: string
  yob: number
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => void;
  logout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      setUser(res.data.user);
    } catch (err) {
      console.error('Failed to fetch user data', err);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data when the component mounts
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
