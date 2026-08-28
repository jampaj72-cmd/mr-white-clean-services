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
