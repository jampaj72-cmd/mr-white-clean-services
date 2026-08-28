import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Pagination } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { ConfirmDialog } from '@/components/ui/Modal';
import type { Booking } from '@/types';

const STATUSES = ['All', 'Pending', 'Confirmed', 'Cleaner Assigned', 'On The Way', 'Cleaning Started', 'Completed', 'Cancelled', 'Paid', 'Refunded'];

interface AllBookingsProps { filter?: string }

export default function AllBookings({ filter }: AllBookingsProps) {
  const navigate = useNavigate();
  const { bookings, deleteBooking, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(filter ?? 'All');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = !search || b.id.toLowerCase().includes(search.toLowerCase()) || b.customerName.toLowerCase().includes(search.toLowerCase()) || b.serviceName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === 'All' || b.status === status;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, status]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const columns = [
    { key: 'id', header: 'Booking ID', render: (b: Booking) => <span className="font-mono text-xs font-semibold text-[var(--primary)]">{b.id}</span> },
    { key: 'customer', header: 'Customer', render: (b: Booking) => (
      <div className="flex items-center gap-2">
        <Avatar name={b.customerName} size="xs" />
        <span className="text-xs font-medium">{b.customerName}</span>
      </div>
    )},
    { key: 'service', header: 'Service', render: (b: Booking) => <span className="text-xs">{b.serviceName}</span> },
    { key: 'date', header: 'Date & Time', render: (b: Booking) => <span className="text-xs font-mono">{b.date} {b.time}</span> },
    { key: 'status', header: 'Status', render: (b: Booking) => <Badge status={b.status} dot>{b.status}</Badge> },
    { key: 'payment', header: 'Payment', render: (b: Booking) => <Badge status={b.paymentStatus}>{b.paymentStatus}</Badge> },
    { key: 'price', header: 'Price', render: (b: Booking) => <span className="text-xs font-mono font-semibold">${b.price}</span> },
    { key: 'actions', header: '', render: (b: Booking) => (
      <div className="flex items-center gap-1">
        <button onClick={e => { e.stopPropagation(); navigate(`/bookings/${b.id}`); }} className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        </button>
        <button onClick={e => { e.stopPropagation(); navigate(`/bookings/${b.id}/edit`); }} className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        </button>
        <button onClick={e => { e.stopPropagation(); setDeleteId(b.id); }} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Bookings" subtitle={`${filtered.length} bookings found`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Bookings' }]}
        actions={<Button onClick={() => navigate('/bookings/new')} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>New Booking</Button>}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 max-w-xs">
          <Input placeholder="Search bookings..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {STATUSES.slice(0, 6).map(s => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${status === s ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <Table
          columns={columns}
          data={paginated}
          keyExtractor={b => b.id}
          emptyMessage="No bookings found."
          emptyAction={{ label: 'Create Booking', onClick: () => navigate('/bookings/new') }}
          selectable
          bulkActions={[
            { label: 'Export Selected', onClick: () => addToast({ type: 'info', title: 'Exporting...' }) },
            { label: 'Cancel Selected', onClick: () => addToast({ type: 'warning', title: 'Bookings cancelled' }), danger: true },
          ]}
        />
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteBooking(deleteId);
            addToast({ type: 'success', title: 'Booking deleted' });
            setDeleteId(null);
          }
        }}
        title="Delete Booking?"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        confirmLabel="Delete Booking"
        danger
      />
    </div>
  );
}
