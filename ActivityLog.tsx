import React from 'react';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

export default function ActivityLog() {
  const { activityLogs } = useApp();
  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Activity Log" subtitle="All system activity and changes" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Activity Log' }]} />
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl divide-y divide-[var(--border)]">
        {activityLogs.map((log, i) => (
          <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-[var(--muted)] transition-colors animate-fadeIn" style={{ animationDelay: `${i * 50}ms` }}>
            <Avatar name={log.userName} size="sm" className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-[var(--foreground)]">{log.userName}</span>
                <span className="text-xs text-[var(--muted-foreground)]">{log.action}</span>
                <span className="text-xs font-mono text-[var(--primary)]">{log.entityId}</span>
              </div>
              {(log.oldValue || log.newValue) && (
                <div className="flex items-center gap-2 mt-1">
                  {log.oldValue && <Badge variant="secondary">{log.oldValue}</Badge>}
                  {log.oldValue && log.newValue && <svg className="w-3 h-3 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                  {log.newValue && <Badge status="Confirmed">{log.newValue}</Badge>}
                </div>
              )}
              <div className="flex items-center gap-2 mt-1">
                <Badge status={log.result}>{log.result}</Badge>
                <span className="text-[10px] text-[var(--muted-foreground)] font-mono">{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
