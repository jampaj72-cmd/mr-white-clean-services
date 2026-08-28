import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';

export default function ServerError() {
  const navigate = useNavigate();
  return (
    <div className="min-h-full flex items-center justify-center p-8 bg-[var(--background)]">
      <div className="text-center animate-scaleIn">
        <div className="text-8xl font-black text-red-200 dark:text-red-900/50 mb-4 font-mono">500</div>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Something went wrong.</h1>
        <p className="text-[var(--muted-foreground)] mb-8 text-sm max-w-sm mx-auto">A system error occurred. Our team has been notified and is working on a fix.</p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    </div>
  );
}
