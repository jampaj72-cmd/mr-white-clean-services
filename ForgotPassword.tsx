import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import logoImg from '@/imports/image.png';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-8 bg-[var(--background)]">
      <div className="w-full max-w-sm animate-scaleIn">
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="Mr White Clean Services" className="h-14 w-auto object-contain" />
        </div>
        {!sent ? (
          <>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
              </div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">Forgot Password?</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">Enter your email and we'll send you a reset link.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@mrwhite.so" required />
              <Button type="submit" className="w-full" size="lg" loading={loading}>Send Reset Link</Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Email Sent!</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-2 mb-6">Check your email for a password reset link. Also check your spam folder.</p>
            <Button onClick={() => navigate('/otp')} className="w-full" size="lg">Enter OTP Code</Button>
          </div>
        )}
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-[var(--primary)] hover:underline">← Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}
