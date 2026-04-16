// ─────────────────────────────────────────────
// ASCEND — Main App Shell (Android Native)
// Navigation + Screen Routing + Toast + Back Button
// ─────────────────────────────────────────────
import { useState, useCallback, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { useGameState } from './hooks/useGameState.js';
import Onboarding from './components/Onboarding.jsx';
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
  const game = useGameState();
  const [screen, setScreen] = useState('home');
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState(null);

  // ─── Android hardware back button ───
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const listener = CapApp.addListener('backButton', ({ canGoBack }) => {
        if (playing) {
          setPlaying(false);
        } else if (screen !== 'home') {
          setScreen('home');
        } else {
          CapApp.minimizeApp();
        }
      });
      return () => { listener.then(l => l.remove()); };
    }
  }, [playing, screen]);

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

  // ─── Onboarding gate ───
  if (!game.state.onboarded) {
    return (
      <div className="app-container">
        <Onboarding onComplete={game.setOnboarded} />
      </div>
    );
  }

  // ─── Playing the daily challenge ───
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
      {screen === 'profile' && <Profile game={game} showToast={showToast} />}

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
