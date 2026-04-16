// ─────────────────────────────────────────────
// ASCEND — Cloud Sync Hook
// Syncs game state between localStorage and Supabase
// ─────────────────────────────────────────────
import { supabase } from '../lib/supabase.js';

// Push local state to cloud
export async function syncToCloud(userId, state) {
  if (!userId) return;

  const { error } = await supabase
    .from('player_stats')
    .upsert({
      id: userId,
      play_xp: state.playXP || 0,
      life_xp: state.lifeXP || 0,
      lane_logic: state.laneXP?.logic || 0,
      lane_memory: state.laneXP?.memory || 0,
      lane_communication: state.laneXP?.communication || 0,
      lane_money: state.laneXP?.money || 0,
      streak: state.streak || 0,
      best_streak: state.bestStreak || 0,
      challenges_solved: state.challengesSolved || 0,
      missions_completed: state.missionsCompleted || 0,
      duels_played: state.duelsPlayed || 0,
      duels_won: state.duelsWon || 0,
      last_play_date: state.lastPlayDate || '',
      updated_at: new Date().toISOString(),
    });

  if (error) console.error('Sync to cloud error:', error);
  return !error;
}

// Pull cloud state to local
export async function syncFromCloud(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('player_stats')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) return null;

  return {
    playXP: data.play_xp,
    lifeXP: data.life_xp,
    laneXP: {
      logic: data.lane_logic,
      memory: data.lane_memory,
      communication: data.lane_communication,
      money: data.lane_money,
    },
    streak: data.streak,
    bestStreak: data.best_streak,
    challengesSolved: data.challenges_solved,
    missionsCompleted: data.missions_completed,
    duelsPlayed: data.duels_played,
    duelsWon: data.duels_won,
    lastPlayDate: data.last_play_date,
  };
}

// Save daily result to cloud
export async function saveDailyResult(userId, date, results, xpEarned) {
  if (!userId) return;

  const { error } = await supabase
    .from('daily_results')
    .upsert({
      player_id: userId,
      play_date: date,
      mind: results.mind,
      life: results.life,
      edge: results.edge,
      xp_earned: xpEarned,
    });

  if (error) console.error('Save daily result error:', error);
}

// Fetch global leaderboard
export async function fetchLeaderboard(limit = 50) {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('total_xp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Leaderboard fetch error:', error);
    return [];
  }
  return data || [];
}

// Ensure player profile exists
export async function ensurePlayer(userId, name, path) {
  const { data } = await supabase
    .from('players')
    .select('id')
    .eq('id', userId)
    .single();

  if (!data) {
    await supabase
      .from('players')
      .insert({ id: userId, name, path });
  }
}
