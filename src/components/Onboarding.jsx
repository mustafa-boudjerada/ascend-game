// ─────────────────────────────────────────────
// ASCEND — Onboarding Flow (UI v2)
// Welcome → Name → Path — elevated design
// ─────────────────────────────────────────────
import { useState } from 'react';
import { SKILL_LANES, PATHS } from '../data/challenges.js';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [path, setPath] = useState('');

  const handleSubmitName = () => {
    if (name.trim().length >= 2) setStep(2);
  };

  // ─── Step 0: Welcome ───
  if (step === 0) {
    return (
      <div className="onboarding">
        <div>
          <div className="onboarding-logo">ASCEND</div>
          <p className="onboarding-tagline" style={{ marginTop: '12px' }}>
            The game that levels up the player,<br />not just the avatar.
          </p>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Play 5 minutes. Get better at life today.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', maxWidth: '320px' }}>
          {Object.values(SKILL_LANES).map(lane => (
            <span key={lane.name} className="lane-tag" style={{
              background: `${lane.color}15`,
              color: lane.color,
            }}>
              {lane.icon} {lane.name}
            </span>
          ))}
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => setStep(1)}>
          Begin Your Ascent ↑
        </button>
      </div>
    );
  }

  // ─── Step 1: Name ───
  if (step === 1) {
    return (
      <div className="onboarding">
        <div>
          <h2>What should we call you?</h2>
          <p className="onboarding-tagline" style={{ marginTop: '8px' }}>
            Your name appears on the leaderboard.
          </p>
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmitName()}
          autoFocus
          maxLength={20}
        />
        <button
          className="btn btn-primary"
          disabled={name.trim().length < 2}
          style={{ opacity: name.trim().length < 2 ? 0.4 : 1 }}
          onClick={handleSubmitName}
        >
          Continue →
        </button>
      </div>
    );
  }

  // ─── Step 2: Path ───
  return (
    <div className="onboarding">
      <div>
        <h2>Choose Your Path</h2>
        <p className="onboarding-tagline" style={{ marginTop: '6px' }}>
          Your identity. You can still train all skills.
        </p>
      </div>

      <div className="path-grid">
        {PATHS.map(p => (
          <div
            key={p.id}
            className={`path-card ${path === p.id ? 'selected' : ''}`}
            onClick={() => setPath(p.id)}
          >
            <div className="path-icon">{p.icon}</div>
            <div className="path-name">{p.name}</div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary btn-lg"
        disabled={!path}
        style={{ opacity: !path ? 0.4 : 1 }}
        onClick={() => onComplete(name.trim(), path)}
      >
        Start Ascending ↑
      </button>
    </div>
  );
}
