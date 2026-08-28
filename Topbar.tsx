import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/store/AuthContext';
import { useTheme } from '@/store/ThemeContext';
import { useApp } from '@/store/AppContext';
import { Avatar } from '@/components/ui/Avatar';

interface TopbarProps {
  onMenuClick: () => void;
  onCommandPalette: () => void;
}

export function Topbar({ onMenuClick, onCommandPalette }: TopbarProps) {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const { notifications, unreadCount, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUser(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onCommandPalette();
      }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onCommandPalette]);

  return (
    <header className="h-14 bg-[var(--card)] border-b border-[var(--border)] flex items-center px-4 gap-3 flex-shrink-0 z-30">
      <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] transition-colors lg:hidden">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Search */}
      <button
        onClick={onCommandPalette}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] text-sm hover:bg-[var(--border)] transition-colors flex-1 max-w-sm text-left"
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span className="flex-1">Search everything...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono bg-[var(--card)] px-1.5 py-0.5 rounded border border-[var(--border)]">⌘K</kbd>
      </button>

      <div className="flex items-center gap-1 ml-auto">
        {/* Theme toggle */}
        <button onClick={toggle} className="p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors" aria-label="Toggle theme">
          {isDark ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button onClick={() => setShowNotifs(p => !p)} className="p-2 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors relative">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-badge">{unreadCount}</span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-50 animate-scaleIn overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                <span className="text-sm font-semibold text-[var(--foreground)]">Notifications</span>
                <button onClick={markAllNotificationsRead} className="text-xs text-[var(--primary)] hover:underline">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-[var(--border)]">
                {notifications.slice(0, 6).map(n => (
                  <div key={n.id} className={`px-4 py-3 hover:bg-[var(--muted)] cursor-pointer transition-colors ${!n.isRead ? 'bg-[var(--secondary)]' : ''}`}
                    onClick={() => { navigate('/notifications'); setShowNotifs(false); }}>
                    <div className="flex items-start gap-2">
                      {!n.isRead && <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-1.5 flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[var(--foreground)] truncate">{n.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-[var(--border)]">
                <button className="text-xs text-[var(--primary)] hover:underline w-full text-center"
                  onClick={() => { navigate('/notifications'); setShowNotifs(false); }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div ref={userRef} className="relative">
          <button onClick={() => setShowUser(p => !p)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-[var(--muted)] transition-colors">
            <Avatar name={user?.name ?? 'Admin'} size="sm" />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-[var(--foreground)] leading-tight">{user?.name}</p>
              <p className="text-[10px] text-[var(--muted-foreground)] leading-tight">{user?.role}</p>
            </div>
            <svg className="w-3 h-3 text-[var(--muted-foreground)] hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showUser && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-50 animate-scaleIn overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border)]">
                <p className="text-sm font-semibold text-[var(--foreground)]">{user?.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{user?.email}</p>
              </div>
              {[
                { label: 'Profile', path: '/settings/profile' },
                { label: 'Settings', path: '/settings' },
                { label: 'Security', path: '/security' },
                { label: 'Help', path: '/help' },
              ].map(item => (
                <button key={item.path} onClick={() => { navigate(item.path); setShowUser(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
                  {item.label}
                </button>
              ))}
              <div className="border-t border-[var(--border)]">
                <button onClick={() => { logout(); navigate('/login'); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-[var(--muted)] transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
