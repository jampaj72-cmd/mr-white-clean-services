import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-full flex items-center justify-center p-8 bg-[var(--background)]">
      <div className="text-center animate-scaleIn">
        <div className="text-8xl font-black text-[var(--border)] mb-4 font-mono">404</div>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Page Not Found</h1>
        <p className="text-[var(--muted-foreground)] mb-8 text-sm max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    </div>
  );
}
