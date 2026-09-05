import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const session = await AsyncStorage.getItem('@user_session');
        if (session) setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to load session', e);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []);

 const signIn = async (phoneToken: string) => {
    try {
      await AsyncStorage.setItem('@user_session', phoneToken);
      setIsLoggedIn(true);
    } catch (e) {
      console.error('Failed to sign in', e);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@user_session');
      setIsLoggedIn(false);
    } catch (e) {
      console.error('Failed to sign out', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};