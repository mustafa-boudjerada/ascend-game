// ─────────────────────────────────────────────
// ASCEND — Async Duels
// Send challenges to friends via URL, track duels
// Fixed: category-based lane filtering, LIFE_CHALLENGES included
// ─────────────────────────────────────────────
import { useState } from 'react';
import { MIND_CHALLENGES, LIFE_CHALLENGES, EDGE_CHALLENGES, SKILL_LANES } from '../data/challenges.js';

const ALL_CHALLENGES = [...MIND_CHALLENGES, ...LIFE_CHALLENGES, ...EDGE_CHALLENGES];

const DUEL_CATEGORIES = [
  { id: 'logic', name: 'Logic Duel', icon: '🧠', desc: 'Test who thinks clearer', lanes: ['logic'] },
  { id: 'memory', name: 'Memory Duel', icon: '🔮', desc: 'Test who remembers more', lanes: ['memory'] },
  { id: 'persuasion', name: 'Persuasion Duel', icon: '💬', desc: 'Test who communicates better', lanes: ['communication'] },
  { id: 'decision', name: 'Decision Duel', icon: '♟️', desc: 'Test who decides smarter', lanes: ['money', 'logic'] },
];

export default function Duels({ game, showToast }) {
  const { state } = game;
  const [selectedDuel, setSelectedDuel] = useState(null);
  const [duelChallenge, setDuelChallenge] = useState(null);
  const [duelAnswer, setDuelAnswer] = useState(null);

  const startDuel = (category) => {
    // Filter challenges by the category's lanes
    let pool = ALL_CHALLENGES.filter(c => category.lanes.includes(c.lane));
    // Fallback to all if no matches
    if (pool.length === 0) pool = ALL_CHALLENGES;
    const challenge = pool[Math.floor(Math.random() * pool.length)];
    setSelectedDuel(category);
    setDuelChallenge(challenge);
    setDuelAnswer(null);
  };

  const answerDuel = (idx) => {
    if (duelAnswer !== null) return;
    setDuelAnswer(idx);

    if (idx === duelChallenge.answer) {
      game.update(prev => ({
        ...prev,
        duelsWon: prev.duelsWon + 1,
        duelsSent: prev.duelsSent + 1,
        totalPlayXP: prev.totalPlayXP + 15,
        laneXP: { ...prev.laneXP, [duelChallenge.lane]: (prev.laneXP[duelChallenge.lane] || 0) + 15 }
      }));
    } else {
      game.update(prev => ({
        ...prev,
        duelsSent: prev.duelsSent + 1,
      }));
    }
  };

  const shareDuel = () => {
    const text = `⚔️ ASCEND Duel Challenge!\n\n${duelChallenge.prompt}\n\nA) ${duelChallenge.options[0]}\nB) ${duelChallenge.options[1]}\nC) ${duelChallenge.options[2]}\nD) ${duelChallenge.options[3]}\n\nCan you beat me? Play ASCEND ↑`;

    navigator.clipboard?.writeText(text).then(() => {
      showToast('⚔️ Duel challenge copied! Send it to a friend.');
    }).catch(() => {
      showToast('⚔️ Duel generated!');
    });
  };

  const newDuel = () => {
    if (selectedDuel) startDuel(selectedDuel);
  };

  const LETTERS = ['A', 'B', 'C', 'D'];

  // ─── Duel in progress ───
  if (duelChallenge) {
    const isCorrect = duelAnswer === duelChallenge.answer;
    const lane = SKILL_LANES[duelChallenge.lane];

    return (
      <div className="screen">
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '6px' }}>⚔️</div>
          <h2>{selectedDuel?.name || 'Duel'}</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Prove your skill</p>
        </div>

        <div className={`challenge-card lane-${duelChallenge.lane}`} style={{ '--lane': lane?.color }}>
          <div className="challenge-meta">
            <span className="lane-tag" style={{
              background: `${lane?.color}22`, color: lane?.color
            }}>
              {lane?.icon} {lane?.name}
            </span>
          </div>
          <div className="challenge-prompt">{duelChallenge.prompt}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
          {duelChallenge.options.map((opt, idx) => {
            let cls = 'option-btn';
            if (duelAnswer !== null) {
              if (idx === duelChallenge.answer) cls += ' correct';
              else if (idx === duelAnswer) cls += ' wrong';
              else cls += ' disabled';
            }
            return (
              <button key={idx} className={cls} onClick={() => answerDuel(idx)}>
                <span className="option-letter">{LETTERS[idx]}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {duelAnswer !== null && (
          <div className={`feedback-panel ${isCorrect ? 'correct' : 'wrong'}`}>
            <h4>{isCorrect ? '✅ You win this duel!' : '❌ You lost this one.'}</h4>
            <p>{duelChallenge.explain}</p>

            {duelChallenge.insight && (
              <div className="insight-box">
                <span className="insight-icon">💡</span>
                <p>{duelChallenge.insight}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={shareDuel}>
                📋 Challenge a Friend
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={newDuel}>
                🔄 New Duel
              </button>
            </div>
            <button className="btn btn-ghost btn-full" style={{ marginTop: '8px' }}
              onClick={() => { setDuelChallenge(null); setSelectedDuel(null); }}>
              ← Back to Arenas
            </button>
          </div>
        )}
      </div>
    );
  }

  // ─── Duel Selection ───
  return (
    <div className="screen">
      <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>⚔️</div>
        <h1>Duels</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Challenge friends. Prove you're sharper.
        </p>
      </div>

      {/* Duel Stats */}
      <div className="stats-grid" style={{ marginBottom: '20px' }}>
        <div className="stat-card">
          <div className="stat-value">{state.duelsSent}</div>
          <div className="stat-label">Duels Played</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{state.duelsWon}</div>
          <div className="stat-label">Duels Won</div>
        </div>
      </div>

      {/* Win Rate */}
      {state.duelsSent > 0 && (
        <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
            {Math.round((state.duelsWon / state.duelsSent) * 100)}%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Win Rate</div>
        </div>
      )}

      {/* Duel Categories */}
      <h3 style={{ marginBottom: '12px' }}>Choose Your Arena</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {DUEL_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className="card"
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              cursor: 'pointer', textAlign: 'left', width: '100%', border: '1px solid var(--border)'
            }}
            onClick={() => startDuel(cat)}
          >
            <span style={{ fontSize: '28px' }}>{cat.icon}</span>
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px' }}>{cat.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{cat.desc}</div>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '18px' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
