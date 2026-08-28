import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Pagination } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Quote } from '@/types';

export default function AllQuotes() {
  const navigate = useNavigate();
  const { quotes, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = quotes.filter(q => {
    const sq = search.toLowerCase();
    return (!search || q.id.toLowerCase().includes(sq) || q.customerName.toLowerCase().includes(sq))
      && (status === 'All' || q.status === status);
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const columns = [
    { key: 'id', header: 'Quote ID', render: (q: Quote) => <span className="font-mono text-xs font-semibold text-[var(--primary)]">{q.id}</span> },
    { key: 'customer', header: 'Customer', render: (q: Quote) => <span className="text-xs">{q.customerName}</span> },
    { key: 'total', header: 'Total', render: (q: Quote) => <span className="text-sm font-bold font-mono">${q.total}</span> },
    { key: 'status', header: 'Status', render: (q: Quote) => <Badge status={q.status} dot>{q.status}</Badge> },
    { key: 'valid', header: 'Valid Until', render: (q: Quote) => <span className="text-xs font-mono">{q.validUntil}</span> },
    { key: 'created', header: 'Created', render: (q: Quote) => <span className="text-xs font-mono">{q.createdAt}</span> },
    { key: 'actions', header: '', render: (q: Quote) => (
      <div className="flex gap-1">
        <button onClick={e => { e.stopPropagation(); addToast({ type: 'success', title: 'Quote sent!', message: `Quote ${q.id} sent to ${q.customerName}` }); }} className="text-[10px] font-medium px-2 py-1 rounded bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-80 transition-opacity">Send</button>
        {q.status === 'Approved' && (
          <button onClick={e => { e.stopPropagation(); addToast({ type: 'success', title: 'Converting to booking...' }); navigate('/bookings/new'); }} className="text-[10px] font-medium px-2 py-1 rounded bg-[var(--primary)] text-white hover:bg-[var(--accent)] transition-colors">Convert</button>
        )}
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Quotes" subtitle={`${filtered.length} quotes`} breadcrumbs={[{ label: 'Dashboard' }, { label: 'Quotes' }]}
        actions={<Button onClick={() => navigate('/quotes/new')}>Create Quote</Button>} />
      <div className="flex gap-3">
        <div className="flex-1 max-w-xs">
          <Input placeholder="Search quotes..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
        </div>
        <div className="flex gap-1">
          {['All', 'Draft', 'Sent', 'Approved', 'Declined', 'Expired', 'Converted'].map(s => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors ${status === s ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <Table columns={columns} data={paginated} keyExtractor={q => q.id} emptyMessage="No quotes found." />
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </div>
    </div>
  );
}
