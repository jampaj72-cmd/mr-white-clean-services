import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const quickActions = [
  { label: 'New Booking', icon: '📋', path: '/bookings/new' },
  { label: 'Add Customer', icon: '👤', path: '/customers/new' },
  { label: 'Add Staff', icon: '👥', path: '/staff/new' },
  { label: 'Create Invoice', icon: '🧾', path: '/invoices/new' },
  { label: 'Create Quote', icon: '📄', path: '/quotes/new' },
  { label: 'Record Payment', icon: '💳', path: '/payments' },
  { label: 'View Reports', icon: '📊', path: '/reports' },
  { label: 'Activity Log', icon: '🕐', path: '/activity' },
];

const pages = [
  { label: 'Dashboard', path: '/dashboard' }, { label: 'Analytics', path: '/analytics' },
  { label: 'Bookings', path: '/bookings' }, { label: 'Customers', path: '/customers' },
  { label: 'Staff', path: '/staff' }, { label: 'Services', path: '/services' },
  { label: 'Payments', path: '/payments' }, { label: 'Invoices', path: '/invoices' },
  { label: 'Quotes', path: '/quotes' }, { label: 'Reviews', path: '/reviews' },
  { label: 'Messages', path: '/messages' }, { label: 'Notifications', path: '/notifications' },
  { label: 'Reports', path: '/reports' }, { label: 'Activity Log', path: '/activity' },
  { label: 'Maps & Areas', path: '/maps' }, { label: 'Files & Media', path: '/files' },
  { label: 'Security Center', path: '/security' }, { label: 'Settings', path: '/settings' },
  { label: 'Help & Support', path: '/help' }, { label: 'Calendar', path: '/calendar' },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { customers, bookings, staff } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => i + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(0, i - 1)); }
      if (e.key === 'Enter') { e.preventDefault(); handleEnter(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, selectedIndex, query]);

  const q = query.toLowerCase();

  const customerResults = q ? customers.filter(c => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)).slice(0, 3) : [];
  const bookingResults = q ? bookings.filter(b => b.id.toLowerCase().includes(q) || b.customerName.toLowerCase().includes(q)).slice(0, 3) : [];
  const staffResults = q ? staff.filter(s => s.name.toLowerCase().includes(q)).slice(0, 2) : [];
  const pageResults = q ? pages.filter(p => p.label.toLowerCase().includes(q)) : [];

  const allResults = [
    ...quickActions.filter(a => !q || a.label.toLowerCase().includes(q)).map(a => ({ type: 'action', label: a.label, sub: 'Quick Action', path: a.path, icon: a.icon })),
    ...customerResults.map(c => ({ type: 'customer', label: c.name, sub: `Customer · ${c.id}`, path: `/customers/${c.id}`, icon: '👤' })),
    ...bookingResults.map(b => ({ type: 'booking', label: b.id, sub: `Booking · ${b.customerName} · ${b.status}`, path: `/bookings/${b.id}`, icon: '📋' })),
    ...staffResults.map(s => ({ type: 'staff', label: s.name, sub: `Staff · ${s.role}`, path: `/staff/${s.id}`, icon: '👥' })),
    ...pageResults.map(p => ({ type: 'page', label: p.label, sub: 'Navigate', path: p.path, icon: '→' })),
  ];

  function handleEnter() {
    const item = allResults[selectedIndex];
    if (item) { navigate(item.path); onClose(); }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden animate-scaleIn">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
          <svg className="w-4 h-4 text-[var(--muted-foreground)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Search customers, bookings, staff, pages..."
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none"
          />
          <kbd className="text-[10px] font-mono text-[var(--muted-foreground)] bg-[var(--muted)] px-1.5 py-0.5 rounded border border-[var(--border)]">Esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {allResults.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--muted-foreground)]">No results found.</div>
          ) : (
            allResults.map((item, i) => (
              <button
                key={i}
                onClick={() => { navigate(item.path); onClose(); }}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${selectedIndex === i ? 'bg-[var(--secondary)]' : 'hover:bg-[var(--muted)]'}`}
              >
                <span className="text-base w-6 text-center flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">{item.label}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{item.sub}</p>
                </div>
                {selectedIndex === i && <span className="text-[10px] text-[var(--muted-foreground)] font-mono">↵</span>}
              </button>
            ))
          )}
        </div>
        <div className="flex items-center gap-3 px-4 py-2 border-t border-[var(--border)] text-[10px] text-[var(--muted-foreground)]">
          <span>↑↓ Navigate</span><span>↵ Select</span><span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
