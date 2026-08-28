import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { useApp } from '@/store/AppContext';
import logoImg from '@/imports/image.png';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number | string;
  children?: { label: string; path: string }[];
}

function Icon({ d, className = 'w-4 h-4' }: { d: string; className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} /></svg>;
}

const navGroups: { group: string; items: NavItem[] }[] = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
      { label: 'Analytics', path: '/analytics', icon: <Icon d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
      { label: 'Calendar', path: '/calendar', icon: <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
    ],
  },
  {
    group: 'Operations',
    items: [
      { label: 'Bookings', path: '/bookings', icon: <Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /> },
      { label: 'Customers', path: '/customers', icon: <Icon d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
      { label: 'Staff', path: '/staff', icon: <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /> },
      { label: 'Services', path: '/services', icon: <Icon d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /> },
    ],
  },
  {
    group: 'Finance',
    items: [
      { label: 'Payments', path: '/payments', icon: <Icon d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /> },
      { label: 'Invoices', path: '/invoices', icon: <Icon d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
      { label: 'Quotes', path: '/quotes', icon: <Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
    ],
  },
  {
    group: 'Engagement',
    items: [
      { label: 'Reviews', path: '/reviews', icon: <Icon d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> },
      { label: 'Messages', path: '/messages', icon: <Icon d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
      { label: 'Notifications', path: '/notifications', icon: <Icon d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> },
    ],
  },
  {
    group: 'Reports',
    items: [
      { label: 'Reports', path: '/reports', icon: <Icon d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
      { label: 'Activity Log', path: '/activity', icon: <Icon d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Maps & Areas', path: '/maps', icon: <Icon d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /> },
      { label: 'Files & Media', path: '/files', icon: <Icon d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
      { label: 'Import / Export', path: '/import-export', icon: <Icon d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /> },
      { label: 'Security', path: '/security', icon: <Icon d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
      { label: 'Settings', path: '/settings', icon: <Icon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> },
      { label: 'Help & Support', path: '/help', icon: <Icon d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ collapsed, onToggle, mobile, onClose }: SidebarProps) {
  const location = useLocation();
  const { unreadCount } = useApp();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Overview', 'Operations', 'Finance']));

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  return (
    <div className={`flex flex-col h-full bg-[var(--sidebar)] text-[var(--sidebar-foreground)] transition-all duration-300 ${mobile ? 'w-64' : collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className={`flex items-center border-b border-white/10 flex-shrink-0 ${collapsed && !mobile ? 'p-3 justify-center' : 'px-4 py-3'}`}>
        {(!collapsed || mobile) ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img src={logoImg} alt="Mr White Clean Services" className="h-9 w-auto object-contain flex-shrink-0" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm">MW</div>
        )}
        {!mobile && (
          <button onClick={onToggle} className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'} />
            </svg>
          </button>
        )}
        {mobile && (
          <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {navGroups.map(({ group, items }) => (
          <div key={group}>
            {(!collapsed || mobile) && (
              <button
                onClick={() => toggleGroup(group)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-white/40 hover:text-white/60 transition-colors"
              >
                {group}
                <svg className={`w-3 h-3 transition-transform ${expandedGroups.has(group) ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            {(expandedGroups.has(group) || collapsed) && items.map(item => {
              const isActive = location.pathname.startsWith(item.path);
              const badge = item.label === 'Notifications' ? unreadCount : item.badge;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={mobile ? onClose : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150 group relative ${isActive ? 'nav-active text-white' : 'text-white/60 hover:text-white hover:bg-white/8'} ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
                >
                  <span className={`flex-shrink-0 ${isActive ? 'text-[var(--cyan)]' : 'text-white/50 group-hover:text-white/80'}`}>{item.icon}</span>
                  {(!collapsed || mobile) && (
                    <>
                      <span className="font-medium truncate flex-1">{item.label}</span>
                      {badge ? (
                        <span className="ml-auto bg-[var(--primary)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-badge">{badge}</span>
                      ) : null}
                    </>
                  )}
                  {collapsed && !mobile && badge ? (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--primary)] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-badge">{badge}</span>
                  ) : null}
                  {collapsed && !mobile && (
                    <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {(!collapsed || mobile) && (
        <div className="p-3 border-t border-white/10 flex-shrink-0">
          <div className="bg-gradient-to-r from-[var(--primary)]/20 to-[var(--cyan)]/10 rounded-xl p-3">
            <p className="text-xs font-semibold text-white">Mr White Clean Services</p>
            <p className="text-[10px] text-white/50 mt-0.5">Somalia · Enterprise Admin</p>
          </div>
        </div>
      )}
    </div>
  );
}
