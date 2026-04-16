// ─────────────────────────────────────────────
// ASCEND — Game State Manager
// localStorage persistence + Supabase cloud sync
// ─────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react';
import { RANKS, TITLES, MIND_CHALLENGES, LIFE_CHALLENGES, EDGE_CHALLENGES } from '../data/challenges.js';
import { syncToCloud, saveDailyResult } from '../lib/cloudSync.js';

const STORAGE_KEY = 'ascend_save_v1';

const DEFAULT_STATE = {
  playerName: '',
  path: '',
  onboarded: false,
  totalPlayXP: 0,
  totalLifeXP: 0,
  laneXP: { logic: 0, memory: 0, communication: 0, money: 0 },
  streak: 0,
  bestStreak: 0,
  lastPlayDate: null,
  dailyCompleted: false,
  dailyResults: null,    // { mind: bool, life: bool, edge: bool|null }
  activeMission: null,
  missionsCompleted: 0,
  totalChallengesCompleted: 0,
  todaySeed: null,
  duelsSent: 0,
  duelsWon: 0,
  unlockedTitles: [],
  fastAnswers: 0,
  perfectDays: 0,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* quota exceeded — degrade gracefully */ }
}

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// Deterministic seeded selection based on date
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h = (h ^ (h >>> 16)) >>> 0;
    return h / 4294967296;
  };
}

export function getDailyChallenges(dateStr) {
  const rng = seededRandom(dateStr + '_ascend');
  const pickRandom = (arr) => {
    const idx = Math.floor(rng() * arr.length);
    return arr[idx];
  };
  return {
    mind: pickRandom(MIND_CHALLENGES),
    life: pickRandom(LIFE_CHALLENGES),
    edge: pickRandom(EDGE_CHALLENGES),
  };
}

export function getRank(totalXP) {
  let current = RANKS[0];
  let next = RANKS[1] || null;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (totalXP >= RANKS[i].minXP) {
      current = RANKS[i];
      next = RANKS[i + 1] || null;
      break;
    }
  }
  return { current, next };
}

export function getEarnedTitles(laneXP) {
  return TITLES.filter(t => (laneXP[t.lane] || 0) >= t.xpReq);
}

export function useGameState(userId = null) {
  const [state, setState] = useState(() => {
    const loaded = loadState();
    const today = getTodayString();
    // Check if it's a new day
    if (loaded.lastPlayDate !== today) {
      // Check streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;
      const streakContinued = loaded.lastPlayDate === yStr;
      return {
        ...loaded,
        dailyCompleted: false,
        dailyResults: null,
        activeMission: null,
        todaySeed: today,
        streak: streakContinued ? loaded.streak : (loaded.lastPlayDate ? 0 : loaded.streak),
      };
    }
    return { ...loaded, todaySeed: today };
  });

  useEffect(() => { saveState(state); }, [state]);

  const update = useCallback((changes) => {
    setState(prev => {
      const next = typeof changes === 'function' ? changes(prev) : { ...prev, ...changes };
      return next;
    });
  }, []);

  const completeChallenge = useCallback((lane, xpAmount) => {
    setState(prev => ({
      ...prev,
      totalPlayXP: prev.totalPlayXP + xpAmount,
      laneXP: { ...prev.laneXP, [lane]: (prev.laneXP[lane] || 0) + xpAmount },
      totalChallengesCompleted: prev.totalChallengesCompleted + 1,
    }));
  }, []);

  const completeMission = useCallback((missionXP) => {
    setState(prev => ({
      ...prev,
      totalLifeXP: prev.totalLifeXP + missionXP,
      missionsCompleted: prev.missionsCompleted + 1,
      activeMission: null,
    }));
  }, []);

  const finishDaily = useCallback((results) => {
    const today = getTodayString();
    setState(prev => {
      const newStreak = prev.streak + 1;
      const perfect = results.mind && results.life && (results.edge === true || results.edge === null);
      const next = {
        ...prev,
        dailyCompleted: true,
        dailyResults: results,
        lastPlayDate: today,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        perfectDays: perfect ? prev.perfectDays + 1 : prev.perfectDays,
      };
      // Cloud sync (fire-and-forget)
      if (userId) {
        syncToCloud(userId, {
          playXP: next.totalPlayXP, lifeXP: next.totalLifeXP,
          laneXP: next.laneXP, streak: next.streak,
          bestStreak: next.bestStreak, challengesSolved: next.totalChallengesCompleted,
          missionsCompleted: next.missionsCompleted,
          duelsPlayed: next.duelsSent, duelsWon: next.duelsWon,
          lastPlayDate: today,
        });
        saveDailyResult(userId, today, results, next.totalPlayXP - prev.totalPlayXP);
      }
      return next;
    });
  }, [userId]);

  const setOnboarded = useCallback((name, path) => {
    setState(prev => ({
      ...prev,
      playerName: name,
      path: path,
      onboarded: true,
    }));
  }, []);

  const resetState = useCallback(() => {
    setState({ ...DEFAULT_STATE });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const totalXP = state.totalPlayXP + state.totalLifeXP;
  const rank = getRank(totalXP);
  const titles = getEarnedTitles(state.laneXP);

  return {
    state,
    update,
    completeChallenge,
    completeMission,
    finishDaily,
    setOnboarded,
    resetState,
    totalXP,
    rank,
    titles,
    userId,
    todayChallenges: getDailyChallenges(state.todaySeed || getTodayString()),
  };
}
