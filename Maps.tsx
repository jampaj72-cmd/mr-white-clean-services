import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';

const SERVICE_AREAS = [
  { name: 'Hodan', city: 'Mogadishu', status: 'Active', bookings: 89, travelFee: 10, minBooking: 60 },
  { name: 'Wadajir', city: 'Mogadishu', status: 'Active', bookings: 67, travelFee: 12, minBooking: 60 },
  { name: 'Waberi', city: 'Mogadishu', status: 'Active', bookings: 54, travelFee: 15, minBooking: 70 },
  { name: 'Howlwadaag', city: 'Mogadishu', status: 'Active', bookings: 42, travelFee: 18, minBooking: 80 },
  { name: 'Yaqshid', city: 'Mogadishu', status: 'Active', bookings: 38, travelFee: 20, minBooking: 80 },
  { name: 'Karaan', city: 'Mogadishu', status: 'Active', bookings: 31, travelFee: 22, minBooking: 100 },
  { name: 'Dayniile', city: 'Mogadishu', status: 'Inactive', bookings: 12, travelFee: 25, minBooking: 100 },
  { name: 'Dharkenley', city: 'Mogadishu', status: 'Inactive', bookings: 8, travelFee: 28, minBooking: 120 },
];

export default function Maps() {
  const [areas, setAreas] = useState(SERVICE_AREAS.map(a => ({ ...a, enabled: a.status === 'Active' })));

  return (
    <div className="space-y-5">
      <PageHeader title="Maps & Service Areas" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Maps & Areas' }]} />
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Map placeholder */}
        <div className="lg:col-span-3 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="h-80 bg-gradient-to-br from-[var(--muted)] to-[var(--border)] flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 40% 50%, #0F8B8D 0%, transparent 40%), radial-gradient(circle at 70% 30%, #39B86A 0%, transparent 30%)' }} />
            <div className="text-center z-10">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Mogadishu, Somalia</p>
              <p className="text-xs text-[var(--muted-foreground)]">Service coverage map</p>
            </div>
            {/* Fake pins */}
            {[{ x: '35%', y: '45%', n: 'Hodan' }, { x: '55%', y: '35%', n: 'Wadajir' }, { x: '65%', y: '55%', n: 'Waberi' }, { x: '45%', y: '65%', n: 'Karaan' }].map(p => (
              <div key={p.n} className="absolute" style={{ left: p.x, top: p.y }}>
                <div className="w-5 h-5 bg-[var(--primary)] rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-125 transition-transform">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[var(--foreground)] text-[var(--background)] text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">{p.n}</div>
              </div>
            ))}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[var(--primary)]" />Active Area</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[var(--border)]" />Inactive Area</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[var(--green)]" />High Demand</div>
            </div>
          </div>
        </div>

        {/* Service areas list */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Service Areas ({areas.filter(a => a.enabled).length} active)</h3>
          </div>
          <div className="divide-y divide-[var(--border)] max-h-80 overflow-y-auto">
            {areas.map((area, i) => (
              <div key={area.name} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--foreground)]">{area.name}</p>
                    <Badge status={area.enabled ? 'Active' : 'Inactive'}>{area.enabled ? 'Active' : 'Off'}</Badge>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">${area.travelFee} travel · Min ${area.minBooking} · {area.bookings} bookings</p>
                </div>
                <Toggle size="sm" checked={area.enabled} onChange={v => setAreas(prev => prev.map((a, j) => j === i ? { ...a, enabled: v } : a))} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
