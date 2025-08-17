"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, checkSupabaseConnection } from '../lib/supabaseClient';

type AuthContextType = {
  isAuthenticated: boolean | null; // null berarti status belum ditentukan
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (newPassword: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null berarti status belum ditentukan
  const router = useRouter();

  useEffect(() => {
    console.log('Initializing auth context');
    
    // Cek koneksi ke Supabase
    checkSupabaseConnection().then(isConnected => {
      if (!isConnected) {
        console.error('Failed to connect to Supabase');
      }
    });

    // Cek status autentikasi dari Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        if (event === 'SIGNED_IN' && session) {
          console.log('User signed in:', session.user.email);
          setIsAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setIsAuthenticated(false);
        } else if (event === 'INITIAL_SESSION') {
          // Ini terjadi saat aplikasi pertama kali dimuat
          console.log('Initial session:', session ? session.user.email : 'No session');
          setIsAuthenticated(!!session);
        }
      }
    );

    // Cek sesi saat ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Current session:', session ? session.user.email : 'No session');
      setIsAuthenticated(!!session);
    });

    // Cleanup listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

 const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login with email:', email);
      
      // Periksa koneksi sebelum login
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.error('Cannot login: Supabase connection failed');
        return false;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        console.error('Login error:', error.message);
        console.error('Error code:', error.status);
        console.error('Error details:', {
          code: error.code,
          message: error.message
        });
        return false;
      }
  
      if (data.user) {
        console.log('Login successful for user:', data.user.email);
        setIsAuthenticated(true);
        return true;
      } else {
        console.error('Login failed: No user data returned');
        return false;
      }
    } catch (err) {
      console.error('Login exception:', err);
      return false;
    }
  };
  
  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.error('Register error:', error.message);
        return false;
      }
  
      if (data.user) {
        // Registrasi berhasil
        return true;
      }
    } catch (err) {
      console.error('Register exception:', err);
    }
    
    return false;
  };
  
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error.message);
      }
    } catch (err) {
      console.error('Logout exception:', err);
    }
    
    setIsAuthenticated(false);
    router.push('/login');
  };
  
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:300/reset-password',
      });
  
      if (error) {
        console.error('Reset password error:', error.message);
        return false;
      }
  
      return true;
    } catch (err) {
      console.error('Reset password exception:', err);
      return false;
    }
  };
  
  const updatePassword = async (newPassword: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
  
      if (error) {
        console.error('Update password error:', error.message);
        return false;
      }
  
      return true;
    } catch (err) {
      console.error('Update password exception:', err);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register, resetPassword, updatePassword }}>
      {children}
   </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}