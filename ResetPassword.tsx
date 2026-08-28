import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import logoImg from '@/imports/image.png';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (pwd !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false); setSuccess(true);
  };

  return (
    <div className="min-h-full flex items-center justify-center p-8 bg-[var(--background)]">
      <div className="w-full max-w-sm animate-scaleIn">
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="Mr White Clean Services" className="h-14 w-auto object-contain" />
        </div>
        {!success ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[var(--foreground)]">Reset Password</h1>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">Enter your new password below.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="New Password" type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Min. 8 characters" />
              <Input label="Confirm Password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" error={error} />
              <Button type="submit" className="w-full" size="lg" loading={loading}>Reset Password</Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Password Reset!</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-2 mb-6">Your password has been reset successfully.</p>
            <Button onClick={() => navigate('/login')} className="w-full" size="lg">Sign In Now</Button>
          </div>
        )}
      </div>
    </div>
  );
}
