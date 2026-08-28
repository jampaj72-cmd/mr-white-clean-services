export type BookingStatus =
  | 'Pending' | 'Confirmed' | 'Cleaner Assigned' | 'On The Way'
  | 'Cleaning Started' | 'Completed' | 'Payment Pending' | 'Paid'
  | 'Cancelled' | 'Rescheduled' | 'Refunded' | 'No Show';

export type BookingType = 'One-time' | 'Weekly' | 'Bi-weekly' | 'Monthly' | 'Custom Recurring';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Partially Paid' | 'Overdue';
export type PaymentMethod = 'EVC Plus' | 'Zaad' | 'eDahab' | 'Bank Transfer' | 'Cash' | 'Visa' | 'Mastercard';
export type QuoteStatus = 'Draft' | 'Sent' | 'Viewed' | 'Approved' | 'Declined' | 'Expired' | 'Converted';
export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
export type NotifChannel = 'Push' | 'SMS' | 'Email' | 'WhatsApp';
export type Role = 'Super Admin' | 'Manager' | 'Booking Staff' | 'Finance' | 'Customer Support' | 'Operations Staff' | 'Cleaner';

export interface Customer {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  totalBookings: number;
  totalSpent: number;
  rating: number;
  status: 'Active' | 'Inactive';
  joinDate: string;
  notes: string;
  lastBooking: string;
}

export interface Staff {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  role: Role;
  status: 'Active' | 'Inactive' | 'On Leave';
  city: string;
  district: string;
  rating: number;
  completedJobs: number;
  totalEarnings: number;
  joinDate: string;
  availability: 'Available' | 'Busy' | 'Off';
  serviceAreas: string[];
  currentLoad: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  status: 'Active' | 'Inactive';
  image: string;
  bookings: number;
  addons: string[];
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  staffId: string | null;
  staffName: string | null;
  status: BookingStatus;
  type: BookingType;
  date: string;
  time: string;
  duration: number;
  address: string;
  city: string;
  district: string;
  price: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  notes: string;
  internalNotes: string;
  createdAt: string;
  addons: string[];
}

export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
  reference: string;
}

export interface Invoice {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  services: { name: string; amount: number }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  amountPaid: number;
  balance: number;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
  sentAt: string | null;
}

export interface Quote {
  id: string;
  customerId: string;
  customerName: string;
  services: { name: string; amount: number }[];
  subtotal: number;
  discount: number;
  total: number;
  status: QuoteStatus;
  validUntil: string;
  createdAt: string;
  sentAt: string | null;
  notes: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  staffId: string;
  staffName: string;
  serviceName: string;
  rating: number;
  cleaningQuality: number;
  professionalism: number;
  punctuality: number;
  communication: number;
  comment: string;
  date: string;
  status: 'Published' | 'Hidden' | 'Pending';
  response: string | null;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  channel: NotifChannel;
  isRead: boolean;
  createdAt: string;
  relatedId: string | null;
}

export interface Message {
  id: string;
  customerId: string;
  customerName: string;
  channel: NotifChannel;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: { id: string; text: string; from: 'admin' | 'customer'; time: string; status: string }[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  oldValue: string | null;
  newValue: string | null;
  result: 'Success' | 'Failed';
  createdAt: string;
}
