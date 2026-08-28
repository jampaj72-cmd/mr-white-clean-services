import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/store/AppContext';

const SESSIONS = [
  { id: 'S1', device: 'Chrome on macOS', location: 'Mogadishu, Somalia', lastActive: '2026-08-27 14:30', current: true },
  { id: 'S2', device: 'Safari on iPhone', location: 'Mogadishu, Somalia', lastActive: '2026-08-27 10:00', current: false },
  { id: 'S3', device: 'Firefox on Windows', location: 'Nairobi, Kenya', lastActive: '2026-08-25 16:45', current: false },
];

const LOGIN_HISTORY = [
  { date: '2026-08-27', time: '14:28', device: 'Chrome on macOS', status: 'Successful' },
  { date: '2026-08-27', time: '09:50', device: 'Safari on iPhone', status: 'Successful' },
  { date: '2026-08-26', time: '22:10', device: 'Unknown device', status: 'Failed' },
  { date: '2026-08-25', time: '16:43', device: 'Firefox on Windows', status: 'Successful' },
  { date: '2026-08-24', time: '08:30', device: 'Chrome on macOS', status: 'Successful' },
];

const SECURITY_SECTIONS = ['Security Center', 'Active Sessions', 'Login History'];

export default function Security() {
  const [active, setActive] = useState('Security Center');
  const { addToast } = useApp();

  return (
    <div className="space-y-5 max-w-4xl">
      <PageHeader title="Security" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Security' }]} />
      <div className="flex gap-1">
        {SECURITY_SECTIONS.map(s => (
          <button key={s} onClick={() => setActive(s)}
            className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${active === s ? 'bg-[var(--primary)] text-white' : 'bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
            {s}
          </button>
        ))}
      </div>

      {active === 'Security Center' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { t: 'Password', d: 'Last changed 30 days ago', status: 'Good', action: 'Change Password', color: '#39B86A' },
            { t: 'Two-Factor Auth', d: 'Not enabled', status: 'Warning', action: 'Enable 2FA', color: '#F59E0B' },
            { t: 'Active Sessions', d: `${SESSIONS.length} active sessions`, status: 'Info', action: 'Review Sessions', color: '#0F8B8D' },
            { t: 'Failed Logins', d: '1 failed attempt in last 7 days', status: 'Warning', action: 'View History', color: '#F59E0B' },
          ].map(item => (
            <div key={item.t} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{item.t}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.d}</p>
                </div>
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: item.color }} />
              </div>
              <Button size="sm" variant="outline" onClick={() => { addToast({ type: 'info', title: item.action }); }}>
                {item.action}
              </Button>
            </div>
          ))}
        </div>
      )}

      {active === 'Active Sessions' && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <Button size="sm" variant="danger" onClick={() => addToast({ type: 'success', title: 'All other sessions signed out.' })}>
              Sign Out All Other Sessions
            </Button>
          </div>
          {SESSIONS.map(s => (
            <div key={s.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--muted)] flex items-center justify-center text-[var(--primary)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--foreground)]">{s.device}</p>
                    {s.current && <Badge variant="success" className="text-[10px]">Current</Badge>}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">{s.location} · {s.lastActive}</p>
                </div>
              </div>
              {!s.current && (
                <Button size="sm" variant="outline" onClick={() => addToast({ type: 'info', title: 'Session signed out.' })}>
                  Sign Out
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {active === 'Login History' && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {['Date', 'Time', 'Device', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {LOGIN_HISTORY.map((l, i) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3 text-xs font-mono">{l.date}</td>
                  <td className="px-4 py-3 text-xs font-mono">{l.time}</td>
                  <td className="px-4 py-3 text-xs">{l.device}</td>
                  <td className="px-4 py-3"><Badge status={l.status === 'Successful' ? 'Completed' : 'Cancelled'} dot>{l.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
