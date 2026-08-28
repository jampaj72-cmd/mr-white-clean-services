import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customers, bookings } = useApp();
  const customer = customers.find(c => c.id === id);
  if (!customer) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <p className="text-[var(--muted-foreground)]">Customer not found.</p>
      <Button variant="outline" onClick={() => navigate('/customers')}>Back</Button>
    </div>
  );
  const customerBookings = bookings.filter(b => b.customerId === id);
  return (
    <div className="space-y-5 max-w-4xl">
      <PageHeader title={customer.name}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Customers', href: '/customers' }, { label: customer.name }]}
        actions={<>
          <Button variant="outline" size="sm" onClick={() => navigate(`/customers/${id}/edit`)}>Edit</Button>
          <Button size="sm" onClick={() => navigate('/bookings/new')}>New Booking</Button>
        </>}
      />
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
            <Avatar name={customer.name} size="xl" className="mx-auto mb-3" />
            <h2 className="font-bold text-[var(--foreground)]">{customer.name}</h2>
            <p className="text-xs text-[var(--muted-foreground)] font-mono mt-0.5">{customer.id}</p>
            <div className="mt-3"><Badge status={customer.status} dot>{customer.status}</Badge></div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div><p className="text-lg font-bold font-mono text-[var(--foreground)]">{customer.totalBookings}</p><p className="text-[10px] text-[var(--muted-foreground)]">Bookings</p></div>
              <div><p className="text-lg font-bold font-mono text-[var(--primary)]">${customer.totalSpent}</p><p className="text-[10px] text-[var(--muted-foreground)]">Spent</p></div>
              <div><p className="text-lg font-bold text-amber-500">{customer.rating}★</p><p className="text-[10px] text-[var(--muted-foreground)]">Rating</p></div>
            </div>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Contact Info</h3>
            {[
              { l: 'Phone', v: customer.phone }, { l: 'Email', v: customer.email },
              { l: 'City', v: customer.city }, { l: 'District', v: customer.district },
              { l: 'Address', v: customer.address }, { l: 'Joined', v: customer.joinDate },
              { l: 'Last Booking', v: customer.lastBooking },
            ].map(({ l, v }) => (
              <div key={l} className="flex justify-between gap-2 text-xs">
                <span className="text-[var(--muted-foreground)]">{l}</span>
                <span className="font-medium text-[var(--foreground)] text-right">{v}</span>
              </div>
            ))}
          </div>
          {customer.notes && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Notes</h3>
              <p className="text-xs text-[var(--muted-foreground)]">{customer.notes}</p>
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Booking History ({customerBookings.length})</h3>
            {customerBookings.length === 0 ? (
              <div className="text-center py-8 text-xs text-[var(--muted-foreground)]">No bookings yet.</div>
            ) : (
              <div className="space-y-2">
                {customerBookings.map(b => (
                  <div key={b.id} onClick={() => navigate(`/bookings/${b.id}`)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] cursor-pointer transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-[var(--primary)]">{b.id}</span>
                        <Badge status={b.status} dot>{b.status}</Badge>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{b.serviceName} · {b.date} {b.time}</p>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[var(--foreground)]">${b.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
