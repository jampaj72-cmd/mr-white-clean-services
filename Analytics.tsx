import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { REVENUE_DATA, SERVICE_PERFORMANCE, BOOKING_STATUS_DATA } from '@/store/data';

const STAFF_PERF = [
  { name: 'Ahmed Abdi', jobs: 48, rating: 4.9, earnings: 2400 },
  { name: 'Khadija Hassan', jobs: 39, rating: 4.8, earnings: 1950 },
  { name: 'Yusuf Aden', jobs: 35, rating: 4.7, earnings: 1750 },
  { name: 'Fartun Yusuf', jobs: 28, rating: 4.6, earnings: 1400 },
  { name: 'Mohamed Omar', jobs: 22, rating: 4.7, earnings: 3200 },
];

export default function Analytics() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics Overview" subtitle="Key metrics and performance indicators"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Analytics' }]}
        actions={
          <div className="flex gap-1 bg-[var(--muted)] rounded-xl p-1">
            {(['week', 'month', 'year'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${period === p ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)]'}`}>
                {p}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Monthly Revenue" value={9100} prefix="$" change={10.2} delay={0}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
        <StatCard title="Total Bookings" value={108} change={8.4} delay={100}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /></svg>}
          color="#39B86A" />
        <StatCard title="Avg Order Value" value={84} prefix="$" change={3.1} delay={200}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
          color="#8B5CF6" />
        <StatCard title="Customer Retention" value="87%" change={4.5} delay={300}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
          color="#F59E0B" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Revenue Trend (2026)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={REVENUE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0F8B8D" strokeWidth={2.5} dot={{ r: 3, fill: '#0F8B8D' }} name="Revenue ($)" />
              <Line type="monotone" dataKey="bookings" stroke="#39B86A" strokeWidth={2} dot={{ r: 2, fill: '#39B86A' }} name="Bookings" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Staff Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={STAFF_PERF}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="jobs" fill="#0F8B8D" radius={4} name="Jobs Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Services Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={SERVICE_PERFORMANCE} cx="50%" cy="50%" outerRadius={65} dataKey="value" paddingAngle={2}>
                {SERVICE_PERFORMANCE.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {SERVICE_PERFORMANCE.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: s.color }} />{s.name}</span>
                <span className="font-mono font-semibold text-[var(--foreground)]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Top Staff Members</h3>
          <div className="space-y-3">
            {STAFF_PERF.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="w-5 text-xs font-bold text-[var(--muted-foreground)] text-center">#{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-[var(--foreground)]">{s.name}</span>
                    <span className="text-[var(--muted-foreground)]">{s.jobs} jobs · {s.rating}★</span>
                  </div>
                  <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--cyan)] rounded-full transition-all duration-1000"
                      style={{ width: `${(s.jobs / 48) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-[var(--foreground)] w-16 text-right">${s.earnings}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
