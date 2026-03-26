import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { adminService } from '../services/adminService';
import Button from '../components/ui/Button';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const ALLOWED_ADMIN_EMAILS = ['crceadmin@gmail.com', 'admin@gmail.com'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && ALLOWED_ADMIN_EMAILS.includes(user.email)) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setCheckingAuth(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await adminService.login(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  if (checkingAuth) {
    return (
      <div style={{
        minHeight: '100dvh', background: 'var(--bg-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: 14 }}>Verifying…</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100dvh', background: 'var(--bg-dark)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: 'var(--font-ui)',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Masthead */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="editorial-label-accent" style={{ marginBottom: 12, color: 'rgba(245,245,240,0.4)' }}>Restricted Access</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32, fontWeight: 900,
            color: 'var(--text-invert)',
            letterSpacing: '-0.03em', lineHeight: 1.05,
          }}>
            THE CAMPUS<span style={{ color: 'var(--accent)' }}>·</span>PORTAL
          </h1>
          <div style={{ width: 40, height: 3, background: 'var(--accent)', margin: '16px auto 0' }} />
        </div>

        {/* Form card */}
        <div style={{ background: 'var(--bg)', border: '2px solid rgba(245,245,240,0.1)', padding: '32px' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>Admin Sign In</div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>Enter your credentials to access the admin console.</p>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', borderLeft: '3px solid var(--accent)', background: 'rgba(255,51,51,0.04)', marginBottom: 24 }}>
              <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label className="editorial-label-field">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="admin@example.com"
                className="editorial-input"
              />
            </div>
            <div>
              <label className="editorial-label-field">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="editorial-input"
              />
            </div>
            <Button type="submit" variant="primary" fullWidth isLoading={loading}>
              Sign in to console →
            </Button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(245,245,240,0.2)', fontFamily: 'var(--font-ui)' }}>
          © 2025 Unified Student Service Portal
        </p>
      </div>
    </div>
  );
}
