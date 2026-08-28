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
import type { Staff } from '@/types';

export default function AllStaff() {
  const navigate = useNavigate();
  const { staff, deleteStaff, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const PER_PAGE = 10;

  const roles = ['All', 'Cleaner', 'Manager', 'Booking Staff', 'Finance'];
  const filtered = useMemo(() => staff.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !search || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    const matchRole = roleFilter === 'All' || s.role === roleFilter;
    return matchSearch && matchRole;
  }), [staff, search, roleFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const columns = [
    { key: 'name', header: 'Staff Member', render: (s: Staff) => (
      <div className="flex items-center gap-3">
        <Avatar name={s.name} size="sm" />
        <div>
          <p className="text-xs font-semibold text-[var(--foreground)]">{s.name}</p>
          <p className="text-[10px] text-[var(--muted-foreground)] font-mono">{s.id}</p>
        </div>
      </div>
    )},
    { key: 'role', header: 'Role', render: (s: Staff) => <Badge variant="teal">{s.role}</Badge> },
    { key: 'status', header: 'Status', render: (s: Staff) => <Badge status={s.status} dot>{s.status}</Badge> },
    { key: 'availability', header: 'Availability', render: (s: Staff) => <Badge status={s.availability}>{s.availability}</Badge> },
    { key: 'jobs', header: 'Jobs', render: (s: Staff) => <span className="text-xs font-mono font-semibold">{s.completedJobs}</span> },
    { key: 'rating', header: 'Rating', render: (s: Staff) => <span className="text-xs text-amber-500">{s.rating > 0 ? `${s.rating}★` : '—'}</span> },
    { key: 'earnings', header: 'Earnings', render: (s: Staff) => <span className="text-xs font-mono font-semibold text-[var(--primary)]">${s.totalEarnings}</span> },
    { key: 'actions', header: '', render: (s: Staff) => (
      <div className="flex gap-1">
        <button onClick={e => { e.stopPropagation(); navigate(`/staff/${s.id}`); }} className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        </button>
        <button onClick={e => { e.stopPropagation(); navigate(`/staff/${s.id}/edit`); }} className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        </button>
        <button onClick={e => { e.stopPropagation(); setDeleteId(s.id); }} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Staff" subtitle={`${filtered.length} staff members`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Staff' }]}
        actions={<Button onClick={() => navigate('/staff/new')} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>Add Staff</Button>}
      />
      <div className="flex gap-3">
        <div className="flex-1 max-w-xs">
          <Input placeholder="Search staff..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
        </div>
        <div className="flex gap-1">
          {roles.map(r => (
            <button key={r} onClick={() => { setRoleFilter(r); setPage(1); }}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${roleFilter === r ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <Table columns={columns} data={paginated} keyExtractor={s => s.id}
          emptyMessage="No staff found." emptyAction={{ label: 'Add Staff', onClick: () => navigate('/staff/new') }} selectable />
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
      </div>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={() => { if (deleteId) { deleteStaff(deleteId); addToast({ type: 'success', title: 'Staff member deleted' }); setDeleteId(null); } }}
        title="Delete Staff Member?" message="Are you sure you want to delete this staff member? This action cannot be undone." confirmLabel="Delete Staff" danger />
    </div>
  );
}
