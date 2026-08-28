import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Input({ label, error, helper, icon, iconRight, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={inputId} className="text-sm font-medium text-[var(--foreground)]">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">{icon}</span>}
        <input
          id={inputId}
          {...props}
          className={`w-full bg-[var(--card)] border ${error ? 'border-red-500' : 'border-[var(--border)]'} rounded-[var(--radius)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent disabled:opacity-50 ${icon ? 'pl-9' : 'pl-3'} ${iconRight ? 'pr-9' : 'pr-3'} py-2 ${className}`}
        />
        {iconRight && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">{iconRight}</span>}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {helper && !error && <p className="text-xs text-[var(--muted-foreground)]">{helper}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export function Select({ label, error, options, className = '', id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={selectId} className="text-sm font-medium text-[var(--foreground)]">{label}</label>}
      <select
        id={selectId}
        {...props}
        className={`w-full bg-[var(--card)] border ${error ? 'border-red-500' : 'border-[var(--border)]'} rounded-[var(--radius)] text-sm text-[var(--foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent disabled:opacity-50 px-3 py-2 ${className}`}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
  const taId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={taId} className="text-sm font-medium text-[var(--foreground)]">{label}</label>}
      <textarea
        id={taId}
        {...props}
        className={`w-full bg-[var(--card)] border ${error ? 'border-red-500' : 'border-[var(--border)]'} rounded-[var(--radius)] text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent disabled:opacity-50 px-3 py-2 resize-none ${className}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
