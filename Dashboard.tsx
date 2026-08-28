import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '@/store/AppContext';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { REVENUE_DATA, SERVICE_PERFORMANCE, BOOKING_STATUS_DATA } from '@/store/data';

const QUICK_ACTIONS = [
  { label: 'New Booking', path: '/bookings/new', color: '#0F8B8D', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /> },
  { label: 'Add Customer', path: '/customers/new', color: '#39B86A', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /> },
  { label: 'Add Staff', path: '/staff/new', color: '#8B5CF6', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /> },
  { label: 'Create Invoice', path: '/invoices/new', color: '#F59E0B', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
  { label: 'Create Quote', path: '/quotes/new', color: '#36C5D3', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
  { label: 'View Reports', path: '/reports', color: '#EF4444', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
  { label: 'Record Payment', path: '/payments', color: '#3B82F6', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /> },
  { label: 'Activity Log', path: '/activity', color: '#EC4899', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { bookings, customers, staff, payments } = useApp();
  const [revenueRange, setRevenueRange] = useState<'monthly' | 'weekly'>('monthly');

  const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((a, p) => a + p.amount, 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const activeCleaners = staff.filter(s => s.status === 'Active' && s.role === 'Cleaner').length;
  const completedJobs = bookings.filter(b => b.status === 'Completed').length;

  const recent = [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeIn">
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">Dashboard</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Welcome back, Mohamed — here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] bg-[var(--card)] border border-[var(--border)] rounded-xl px-3 py-2">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          August 27, 2026 · Africa/Mogadishu
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={totalRevenue} prefix="$" change={12.8} delay={0}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          onClick={() => navigate('/analytics/revenue')}
        />
        <StatCard title="Total Bookings" value={bookings.length} change={8.4} delay={100}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          color="#39B86A" onClick={() => navigate('/bookings')}
        />
        <StatCard title="Active Customers" value={customers.filter(c => c.status === 'Active').length} change={15.2} delay={200}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          color="#8B5CF6" onClick={() => navigate('/customers')}
        />
        <StatCard title="Completed Jobs" value={completedJobs} change={10.6} delay={300}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
          color="#F59E0B" onClick={() => navigate('/bookings')}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { t: 'Pending Bookings', v: pendingBookings, c: '#F59E0B', path: '/bookings/pending' },
          { t: 'Active Cleaners', v: activeCleaners, c: '#0F8B8D', path: '/staff' },
          { t: 'Customer Satisfaction', v: '4.8★', c: '#39B86A', path: '/reviews' },
          { t: 'Pending Payments', v: payments.filter(p => p.status === 'Pending').length, c: '#EF4444', path: '/payments/pending' },
        ].map((item, i) => (
          <div key={item.t} onClick={() => navigate(item.path)}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 cursor-pointer card-hover animate-fadeIn"
            style={{ animationDelay: `${i * 80 + 400}ms` }}>
            <p className="text-xs text-[var(--muted-foreground)] font-medium">{item.t}</p>
            <p className="text-xl font-bold mt-1 font-mono" style={{ color: item.c }}>{item.v}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 animate-fadeIn stagger-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Revenue Overview</h3>
              <p className="text-xs text-[var(--muted-foreground)]">$78,989 total this year</p>
            </div>
            <div className="flex gap-1">
              {(['monthly', 'weekly'] as const).map(r => (
                <button key={r} onClick={() => setRevenueRange(r)}
                  className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors capitalize ${revenueRange === r ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--muted)] text-[var(--muted-foreground)]'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F8B8D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0F8B8D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#0F8B8D" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Booking status donut */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 animate-fadeIn stagger-6">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">Booking Status</h3>
          <p className="text-xs text-[var(--muted-foreground)] mb-4">Distribution this month</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={BOOKING_STATUS_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {BOOKING_STATUS_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {BOOKING_STATUS_DATA.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />{d.name}</span>
                <span className="font-semibold font-mono text-[var(--foreground)]">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Service performance + Recent bookings */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Service performance */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 animate-fadeIn stagger-7">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Service Performance</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={SERVICE_PERFORMANCE} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} width={90} />
              <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="value" radius={4}>
                {SERVICE_PERFORMANCE.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent bookings */}
        <div className="lg:col-span-3 bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 animate-fadeIn stagger-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Bookings</h3>
            <Button size="sm" variant="ghost" onClick={() => navigate('/bookings')}>View all</Button>
          </div>
          <div className="space-y-3">
            {recent.map(b => (
              <div key={b.id} onClick={() => navigate(`/bookings/${b.id}`)}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] cursor-pointer transition-colors">
                <Avatar name={b.customerName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--foreground)] truncate">{b.customerName}</p>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">{b.serviceName} · {b.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge status={b.status} dot className="mb-0.5">{b.status}</Badge>
                  <p className="text-xs font-mono font-semibold text-[var(--foreground)]">${b.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 animate-fadeIn">
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {QUICK_ACTIONS.map((a, i) => (
            <button key={a.label} onClick={() => navigate(a.path)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[var(--muted)] transition-all duration-150 hover:scale-105 active:scale-95 group"
              style={{ animationDelay: `${i * 50}ms` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-150 group-hover:scale-110" style={{ background: a.color + '20', color: a.color }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">{a.icon}</svg>
              </div>
              <span className="text-[10px] font-medium text-[var(--muted-foreground)] text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
