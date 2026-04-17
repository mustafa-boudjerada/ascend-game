// ─────────────────────────────────────────────
// ASCEND — Daily Challenge Flow (Simplified v3)
// No intro screen — straight to questions
// Mind → Life → Edge(optional) → Results
// ─────────────────────────────────────────────
import { useState, useRef } from 'react';
import { SKILL_LANES } from '../data/challenges.js';

const PHASE_LABELS = {
  mind: { icon: '🧠', title: 'Mind', step: 0 },
  life: { icon: '💡', title: 'Life', step: 1 },
  edge: { icon: '⚡', title: 'Edge', step: 2 },
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

function ChallengeView({ challenge, phase, onAnswer, onQuit }) {
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

      {/* Phase Header — compact */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>{phaseInfo.icon}</span>
          <h2 style={{ fontSize: '22px' }}>{phaseInfo.title}</h2>
        </div>
        <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: '14px' }} onClick={onQuit}>✕</button>
      </div>

      {/* Question */}
      <div className="challenge-card" style={{ '--lane': lane?.color }}>
        <div className="challenge-prompt" style={{ fontSize: '19px' }}>{challenge.prompt}</div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
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
              <span style={{ fontSize: '16px' }}>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`feedback-panel ${isCorrect ? 'correct' : 'wrong'}`}>
          <h4 style={{ fontSize: '18px' }}>
            {isCorrect ? '✅ Correct!' : '❌ Not quite.'}
            {isCorrect && (
              <span style={{
                marginLeft: 'auto', fontSize: '16px', color: 'var(--success)',
                fontWeight: '700', fontFamily: 'var(--font-display)'
              }}>
                +{challenge.diff * 10} XP
              </span>
            )}
          </h4>
          <p style={{ fontSize: '15px' }}>{challenge.explain}</p>

          <button
            className="btn btn-primary btn-full"
            style={{ marginTop: '16px', fontSize: '16px' }}
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
    perfect: { emoji: '🏆', title: 'Perfect!', sub: 'Flawless.' },
    great: { emoji: '🎯', title: 'Great Job!', sub: 'You crushed it.' },
    good: { emoji: '⬆️', title: 'Keep Going!', sub: 'Every day counts.' },
  };
  const msg = score === attempted ? messages.perfect : score >= 2 ? messages.great : messages.good;

  return (
    <div className="screen results-screen">
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '56px', marginBottom: '8px', filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.3))' }}>
          {msg.emoji}
        </div>
        <h2 style={{ fontSize: '28px', marginBottom: '4px' }}>{msg.title}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>{msg.sub}</p>
      </div>

      <div className="results-score" style={{ fontSize: '48px' }}>{score}/{attempted}</div>

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
        <div className="mission-card" style={{ margin: '20px 0', textAlign: 'left' }}>
          <h3 style={{ fontSize: '18px' }}>🎯 Real-World Mission</h3>
          <p style={{ fontSize: '16px' }}>{mission.text}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button className="btn btn-success" style={{ flex: 1, padding: '16px', fontSize: '16px' }} onClick={onAcceptMission}>
              Accept
            </button>
            <button className="btn btn-ghost" style={{ fontSize: '15px' }} onClick={onSkipMission}>
              Skip
            </button>
          </div>
        </div>
      )}

      {!mission && (
        <button className="btn btn-primary btn-lg btn-full" style={{ marginTop: '24px', fontSize: '18px' }} onClick={onFinish}>
          Done ↑
        </button>
      )}
    </div>
  );
}

export default function DailyAscend({ challenges, onComplete, onQuit, completeChallenge, state, update, showToast }) {
  // Start directly at 'mind' — no intro screen
  const [phase, setPhase] = useState('mind');
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

  if (phase === 'mind') {
    return <ChallengeView key="mind" challenge={challenges.mind} phase="mind" onAnswer={handleAnswer} onQuit={onQuit} />;
  }

  if (phase === 'life') {
    return <ChallengeView key="life" challenge={challenges.life} phase="life" onAnswer={handleAnswer} onQuit={onQuit} />;
  }

  if (phase === 'edge_ask') {
    return (
      <div className="screen" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '24px' }}>
        <StepIndicator current={2} total={3} />
        <div style={{ fontSize: '48px', marginTop: '8px' }}>⚡</div>
        <h2 style={{ fontSize: '24px' }}>Bonus Round?</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: '1.6', fontSize: '16px' }}>
          A harder challenge for extra XP.<br/>
          <span style={{ color: 'var(--text-muted)' }}>No penalty for skipping.</span>
        </p>
        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '300px' }}>
          <button className="btn btn-primary" style={{ flex: 1, fontSize: '16px', padding: '16px' }} onClick={acceptEdge}>
            Let's Go ⚡
          </button>
          <button className="btn btn-secondary" style={{ flex: 1, fontSize: '16px', padding: '16px' }} onClick={skipEdge}>
            Skip →
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'edge') {
    return <ChallengeView key="edge" challenge={challenges.edge} phase="edge" onAnswer={handleAnswer} onQuit={onQuit} />;
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
