// ─────────────────────────────────────────────
// ASCEND — Auth Hook (Supabase)
// Email/password signup + login + session
// ─────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email, password, name, path) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, path } }
    });
    if (error) throw error;

    // Create player record
    if (data.user) {
      const { error: profileError } = await supabase
        .from('players')
        .insert({ id: data.user.id, name, path });
      if (profileError) console.error('Profile create error:', profileError);
    }
    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return { user, loading, signUp, signIn, signOut };
}
