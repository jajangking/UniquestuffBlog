import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fungsi untuk memeriksa koneksi ke Supabase
export const checkSupabaseConnection = async () => {
  try {
    // Log konfigurasi untuk debugging
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Anon Key length:', supabaseAnonKey.length);
    
    // Periksa apakah konfigurasi ada
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase configuration missing');
      console.error('URL present:', !!supabaseUrl);
      console.error('Anon key present:', !!supabaseAnonKey);
      return false;
    }
    
    // Mencoba mengambil info tentang Supabase
    // Menggunakan metode yang lebih sederhana untuk mengecek koneksi
    try {
      // Coba akses rest yang selalu tersedia
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });
      
      if (response.ok) {
        console.log('Supabase connection successful via REST API');
        return true;
      } else {
        console.error('Supabase connection failed via REST API:', response.status, response.statusText);
        return false;
      }
    } catch (err) {
      console.error('Supabase connection exception:', err);
      return false;
    }
  } catch (err) {
    console.error('Supabase connection exception:', err);
    return false;
  }
};