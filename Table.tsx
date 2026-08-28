import React, { useState } from 'react';
import { Button } from './Button';

interface Column<T> {
  key: string;
  header: string;
  render: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  loading?: boolean;
  emptyMessage?: string;
  emptyAction?: { label: string; onClick: () => void };
  selectable?: boolean;
  onSelectionChange?: (ids: string[]) => void;
  bulkActions?: { label: string; onClick: (ids: string[]) => void; danger?: boolean }[];
  className?: string;
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export function Table<T>({ columns, data, keyExtractor, loading, emptyMessage = 'No data found.', emptyAction, selectable, onSelectionChange, bulkActions, className = '' }: TableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleAll = () => {
    const newSet = selected.size === data.length ? new Set<string>() : new Set(data.map(r => keyExtractor(r)));
    setSelected(newSet);
    onSelectionChange?.([...newSet]);
  };

  const toggleRow = (id: string) => {
    const newSet = new Set(selected);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelected(newSet);
    onSelectionChange?.([...newSet]);
  };

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div className={`${className}`}>
      {selectable && selected.size > 0 && bulkActions && (
        <div className="flex items-center gap-3 px-4 py-2 bg-[var(--secondary)] border-b border-[var(--border)] text-sm">
          <span className="text-[var(--secondary-foreground)] font-medium">{selected.size} selected</span>
          <div className="flex gap-2 ml-auto">
            {bulkActions.map(a => (
              <Button key={a.label} size="sm" variant={a.danger ? 'danger' : 'outline'} onClick={() => a.onClick([...selected])}>
                {a.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={data.length > 0 && selected.size === data.length} onChange={toggleAll}
                    className="rounded border-[var(--border)] accent-[var(--primary)]" />
                </th>
              )}
              {columns.map(col => (
                <th key={col.key} className={`px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider ${col.width ?? ''} ${col.sortable ? 'cursor-pointer hover:text-[var(--foreground)] select-none' : ''}`}
                  onClick={() => col.sortable && handleSort(col.key)}>
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && <span className="opacity-50">{sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</span>}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={columns.length + (selectable ? 1 : 0)} />)
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[var(--muted)] flex items-center justify-center">
                      <svg className="w-6 h-6 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    </div>
                    <p className="text-[var(--muted-foreground)] text-sm">{emptyMessage}</p>
                    {emptyAction && <Button size="sm" onClick={emptyAction.onClick}>{emptyAction.label}</Button>}
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                const id = keyExtractor(row);
                return (
                  <tr key={id} className={`hover:bg-[var(--muted)] transition-colors animate-fadeIn ${selected.has(id) ? 'bg-[var(--secondary)]' : ''}`}
                    style={{ animationDelay: `${i * 0.03}s` }}>
                    {selectable && (
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selected.has(id)} onChange={() => toggleRow(id)}
                          className="rounded border-[var(--border)] accent-[var(--primary)]" />
                      </td>
                    )}
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 text-[var(--foreground)]">
                        {col.render(row, i)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface PaginationProps {
  page: number;
  total: number;
  perPage: number;
  onPageChange: (p: number) => void;
}

export function Pagination({ page, total, perPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
      <p className="text-xs text-[var(--muted-foreground)]">Showing {start}–{end} of {total}</p>
      <div className="flex items-center gap-1">
        <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Button>
        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
          const p = i + 1;
          return (
            <Button key={p} size="sm" variant={page === p ? 'primary' : 'outline'} onClick={() => onPageChange(p)}>
              {p}
            </Button>
          );
        })}
        <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Button>
      </div>
    </div>
  );
}
