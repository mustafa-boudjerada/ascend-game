// ─────────────────────────────────────────────
// ASCEND — Main App Shell (Simplified v3)
// Zero friction: straight to gameplay
// ─────────────────────────────────────────────
import { useState, useCallback, useEffect } from 'react';
import { useGameState } from './hooks/useGameState.js';
import { useAuth } from './hooks/useAuth.js';
import { ensurePlayer } from './lib/cloudSync.js';
import Home from './components/Home.jsx';
import DailyAscend from './components/DailyAscend.jsx';
import Profile from './components/Profile.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Duels from './components/Duels.jsx';

const TABS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'ranks', icon: '🏆', label: 'Ranks' },
  { id: 'duels', icon: '⚔️', label: 'Duels' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

export default function App() {
  const { user, loading: authLoading, signUp, signIn, signOut } = useAuth();
  const game = useGameState(user?.id || null);
  const [screen, setScreen] = useState('home');
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-onboard new users silently
  useEffect(() => {
    if (!game.state.onboarded) {
      game.setOnboarded('Player', 'thinker');
    }
  }, [game.state.onboarded]);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const startDaily = useCallback(() => {
    setPlaying(true);
  }, []);

  const finishDailyFlow = useCallback((results) => {
    game.finishDaily(results);
    setPlaying(false);
    showToast('🎯 Daily Ascend Complete!');
  }, [game, showToast]);

  const handleAuth = useCallback(async (mode, email, password) => {
    if (mode === 'signup') {
      await signUp(email, password, game.state.playerName || 'Player', game.state.path || 'thinker');
    } else {
      await signIn(email, password);
    }
  }, [signUp, signIn, game.state.playerName, game.state.path]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    showToast('Signed out');
  }, [signOut, showToast]);

  // ─── Loading splash ───
  if (authLoading) {
    return (
      <div className="app-container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100dvh',
      }}>
        <div className="onboarding-logo" style={{ fontSize: '36px', animation: 'pulse 1.5s infinite' }}>
          ASCEND
        </div>
      </div>
    );
  }

  // ─── Playing the daily challenge (straight to questions) ───
  if (playing) {
    return (
      <div className="app-container">
        <DailyAscend
          challenges={game.todayChallenges}
          onComplete={finishDailyFlow}
          onQuit={() => setPlaying(false)}
          completeChallenge={game.completeChallenge}
          state={game.state}
          update={game.update}
          showToast={showToast}
        />
        {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  // ─── Main app with navigation ───
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-logo">ASCEND</div>
        <div className="header-stats">
          {game.state.streak > 0 && (
            <div className="streak-badge">
              <span className="flame">🔥</span> {game.state.streak}
            </div>
          )}
          <div className="rank-badge" style={{
            color: game.rank.current.color,
            background: game.rank.current.glow,
            border: `1px solid ${game.rank.current.color}33`
          }}>
            {game.rank.current.name}
          </div>
        </div>
      </header>

      {/* Screen content */}
      {screen === 'home' && (
        <Home
          game={game}
          onStartDaily={startDaily}
          showToast={showToast}
        />
      )}
      {screen === 'ranks' && <Leaderboard game={game} />}
      {screen === 'duels' && <Duels game={game} showToast={showToast} />}
      {screen === 'profile' && (
        <Profile
          game={game}
          showToast={showToast}
          user={user}
          onSignOut={handleSignOut}
          onAuth={handleAuth}
        />
      )}

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      {/* Bottom Nav */}
      <nav className="nav-bar" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${screen === tab.id ? 'active' : ''}`}
              onClick={() => setScreen(tab.id)}
              aria-label={tab.label}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
