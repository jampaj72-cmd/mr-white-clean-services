import type { Customer, Staff, Service, Booking, Payment, Invoice, Quote, Review, Notification, Message, ActivityLog } from '@/types';

export const CUSTOMERS: Customer[] = [
  { id: 'CUS-2026-000001', name: 'Fadumo Osman', photo: '', phone: '+252 61 234 5678', email: 'fadumo@email.so', address: 'Hodan District, Mogadishu', city: 'Mogadishu', district: 'Hodan', totalBookings: 12, totalSpent: 1840, rating: 4.9, status: 'Active', joinDate: '2025-03-15', notes: 'Preferred cleaner: Ahmed Abdi', lastBooking: '2026-08-20' },
  { id: 'CUS-2026-000002', name: 'Abdirahman Warsame', photo: '', phone: '+252 61 345 6789', email: 'abdi@email.so', address: 'Wadajir District, Mogadishu', city: 'Mogadishu', district: 'Wadajir', totalBookings: 8, totalSpent: 1200, rating: 4.7, status: 'Active', joinDate: '2025-05-20', notes: '', lastBooking: '2026-08-18' },
  { id: 'CUS-2026-000003', name: 'Hodan Ali', photo: '', phone: '+252 62 456 7890', email: 'hodan@email.so', address: 'Waberi District, Mogadishu', city: 'Mogadishu', district: 'Waberi', totalBookings: 5, totalSpent: 780, rating: 4.5, status: 'Active', joinDate: '2025-07-10', notes: 'Office cleaning only', lastBooking: '2026-08-15' },
  { id: 'CUS-2026-000004', name: 'Mustafa Hassan', photo: '', phone: '+252 63 567 8901', email: 'mustafa@email.so', address: 'Howlwadaag, Mogadishu', city: 'Mogadishu', district: 'Howlwadaag', totalBookings: 3, totalSpent: 450, rating: 4.2, status: 'Active', joinDate: '2025-09-01', notes: '', lastBooking: '2026-08-10' },
  { id: 'CUS-2026-000005', name: 'Amina Mohamed', photo: '', phone: '+252 61 678 9012', email: 'amina@email.so', address: 'Yaqshid, Mogadishu', city: 'Mogadishu', district: 'Yaqshid', totalBookings: 15, totalSpent: 2200, rating: 5.0, status: 'Active', joinDate: '2025-01-08', notes: 'VIP customer', lastBooking: '2026-08-22' },
  { id: 'CUS-2026-000006', name: 'Dahir Nur', photo: '', phone: '+252 62 789 0123', email: 'dahir@email.so', address: 'Karaan, Mogadishu', city: 'Mogadishu', district: 'Karaan', totalBookings: 2, totalSpent: 300, rating: 4.0, status: 'Inactive', joinDate: '2025-11-15', notes: '', lastBooking: '2026-06-01' },
  { id: 'CUS-2026-000007', name: 'Sahra Abdi', photo: '', phone: '+252 63 890 1234', email: 'sahra@email.so', address: 'Hodan, Mogadishu', city: 'Mogadishu', district: 'Hodan', totalBookings: 9, totalSpent: 1350, rating: 4.8, status: 'Active', joinDate: '2025-04-22', notes: '', lastBooking: '2026-08-19' },
  { id: 'CUS-2026-000008', name: 'Ibrahim Farah', photo: '', phone: '+252 61 901 2345', email: 'ibrahim@email.so', address: 'Dharkenley, Mogadishu', city: 'Mogadishu', district: 'Dharkenley', totalBookings: 6, totalSpent: 900, rating: 4.6, status: 'Active', joinDate: '2025-06-30', notes: '', lastBooking: '2026-08-12' },
  { id: 'CUS-2026-000009', name: 'Faadumo Jama', photo: '', phone: '+252 62 012 3456', email: 'faadumo@email.so', address: 'Hodan, Mogadishu', city: 'Mogadishu', district: 'Hodan', totalBookings: 4, totalSpent: 600, rating: 4.3, status: 'Active', joinDate: '2025-08-14', notes: '', lastBooking: '2026-07-30' },
  { id: 'CUS-2026-000010', name: 'Ahmed Salah', photo: '', phone: '+252 63 123 4567', email: 'ahmedsalah@email.so', address: 'Waberi, Mogadishu', city: 'Mogadishu', district: 'Waberi', totalBookings: 7, totalSpent: 1050, rating: 4.7, status: 'Active', joinDate: '2025-02-18', notes: '', lastBooking: '2026-08-21' },
];

export const STAFF: Staff[] = [
  { id: 'STF-2026-000001', name: 'Ahmed Abdi', photo: '', phone: '+252 61 111 2222', email: 'ahmed@mrwhite.so', role: 'Cleaner', status: 'Active', city: 'Mogadishu', district: 'Hodan', rating: 4.9, completedJobs: 248, totalEarnings: 12400, joinDate: '2024-06-01', availability: 'Available', serviceAreas: ['Hodan', 'Wadajir', 'Waberi'], currentLoad: 3 },
  { id: 'STF-2026-000002', name: 'Khadija Hassan', photo: '', phone: '+252 62 222 3333', email: 'khadija@mrwhite.so', role: 'Cleaner', status: 'Active', city: 'Mogadishu', district: 'Waberi', rating: 4.8, completedJobs: 195, totalEarnings: 9750, joinDate: '2024-08-15', availability: 'Busy', serviceAreas: ['Waberi', 'Howlwadaag', 'Yaqshid'], currentLoad: 5 },
  { id: 'STF-2026-000003', name: 'Mohamed Omar', photo: '', phone: '+252 63 333 4444', email: 'momar@mrwhite.so', role: 'Manager', status: 'Active', city: 'Mogadishu', district: 'Hodan', rating: 4.7, completedJobs: 312, totalEarnings: 18600, joinDate: '2024-01-10', availability: 'Available', serviceAreas: ['All Mogadishu'], currentLoad: 2 },
  { id: 'STF-2026-000004', name: 'Fartun Yusuf', photo: '', phone: '+252 61 444 5555', email: 'fartun@mrwhite.so', role: 'Cleaner', status: 'Active', city: 'Mogadishu', district: 'Karaan', rating: 4.6, completedJobs: 142, totalEarnings: 7100, joinDate: '2025-02-01', availability: 'Available', serviceAreas: ['Karaan', 'Dayniile', 'Dharkenley'], currentLoad: 1 },
  { id: 'STF-2026-000005', name: 'Abdi Warsame', photo: '', phone: '+252 62 555 6666', email: 'abdiwarsame@mrwhite.so', role: 'Booking Staff', status: 'Active', city: 'Mogadishu', district: 'Wadajir', rating: 4.5, completedJobs: 0, totalEarnings: 8400, joinDate: '2024-11-20', availability: 'Available', serviceAreas: [], currentLoad: 0 },
  { id: 'STF-2026-000006', name: 'Nasteho Ali', photo: '', phone: '+252 63 666 7777', email: 'nasteho@mrwhite.so', role: 'Cleaner', status: 'On Leave', city: 'Mogadishu', district: 'Howlwadaag', rating: 4.4, completedJobs: 89, totalEarnings: 4450, joinDate: '2025-04-15', availability: 'Off', serviceAreas: ['Howlwadaag', 'Yaqshid'], currentLoad: 0 },
  { id: 'STF-2026-000007', name: 'Yusuf Aden', photo: '', phone: '+252 61 777 8888', email: 'yusuf@mrwhite.so', role: 'Cleaner', status: 'Active', city: 'Mogadishu', district: 'Dayniile', rating: 4.7, completedJobs: 178, totalEarnings: 8900, joinDate: '2024-09-05', availability: 'Available', serviceAreas: ['Dayniile', 'Dharkenley', 'Karaan'], currentLoad: 4 },
  { id: 'STF-2026-000008', name: 'Caasha Mohamud', photo: '', phone: '+252 62 888 9999', email: 'caasha@mrwhite.so', role: 'Finance', status: 'Active', city: 'Mogadishu', district: 'Hodan', rating: 4.8, completedJobs: 0, totalEarnings: 15000, joinDate: '2024-03-20', availability: 'Available', serviceAreas: [], currentLoad: 0 },
];

export const SERVICES: Service[] = [
  { id: 'SRV-001', name: 'House Cleaning', category: 'Residential', price: 80, duration: 3, description: 'Complete house cleaning service including all rooms, kitchen, and bathrooms.', status: 'Active', image: '', bookings: 312, addons: ['Window Cleaning', 'Sofa Cleaning', 'Balcony Cleaning'] },
  { id: 'SRV-002', name: 'Apartment Cleaning', category: 'Residential', price: 60, duration: 2, description: 'Professional apartment cleaning tailored for smaller spaces.', status: 'Active', image: '', bookings: 248, addons: ['Window Cleaning', 'Carpet Cleaning'] },
  { id: 'SRV-003', name: 'Office Cleaning', category: 'Commercial', price: 120, duration: 4, description: 'Comprehensive office cleaning for businesses of all sizes.', status: 'Active', image: '', bookings: 189, addons: ['Window Cleaning', 'Carpet Cleaning'] },
  { id: 'SRV-004', name: 'Deep Cleaning', category: 'Residential', price: 150, duration: 6, description: 'Intensive deep cleaning for thorough sanitization and freshness.', status: 'Active', image: '', bookings: 142, addons: ['Oven Cleaning', 'Fridge Cleaning', 'Mattress Cleaning'] },
  { id: 'SRV-005', name: 'Move-In Cleaning', category: 'Residential', price: 130, duration: 5, description: 'Prepare your new home before moving in with a complete clean.', status: 'Active', image: '', bookings: 87, addons: ['Window Cleaning', 'Carpet Cleaning'] },
  { id: 'SRV-006', name: 'Move-Out Cleaning', category: 'Residential', price: 130, duration: 5, description: 'Leave your old home spotless with our move-out service.', status: 'Active', image: '', bookings: 95, addons: ['Oven Cleaning', 'Fridge Cleaning'] },
  { id: 'SRV-007', name: 'Carpet Cleaning', category: 'Specialist', price: 70, duration: 2, description: 'Professional carpet cleaning using advanced techniques.', status: 'Active', image: '', bookings: 134, addons: [] },
  { id: 'SRV-008', name: 'Sofa Cleaning', category: 'Specialist', price: 50, duration: 1, description: 'Deep clean your sofas to remove stains and odors.', status: 'Active', image: '', bookings: 112, addons: [] },
  { id: 'SRV-009', name: 'Commercial Cleaning', category: 'Commercial', price: 200, duration: 8, description: 'Large-scale commercial cleaning for warehouses and retail.', status: 'Active', image: '', bookings: 45, addons: ['Window Cleaning', 'Carpet Cleaning'] },
  { id: 'SRV-010', name: 'Post-Construction Cleaning', category: 'Specialist', price: 180, duration: 7, description: 'Remove construction debris and deep clean after renovation.', status: 'Active', image: '', bookings: 33, addons: ['Window Cleaning'] },
  { id: 'SRV-011', name: 'Hotel Cleaning', category: 'Hospitality', price: 250, duration: 8, description: 'Professional hotel room and common area cleaning.', status: 'Inactive', image: '', bookings: 28, addons: [] },
  { id: 'SRV-012', name: 'Window Cleaning', category: 'Specialist', price: 40, duration: 1, description: 'Crystal-clear window cleaning inside and out.', status: 'Active', image: '', bookings: 201, addons: [] },
];

export const BOOKINGS: Booking[] = [
  { id: 'MW-2026-000821', customerId: 'CUS-2026-000001', customerName: 'Fadumo Osman', serviceId: 'SRV-001', serviceName: 'House Cleaning', staffId: 'STF-2026-000001', staffName: 'Ahmed Abdi', status: 'Confirmed', type: 'Monthly', date: '2026-08-28', time: '09:00', duration: 3, address: 'Hodan District', city: 'Mogadishu', district: 'Hodan', price: 80, paymentStatus: 'Pending', paymentMethod: 'EVC Plus', notes: 'Please bring extra supplies.', internalNotes: 'VIP customer, priority service.', createdAt: '2026-08-20', addons: ['Window Cleaning'] },
  { id: 'MW-2026-000822', customerId: 'CUS-2026-000002', customerName: 'Abdirahman Warsame', serviceId: 'SRV-003', serviceName: 'Office Cleaning', staffId: 'STF-2026-000002', staffName: 'Khadija Hassan', status: 'Pending', type: 'Weekly', date: '2026-08-29', time: '08:00', duration: 4, address: 'Wadajir District', city: 'Mogadishu', district: 'Wadajir', price: 120, paymentStatus: 'Pending', paymentMethod: null, notes: '', internalNotes: '', createdAt: '2026-08-21', addons: [] },
  { id: 'MW-2026-000820', customerId: 'CUS-2026-000005', customerName: 'Amina Mohamed', serviceId: 'SRV-004', serviceName: 'Deep Cleaning', staffId: 'STF-2026-000001', staffName: 'Ahmed Abdi', status: 'Completed', type: 'One-time', date: '2026-08-22', time: '10:00', duration: 6, address: 'Yaqshid', city: 'Mogadishu', district: 'Yaqshid', price: 150, paymentStatus: 'Paid', paymentMethod: 'Zaad', notes: '', internalNotes: '', createdAt: '2026-08-15', addons: ['Mattress Cleaning'] },
  { id: 'MW-2026-000819', customerId: 'CUS-2026-000003', customerName: 'Hodan Ali', serviceId: 'SRV-002', serviceName: 'Apartment Cleaning', staffId: 'STF-2026-000004', staffName: 'Fartun Yusuf', status: 'Cancelled', type: 'One-time', date: '2026-08-19', time: '14:00', duration: 2, address: 'Waberi District', city: 'Mogadishu', district: 'Waberi', price: 60, paymentStatus: 'Refunded', paymentMethod: 'Cash', notes: 'Customer cancelled last minute.', internalNotes: '', createdAt: '2026-08-10', addons: [] },
  { id: 'MW-2026-000818', customerId: 'CUS-2026-000007', customerName: 'Sahra Abdi', serviceId: 'SRV-001', serviceName: 'House Cleaning', staffId: 'STF-2026-000007', staffName: 'Yusuf Aden', status: 'Cleaning Started', type: 'Bi-weekly', date: '2026-08-27', time: '11:00', duration: 3, address: 'Hodan', city: 'Mogadishu', district: 'Hodan', price: 80, paymentStatus: 'Pending', paymentMethod: 'EVC Plus', notes: '', internalNotes: '', createdAt: '2026-08-18', addons: [] },
  { id: 'MW-2026-000817', customerId: 'CUS-2026-000010', customerName: 'Ahmed Salah', serviceId: 'SRV-007', serviceName: 'Carpet Cleaning', staffId: 'STF-2026-000001', staffName: 'Ahmed Abdi', status: 'Completed', type: 'One-time', date: '2026-08-21', time: '13:00', duration: 2, address: 'Waberi', city: 'Mogadishu', district: 'Waberi', price: 70, paymentStatus: 'Paid', paymentMethod: 'Zaad', notes: '', internalNotes: '', createdAt: '2026-08-17', addons: [] },
  { id: 'MW-2026-000816', customerId: 'CUS-2026-000004', customerName: 'Mustafa Hassan', serviceId: 'SRV-005', serviceName: 'Move-In Cleaning', staffId: 'STF-2026-000002', staffName: 'Khadija Hassan', status: 'Confirmed', type: 'One-time', date: '2026-08-30', time: '09:00', duration: 5, address: 'Howlwadaag', city: 'Mogadishu', district: 'Howlwadaag', price: 130, paymentStatus: 'Pending', paymentMethod: 'Bank Transfer', notes: '', internalNotes: '', createdAt: '2026-08-16', addons: ['Window Cleaning'] },
  { id: 'MW-2026-000815', customerId: 'CUS-2026-000008', customerName: 'Ibrahim Farah', serviceId: 'SRV-009', serviceName: 'Commercial Cleaning', staffId: 'STF-2026-000003', staffName: 'Mohamed Omar', status: 'Completed', type: 'Monthly', date: '2026-08-20', time: '07:00', duration: 8, address: 'Dharkenley', city: 'Mogadishu', district: 'Dharkenley', price: 200, paymentStatus: 'Paid', paymentMethod: 'Bank Transfer', notes: '', internalNotes: '', createdAt: '2026-08-12', addons: [] },
];

export const PAYMENTS: Payment[] = [
  { id: 'PAY-2026-000001', bookingId: 'MW-2026-000820', customerId: 'CUS-2026-000005', customerName: 'Amina Mohamed', amount: 165, method: 'Zaad', status: 'Paid', date: '2026-08-22', reference: 'ZD8821093' },
  { id: 'PAY-2026-000002', bookingId: 'MW-2026-000817', customerId: 'CUS-2026-000010', customerName: 'Ahmed Salah', amount: 70, method: 'Zaad', status: 'Paid', date: '2026-08-21', reference: 'ZD8820871' },
  { id: 'PAY-2026-000003', bookingId: 'MW-2026-000815', customerId: 'CUS-2026-000008', customerName: 'Ibrahim Farah', amount: 200, method: 'Bank Transfer', status: 'Paid', date: '2026-08-20', reference: 'BT2026081501' },
  { id: 'PAY-2026-000004', bookingId: 'MW-2026-000819', customerId: 'CUS-2026-000003', customerName: 'Hodan Ali', amount: 60, method: 'Cash', status: 'Refunded', date: '2026-08-19', reference: 'CSH001' },
  { id: 'PAY-2026-000005', bookingId: 'MW-2026-000821', customerId: 'CUS-2026-000001', customerName: 'Fadumo Osman', amount: 90, method: 'EVC Plus', status: 'Pending', date: '2026-08-28', reference: '' },
  { id: 'PAY-2026-000006', bookingId: 'MW-2026-000822', customerId: 'CUS-2026-000002', customerName: 'Abdirahman Warsame', amount: 120, method: 'EVC Plus', status: 'Pending', date: '2026-08-29', reference: '' },
];

export const INVOICES: Invoice[] = [
  { id: 'INV-2026-000001', bookingId: 'MW-2026-000820', customerId: 'CUS-2026-000005', customerName: 'Amina Mohamed', services: [{ name: 'Deep Cleaning', amount: 150 }, { name: 'Mattress Cleaning', amount: 15 }], subtotal: 165, discount: 0, tax: 0, total: 165, amountPaid: 165, balance: 0, status: 'Paid', dueDate: '2026-08-22', createdAt: '2026-08-15', sentAt: '2026-08-15' },
  { id: 'INV-2026-000002', bookingId: 'MW-2026-000815', customerId: 'CUS-2026-000008', customerName: 'Ibrahim Farah', services: [{ name: 'Commercial Cleaning', amount: 200 }], subtotal: 200, discount: 0, tax: 0, total: 200, amountPaid: 200, balance: 0, status: 'Paid', dueDate: '2026-08-20', createdAt: '2026-08-12', sentAt: '2026-08-12' },
  { id: 'INV-2026-000003', bookingId: 'MW-2026-000821', customerId: 'CUS-2026-000001', customerName: 'Fadumo Osman', services: [{ name: 'House Cleaning', amount: 80 }, { name: 'Window Cleaning', amount: 10 }], subtotal: 90, discount: 0, tax: 0, total: 90, amountPaid: 0, balance: 90, status: 'Sent', dueDate: '2026-08-30', createdAt: '2026-08-20', sentAt: '2026-08-20' },
  { id: 'INV-2026-000004', bookingId: 'MW-2026-000816', customerId: 'CUS-2026-000004', customerName: 'Mustafa Hassan', services: [{ name: 'Move-In Cleaning', amount: 130 }, { name: 'Window Cleaning', amount: 10 }], subtotal: 140, discount: 10, tax: 0, total: 130, amountPaid: 0, balance: 130, status: 'Draft', dueDate: '2026-09-05', createdAt: '2026-08-16', sentAt: null },
];

export const QUOTES: Quote[] = [
  { id: 'QUO-2026-000001', customerId: 'CUS-2026-000009', customerName: 'Faadumo Jama', services: [{ name: 'House Cleaning', amount: 80 }, { name: 'Window Cleaning', amount: 40 }], subtotal: 120, discount: 10, total: 110, status: 'Approved', validUntil: '2026-09-01', createdAt: '2026-08-10', sentAt: '2026-08-10', notes: 'Monthly service package' },
  { id: 'QUO-2026-000002', customerId: 'CUS-2026-000006', customerName: 'Dahir Nur', services: [{ name: 'Office Cleaning', amount: 120 }], subtotal: 120, discount: 0, total: 120, status: 'Sent', validUntil: '2026-09-10', createdAt: '2026-08-15', sentAt: '2026-08-15', notes: '' },
  { id: 'QUO-2026-000003', customerId: 'CUS-2026-000002', customerName: 'Abdirahman Warsame', services: [{ name: 'Deep Cleaning', amount: 150 }, { name: 'Carpet Cleaning', amount: 70 }], subtotal: 220, discount: 20, total: 200, status: 'Draft', validUntil: '2026-09-15', createdAt: '2026-08-20', sentAt: null, notes: 'Special discount for returning customer' },
];

export const REVIEWS: Review[] = [
  { id: 'REV-001', bookingId: 'MW-2026-000820', customerId: 'CUS-2026-000005', customerName: 'Amina Mohamed', staffId: 'STF-2026-000001', staffName: 'Ahmed Abdi', serviceName: 'Deep Cleaning', rating: 5, cleaningQuality: 5, professionalism: 5, punctuality: 5, communication: 5, comment: 'Absolutely outstanding service! Ahmed was professional, thorough, and left our home spotless. Highly recommend!', date: '2026-08-22', status: 'Published', response: 'Thank you so much, Amina! We are thrilled to hear you had such a great experience.' },
  { id: 'REV-002', bookingId: 'MW-2026-000817', customerId: 'CUS-2026-000010', customerName: 'Ahmed Salah', staffId: 'STF-2026-000001', staffName: 'Ahmed Abdi', serviceName: 'Carpet Cleaning', rating: 4, cleaningQuality: 4, professionalism: 5, punctuality: 4, communication: 4, comment: 'Great job on the carpets. A slight delay but overall very satisfied.', date: '2026-08-21', status: 'Published', response: null },
  { id: 'REV-003', bookingId: 'MW-2026-000815', customerId: 'CUS-2026-000008', customerName: 'Ibrahim Farah', staffId: 'STF-2026-000003', staffName: 'Mohamed Omar', serviceName: 'Commercial Cleaning', rating: 5, cleaningQuality: 5, professionalism: 5, punctuality: 5, communication: 5, comment: 'Excellent commercial cleaning. The team was efficient and professional.', date: '2026-08-20', status: 'Published', response: 'Thank you, Ibrahim! We look forward to serving you again.' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'N-001', type: 'Booking Confirmation', title: 'New Booking Confirmed', message: 'Booking MW-2026-000821 for Fadumo Osman has been confirmed.', channel: 'Push', isRead: false, createdAt: '2026-08-20T10:30:00', relatedId: 'MW-2026-000821' },
  { id: 'N-002', type: 'Payment', title: 'Payment Received', message: 'Payment of $165 received from Amina Mohamed for booking MW-2026-000820.', channel: 'SMS', isRead: false, createdAt: '2026-08-22T15:00:00', relatedId: 'PAY-2026-000001' },
  { id: 'N-003', type: 'Booking Reminder', title: 'Upcoming Booking Tomorrow', message: 'Booking MW-2026-000821 is scheduled for tomorrow at 09:00.', channel: 'Email', isRead: true, createdAt: '2026-08-27T08:00:00', relatedId: 'MW-2026-000821' },
  { id: 'N-004', type: 'Review Request', title: 'New Review Received', message: 'Ahmed Salah left a 4-star review for carpet cleaning service.', channel: 'Push', isRead: false, createdAt: '2026-08-21T18:00:00', relatedId: 'REV-002' },
  { id: 'N-005', type: 'System Alert', title: 'Scheduling Conflict Detected', message: 'Cleaner Ahmed Abdi has overlapping bookings on Aug 28.', channel: 'Push', isRead: false, createdAt: '2026-08-26T09:00:00', relatedId: null },
  { id: 'N-006', type: 'Cancellation', title: 'Booking Cancelled', message: 'Booking MW-2026-000819 has been cancelled by Hodan Ali.', channel: 'Email', isRead: true, createdAt: '2026-08-19T11:00:00', relatedId: 'MW-2026-000819' },
];

export const MESSAGES: Message[] = [
  { id: 'MSG-001', customerId: 'CUS-2026-000001', customerName: 'Fadumo Osman', channel: 'WhatsApp', lastMessage: 'Thank you! See you tomorrow.', lastTime: '2026-08-20T10:15:00', unread: 2, messages: [{ id: 'm1', text: 'Hello, I would like to confirm my booking for tomorrow.', from: 'customer', time: '2026-08-20T10:00:00', status: 'Read' }, { id: 'm2', text: 'Your booking MW-2026-000821 is confirmed for Aug 28 at 09:00. Ahmed Abdi will be your cleaner.', from: 'admin', time: '2026-08-20T10:10:00', status: 'Delivered' }, { id: 'm3', text: 'Thank you! See you tomorrow.', from: 'customer', time: '2026-08-20T10:15:00', status: 'Read' }] },
  { id: 'MSG-002', customerId: 'CUS-2026-000005', customerName: 'Amina Mohamed', channel: 'SMS', lastMessage: 'Perfect, thank you for the great service!', lastTime: '2026-08-22T16:00:00', unread: 0, messages: [{ id: 'm1', text: 'Hi, just checking if the cleaning went well?', from: 'admin', time: '2026-08-22T15:30:00', status: 'Read' }, { id: 'm2', text: 'Perfect, thank you for the great service!', from: 'customer', time: '2026-08-22T16:00:00', status: 'Read' }] },
  { id: 'MSG-003', customerId: 'CUS-2026-000002', customerName: 'Abdirahman Warsame', channel: 'Email', lastMessage: 'Can you reschedule to 10:00?', lastTime: '2026-08-21T09:00:00', unread: 1, messages: [{ id: 'm1', text: 'Can you reschedule to 10:00?', from: 'customer', time: '2026-08-21T09:00:00', status: 'Delivered' }] },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'LOG-001', userId: 'STF-2026-000005', userName: 'Abdi Warsame', action: 'Updated booking status', entity: 'Booking', entityId: 'MW-2026-000821', oldValue: 'Pending', newValue: 'Confirmed', result: 'Success', createdAt: '2026-08-20T10:30:00' },
  { id: 'LOG-002', userId: 'STF-2026-000008', userName: 'Caasha Mohamud', action: 'Recorded payment', entity: 'Payment', entityId: 'PAY-2026-000001', oldValue: null, newValue: 'Paid - $165', result: 'Success', createdAt: '2026-08-22T15:00:00' },
  { id: 'LOG-003', userId: 'STF-2026-000003', userName: 'Mohamed Omar', action: 'Added new customer', entity: 'Customer', entityId: 'CUS-2026-000010', oldValue: null, newValue: 'Ahmed Salah', result: 'Success', createdAt: '2026-08-17T09:00:00' },
  { id: 'LOG-004', userId: 'STF-2026-000005', userName: 'Abdi Warsame', action: 'Assigned cleaner', entity: 'Booking', entityId: 'MW-2026-000821', oldValue: 'Unassigned', newValue: 'Ahmed Abdi', result: 'Success', createdAt: '2026-08-20T10:35:00' },
  { id: 'LOG-005', userId: 'STF-2026-000003', userName: 'Mohamed Omar', action: 'Cancelled booking', entity: 'Booking', entityId: 'MW-2026-000819', oldValue: 'Confirmed', newValue: 'Cancelled', result: 'Success', createdAt: '2026-08-19T11:00:00' },
  { id: 'LOG-006', userId: 'STF-2026-000008', userName: 'Caasha Mohamud', action: 'Generated invoice', entity: 'Invoice', entityId: 'INV-2026-000003', oldValue: null, newValue: 'INV-2026-000003', result: 'Success', createdAt: '2026-08-20T10:00:00' },
];

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 4200, bookings: 52 }, { month: 'Feb', revenue: 5100, bookings: 61 }, { month: 'Mar', revenue: 4800, bookings: 58 },
  { month: 'Apr', revenue: 6200, bookings: 74 }, { month: 'May', revenue: 7100, bookings: 84 }, { month: 'Jun', revenue: 6800, bookings: 81 },
  { month: 'Jul', revenue: 8200, bookings: 97 }, { month: 'Aug', revenue: 9100, bookings: 108 }, { month: 'Sep', revenue: 7800, bookings: 92 },
  { month: 'Oct', revenue: 8900, bookings: 105 }, { month: 'Nov', revenue: 9800, bookings: 116 }, { month: 'Dec', revenue: 11200, bookings: 131 },
];

export const SERVICE_PERFORMANCE = [
  { name: 'House Cleaning', value: 312, color: '#0F8B8D' },
  { name: 'Office Cleaning', value: 189, color: '#19B5B7' },
  { name: 'Apartment Cleaning', value: 248, color: '#36C5D3' },
  { name: 'Deep Cleaning', value: 142, color: '#39B86A' },
  { name: 'Others', value: 357, color: '#94A3B8' },
];

export const BOOKING_STATUS_DATA = [
  { name: 'Completed', value: 1083, color: '#39B86A' },
  { name: 'Confirmed', value: 98, color: '#0F8B8D' },
  { name: 'Pending', value: 42, color: '#F59E0B' },
  { name: 'Cancelled', value: 25, color: '#EF4444' },
];
