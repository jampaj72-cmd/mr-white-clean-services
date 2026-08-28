import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { useApp } from '@/store/AppContext';

const FAQ = [
  { q: 'How do I create a new booking?', a: 'Navigate to Bookings → New Booking, fill in the customer, service, date, time, and assign a cleaner. Click Create Booking to save.' },
  { q: 'How do I assign a cleaner to a booking?', a: 'Open the booking details, click "Assign Cleaner" and select from available staff. The system will detect conflicts automatically.' },
  { q: 'How do I generate an invoice?', a: 'Go to Invoices → Create Invoice, select the customer and booking, add services and any discounts, then click Create Invoice.' },
  { q: 'How do I switch between light and dark mode?', a: 'Click the sun/moon icon in the top navigation bar to toggle between light and dark mode. Your preference is saved automatically.' },
  { q: 'How do I export data?', a: 'Go to Reports or Import/Export, select the data type, apply any filters, and click Export CSV, Excel, or PDF.' },
];

export default function Help() {
  const { addToast } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticket, setTicket] = useState({ subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const submitTicket = async () => {
    if (!ticket.subject || !ticket.message) { addToast({ type: 'error', title: 'Please fill in all fields.' }); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(false);
    addToast({ type: 'success', title: 'Support ticket submitted!', message: 'Ticket TKT-2026-000001 created. We\'ll respond within 24 hours.' });
    setTicket({ subject: '', message: '' });
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Help & Support" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Help & Support' }]} />
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: '📚', title: 'Documentation', desc: 'Full platform docs', action: 'View Docs' },
          { icon: '💬', title: 'Live Chat', desc: 'Chat with our support team', action: 'Start Chat' },
          { icon: '📧', title: 'Email Support', desc: 'support@mrwhite.so', action: 'Send Email' },
        ].map(item => (
          <div key={item.title} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center card-hover">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">{item.title}</h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-1 mb-3">{item.desc}</p>
            <Button size="sm" variant="outline" className="w-full" onClick={() => addToast({ type: 'info', title: item.action })}>{item.action}</Button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {FAQ.map((faq, i) => (
            <div key={i}>
              <button className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--muted)] transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="text-sm font-medium text-[var(--foreground)]">{faq.q}</span>
                <svg className={`w-4 h-4 text-[var(--muted-foreground)] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-[var(--muted-foreground)]">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support ticket */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">Submit a Support Ticket</h2>
        <div className="space-y-4">
          <Input label="Subject" value={ticket.subject} onChange={e => setTicket(p => ({ ...p, subject: e.target.value }))} placeholder="Describe your issue briefly..." />
          <Textarea label="Message" value={ticket.message} onChange={e => setTicket(p => ({ ...p, message: e.target.value }))} rows={4} placeholder="Provide as much detail as possible..." />
          <Button onClick={submitTicket} loading={submitting}>Submit Ticket</Button>
        </div>
      </div>
    </div>
  );
}
