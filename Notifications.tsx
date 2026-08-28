import React from 'react';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const typeColors: Record<string, string> = {
  'Booking Confirmation': '#0F8B8D', 'Payment': '#39B86A', 'Booking Reminder': '#F59E0B',
  'Review Request': '#8B5CF6', 'System Alert': '#EF4444', 'Cancellation': '#94A3B8',
};

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const unread = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Notifications" subtitle={`${unread} unread notifications`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Notifications' }]}
        actions={<Button variant="outline" size="sm" onClick={markAllNotificationsRead}>Mark All Read</Button>}
      />
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">No notifications.</p>
          </div>
        ) : (
          notifications.map(n => (
            <div key={n.id} onClick={() => markNotificationRead(n.id)}
              className={`flex items-start gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl cursor-pointer hover:bg-[var(--muted)] transition-colors animate-fadeIn ${!n.isRead ? 'border-l-4 border-l-[var(--primary)]' : ''}`}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: (typeColors[n.type] ?? '#0F8B8D') + '20', color: typeColors[n.type] ?? '#0F8B8D' }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold ${!n.isRead ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>{n.title}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!n.isRead && <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />}
                    <span className="text-[10px] font-mono text-[var(--muted-foreground)]">{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{n.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{n.type}</Badge>
                  <Badge variant="info">{n.channel}</Badge>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
