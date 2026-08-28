import React from 'react';
import { useApp } from '@/store/AppContext';

const icons = {
  success: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  error: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  warning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
  info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
};

const colors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
};

export function ToastContainer() {
  const { toasts, removeToast } = useApp();
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="flex items-start gap-3 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl px-4 py-3 min-w-[300px] max-w-sm pointer-events-auto animate-toastIn">
          <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors[t.type]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">{icons[t.type]}</svg>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--foreground)]">{t.title}</p>
            {t.message && <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{t.message}</p>}
          </div>
          <button onClick={() => removeToast(t.id)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
    </div>
  );
}
