// ─────────────────────────────────────────────
// ASCEND — Auth Screen
// Sign In / Sign Up with email + password
// ─────────────────────────────────────────────
import { useState } from 'react';

export default function AuthScreen({ onAuth, onSkip }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await onAuth(mode, email.trim(), password);
      if (mode === 'signup') {
        setSuccess('Account created! Check your email to confirm, or continue playing.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding" style={{ gap: '20px' }}>
      <div>
        <div className="onboarding-logo" style={{ fontSize: '32px' }}>ASCEND</div>
        <p className="onboarding-tagline" style={{ marginTop: '8px' }}>
          {mode === 'signin' ? 'Welcome back, climber.' : 'Create your account to save progress.'}
        </p>
      </div>

      {/* Toggle */}
      <div style={{
        display: 'flex', gap: '4px', padding: '4px',
        background: 'var(--bg-card)', borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border)',
      }}>
        <button
          onClick={() => { setMode('signin'); setError(''); setSuccess(''); }}
          style={{
            flex: 1, padding: '10px 20px', border: 'none', borderRadius: 'var(--radius-full)',
            background: mode === 'signin' ? 'var(--accent)' : 'transparent',
            color: mode === 'signin' ? 'white' : 'var(--text-muted)',
            fontWeight: 700, fontSize: '14px', cursor: 'pointer',
            fontFamily: 'var(--font-display)', transition: 'all 0.2s',
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
          style={{
            flex: 1, padding: '10px 20px', border: 'none', borderRadius: 'var(--radius-full)',
            background: mode === 'signup' ? 'var(--accent)' : 'transparent',
            color: mode === 'signup' ? 'white' : 'var(--text-muted)',
            fontWeight: 700, fontSize: '14px', cursor: 'pointer',
            fontFamily: 'var(--font-display)', transition: 'all 0.2s',
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        width: '100%', maxWidth: '300px',
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
          style={{
            width: '100%', padding: '14px 20px',
            background: 'var(--bg-card)', border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-full)', color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none',
            transition: 'border-color 0.3s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <input
          type="password"
          placeholder="Password (6+ characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%', padding: '14px 20px',
            background: 'var(--bg-card)', border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius-full)', color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)', fontSize: '15px', outline: 'none',
            transition: 'border-color 0.3s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />

        {error && (
          <div style={{
            padding: '10px 14px', borderRadius: 'var(--radius-md)',
            background: 'var(--error-dim)', border: '1px solid rgba(248,113,113,0.2)',
            color: 'var(--error)', fontSize: '13px', textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            padding: '10px 14px', borderRadius: 'var(--radius-md)',
            background: 'var(--success-dim)', border: '1px solid rgba(52,211,153,0.2)',
            color: 'var(--success)', fontSize: '13px', textAlign: 'center',
          }}>
            {success}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1, marginTop: '4px' }}
        >
          {loading ? '...' : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
        </button>
      </form>

      {/* Skip option */}
      <button className="btn btn-ghost" onClick={onSkip}>
        Skip — Play without account
      </button>

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '280px', lineHeight: '1.5' }}>
        {mode === 'signup'
          ? 'Your account enables cloud sync, real leaderboards, and cross-device progress.'
          : 'No account? Your progress saves locally on this device.'}
      </p>
    </div>
  );
}
