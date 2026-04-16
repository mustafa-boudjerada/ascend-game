// ─────────────────────────────────────────────
// ASCEND — Profile Screen
// Stats, titles, lane progress, share card, settings
// ─────────────────────────────────────────────
import { SKILL_LANES, PATHS } from '../data/challenges.js';
import { getEarnedTitles } from '../hooks/useGameState.js';

export default function Profile({ game, showToast, user, onSignOut, onSignIn }) {
  const { state, totalXP, rank, titles } = game;
  const path = PATHS.find(p => p.id === state.path);

  const generateShareCard = () => {
    const r = state.dailyResults;
    const mind = r?.mind ? '✅' : r?.mind === false ? '❌' : '—';
    const life = r?.life ? '✅' : r?.life === false ? '❌' : '—';
    const edge = r?.edge === true ? '✅' : r?.edge === false ? '❌' : '—';
    const text = [
      `ASCEND Day ${state.streak} 🔥`,
      ``,
      `🧠 ${mind}  💡 ${life}  ⚡ ${edge}`,
      ``,
      `${rank.current.name} · ${totalXP.toLocaleString()} XP`,
      state.activeMission ? `🎯 Mission: Active` : '',
      ``,
      `Play less. Gain more. ↑`,
    ].filter(Boolean).join('\n');

    navigator.clipboard?.writeText(text).then(() => {
      showToast('📋 Share card copied!');
    }).catch(() => {
      showToast('📋 Share card generated!');
    });
  };

  const maxLaneXP = Math.max(...Object.values(state.laneXP), 100);

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
        <div className="profile-name">{state.playerName}</div>
        {path && <div className="profile-path">{path.icon} {path.name}</div>}
        <div style={{ marginTop: '10px' }}>
          <span className="rank-badge" style={{
            color: rank.current.color,
            background: rank.current.glow,
            border: `1px solid ${rank.current.color}33`
          }}>
            {rank.current.name}
          </span>
        </div>
      </div>

      {/* XP Breakdown */}
      <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', fontWeight: '900', fontFamily: 'var(--font-display)' }}>
          {totalXP.toLocaleString()}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>Total XP</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-light)' }}>
              {state.totalPlayXP.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>⚡ Play XP</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }} />
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--success)' }}>
              {state.totalLifeXP.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>🌍 Life XP</div>
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

      {/* Titles */}
      <h3 style={{ marginBottom: '10px' }}>Earned Titles</h3>
      {titles.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
          Complete challenges to earn titles.
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {titles.map(t => (
            <span key={t.id} style={{
              padding: '6px 14px', borderRadius: 'var(--radius-full)',
              background: 'var(--accent-dim)', color: 'var(--text-accent)',
              fontSize: '13px', fontWeight: '600', border: '1px solid var(--border-accent)'
            }}>
              {t.name}
            </span>
          ))}
        </div>
      )}

      {/* Lane Progress */}
      <h3 style={{ marginTop: '16px', marginBottom: '10px' }}>Skill Progress</h3>
      <div className="lane-progress" style={{ marginBottom: '16px' }}>
        {Object.entries(SKILL_LANES).map(([key, lane]) => {
          const xp = state.laneXP[key] || 0;
          const pct = (xp / maxLaneXP) * 100;
          return (
            <div className="lane-row" key={key}>
              <span className="lane-icon">{lane.icon}</span>
              <span className="lane-name">{lane.name}</span>
              <div className="lane-bar-bg">
                <div className="lane-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: lane.color }} />
              </div>
              <span className="lane-xp">{xp}</span>
            </div>
          );
        })}
      </div>

      {/* Share */}
      <button className="btn btn-primary btn-full" onClick={generateShareCard} style={{ marginBottom: '12px' }}>
        📋 Copy Share Card
      </button>

      {/* Account Section */}
      <h3 style={{ marginTop: '16px', marginBottom: '10px' }}>Account</h3>
      <div className="card" style={{ marginBottom: '12px' }}>
        {user ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--success)', marginBottom: '4px', fontWeight: '600' }}>
              ☁️ Cloud Sync Active
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              {user.email}
            </div>
            <button className="btn btn-ghost" onClick={onSignOut}
              style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Sign Out
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--warning)', marginBottom: '4px', fontWeight: '600' }}>
              ⚠️ Playing Offline
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Progress saved on this device only.
            </div>
            <button className="btn btn-primary" onClick={onSignIn}
              style={{ fontSize: '13px', padding: '10px 24px' }}>
              Sign In to Sync ↑
            </button>
          </div>
        )}
      </div>

      {/* Reset */}
      <button className="btn btn-ghost btn-full" style={{ color: 'var(--error)', fontSize: '13px' }}
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
