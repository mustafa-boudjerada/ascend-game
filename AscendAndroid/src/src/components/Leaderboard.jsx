// ─────────────────────────────────────────────
// ASCEND — Leaderboard / Rankings
// Global rankings with FOMO gap, bot players
// ─────────────────────────────────────────────
import { LEADERBOARD_BOTS, RANKS, PATHS } from '../data/challenges.js';
import { getRank } from '../hooks/useGameState.js';

export default function Leaderboard({ game }) {
  const { state, totalXP } = game;

  // Insert player into bot leaderboard
  const playerEntry = {
    name: state.playerName,
    xp: totalXP,
    path: state.path,
    streak: state.streak,
    isPlayer: true,
  };

  const allEntries = [...LEADERBOARD_BOTS, playerEntry]
    .sort((a, b) => b.xp - a.xp);

  const playerRankIdx = allEntries.findIndex(e => e.isPlayer);
  const abovePlayer = playerRankIdx > 0 ? allEntries[playerRankIdx - 1] : null;
  const gap = abovePlayer ? abovePlayer.xp - totalXP : 0;

  return (
    <div className="screen">
      <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>🏆</div>
        <h1>Global Rankings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Climb the ranks. Prove your growth.
        </p>
      </div>

      {/* FOMO Card */}
      {abovePlayer && gap > 0 && (
        <div className="card" style={{
          marginBottom: '16px',
          background: 'linear-gradient(135deg, var(--bg-card), var(--accent-dim))',
          borderColor: 'var(--border-accent)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
              #{playerRankIdx + 1}
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px' }}>Your Global Rank</div>
              <div style={{ fontSize: '13px', color: 'var(--warning)' }}>
                Only <strong>{gap.toLocaleString()} XP</strong> behind{' '}
                <strong>{abovePlayer.name}</strong> — one ascent away! 🔥
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {allEntries.map((entry, idx) => {
          const entryRank = getRank(entry.xp);
          const entryPath = PATHS.find(p => p.id === entry.path);
          const medals = ['🥇', '🥈', '🥉'];

          return (
            <div
              key={entry.name}
              className={`leaderboard-entry ${entry.isPlayer ? 'you' : ''}`}
            >
              <div className="leaderboard-rank">
                {idx < 3 ? medals[idx] : `#${idx + 1}`}
              </div>
              <div className="leaderboard-info">
                <div className="leaderboard-name">
                  {entry.name} {entry.isPlayer && <span style={{ color: 'var(--accent-light)', fontSize: '12px' }}>(YOU)</span>}
                </div>
                <div className="leaderboard-path" style={{ color: entryRank.current.color }}>
                  {entryPath?.icon} {entryRank.current.name}
                  {entry.streak > 0 && <span style={{ marginLeft: '8px' }}>🔥{entry.streak}</span>}
                </div>
              </div>
              <div className="leaderboard-xp">
                {entry.xp.toLocaleString()} <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
