"use client";

import { useState, useEffect } from 'react';
import { supabase, checkSupabaseConnection } from '../../lib/supabaseClient';

export default function DebugPage() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Unknown');
  const [authStatus, setAuthStatus] = useState<string>('Unknown');
  const [user, setUser] = useState<any>(null);
  const [configInfo, setConfigInfo] = useState<any>(null);

  useEffect(() => {
    checkConnection();
    checkAuthStatus();
    
    // Dapatkan informasi konfigurasi
    setConfigInfo({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
    });
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('Checking...');
    const isConnected = await checkSupabaseConnection();
    setConnectionStatus(isConnected ? 'Connected' : 'Disconnected');
  };

  const checkAuthStatus = async () => {
    setAuthStatus('Checking...');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setAuthStatus('Authenticated');
        setUser(session.user);
      } else {
        setAuthStatus('Not authenticated');
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthStatus('Error checking auth status');
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error.message);
      } else {
        setAuthStatus('Not authenticated');
        setUser(null);
      }
    } catch (error) {
      console.error('Logout exception:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Supabase Configuration</h2>
          {configInfo && (
            <div className="mb-4">
              <p>URL: {configInfo.url}</p>
              <p>Anon Key Length: {configInfo.anonKeyLength} characters</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Supabase Connection</h2>
          <p className="mb-4">Status: {connectionStatus}</p>
          <button
            onClick={checkConnection}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Check Connection
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Authentication Status</h2>
          <p className="mb-4">Status: {authStatus}</p>
          {user && (
            <div className="mb-4">
              <p>User ID: {user.id}</p>
              <p>Email: {user.email}</p>
            </div>
          )}
          <button
            onClick={checkAuthStatus}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Check Auth Status
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
 );
}