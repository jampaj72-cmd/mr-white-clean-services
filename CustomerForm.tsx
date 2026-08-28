import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { Customer } from '@/types';

const CITIES = ['Mogadishu', 'Hargeisa', 'Kismayo', 'Garowe', 'Bosaso', 'Baidoa'];
const DISTRICTS = ['Hodan', 'Wadajir', 'Waberi', 'Howlwadaag', 'Yaqshid', 'Karaan', 'Dayniile', 'Dharkenley'];

export default function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, addCustomer, updateCustomer, addToast } = useApp();
  const existing = id ? customers.find(c => c.id === id) : null;
  const isEdit = !!existing;

  const [form, setForm] = useState({
    name: existing?.name ?? '', phone: existing?.phone ?? '', email: existing?.email ?? '',
    city: existing?.city ?? 'Mogadishu', district: existing?.district ?? 'Hodan',
    address: existing?.address ?? '', notes: existing?.notes ?? '',
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (isEdit && existing) {
      updateCustomer({ ...existing, ...form });
      addToast({ type: 'success', title: 'Customer updated successfully!' });
    } else {
      const newCustomer: Customer = {
        id: `CUS-2026-${String(Date.now()).slice(-6)}`,
        ...form, photo: '', totalBookings: 0, totalSpent: 0, rating: 0,
        status: 'Active', joinDate: new Date().toISOString().slice(0, 10), lastBooking: '-',
      };
      addCustomer(newCustomer);
      addToast({ type: 'success', title: 'Customer added successfully!' });
    }
    setLoading(false);
    navigate('/customers');
  };

  return (
    <div className="max-w-2xl space-y-5">
      <PageHeader title={isEdit ? 'Edit Customer' : 'Add Customer'}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Customers', href: '/customers' }, { label: isEdit ? 'Edit' : 'New' }]} />
      <form onSubmit={handleSubmit}>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name *" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Fadumo Osman" required />
            <Input label="Phone" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+252 61 234 5678" />
            <Input label="Email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="fadumo@email.so" className="sm:col-span-2" />
            <Select label="City" value={form.city} onChange={e => set('city', e.target.value)} options={CITIES.map(c => ({ label: c, value: c }))} />
            <Select label="District" value={form.district} onChange={e => set('district', e.target.value)} options={DISTRICTS.map(d => ({ label: d, value: d }))} />
            <Input label="Address" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Street / building" className="sm:col-span-2" />
          </div>
          <Textarea label="Notes" value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} placeholder="Customer preferences, special instructions..." />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/customers')}>Cancel</Button>
          <Button type="submit" loading={loading}>{isEdit ? 'Save Changes' : 'Add Customer'}</Button>
        </div>
      </form>
    </div>
  );
}
