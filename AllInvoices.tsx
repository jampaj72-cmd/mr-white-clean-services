import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, Pagination } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import type { Invoice } from '@/types';

export default function AllInvoices() {
  const navigate = useNavigate();
  const { invoices, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [viewId, setViewId] = useState<string | null>(null);
  const PER_PAGE = 10;

  const filtered = invoices.filter(i => {
    const q = search.toLowerCase();
    const matchSearch = !search || i.id.toLowerCase().includes(q) || i.customerName.toLowerCase().includes(q);
    const matchStatus = status === 'All' || i.status === status;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const viewInvoice = invoices.find(i => i.id === viewId);

  const columns = [
    { key: 'id', header: 'Invoice ID', render: (i: Invoice) => <span className="font-mono text-xs font-semibold text-[var(--primary)]">{i.id}</span> },
    { key: 'customer', header: 'Customer', render: (i: Invoice) => <span className="text-xs">{i.customerName}</span> },
    { key: 'total', header: 'Total', render: (i: Invoice) => <span className="text-sm font-bold font-mono">${i.total}</span> },
    { key: 'balance', header: 'Balance', render: (i: Invoice) => <span className={`text-xs font-mono font-semibold ${i.balance > 0 ? 'text-red-500' : 'text-[var(--green)]'}`}>${i.balance}</span> },
    { key: 'status', header: 'Status', render: (i: Invoice) => <Badge status={i.status} dot>{i.status}</Badge> },
    { key: 'dueDate', header: 'Due Date', render: (i: Invoice) => <span className="text-xs font-mono">{i.dueDate}</span> },
    { key: 'actions', header: '', render: (i: Invoice) => (
      <div className="flex gap-1">
        <button onClick={e => { e.stopPropagation(); setViewId(i.id); }} className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        </button>
        <button onClick={e => { e.stopPropagation(); addToast({ type: 'info', title: 'Invoice sent!' }); }} className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Invoices" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Invoices' }]}
        actions={<Button onClick={() => navigate('/invoices/new')}>Create Invoice</Button>} />
      <div className="flex gap-3">
        <div className="flex-1 max-w-xs">
          <Input placeholder="Search invoices..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
        </div>
        <div className="flex gap-1">
          {['All', 'Draft', 'Sent', 'Paid', 'Overdue'].map(s => (
            <button key={s} onClick={() => { setStatus(s); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${status === s ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <Table columns={columns} data={paginated} keyExtractor={i => i.id} emptyMessage="No invoices found." />
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </div>

      {/* Invoice preview modal */}
      <Modal open={!!viewInvoice} onClose={() => setViewId(null)} title={`Invoice ${viewId}`} size="lg"
        footer={<>
          <Button variant="outline" onClick={() => { addToast({ type: 'info', title: 'Downloading...' }); }}>Download PDF</Button>
          <Button variant="outline" onClick={() => { addToast({ type: 'success', title: 'Invoice sent!' }); setViewId(null); }}>Send Invoice</Button>
          {viewInvoice?.status !== 'Paid' && <Button onClick={() => { addToast({ type: 'success', title: 'Marked as paid!' }); setViewId(null); }}>Mark Paid</Button>}
        </>}
      >
        {viewInvoice && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">Customer</p>
                <p className="font-semibold text-[var(--foreground)]">{viewInvoice.customerName}</p>
              </div>
              <Badge status={viewInvoice.status}>{viewInvoice.status}</Badge>
            </div>
            <div className="border-t border-[var(--border)] pt-4 space-y-2">
              {viewInvoice.services.map((s, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-[var(--foreground)]">{s.name}</span>
                  <span className="font-mono font-semibold">${s.amount}</span>
                </div>
              ))}
              {viewInvoice.discount > 0 && (
                <div className="flex justify-between text-sm text-red-500">
                  <span>Discount</span><span>-${viewInvoice.discount}</span>
                </div>
              )}
            </div>
            <div className="border-t border-[var(--border)] pt-3 flex justify-between font-bold text-lg">
              <span className="text-[var(--foreground)]">Total</span>
              <span className="font-mono text-[var(--primary)]">${viewInvoice.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Amount Paid</span>
              <span className="font-mono font-semibold text-[var(--green)]">${viewInvoice.amountPaid}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Balance Due</span>
              <span className="font-mono font-semibold text-red-500">${viewInvoice.balance}</span>
            </div>
            <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
              <span>Due Date: {viewInvoice.dueDate}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
