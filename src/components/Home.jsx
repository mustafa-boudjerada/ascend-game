// ─────────────────────────────────────────────
// ASCEND — Home Dashboard (Simplified v3)
// Clean, focused: Big button + essential info only
// ─────────────────────────────────────────────
export default function Home({ game, onStartDaily, showToast }) {
  const { state, totalXP, rank } = game;

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
      {/* Hero — simple and bold */}
      <div className="home-hero">
        <h1>{state.dailyCompleted ? 'Well Done!' : 'Ready to Play?'}</h1>
        <p className="subtitle">
          {state.dailyCompleted
            ? "Come back tomorrow for more."
            : "Tap the button to start today's challenge."
          }
        </p>
      </div>

      {/* XP Bar — simplified */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: '600' }}>
            {rank.current.name} → {rank.next ? rank.next.name : 'MAX'}
          </span>
          <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
            {totalXP.toLocaleString()} XP
          </span>
        </div>
        <div className="xp-bar-container" style={{ height: '8px' }}>
          <div className="xp-bar-fill" style={{ width: `${Math.min(xpProgress, 100)}%` }} />
        </div>
      </div>

      {/* BIG Ascend Button */}
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
              <span className="ascend-label">Play</span>
            </>
          )}
        </button>
      </div>

      {/* Today's Results (only after completion) */}
      {state.dailyCompleted && state.dailyResults && (
        <div className="card" style={{ marginTop: '16px', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '14px', fontSize: '18px' }}>Today's Results</h3>
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
        </div>
      )}

      {/* Active Mission Card */}
      {state.activeMission && (
        <div className="mission-card" style={{ marginTop: '16px', textAlign: 'left' }}>
          <h3>🎯 Real-World Mission</h3>
          <p style={{ fontSize: '16px' }}>{state.activeMission.text}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            <span className="mission-xp">+{state.activeMission.xp} Life XP</span>
            <button className="btn btn-success" style={{ padding: '12px 24px', fontSize: '15px' }}
              onClick={completeMission}>
              ✓ Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
