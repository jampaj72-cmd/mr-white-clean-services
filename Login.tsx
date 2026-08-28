import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '@/store/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import logoImg from '@/imports/image.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@mrwhite.so');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter your credentials.'); return; }
    setLoading(true);
    setError('');
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('Invalid credentials. Please try again.');
  };

  return (
    <div className="min-h-full flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col flex-1 bg-[var(--sidebar)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#071624] to-[#0F2B3D]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--cyan)]/10 blur-3xl" />
        <div className="relative z-10 flex flex-col h-full p-12">
          <img src={logoImg} alt="Mr White Clean Services" className="h-16 w-auto object-contain" />
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <div className="mb-8">
              <div className="text-5xl mb-4">✨</div>
              <h2 className="text-3xl font-bold text-white mb-3">Somalia's Premier Cleaning Management Platform</h2>
              <p className="text-white/60 text-base leading-relaxed">Manage bookings, staff, customers, payments and your entire cleaning operation from one powerful dashboard.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '1,248', l: 'Total Bookings' }, { n: '892', l: 'Active Customers' },
                { n: '48', l: 'Active Cleaners' }, { n: '4.9★', l: 'Avg Rating' }
              ].map(s => (
                <div key={s.l} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-xl font-bold text-white">{s.n}</p>
                  <p className="text-xs text-white/50 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/30 text-xs">© 2026 Mr White Clean Services, Somalia. All rights reserved.</p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 bg-[var(--background)]">
        <div className="w-full max-w-sm animate-scaleIn">
          <div className="lg:hidden mb-8 flex justify-center">
            <img src={logoImg} alt="Mr White Clean Services" className="h-14 w-auto object-contain" />
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Welcome back</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Sign in to your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@mrwhite.so"
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
              autoComplete="email"
            />
            <div>
              <Input
                label="Password"
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                iconRight={
                  <button type="button" onClick={() => setShowPwd(p => !p)} className="hover:text-[var(--foreground)] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPwd ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'} /></svg>
                  </button>
                }
                autoComplete="current-password"
              />
              <div className="flex justify-end mt-1.5">
                <Link to="/forgot-password" className="text-xs text-[var(--primary)] hover:underline">Forgot password?</Link>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-3 bg-[var(--muted)] rounded-xl text-xs text-[var(--muted-foreground)]">
            <p className="font-medium text-[var(--foreground)] mb-1">Demo credentials</p>
            <p>Email: <span className="font-mono text-[var(--primary)]">admin@mrwhite.so</span></p>
            <p>Password: <span className="font-mono text-[var(--primary)]">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
