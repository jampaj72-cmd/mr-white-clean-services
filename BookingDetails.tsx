import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Input';
import type { BookingStatus } from '@/types';

const STATUS_OPTIONS: BookingStatus[] = ['Pending', 'Confirmed', 'Cleaner Assigned', 'On The Way', 'Cleaning Started', 'Completed', 'Payment Pending', 'Paid', 'Cancelled', 'Rescheduled', 'Refunded'];

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, staff, updateBookingStatus, addToast } = useApp();
  const booking = bookings.find(b => b.id === id);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<BookingStatus>('Confirmed');
  const [cancelling, setCancelling] = useState(false);

  if (!booking) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <p className="text-[var(--muted-foreground)]">Booking not found.</p>
      <Button variant="outline" onClick={() => navigate('/bookings')}>Back to Bookings</Button>
    </div>
  );

  const cleaner = staff.find(s => s.id === booking.staffId);

  const timeline = [
    { status: 'Booking Created', date: booking.createdAt, done: true },
    { status: 'Confirmed', date: booking.status !== 'Pending' ? booking.date : null, done: !['Pending'].includes(booking.status) },
    { status: 'Cleaner Assigned', date: booking.staffId ? booking.date : null, done: !!booking.staffId },
    { status: 'Cleaning Completed', date: booking.status === 'Completed' ? booking.date : null, done: booking.status === 'Completed' },
    { status: 'Payment Received', date: booking.paymentStatus === 'Paid' ? booking.date : null, done: booking.paymentStatus === 'Paid' },
  ];

  return (
    <div className="space-y-5 max-w-5xl">
      <PageHeader
        title={booking.id}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Bookings', href: '/bookings' }, { label: booking.id }]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setStatusOpen(true)}>Update Status</Button>
            <Button variant="outline" size="sm" onClick={() => navigate(`/bookings/${booking.id}/edit`)}>Edit</Button>
            <Button variant="danger" size="sm" onClick={() => setCancelOpen(true)}>Cancel Booking</Button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Status bar */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-[var(--muted-foreground)] mb-1">Current Status</p>
              <Badge status={booking.status} dot className="text-sm px-3 py-1">{booking.status}</Badge>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--muted-foreground)] mb-1">Payment Status</p>
              <Badge status={booking.paymentStatus}>{booking.paymentStatus}</Badge>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--muted-foreground)] mb-1">Total Price</p>
              <p className="text-xl font-bold font-mono text-[var(--foreground)]">${booking.price}</p>
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Booking Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {[
                { l: 'Booking ID', v: booking.id },
                { l: 'Service', v: booking.serviceName },
                { l: 'Date', v: booking.date },
                { l: 'Time', v: booking.time },
                { l: 'Duration', v: `${booking.duration} hours` },
                { l: 'Type', v: booking.type },
                { l: 'City', v: booking.city },
                { l: 'District', v: booking.district },
                { l: 'Address', v: booking.address },
                { l: 'Payment Method', v: booking.paymentMethod ?? 'Not set' },
              ].map(({ l, v }) => (
                <div key={l}>
                  <p className="text-xs text-[var(--muted-foreground)] mb-0.5">{l}</p>
                  <p className="text-sm font-medium text-[var(--foreground)]">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          {booking.addons.length > 0 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Add-ons</h3>
              <div className="flex flex-wrap gap-2">
                {booking.addons.map(a => <Badge key={a} variant="teal">{a}</Badge>)}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Notes</h3>
            {booking.notes ? (
              <div className="p-3 bg-[var(--muted)] rounded-lg">
                <p className="text-xs text-[var(--muted-foreground)] mb-1">Customer Notes</p>
                <p className="text-sm text-[var(--foreground)]">{booking.notes}</p>
              </div>
            ) : null}
            {booking.internalNotes ? (
              <div className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">Internal Notes</p>
                <p className="text-sm text-[var(--foreground)]">{booking.internalNotes}</p>
              </div>
            ) : null}
            {!booking.notes && !booking.internalNotes && (
              <p className="text-xs text-[var(--muted-foreground)]">No notes added.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Customer</h3>
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={booking.customerName} size="md" />
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{booking.customerName}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{booking.customerId}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full" onClick={() => navigate(`/customers/${booking.customerId}`)}>
              View Customer
            </Button>
          </div>

          {/* Cleaner */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Assigned Cleaner</h3>
            {cleaner ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={cleaner.name} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{cleaner.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{cleaner.rating}★ · {cleaner.completedJobs} jobs</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full" onClick={() => navigate(`/staff/${cleaner.id}`)}>
                  View Profile
                </Button>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-[var(--muted-foreground)] mb-3">No cleaner assigned yet.</p>
                <Button size="sm" className="w-full">Assign Cleaner</Button>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Timeline</h3>
            <div className="space-y-3">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${t.done ? 'bg-[var(--green)]' : 'bg-[var(--border)]'}`}>
                    {t.done ? (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <div className="w-1.5 h-1.5 bg-[var(--muted-foreground)] rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className={`text-xs font-medium ${t.done ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}>{t.status}</p>
                    {t.date && <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{t.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Update status modal */}
      <Modal open={statusOpen} onClose={() => setStatusOpen(false)} title="Update Booking Status"
        footer={<>
          <Button variant="outline" onClick={() => setStatusOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            updateBookingStatus(booking.id, newStatus);
            addToast({ type: 'success', title: 'Status updated', message: `Booking status changed to ${newStatus}` });
            setStatusOpen(false);
          }}>Update Status</Button>
        </>}
      >
        <Select label="New Status" value={newStatus} onChange={e => setNewStatus(e.target.value as BookingStatus)}
          options={STATUS_OPTIONS.map(s => ({ label: s, value: s }))} />
      </Modal>

      <ConfirmDialog
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        onConfirm={async () => {
          setCancelling(true);
          await new Promise(r => setTimeout(r, 800));
          updateBookingStatus(booking.id, 'Cancelled');
          addToast({ type: 'info', title: 'Booking cancelled' });
          setCancelling(false);
          setCancelOpen(false);
        }}
        title="Cancel Booking?"
        message={`Are you sure you want to cancel booking ${booking.id}? The customer will be notified.`}
        confirmLabel="Cancel Booking"
        danger
        loading={cancelling}
      />
    </div>
  );
}
