"use client";

import { useState, useEffect } from 'react';
import { checkSupabaseConnection } from '../../lib/supabaseClient';

// Definisikan tipe untuk informasi konfigurasi
type ConfigInfo = {
  url: string | undefined;
  anonKeyPresent: boolean;
  anonKeyLength: number;
};

export function SupabaseDebugInfo() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Unknown');
  const [configInfo, setConfigInfo] = useState<ConfigInfo | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    // Dapatkan informasi konfigurasi
    setConfigInfo({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKeyPresent: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      anonKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0
    });
    
    // Periksa koneksi
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('Checking...');
    const isConnected = await checkSupabaseConnection();
    setConnectionStatus(isConnected ? 'Connected' : 'Disconnected');
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 w-80">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Supabase Debug</h3>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-400 hover:text-blue-300"
          >
            {showDetails ? 'Hide' : 'Show'}
          </button>
        </div>
        
        <div className="mb-2">
          <p className="text-sm">Connection: {connectionStatus}</p>
        </div>
        
        {showDetails && configInfo && (
          <div className="text-xs">
            <p>URL: {configInfo.url?.substring(0, 30)}...</p>
            <p>Anon Key Present: {configInfo.anonKeyPresent ? 'Yes' : 'No'}</p>
            <p>Anon Key Length: {configInfo.anonKeyLength} chars</p>
          </div>
        )}
        
        <button 
          onClick={checkConnection}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
        >
          Recheck Connection
        </button>
      </div>
    </div>
  );
}