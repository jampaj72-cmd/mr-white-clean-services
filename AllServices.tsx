import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Specialist', 'Hospitality'];

export default function AllServices() {
  const navigate = useNavigate();
  const { services, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = services.filter(s => {
    const q = search.toLowerCase();
    return (!search || s.name.toLowerCase().includes(q)) && (category === 'All' || s.category === category);
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Services" subtitle={`${filtered.length} services`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Services' }]}
        actions={<Button onClick={() => navigate('/services/new')} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}>Add Service</Button>}
      />
      <div className="flex gap-3">
        <div className="flex-1 max-w-xs">
          <Input placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)}
            icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
        </div>
        <div className="flex gap-1">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${category === c ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s, i) => (
          <div key={s.id} onClick={() => navigate(`/services/${s.id}`)}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 card-hover cursor-pointer animate-fadeIn"
            style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <Badge status={s.status}>{s.status}</Badge>
            </div>
            <h3 className="font-semibold text-[var(--foreground)] mb-1">{s.name}</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-3 line-clamp-2">{s.description}</p>
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-xl font-bold font-mono text-[var(--primary)]">${s.price}</span>
                <span className="text-[var(--muted-foreground)]"> / {s.duration}h</span>
              </div>
              <span className="text-[var(--muted-foreground)]">{s.bookings} bookings</span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border)]">
              <Badge variant="secondary">{s.category}</Badge>
              {s.addons.length > 0 && <span className="text-[10px] text-[var(--muted-foreground)]">+{s.addons.length} add-ons</span>}
              <div className="ml-auto flex gap-1">
                <button onClick={e => { e.stopPropagation(); navigate(`/services/${s.id}/edit`); }} className="p-1 rounded hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
