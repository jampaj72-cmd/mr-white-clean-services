import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import AppLayout from './AppLayout';
import { useAuth } from './AuthContext';

// Auth
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import OTPVerification from './OTPVerification';
import ResetPassword from './ResetPassword';

// Dashboard
import Dashboard from './Dashboard';
import Analytics from './Analytics';

// Bookings
import AllBookings from './AllBookings';
import BookingDetails from './BookingDetails';
import CreateBooking from './CreateBooking';

// Calendar
import Calendar from './Calendar';

// Customers
import AllCustomers from './AllCustomers';
import CustomerDetails from './CustomerDetails';
import CustomerForm from './CustomerForm';

// Staff
import AllStaff from './AllStaff';
import StaffDetails from './StaffDetails';
import StaffForm from './StaffForm';

// Services
import AllServices from './AllServices';
import ServiceDetails from './ServiceDetails';

// Finance
import AllPayments from './AllPayments';
import AllInvoices from './AllInvoices';
import AllQuotes from './AllQuotes';
import AllReviews from './AllReviews';

// Engagement
import Messages from './Messages';
import Notifications from './Notifications';

// Reports
import Reports from './Reports';

// Activity
import ActivityLog from './ActivityLog';

// System
import Maps from './Maps';
import Files from './Files';
import ImportExport from './ImportExport';
import Security from './Security';
import Settings from './Settings';
import Help from './Help';

// Errors
import NotFound from './NotFound';
import ServerError from './ServerError';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
  // Auth
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/otp',
    element: <OTPVerification />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },

  // Server Error
  {
    path: '/500',
    element: <ServerError />,
  },

  // Protected routes
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      // Dashboard
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },

      // Calendar
      {
        path: 'calendar',
        element: <Calendar />,
      },

      // Bookings
      {
        path: 'bookings',
        element: <AllBookings />,
      },
      {
        path: 'bookings/new',
        element: <CreateBooking />,
      },
      {
        path: 'bookings/:id',
        element: <BookingDetails />,
      },
      {
        path: 'bookings/:id/edit',
        element: <CreateBooking />,
      },

      // Customers
      {
        path: 'customers',
        element: <AllCustomers />,
      },
      {
        path: 'customers/new',
        element: <CustomerForm />,
      },
      {
        path: 'customers/:id',
        element: <CustomerDetails />,
      },
      {
        path: 'customers/:id/edit',
        element: <CustomerForm />,
      },

      // Staff
      {
        path: 'staff',
        element: <AllStaff />,
      },
      {
        path: 'staff/new',
        element: <StaffForm />,
      },
      {
        path: 'staff/:id',
        element: <StaffDetails />,
      },
      {
        path: 'staff/:id/edit',
        element: <StaffForm />,
      },

      // Services
      {
        path: 'services',
        element: <AllServices />,
      },
      {
        path: 'services/new',
        element: <AllServices />,
      },
      {
        path: 'services/:id',
        element: <ServiceDetails />,
      },
      {
        path: 'services/:id/edit',
        element: <ServiceDetails />,
      },

      // Finance
      {
        path: 'payments',
        element: <AllPayments />,
      },
      {
        path: 'invoices',
        element: <AllInvoices />,
      },
      {
        path: 'quotes',
        element: <AllQuotes />,
      },
      {
        path: 'reviews',
        element: <AllReviews />,
      },

      // Engagement
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },

      // Reports
      {
        path: 'reports',
        element: <Reports />,
      },

      // Activity
      {
        path: 'activity',
        element: <ActivityLog />,
      },

      // System
      {
        path: 'maps',
        element: <Maps />,
      },
      {
        path: 'files',
        element: <Files />,
      },
      {
        path: 'import-export',
        element: <ImportExport />,
      },
      {
        path: 'security',
        element: <Security />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'help',
        element: <Help />,
      },

      // 404
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
