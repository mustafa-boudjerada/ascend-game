// ─────────────────────────────────────────────
// ASCEND — Daily Ascend Challenge Flow (UI v2)
// Mind → Life → Edge → Results → Mission
// Step indicator, premium animations
// ─────────────────────────────────────────────
import { useState, useRef } from 'react';
import { SKILL_LANES } from '../data/challenges.js';

const PHASE_LABELS = {
  mind: { icon: '🧠', title: 'Mind Challenge', subtitle: 'Logic & Memory', step: 0 },
  life: { icon: '💡', title: 'Life Challenge', subtitle: 'Communication & Money', step: 1 },
  edge: { icon: '⚡', title: 'Edge Challenge', subtitle: 'Bragging Rights', step: 2 },
};

const LETTERS = ['A', 'B', 'C', 'D'];

function StepIndicator({ current, total }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`step-dot ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}
        />
      ))}
    </div>
  );
}

function ChallengeView({ challenge, phase, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const isCorrect = selected === challenge.answer;
  const lane = SKILL_LANES[challenge.lane];
  const phaseInfo = PHASE_LABELS[phase];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    onAnswer(isCorrect, challenge);
  };

  return (
    <div className="screen" style={{ paddingTop: '4px' }}>
      <StepIndicator current={phaseInfo.step} total={3} />

      {/* Phase Header */}
      <div style={{ textAlign: 'center', marginBottom: '18px', marginTop: '8px' }}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>{phaseInfo.icon}</div>
        <h2>{phaseInfo.title}</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>{phaseInfo.subtitle}</p>
      </div>

      {/* Challenge Card */}
      <div className={`challenge-card lane-${challenge.lane}`} style={{ '--lane': lane?.color }}>
        <div className="challenge-meta">
          <span className="lane-tag" style={{
            background: `${lane?.color}15`,
            color: lane?.color
          }}>
            {lane?.icon} {lane?.name}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '2px' }}>
            {'★'.repeat(challenge.diff)}{'☆'.repeat(3 - challenge.diff)}
          </span>
        </div>
        <div className="challenge-prompt">{challenge.prompt}</div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
        {challenge.options.map((opt, idx) => {
          let cls = 'option-btn';
          if (selected !== null) {
            if (idx === challenge.answer) cls += ' correct';
            else if (idx === selected && idx !== challenge.answer) cls += ' wrong';
            if (idx !== selected && idx !== challenge.answer) cls += ' disabled';
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
              <span className="option-letter">{LETTERS[idx]}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`feedback-panel ${isCorrect ? 'correct' : 'wrong'}`}>
          <h4>
            {isCorrect ? '✅ Correct!' : '❌ Not quite.'}
            {isCorrect && (
              <span style={{
                marginLeft: 'auto', fontSize: '13px', color: 'var(--success)',
                fontWeight: '700', fontFamily: 'var(--font-display)'
              }}>
                +{challenge.diff * 10} XP
              </span>
            )}
          </h4>
          <p>{challenge.explain}</p>

          {challenge.insight && (
            <div className="insight-box">
              <span className="insight-icon">💡</span>
              <p>{challenge.insight}</p>
            </div>
          )}

          <button
            className="btn btn-primary btn-full"
            style={{ marginTop: '16px' }}
            onClick={handleContinue}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}

function ResultsView({ results, onAcceptMission, onSkipMission, onFinish, mission }) {
  const score = [results.mind, results.life, results.edge].filter(v => v === true).length;
  const attempted = results.edge !== null ? 3 : 2;

  const messages = {
    perfect: { emoji: '🏆', title: 'Perfect Ascent!', sub: 'Flawless performance today.' },
    great: { emoji: '🎯', title: 'Great Ascent!', sub: 'You crushed it.' },
    good: { emoji: '⬆️', title: 'Keep Climbing!', sub: 'Every attempt makes you sharper.' },
  };
  const msg = score === attempted ? messages.perfect : score >= 2 ? messages.great : messages.good;

  return (
    <div className="screen results-screen">
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '52px', marginBottom: '6px', filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.3))' }}>
          {msg.emoji}
        </div>
        <h2 style={{ marginBottom: '2px' }}>{msg.title}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{msg.sub}</p>
      </div>

      <div className="results-score">{score}/{attempted}</div>

      <div className="results-grid">
        <span className={`result-chip ${results.mind ? 'pass' : 'fail'}`}>
          🧠 Mind {results.mind ? '✓' : '✗'}
        </span>
        <span className={`result-chip ${results.life ? 'pass' : 'fail'}`}>
          💡 Life {results.life ? '✓' : '✗'}
        </span>
        {results.edge !== null && (
          <span className={`result-chip ${results.edge ? 'pass' : 'fail'}`}>
            ⚡ Edge {results.edge ? '✓' : '✗'}
          </span>
        )}
      </div>

      {/* Mission Offer */}
      {mission && (
        <div className="mission-card" style={{ margin: '16px 0', textAlign: 'left' }}>
          <h3>🎯 Real-World Mission</h3>
          <p>{mission.text}</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
            <span className="mission-xp">+{mission.xp} Life XP</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button className="btn btn-success" style={{ flex: 1, padding: '14px' }} onClick={onAcceptMission}>
              Accept Mission
            </button>
            <button className="btn btn-ghost" onClick={onSkipMission}>
              Skip
            </button>
          </div>
        </div>
      )}

      {!mission && (
        <button className="btn btn-primary btn-lg btn-full" style={{ marginTop: '20px' }} onClick={onFinish}>
          Complete Ascent ↑
        </button>
      )}
    </div>
  );
}

export default function DailyAscend({ challenges, onComplete, onQuit, completeChallenge, state, update, showToast }) {
  const [phase, setPhase] = useState('intro');
  const resultsRef = useRef({ mind: null, life: null, edge: null });
  const missionRef = useRef(null);

  const handleAnswer = (correct, challenge) => {
    const xp = correct ? challenge.diff * 10 : 0;
    if (correct) completeChallenge(challenge.lane, xp);

    if (phase === 'mind') {
      resultsRef.current = { ...resultsRef.current, mind: correct };
      setPhase('life');
    } else if (phase === 'life') {
      resultsRef.current = { ...resultsRef.current, life: correct };
      const missionSource = correct ? challenges.life : challenges.mind;
      if (missionSource?.mission) missionRef.current = missionSource.mission;
      setPhase('edge_ask');
    } else if (phase === 'edge') {
      resultsRef.current = { ...resultsRef.current, edge: correct };
      if (correct && challenges.edge?.mission) missionRef.current = challenges.edge.mission;
      setPhase('results');
    }
  };

  const skipEdge = () => {
    resultsRef.current = { ...resultsRef.current, edge: null };
    setPhase('results');
  };

  const acceptEdge = () => setPhase('edge');

  const acceptMission = () => {
    update({ activeMission: missionRef.current });
    showToast('🎯 Mission accepted!');
    onComplete({ ...resultsRef.current });
  };

  const skipMission = () => onComplete({ ...resultsRef.current });
  const finishNoMission = () => onComplete({ ...resultsRef.current });

  // ─── Intro ───
  if (phase === 'intro') {
    return (
      <div className="screen" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '24px' }}>
        <div style={{
          fontSize: '56px',
          background: 'linear-gradient(180deg, var(--accent-bright), var(--cyan))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.3))',
          fontWeight: '200'
        }}>↑</div>
        <div>
          <h1>Daily Ascent</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '15px' }}>
            3 challenges. Real insights. One mission.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '300px' }}>
          {[
            { icon: '🧠', label: 'Mind', sub: 'Logic or Memory', color: 'var(--lane-logic)' },
            { icon: '💡', label: 'Life', sub: 'Communication or Money', color: 'var(--lane-communication)' },
            { icon: '⚡', label: 'Edge', sub: 'Optional hard challenge', color: 'var(--lane-memory)' },
          ].map(item => (
            <div key={item.label} className="card" style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px',
              borderLeft: `3px solid ${item.color}`
            }}>
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => setPhase('mind')}>
          Begin ↑
        </button>
        <button className="btn btn-ghost" onClick={onQuit}>← Back</button>
      </div>
    );
  }

  if (phase === 'mind') {
    return <ChallengeView key="mind" challenge={challenges.mind} phase="mind" onAnswer={handleAnswer} />;
  }

  if (phase === 'life') {
    return <ChallengeView key="life" challenge={challenges.life} phase="life" onAnswer={handleAnswer} />;
  }

  if (phase === 'edge_ask') {
    return (
      <div className="screen" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px' }}>
        <StepIndicator current={2} total={3} />
        <div style={{ fontSize: '44px', marginTop: '8px' }}>⚡</div>
        <h2>Edge Challenge</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: '1.6', fontSize: '14px' }}>
          A harder challenge for extra XP and bragging rights.<br/>
          <span style={{ color: 'var(--text-muted)' }}>No penalty for skipping.</span>
        </p>
        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '300px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={acceptEdge}>
            Bring It ⚡
          </button>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={skipEdge}>
            Skip →
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'edge') {
    return <ChallengeView key="edge" challenge={challenges.edge} phase="edge" onAnswer={handleAnswer} />;
  }

  if (phase === 'results') {
    return (
      <ResultsView
        results={{ ...resultsRef.current }}
        mission={missionRef.current}
        onAcceptMission={acceptMission}
        onSkipMission={skipMission}
        onFinish={finishNoMission}
      />
    );
  }

  return null;
}
