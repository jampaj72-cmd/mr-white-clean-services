import React from 'react';

interface Breadcrumb { label: string; href?: string }

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 animate-fadeIn">
      <div>
        {breadcrumbs && (
          <nav className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-1">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span>/</span>}
                <span className={i === breadcrumbs.length - 1 ? 'text-[var(--foreground)] font-medium' : 'hover:text-[var(--foreground)] cursor-pointer'}>
                  {b.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-xl font-bold text-[var(--foreground)]">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
