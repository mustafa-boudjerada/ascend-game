// ─────────────────────────────────────────────
// ASCEND — Home Dashboard
// Stats, Ascend button, active mission, progress
// ─────────────────────────────────────────────
import { SKILL_LANES } from '../data/challenges.js';

export default function Home({ game, onStartDaily, showToast }) {
  const { state, totalXP, rank } = game;
  const maxLaneXP = Math.max(...Object.values(state.laneXP), 1);

  const completeMission = () => {
    if (state.activeMission) {
      game.completeMission(state.activeMission.xp);
      showToast(`🌟 +${state.activeMission.xp} Life XP earned!`);
    }
  };

  // XP progress to next rank
  const xpProgress = rank.next
    ? ((totalXP - rank.current.minXP) / (rank.next.minXP - rank.current.minXP)) * 100
    : 100;

  return (
    <div className="screen">
      {/* Hero */}
      <div className="home-hero">
        <h1>Welcome, {state.playerName}</h1>
        <p className="subtitle">
          {state.dailyCompleted
            ? "Today's ascent is complete. See you tomorrow."
            : "Your daily ascent awaits."
          }
        </p>
      </div>

      {/* XP & Rank Progress */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {rank.current.name} → {rank.next ? rank.next.name : 'MAX'}
          </span>
          <span style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
            {totalXP.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-bar-container">
          <div className="xp-bar-fill" style={{ width: `${Math.min(xpProgress, 100)}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            ⚡ {state.totalPlayXP} Play XP
          </span>
          <span style={{ fontSize: '11px', color: 'var(--success)' }}>
            🌍 {state.totalLifeXP} Life XP
          </span>
        </div>
      </div>

      {/* Ascend Button */}
      <div className="ascend-button-wrapper">
        <button
          className={`ascend-btn ${state.dailyCompleted ? 'completed' : ''}`}
          onClick={state.dailyCompleted ? undefined : onStartDaily}
        >
          {state.dailyCompleted ? (
            <>
              <span className="ascend-icon">✅</span>
              <span className="ascend-label">Done</span>
            </>
          ) : (
            <>
              <span className="ascend-icon">↑</span>
              <span className="ascend-label">Ascend</span>
            </>
          )}
        </button>
      </div>

      {/* Active Mission */}
      {state.activeMission && !state.dailyCompleted && (
        <div className="mission-card" style={{ marginBottom: '16px' }}>
          <h3>🎯 Active Mission</h3>
          <p>{state.activeMission.text}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mission-xp">+{state.activeMission.xp} Life XP</span>
            <button className="btn btn-success" style={{ padding: '10px 20px', fontSize: '13px' }}
              onClick={completeMission}>
              ✓ Mission Complete
            </button>
          </div>
        </div>
      )}

      {/* Today's Results (if completed) */}
      {state.dailyCompleted && state.dailyResults && (
        <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '12px' }}>Today's Results</h3>
          <div className="results-grid">
            <span className={`result-chip ${state.dailyResults.mind ? 'pass' : 'fail'}`}>
              🧠 {state.dailyResults.mind ? '✓' : '✗'} Mind
            </span>
            <span className={`result-chip ${state.dailyResults.life ? 'pass' : 'fail'}`}>
              💡 {state.dailyResults.life ? '✓' : '✗'} Life
            </span>
            {state.dailyResults.edge !== null ? (
              <span className={`result-chip ${state.dailyResults.edge ? 'pass' : 'fail'}`}>
                ⚡ {state.dailyResults.edge ? '✓' : '✗'} Edge
              </span>
            ) : (
              <span className="result-chip" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                ⚡ — Edge
              </span>
            )}
          </div>

          {/* Active mission after daily is done */}
          {state.activeMission && (
            <div className="mission-card" style={{ marginTop: '16px', textAlign: 'left' }}>
              <h3>🎯 Real-World Mission</h3>
              <p>{state.activeMission.text}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mission-xp">+{state.activeMission.xp} Life XP</span>
                <button className="btn btn-success" style={{ padding: '10px 20px', fontSize: '13px' }}
                  onClick={completeMission}>
                  ✓ Completed
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{state.streak}</div>
          <div className="stat-label">🔥 Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{state.totalChallengesCompleted}</div>
          <div className="stat-label">✓ Challenges</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{state.missionsCompleted}</div>
          <div className="stat-label">🌍 Missions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{state.bestStreak}</div>
          <div className="stat-label">🏆 Best Streak</div>
        </div>
      </div>

      {/* Lane Progress */}
      <h3 style={{ marginTop: '24px', marginBottom: '4px' }}>Skill Lanes</h3>
      <div className="lane-progress">
        {Object.entries(SKILL_LANES).map(([key, lane]) => {
          const xp = state.laneXP[key] || 0;
          const pct = maxLaneXP > 0 ? (xp / (maxLaneXP * 1.2)) * 100 : 0;
          return (
            <div className="lane-row" key={key}>
              <span className="lane-icon">{lane.icon}</span>
              <span className="lane-name">{lane.name}</span>
              <div className="lane-bar-bg">
                <div
                  className="lane-bar-fill"
                  style={{ width: `${Math.min(pct, 100)}%`, background: lane.color }}
                />
              </div>
              <span className="lane-xp">{xp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
