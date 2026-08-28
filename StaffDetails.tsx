import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export default function StaffDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { staff, bookings } = useApp();
  const member = staff.find(s => s.id === id);
  if (!member) return <div className="text-center py-20"><p className="text-[var(--muted-foreground)]">Staff member not found.</p></div>;
  const assignedBookings = bookings.filter(b => b.staffId === id);

  return (
    <div className="space-y-5 max-w-4xl">
      <PageHeader title={member.name}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Staff', href: '/staff' }, { label: member.name }]}
        actions={<><Button variant="outline" size="sm" onClick={() => navigate(`/staff/${id}/edit`)}>Edit Profile</Button></>}
      />
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="space-y-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
            <Avatar name={member.name} size="xl" className="mx-auto mb-3" />
            <h2 className="font-bold text-[var(--foreground)]">{member.name}</h2>
            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              <Badge variant="teal">{member.role}</Badge>
              <Badge status={member.status} dot>{member.status}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div><p className="text-lg font-bold font-mono text-[var(--foreground)]">{member.completedJobs}</p><p className="text-[10px] text-[var(--muted-foreground)]">Jobs</p></div>
              <div><p className="text-lg font-bold text-amber-500">{member.rating}★</p><p className="text-[10px] text-[var(--muted-foreground)]">Rating</p></div>
              <div><p className="text-lg font-bold font-mono text-[var(--primary)]">${member.totalEarnings}</p><p className="text-[10px] text-[var(--muted-foreground)]">Earned</p></div>
            </div>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Details</h3>
            {[
              { l: 'Phone', v: member.phone }, { l: 'Email', v: member.email },
              { l: 'City', v: member.city }, { l: 'District', v: member.district },
              { l: 'Joined', v: member.joinDate },
              { l: 'Availability', v: member.availability }, { l: 'Current Load', v: `${member.currentLoad} jobs` },
            ].map(({ l, v }) => (
              <div key={l} className="flex justify-between text-xs">
                <span className="text-[var(--muted-foreground)]">{l}</span>
                <span className="font-medium text-[var(--foreground)]">{v}</span>
              </div>
            ))}
          </div>
          {member.serviceAreas.length > 0 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Service Areas</h3>
              <div className="flex flex-wrap gap-1.5">
                {member.serviceAreas.map(a => <Badge key={a} variant="secondary">{a}</Badge>)}
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-span-2">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Assigned Bookings ({assignedBookings.length})</h3>
            {assignedBookings.length === 0 ? (
              <div className="text-center py-8 text-xs text-[var(--muted-foreground)]">No bookings assigned.</div>
            ) : (
              <div className="space-y-2">
                {assignedBookings.map(b => (
                  <div key={b.id} onClick={() => navigate(`/bookings/${b.id}`)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] cursor-pointer transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-[var(--primary)]">{b.id}</span>
                        <Badge status={b.status} dot>{b.status}</Badge>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{b.customerName} · {b.serviceName} · {b.date}</p>
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
