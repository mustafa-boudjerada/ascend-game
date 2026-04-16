// ─────────────────────────────────────────────
// ASCEND — Supabase Client
// ─────────────────────────────────────────────
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zwxxffpadcxixhzafkgf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3eHhmZnBhZGN4aXhoemFma2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDAzNDQsImV4cCI6MjA5MTkxNjM0NH0.c-IRTJX6jqNwq0oqMjtyTTRq9ZcAAusDEcilD52fPHI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export { SUPABASE_URL, SUPABASE_ANON_KEY };
