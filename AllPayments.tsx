import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Pagination } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Payment } from '@/types';

interface AllPaymentsProps { filter?: string }

export default function AllPayments({ filter }: AllPaymentsProps) {
  const navigate = useNavigate();
  const { payments, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(filter ?? 'All');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = payments.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.id.toLowerCase().includes(q) || p.customerName.toLowerCase().includes(q);
    const matchStatus = status === 'All' || p.status === status;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((a, p) => a + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pending').reduce((a, p) => a + p.amount, 0);

  const columns = [
    { key: 'id', header: 'Payment ID', render: (p: Payment) => <span className="font-mono text-xs font-semibold text-[var(--primary)]">{p.id}</span> },
    { key: 'customer', header: 'Customer', render: (p: Payment) => <span className="text-xs">{p.customerName}</span> },
    { key: 'booking', header: 'Booking', render: (p: Payment) => <span className="font-mono text-xs text-[var(--muted-foreground)]">{p.bookingId}</span> },
    { key: 'amount', header: 'Amount', render: (p: Payment) => <span className="text-sm font-bold font-mono">${p.amount}</span> },
    { key: 'method', header: 'Method', render: (p: Payment) => <Badge variant="secondary">{p.method}</Badge> },
    { key: 'status', header: 'Status', render: (p: Payment) => <Badge status={p.status} dot>{p.status}</Badge> },
    { key: 'date', header: 'Date', render: (p: Payment) => <span className="text-xs font-mono">{p.date}</span> },
    { key: 'ref', header: 'Reference', render: (p: Payment) => <span className="text-xs font-mono text-[var(--muted-foreground)]">{p.reference || '—'}</span> },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Payments" subtitle={`${filtered.length} payment records`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Payments' }]}
        actions={<Button onClick={() => addToast({ type: 'info', title: 'Record Payment coming soon' })} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>Record Payment</Button>}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { l: 'Total Collected', v: `$${totalPaid}`, c: '#39B86A' },
          { l: 'Pending', v: `$${totalPending}`, c: '#F59E0B' },
          { l: 'Refunded', v: `$${payments.filter(p => p.status === 'Refunded').reduce((a, p) => a + p.amount, 0)}`, c: '#EF4444' },
          { l: 'Total Records', v: payments.length, c: '#0F8B8D' },
        ].map(({ l, v, c }) => (
          <div key={l} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{l}</p>
            <p className="text-xl font-bold font-mono mt-1" style={{ color: c }}>{v}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <div className="flex-1 max-w-xs">
          <Input placeholder="Search payments..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
        </div>
        <div className="flex gap-1">
          {['All', 'Paid', 'Pending', 'Failed', 'Refunded'].map(s => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${status === s ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <Table columns={columns} data={paginated} keyExtractor={p => p.id} emptyMessage="No payments found." />
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </div>
    </div>
  );
}
