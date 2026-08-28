import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/store/AuthContext';

// Auth pages
import Login from '@/pages/auth/Login';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import OTPVerification from '@/pages/auth/OTPVerification';
import ResetPassword from '@/pages/auth/ResetPassword';

// Dashboard
import Dashboard from '@/pages/dashboard/Dashboard';
import Analytics from '@/pages/dashboard/Analytics';

// Bookings
import AllBookings from '@/pages/bookings/AllBookings';
import BookingDetails from '@/pages/bookings/BookingDetails';
import CreateBooking from '@/pages/bookings/CreateBooking';

// Calendar
import Calendar from '@/pages/calendar/Calendar';

// Customers
import AllCustomers from '@/pages/customers/AllCustomers';
import CustomerDetails from '@/pages/customers/CustomerDetails';
import CustomerForm from '@/pages/customers/CustomerForm';

// Staff
import AllStaff from '@/pages/staff/AllStaff';
import StaffDetails from '@/pages/staff/StaffDetails';
import StaffForm from '@/pages/staff/StaffForm';

// Services
import AllServices from '@/pages/services/AllServices';
import ServiceDetails from '@/pages/services/ServiceDetails';

// Payments / Invoices / Quotes / Reviews
import AllPayments from '@/pages/payments/AllPayments';
import AllInvoices from '@/pages/invoices/AllInvoices';
import AllQuotes from '@/pages/quotes/AllQuotes';
import AllReviews from '@/pages/reviews/AllReviews';

// Engagement
import Messages from '@/pages/messages/Messages';
import Notifications from '@/pages/notifications/Notifications';

// Reports
import Reports from '@/pages/reports/Reports';

// Activity
import ActivityLog from '@/pages/activity/ActivityLog';

// System
import Maps from '@/pages/maps/Maps';
import Files from '@/pages/files/Files';
import ImportExport from '@/pages/import-export/ImportExport';
import Security from '@/pages/security/Security';
import Settings from '@/pages/settings/Settings';
import Help from '@/pages/help/Help';

// Errors
import NotFound from '@/pages/error/NotFound';
import ServerError from '@/pages/error/ServerError';

// Auth guard component
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function ProtectedLayout() {
  return (
    <RequireAuth>
      <AppLayout />
    </RequireAuth>
  );
}

export const router = createBrowserRouter([
  // Auth routes (no layout)
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/otp', element: <OTPVerification /> },
  { path: '/reset-password', element: <ResetPassword /> },

  // Error pages
  { path: '/500', element: <ServerError /> },

  // Protected app routes
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'analytics/revenue', element: <Analytics /> },
      { path: 'analytics/bookings', element: <Analytics /> },
      { path: 'calendar', element: <Calendar /> },

      // Bookings
      { path: 'bookings', element: <AllBookings /> },
      { path: 'bookings/pending', element: <AllBookings filter="Pending" /> },
      { path: 'bookings/confirmed', element: <AllBookings filter="Confirmed" /> },
      { path: 'bookings/completed', element: <AllBookings filter="Completed" /> },
      { path: 'bookings/cancelled', element: <AllBookings filter="Cancelled" /> },
      { path: 'bookings/new', element: <CreateBooking /> },
      { path: 'bookings/:id', element: <BookingDetails /> },
      { path: 'bookings/:id/edit', element: <CreateBooking /> },

      // Customers
      { path: 'customers', element: <AllCustomers /> },
      { path: 'customers/new', element: <CustomerForm /> },
      { path: 'customers/:id', element: <CustomerDetails /> },
      { path: 'customers/:id/edit', element: <CustomerForm /> },

      // Staff
      { path: 'staff', element: <AllStaff /> },
      { path: 'staff/new', element: <StaffForm /> },
      { path: 'staff/:id', element: <StaffDetails /> },
      { path: 'staff/:id/edit', element: <StaffForm /> },

      // Services
      { path: 'services', element: <AllServices /> },
      { path: 'services/new', element: <AllServices /> },
      { path: 'services/:id', element: <ServiceDetails /> },
      { path: 'services/:id/edit', element: <ServiceDetails /> },

      // Finance
      { path: 'payments', element: <AllPayments /> },
      { path: 'payments/pending', element: <AllPayments filter="Pending" /> },
      { path: 'payments/refunds', element: <AllPayments filter="Refunded" /> },
      { path: 'invoices', element: <AllInvoices /> },
      { path: 'invoices/new', element: <AllInvoices /> },
      { path: 'quotes', element: <AllQuotes /> },
      { path: 'quotes/new', element: <AllQuotes /> },

      // Engagement
      { path: 'reviews', element: <AllReviews /> },
      { path: 'messages', element: <Messages /> },
      { path: 'notifications', element: <Notifications /> },

      // Reports & Logs
      { path: 'reports', element: <Reports /> },
      { path: 'activity', element: <ActivityLog /> },

      // System
      { path: 'maps', element: <Maps /> },
      { path: 'files', element: <Files /> },
      { path: 'import-export', element: <ImportExport /> },
      { path: 'security', element: <Security /> },
      { path: 'settings', element: <Settings /> },
      { path: 'settings/profile', element: <Settings /> },
      { path: 'help', element: <Help /> },

      // 404
      { path: '*', element: <NotFound /> },
    ],
  },
]);
