import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { REVENUE_DATA } from '@/store/data';

const REPORT_TYPES = ['Revenue Report', 'Booking Report', 'Customer Report', 'Staff Performance'];

export default function Reports() {
  const [activeReport, setActiveReport] = useState('Revenue Report');
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-08-27');
  const { bookings, customers, staff, addToast } = useApp();

  const handleExport = (format: string) => {
    addToast({ type: 'success', title: `Exporting ${activeReport} as ${format}...`, message: 'Download will begin shortly.' });
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Reports" subtitle="Business intelligence and analytics"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Reports' }]}
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleExport('CSV')}>Export CSV</Button>
            <Button size="sm" variant="outline" onClick={() => handleExport('Excel')}>Export Excel</Button>
            <Button size="sm" onClick={() => handleExport('PDF')}>Export PDF</Button>
          </div>
        }
      />

      {/* Report type selector */}
      <div className="flex gap-1 flex-wrap">
        {REPORT_TYPES.map(t => (
          <button key={t} onClick={() => setActiveReport(t)}
            className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${activeReport === t ? 'bg-[var(--primary)] text-white shadow-sm' : 'bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Date filters */}
      <div className="flex items-center gap-3 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <div className="flex items-center gap-2">
          <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-36" />
          <span className="text-[var(--muted-foreground)] text-sm">to</span>
          <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-36" />
        </div>
        <Button size="sm">Apply Filter</Button>
      </div>

      {activeReport === 'Revenue Report' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: 'Total Revenue', v: '$78,989', c: '#0F8B8D' },
              { l: 'Collected', v: '$72,540', c: '#39B86A' },
              { l: 'Pending', v: '$6,449', c: '#F59E0B' },
              { l: 'Growth', v: '+12.8%', c: '#0F8B8D' },
            ].map(({ l, v, c }) => (
              <div key={l} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
                <p className="text-xs text-[var(--muted-foreground)]">{l}</p>
                <p className="text-xl font-bold font-mono mt-1" style={{ color: c }}>{v}</p>
              </div>
            ))}
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Monthly Revenue 2026</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#0F8B8D" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeReport === 'Booking Report' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: 'Total Bookings', v: bookings.length, c: '#0F8B8D' },
              { l: 'Completed', v: bookings.filter(b => b.status === 'Completed').length, c: '#39B86A' },
              { l: 'Cancelled', v: bookings.filter(b => b.status === 'Cancelled').length, c: '#EF4444' },
              { l: 'Pending', v: bookings.filter(b => b.status === 'Pending').length, c: '#F59E0B' },
            ].map(({ l, v, c }) => (
              <div key={l} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
                <p className="text-xs text-[var(--muted-foreground)]">{l}</p>
                <p className="text-xl font-bold font-mono mt-1" style={{ color: c }}>{v}</p>
              </div>
            ))}
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Bookings by Month</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} />
                <Line type="monotone" dataKey="bookings" stroke="#39B86A" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeReport === 'Customer Report' && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Customer Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[
              { l: 'Total Customers', v: customers.length },
              { l: 'Active', v: customers.filter(c => c.status === 'Active').length },
              { l: 'Avg Spend', v: `$${Math.round(customers.reduce((a, c) => a + c.totalSpent, 0) / customers.length)}` },
            ].map(({ l, v }) => (
              <div key={l} className="p-3 bg-[var(--muted)] rounded-xl text-center">
                <p className="text-xs text-[var(--muted-foreground)]">{l}</p>
                <p className="text-xl font-bold font-mono mt-1 text-[var(--foreground)]">{v}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {customers.slice(0, 5).map(c => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-sm text-[var(--foreground)]">{c.name}</span>
                <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                  <span>{c.totalBookings} bookings</span>
                  <span className="font-mono font-semibold text-[var(--primary)]">${c.totalSpent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeReport === 'Staff Performance' && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Staff Performance Overview</h3>
          <div className="space-y-3">
            {staff.filter(s => s.completedJobs > 0).sort((a, b) => b.completedJobs - a.completedJobs).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors">
                <span className="w-5 text-xs font-bold text-[var(--muted-foreground)] text-center">#{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--foreground)]">{s.name}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">{s.completedJobs} jobs · {s.rating}★</span>
                  </div>
                  <div className="h-2 bg-[var(--muted)] rounded-full">
                    <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] rounded-full" style={{ width: `${(s.completedJobs / 312) * 100}%` }} />
                  </div>
                </div>
                <span className="text-sm font-mono font-semibold text-[var(--primary)]">${s.totalEarnings}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
