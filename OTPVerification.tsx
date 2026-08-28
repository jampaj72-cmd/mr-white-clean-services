import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import logoImg from '@/imports/image.png';

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the 6-digit code.'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    navigate('/reset-password');
  };

  return (
    <div className="min-h-full flex items-center justify-center p-8 bg-[var(--background)]">
      <div className="w-full max-w-sm animate-scaleIn">
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="Mr White Clean Services" className="h-14 w-auto object-contain" />
        </div>
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Verify OTP</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-2">Enter the 6-digit code sent to your email.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-11 h-12 text-center text-xl font-bold bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition-all"
              />
            ))}
          </div>
          {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          <Button type="submit" className="w-full" size="lg" loading={loading}>Verify Code</Button>
        </form>
        <div className="mt-4 text-center">
          <button className="text-sm text-[var(--primary)] hover:underline">Resend Code</button>
        </div>
        <div className="mt-3 text-center">
          <Link to="/login" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">← Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}
