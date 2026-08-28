import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, bookings } = useApp();
  const service = services.find(s => s.id === id);
  if (!service) return <div className="text-center py-20"><p className="text-[var(--muted-foreground)]">Service not found.</p></div>;
  const serviceBookings = bookings.filter(b => b.serviceId === id);
  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title={service.name}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Services', href: '/services' }, { label: service.name }]}
        actions={<>
          <Button variant="outline" size="sm" onClick={() => navigate(`/services/${id}/edit`)}>Edit Service</Button>
          <Button size="sm" onClick={() => navigate('/bookings/new')}>Book Now</Button>
        </>}
      />
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)] mb-4">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h2 className="font-bold text-[var(--foreground)] mb-1">{service.name}</h2>
            <p className="text-xs text-[var(--muted-foreground)] mb-3">{service.description}</p>
            <Badge status={service.status}>{service.status}</Badge>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div><p className="text-lg font-bold font-mono text-[var(--primary)]">${service.price}</p><p className="text-[10px] text-[var(--muted-foreground)]">Price</p></div>
              <div><p className="text-lg font-bold font-mono text-[var(--foreground)]">{service.duration}h</p><p className="text-[10px] text-[var(--muted-foreground)]">Duration</p></div>
              <div><p className="text-lg font-bold font-mono text-[var(--green)]">{service.bookings}</p><p className="text-[10px] text-[var(--muted-foreground)]">Bookings</p></div>
            </div>
          </div>
          {service.addons.length > 0 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Available Add-ons</h3>
              <div className="flex flex-wrap gap-1.5">
                {service.addons.map(a => <Badge key={a} variant="teal">{a}</Badge>)}
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Recent Bookings ({serviceBookings.length})</h3>
            {serviceBookings.length === 0 ? (
              <p className="text-xs text-[var(--muted-foreground)] text-center py-8">No bookings for this service yet.</p>
            ) : (
              <div className="space-y-2">
                {serviceBookings.map(b => (
                  <div key={b.id} onClick={() => navigate(`/bookings/${b.id}`)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] cursor-pointer transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-[var(--primary)]">{b.id}</span>
                        <Badge status={b.status} dot>{b.status}</Badge>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)]">{b.customerName} · {b.date}</p>
                    </div>
                    <span className="text-xs font-mono font-semibold">${b.price}</span>
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
