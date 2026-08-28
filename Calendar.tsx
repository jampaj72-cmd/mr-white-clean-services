import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

type View = 'month' | 'week' | 'day';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const navigate = useNavigate();
  const { bookings, staff } = useApp();
  const [view, setView] = useState<View>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026
  const [staffFilter, setStaffFilter] = useState<string>('All');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const bookingsForMonth = bookings.filter(b => {
    const [by, bm] = b.date.split('-').map(Number);
    return by === year && bm === month + 1 && (staffFilter === 'All' || b.staffId === staffFilter);
  });

  const getBookingsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookingsForMonth.filter(b => b.date === dateStr);
  };

  const statusColors: Record<string, string> = {
    Pending: '#F59E0B', Confirmed: '#0F8B8D', 'Cleaning Started': '#8B5CF6',
    Completed: '#39B86A', Cancelled: '#EF4444', 'On The Way': '#36C5D3',
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Calendar & Scheduling"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Calendar' }]}
        actions={<Button onClick={() => navigate('/bookings/new')}>New Booking</Button>}
      />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 className="text-base font-semibold text-[var(--foreground)] min-w-[150px] text-center">{MONTHS[month]} {year}</h2>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select value={staffFilter} onChange={e => setStaffFilter(e.target.value)}
            className="text-xs bg-[var(--card)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]">
            <option value="All">All Cleaners</option>
            {staff.filter(s => s.role === 'Cleaner').map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <div className="flex gap-1 bg-[var(--muted)] rounded-xl p-1">
            {(['month', 'week', 'day'] as View[]).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${view === v ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)]'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Month view */}
      {view === 'month' && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden animate-fadeIn">
          <div className="grid grid-cols-7 border-b border-[var(--border)]">
            {DAYS.map(d => (
              <div key={d} className="px-2 py-3 text-center text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[100px] border-r border-b border-[var(--border)] bg-[var(--muted)]/30" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayBookings = getBookingsForDay(day);
              const isToday = day === 27 && month === 7 && year === 2026;
              return (
                <div key={day} className={`min-h-[100px] p-1.5 border-r border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors ${isToday ? 'bg-[var(--secondary)]' : ''}`}>
                  <div className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-[var(--primary)] text-white' : 'text-[var(--foreground)]'}`}>{day}</div>
                  <div className="space-y-0.5">
                    {dayBookings.slice(0, 3).map(b => (
                      <button key={b.id} onClick={() => navigate(`/bookings/${b.id}`)}
                        className="w-full text-left px-1.5 py-0.5 rounded text-[10px] font-medium text-white truncate hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: statusColors[b.status] ?? '#0F8B8D' }}>
                        {b.time} {b.customerName.split(' ')[0]}
                      </button>
                    ))}
                    {dayBookings.length > 3 && (
                      <p className="text-[10px] text-[var(--muted-foreground)] px-1">+{dayBookings.length - 3} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week/Day views — simplified */}
      {(view === 'week' || view === 'day') && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <p className="text-sm text-[var(--muted-foreground)] text-center py-12">
            {view === 'week' ? 'Week' : 'Day'} view — showing all bookings for {MONTHS[month]} 2026
          </p>
          <div className="space-y-2">
            {bookingsForMonth.map(b => (
              <div key={b.id} onClick={() => navigate(`/bookings/${b.id}`)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] cursor-pointer transition-colors">
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: statusColors[b.status] ?? '#0F8B8D' }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-[var(--muted-foreground)]">{b.date} {b.time}</span>
                    <Badge status={b.status} dot>{b.status}</Badge>
                  </div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{b.customerName} · {b.serviceName}</p>
                </div>
                {b.staffName && (
                  <div className="flex items-center gap-1.5">
                    <Avatar name={b.staffName} size="xs" />
                    <span className="text-xs text-[var(--muted-foreground)]">{b.staffName}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(statusColors).map(([s, c]) => (
          <div key={s} className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
            <div className="w-3 h-3 rounded" style={{ background: c }} />
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
