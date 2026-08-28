import React, { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AllReviews() {
  const { reviews } = useApp();
  const [search, setSearch] = useState('');

  const filtered = reviews.filter(r => !search || r.customerName.toLowerCase().includes(search.toLowerCase()) || r.staffName.toLowerCase().includes(search.toLowerCase()));

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-5">
      <PageHeader title="Reviews" subtitle={`${reviews.length} reviews · ${avgRating}★ average`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Reviews' }]} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { l: 'Average Rating', v: `${avgRating}★`, c: '#F59E0B' },
          { l: 'Total Reviews', v: reviews.length, c: '#0F8B8D' },
          { l: 'Published', v: reviews.filter(r => r.status === 'Published').length, c: '#39B86A' },
          { l: 'Pending Approval', v: reviews.filter(r => r.status === 'Pending').length, c: '#F59E0B' },
        ].map(({ l, v, c }) => (
          <div key={l} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{l}</p>
            <p className="text-xl font-bold font-mono mt-1" style={{ color: c }}>{v}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 max-w-xs">
        <Input placeholder="Search reviews..." value={search} onChange={e => setSearch(e.target.value)}
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
      </div>
      <div className="space-y-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 animate-fadeIn">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <Avatar name={r.customerName} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{r.customerName}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.serviceName} · Cleaner: {r.staffName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge status={r.status}>{r.status}</Badge>
                <span className="text-xs text-[var(--muted-foreground)] font-mono">{r.date}</span>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} className={`w-4 h-4 ${star <= r.rating ? 'text-amber-400' : 'text-[var(--border)]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {[
                { l: 'Cleaning Quality', v: r.cleaningQuality },
                { l: 'Professionalism', v: r.professionalism },
                { l: 'Punctuality', v: r.punctuality },
                { l: 'Communication', v: r.communication },
              ].map(({ l, v }) => (
                <div key={l} className="bg-[var(--muted)] rounded-lg px-2 py-1.5 text-center">
                  <p className="text-[10px] text-[var(--muted-foreground)]">{l}</p>
                  <p className="text-sm font-bold text-amber-500">{v}★</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--foreground)] italic">"{r.comment}"</p>
            {r.response && (
              <div className="mt-3 p-3 bg-[var(--secondary)] rounded-lg border-l-2 border-[var(--primary)]">
                <p className="text-xs font-semibold text-[var(--primary)] mb-1">Our Response</p>
                <p className="text-xs text-[var(--foreground)]">{r.response}</p>
              </div>
            )}
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="ghost">Respond</Button>
              <Button size="sm" variant="ghost">Hide Review</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
