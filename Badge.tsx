import React from 'react';

type Variant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'secondary' | 'teal';

const styles: Record<Variant, string> = {
  default: 'bg-[var(--muted)] text-[var(--foreground)]',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
};

const statusVariants: Record<string, Variant> = {
  Active: 'success', Completed: 'success', Paid: 'success', Approved: 'success', Published: 'success', Available: 'success',
  Pending: 'warning', 'Payment Pending': 'warning', 'On The Way': 'warning', 'Cleaning Started': 'warning', Draft: 'warning', Sent: 'info', Viewed: 'info',
  Cancelled: 'error', Failed: 'error', Blocked: 'error', Inactive: 'error', Declined: 'error', 'No Show': 'error',
  Confirmed: 'teal', 'Cleaner Assigned': 'teal', Refunded: 'secondary', Rescheduled: 'secondary', Busy: 'warning', Off: 'secondary',
  'On Leave': 'secondary', Expired: 'secondary', Converted: 'success', Hidden: 'secondary', Overdue: 'error', Partially: 'warning',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  status?: string;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant, status, dot, className = '' }: BadgeProps) {
  const v = variant ?? (status ? statusVariants[status] ?? 'default' : 'default');
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[v]} ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  );
}
