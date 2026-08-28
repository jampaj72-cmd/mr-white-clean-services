import React, { useEffect, useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
  onClick?: () => void;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
}

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const step = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return value;
}

export function StatCard({ title, value, change, icon, color = '#0F8B8D', onClick, prefix = '', suffix = '', className = '', delay = 0 }: StatCardProps) {
  const numeric = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
  const counted = useCountUp(numeric, 1000, delay);
  const displayValue = typeof value === 'number'
    ? `${prefix}${counted.toLocaleString()}${suffix}`
    : value;

  return (
    <div
      onClick={onClick}
      className={`bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 card-hover ${onClick ? 'cursor-pointer' : ''} animate-fadeIn ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide mb-2">{title}</p>
          <p className="text-2xl font-bold text-[var(--foreground)] font-mono tabular-nums animate-countUp">{displayValue}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${change >= 0 ? 'text-[var(--green)]' : 'text-[var(--error)]'}`}>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={change >= 0 ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
              </svg>
              {Math.abs(change)}% vs last month
            </div>
          )}
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: color + '20', color }}>
          {icon}
        </div>
      </div>
    </div>
  );
}
