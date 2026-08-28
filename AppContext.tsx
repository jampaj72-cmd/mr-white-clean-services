import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Customer, Staff, Service, Booking, Payment, Invoice, Quote, Review, Notification, Message, ActivityLog } from '@/types';
import { CUSTOMERS, STAFF, SERVICES, BOOKINGS, PAYMENTS, INVOICES, QUOTES, REVIEWS, NOTIFICATIONS, MESSAGES, ACTIVITY_LOGS } from './data';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  customers: Customer[];
  staff: Staff[];
  services: Service[];
  bookings: Booking[];
  payments: Payment[];
  invoices: Invoice[];
  quotes: Quote[];
  reviews: Review[];
  notifications: Notification[];
  messages: Message[];
  activityLogs: ActivityLog[];
  toasts: Toast[];

  addToast: (t: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  updateBookingStatus: (id: string, status: Booking['status']) => void;
  addBooking: (b: Booking) => void;
  deleteBooking: (id: string) => void;

  addCustomer: (c: Customer) => void;
  updateCustomer: (c: Customer) => void;
  deleteCustomer: (id: string) => void;

  addStaff: (s: Staff) => void;
  updateStaff: (s: Staff) => void;
  deleteStaff: (id: string) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  unreadCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [staff, setStaff] = useState<Staff[]>(STAFF);
  const [services] = useState<Service[]>(SERVICES);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [payments] = useState<Payment[]>(PAYMENTS);
  const [invoices] = useState<Invoice[]>(INVOICES);
  const [quotes] = useState<Quote[]>(QUOTES);
  const [reviews] = useState<Review[]>(REVIEWS);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [messages] = useState<Message[]>(MESSAGES);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(ACTIVITY_LOGS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { ...t, id }]);
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(x => x.id !== id));
  }, []);

  const updateBookingStatus = useCallback((id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    setActivityLogs(prev => [{
      id: `LOG-${Date.now()}`, userId: 'STF-2026-000005', userName: 'Abdi Warsame',
      action: 'Updated booking status', entity: 'Booking', entityId: id,
      oldValue: null, newValue: status, result: 'Success', createdAt: new Date().toISOString(),
    }, ...prev]);
  }, []);

  const addBooking = useCallback((b: Booking) => setBookings(prev => [b, ...prev]), []);
  const deleteBooking = useCallback((id: string) => setBookings(prev => prev.filter(b => b.id !== id)), []);

  const addCustomer = useCallback((c: Customer) => setCustomers(prev => [c, ...prev]), []);
  const updateCustomer = useCallback((c: Customer) => setCustomers(prev => prev.map(x => x.id === c.id ? c : x)), []);
  const deleteCustomer = useCallback((id: string) => setCustomers(prev => prev.filter(c => c.id !== id)), []);

  const addStaff = useCallback((s: Staff) => setStaff(prev => [s, ...prev]), []);
  const updateStaff = useCallback((s: Staff) => setStaff(prev => prev.map(x => x.id === s.id ? s : x)), []);
  const deleteStaff = useCallback((id: string) => setStaff(prev => prev.filter(s => s.id !== id)), []);

  const markNotificationRead = useCallback((id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n)), []);
  const markAllNotificationsRead = useCallback(() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true }))), []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider value={{
      customers, staff, services, bookings, payments, invoices, quotes, reviews,
      notifications, messages, activityLogs, toasts,
      addToast, removeToast,
      updateBookingStatus, addBooking, deleteBooking,
      addCustomer, updateCustomer, deleteCustomer,
      addStaff, updateStaff, deleteStaff,
      markNotificationRead, markAllNotificationsRead,
      unreadCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
