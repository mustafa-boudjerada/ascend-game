// ─────────────────────────────────────────────
// ASCEND — Profile Screen (Simplified v3)
// All stats + account management in one place
// ─────────────────────────────────────────────
import { useState } from 'react';
import { SKILL_LANES, PATHS } from '../data/challenges.js';
import { getEarnedTitles } from '../hooks/useGameState.js';

export default function Profile({ game, showToast, user, onSignOut, onAuth }) {
  const { state, totalXP, rank, titles } = game;
  const path = PATHS.find(p => p.id === state.path);
  const maxLaneXP = Math.max(...Object.values(state.laneXP), 100);

  // Auth form state
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim() || !password.trim()) { setAuthError('Fill in all fields.'); return; }
    if (password.length < 6) { setAuthError('Password needs 6+ characters.'); return; }
    setAuthLoading(true);
    try {
      await onAuth(authMode, email.trim(), password);
      setShowAuth(false);
      showToast(authMode === 'signup' ? '✅ Account created!' : '✅ Signed in!');
    } catch (err) {
      setAuthError(err.message || 'Something went wrong.');
    } finally {
      setAuthLoading(false);
    }
  };

  const generateShareCard = () => {
    const r = state.dailyResults;
    const mind = r?.mind ? '✅' : r?.mind === false ? '❌' : '—';
    const life = r?.life ? '✅' : r?.life === false ? '❌' : '—';
    const edge = r?.edge === true ? '✅' : r?.edge === false ? '❌' : '—';
    const text = [
      `ASCEND Day ${state.streak} 🔥`,
      `🧠 ${mind}  💡 ${life}  ⚡ ${edge}`,
      `${rank.current.name} · ${totalXP.toLocaleString()} XP`,
      `Play less. Gain more. ↑`,
    ].join('\n');

    navigator.clipboard?.writeText(text).then(() => {
      showToast('📋 Copied!');
    });
  };

  return (
    <div className="screen">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar" style={{
          background: `linear-gradient(135deg, ${rank.current.glow}, var(--bg-card))`,
          borderColor: rank.current.color
        }}>
          {path?.icon || '👤'}
        </div>
        <div className="profile-name" style={{ fontSize: '24px' }}>{state.playerName}</div>
        <div style={{ marginTop: '8px' }}>
          <span className="rank-badge" style={{
            color: rank.current.color,
            background: rank.current.glow,
            border: `1px solid ${rank.current.color}33`,
            fontSize: '14px',
          }}>
            {rank.current.name}
          </span>
        </div>
      </div>

      {/* XP Card */}
      <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', fontWeight: '900', fontFamily: 'var(--font-display)' }}>
          {totalXP.toLocaleString()}
        </div>
        <div style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '12px' }}>Total XP</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-light)' }}>
              {state.totalPlayXP.toLocaleString()}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>⚡ Play</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }} />
          <div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--success)' }}>
              {state.totalLifeXP.toLocaleString()}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>🌍 Life</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: '16px' }}>
        <div className="stat-card">
          <div className="stat-value">{state.streak}</div>
          <div className="stat-label">🔥 Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{state.bestStreak}</div>
          <div className="stat-label">🏆 Best</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{state.totalChallengesCompleted}</div>
          <div className="stat-label">✓ Solved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{state.missionsCompleted}</div>
          <div className="stat-label">🌍 Missions</div>
        </div>
      </div>

      {/* Skill Progress */}
      <h3 style={{ marginTop: '16px', marginBottom: '10px', fontSize: '18px' }}>Skills</h3>
      <div className="lane-progress" style={{ marginBottom: '16px' }}>
        {Object.entries(SKILL_LANES).map(([key, lane]) => {
          const xp = state.laneXP[key] || 0;
          const pct = (xp / maxLaneXP) * 100;
          return (
            <div className="lane-row" key={key}>
              <span className="lane-icon">{lane.icon}</span>
              <span className="lane-name" style={{ fontSize: '14px' }}>{lane.name}</span>
              <div className="lane-bar-bg">
                <div className="lane-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: lane.color }} />
              </div>
              <span className="lane-xp" style={{ fontSize: '14px' }}>{xp}</span>
            </div>
          );
        })}
      </div>

      {/* Share */}
      <button className="btn btn-primary btn-full" onClick={generateShareCard} style={{ marginBottom: '12px', fontSize: '16px' }}>
        📋 Share Results
      </button>

      {/* Account Section */}
      <h3 style={{ marginTop: '16px', marginBottom: '10px', fontSize: '18px' }}>Account</h3>
      <div className="card" style={{ marginBottom: '12px' }}>
        {user ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px', color: 'var(--success)', marginBottom: '4px', fontWeight: '600' }}>
              ☁️ Cloud Sync Active
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              {user.email}
            </div>
            <button className="btn btn-ghost" onClick={onSignOut}
              style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              Sign Out
            </button>
          </div>
        ) : showAuth ? (
          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '4px', padding: '4px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-full)' }}>
              {['signin', 'signup'].map(m => (
                <button key={m} type="button" onClick={() => { setAuthMode(m); setAuthError(''); }}
                  style={{
                    flex: 1, padding: '10px', border: 'none', borderRadius: 'var(--radius-full)',
                    background: authMode === m ? 'var(--accent)' : 'transparent',
                    color: authMode === m ? 'white' : 'var(--text-muted)',
                    fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-display)',
                  }}>
                  {m === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              style={{ padding: '14px 18px', background: 'var(--bg-elevated)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-full)', color: 'var(--text-primary)', fontSize: '15px', outline: 'none' }} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              style={{ padding: '14px 18px', background: 'var(--bg-elevated)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-full)', color: 'var(--text-primary)', fontSize: '15px', outline: 'none' }} />
            {authError && <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'var(--error-dim)', color: 'var(--error)', fontSize: '14px', textAlign: 'center' }}>{authError}</div>}
            <button type="submit" className="btn btn-primary btn-full" disabled={authLoading} style={{ fontSize: '15px' }}>
              {authLoading ? '...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setShowAuth(false)} style={{ fontSize: '14px' }}>Cancel</button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px', color: 'var(--warning)', marginBottom: '6px', fontWeight: '600' }}>
              Playing Offline
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Sign in to save progress to the cloud.
            </div>
            <button className="btn btn-primary" onClick={() => setShowAuth(true)}
              style={{ fontSize: '15px', padding: '12px 28px' }}>
              Sign In ↑
            </button>
          </div>
        )}
      </div>

      {/* Reset */}
      <button className="btn btn-ghost btn-full" style={{ color: 'var(--error)', fontSize: '14px' }}
        onClick={() => {
          if (confirm('Reset all progress? This cannot be undone.')) {
            game.resetState();
            showToast('🔄 Progress reset.');
          }
        }}>
        Reset Progress
      </button>
    </div>
  );
}
