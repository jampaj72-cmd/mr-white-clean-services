import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { Booking, BookingType, PaymentMethod } from '@/types';

const BOOKING_TYPES: BookingType[] = ['One-time', 'Weekly', 'Bi-weekly', 'Monthly', 'Custom Recurring'];
const PAYMENT_METHODS: PaymentMethod[] = ['EVC Plus', 'Zaad', 'eDahab', 'Bank Transfer', 'Cash', 'Visa', 'Mastercard'];
const CITIES = ['Mogadishu', 'Hargeisa', 'Kismayo', 'Garowe', 'Bosaso', 'Baidoa'];
const DISTRICTS = ['Hodan', 'Wadajir', 'Waberi', 'Howlwadaag', 'Yaqshid', 'Karaan', 'Dayniile', 'Dharkenley'];

export default function CreateBooking() {
  const navigate = useNavigate();
  const { customers, staff, services, addBooking, addToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerId: '', serviceId: '', staffId: '', type: 'One-time' as BookingType,
    date: '', time: '', address: '', city: 'Mogadishu', district: 'Hodan',
    paymentMethod: 'EVC Plus' as PaymentMethod, notes: '', internalNotes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customerId) e.customerId = 'Customer is required';
    if (!form.serviceId) e.serviceId = 'Service is required';
    if (!form.date) e.date = 'Date is required';
    if (!form.time) e.time = 'Time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const customer = customers.find(c => c.id === form.customerId)!;
    const service = services.find(s => s.id === form.serviceId)!;
    const staffMember = staff.find(s => s.id === form.staffId);
    const newBooking: Booking = {
      id: `MW-2026-${String(Date.now()).slice(-6)}`,
      customerId: form.customerId, customerName: customer?.name ?? '',
      serviceId: form.serviceId, serviceName: service?.name ?? '',
      staffId: form.staffId || null, staffName: staffMember?.name ?? null,
      status: 'Pending', type: form.type, date: form.date, time: form.time,
      duration: service?.duration ?? 2, address: form.address, city: form.city, district: form.district,
      price: service?.price ?? 0, paymentStatus: 'Pending', paymentMethod: form.paymentMethod,
      notes: form.notes, internalNotes: form.internalNotes, createdAt: new Date().toISOString().slice(0, 10), addons: [],
    };
    addBooking(newBooking);
    addToast({ type: 'success', title: 'Booking created successfully!', message: `Booking ${newBooking.id} created.` });
    setLoading(false);
    navigate('/bookings');
  };

  return (
    <div className="max-w-3xl space-y-5">
      <PageHeader title="Create New Booking" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Bookings', href: '/bookings' }, { label: 'New Booking' }]} />
      <form onSubmit={handleSubmit}>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Customer *" value={form.customerId} onChange={e => set('customerId', e.target.value)} error={errors.customerId}
              options={[{ label: 'Select customer...', value: '' }, ...customers.map(c => ({ label: c.name, value: c.id }))]} />
            <Select label="Service *" value={form.serviceId} onChange={e => set('serviceId', e.target.value)} error={errors.serviceId}
              options={[{ label: 'Select service...', value: '' }, ...services.filter(s => s.status === 'Active').map(s => ({ label: `${s.name} — $${s.price}`, value: s.id }))]} />
            <Select label="Assign Cleaner" value={form.staffId} onChange={e => set('staffId', e.target.value)}
              options={[{ label: 'Select cleaner...', value: '' }, ...staff.filter(s => s.role === 'Cleaner' && s.status === 'Active').map(s => ({ label: `${s.name} (${s.availability})`, value: s.id }))]} />
            <Select label="Booking Type" value={form.type} onChange={e => set('type', e.target.value as BookingType)}
              options={BOOKING_TYPES.map(t => ({ label: t, value: t }))} />
            <Input label="Date *" type="date" value={form.date} onChange={e => set('date', e.target.value)} error={errors.date} />
            <Input label="Time *" type="time" value={form.time} onChange={e => set('time', e.target.value)} error={errors.time} />
            <Select label="City" value={form.city} onChange={e => set('city', e.target.value)}
              options={CITIES.map(c => ({ label: c, value: c }))} />
            <Select label="District" value={form.district} onChange={e => set('district', e.target.value)}
              options={DISTRICTS.map(d => ({ label: d, value: d }))} />
            <Input label="Address" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Street / building" className="sm:col-span-2" />
            <Select label="Payment Method" value={form.paymentMethod} onChange={e => set('paymentMethod', e.target.value as PaymentMethod)}
              options={PAYMENT_METHODS.map(m => ({ label: m, value: m }))} />
          </div>
          <Textarea label="Customer Notes" value={form.notes} onChange={e => set('notes', e.target.value)} rows={2} placeholder="Notes visible to the cleaner..." />
          <Textarea label="Internal Notes" value={form.internalNotes} onChange={e => set('internalNotes', e.target.value)} rows={2} placeholder="Internal admin notes..." />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/bookings')}>Cancel</Button>
          <Button type="submit" loading={loading}>Create Booking</Button>
        </div>
      </form>
    </div>
  );
}
