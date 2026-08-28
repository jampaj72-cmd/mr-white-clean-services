import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { Staff, Role } from '@/types';

const ROLES: Role[] = ['Super Admin', 'Manager', 'Booking Staff', 'Finance', 'Customer Support', 'Operations Staff', 'Cleaner'];
const CITIES = ['Mogadishu', 'Hargeisa', 'Kismayo', 'Garowe', 'Bosaso', 'Baidoa'];
const DISTRICTS = ['Hodan', 'Wadajir', 'Waberi', 'Howlwadaag', 'Yaqshid', 'Karaan', 'Dayniile', 'Dharkenley'];

export default function StaffForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { staff, addStaff, updateStaff, addToast } = useApp();
  const existing = id ? staff.find(s => s.id === id) : null;
  const isEdit = !!existing;

  const [form, setForm] = useState({
    name: existing?.name ?? '', phone: existing?.phone ?? '', email: existing?.email ?? '',
    role: existing?.role ?? 'Cleaner' as Role, city: existing?.city ?? 'Mogadishu',
    district: existing?.district ?? 'Hodan',
  });
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (isEdit && existing) {
      updateStaff({ ...existing, ...form });
      addToast({ type: 'success', title: 'Staff profile updated!' });
    } else {
      const newStaff: Staff = {
        id: `STF-2026-${String(Date.now()).slice(-6)}`, ...form, photo: '',
        status: 'Active', rating: 0, completedJobs: 0, totalEarnings: 0,
        joinDate: new Date().toISOString().slice(0, 10), availability: 'Available',
        serviceAreas: [form.district], currentLoad: 0,
      };
      addStaff(newStaff);
      addToast({ type: 'success', title: 'Staff member added!' });
    }
    setLoading(false);
    navigate('/staff');
  };

  return (
    <div className="max-w-2xl space-y-5">
      <PageHeader title={isEdit ? 'Edit Staff' : 'Add Staff Member'}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Staff', href: '/staff' }, { label: isEdit ? 'Edit' : 'New' }]} />
      <form onSubmit={handleSubmit}>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name *" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ahmed Abdi" required />
            <Select label="Role" value={form.role} onChange={e => set('role', e.target.value as Role)} options={ROLES.map(r => ({ label: r, value: r }))} />
            <Input label="Phone" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+252 61 111 2222" />
            <Input label="Email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="staff@mrwhite.so" />
            <Select label="City" value={form.city} onChange={e => set('city', e.target.value)} options={CITIES.map(c => ({ label: c, value: c }))} />
            <Select label="District" value={form.district} onChange={e => set('district', e.target.value)} options={DISTRICTS.map(d => ({ label: d, value: d }))} />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/staff')}>Cancel</Button>
          <Button type="submit" loading={loading}>{isEdit ? 'Save Changes' : 'Add Staff'}</Button>
        </div>
      </form>
    </div>
  );
}
