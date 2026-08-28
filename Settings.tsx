import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Toggle } from '@/components/ui/Toggle';
import { useApp } from '@/store/AppContext';

const SETTINGS_SECTIONS = [
  { id: 'general', label: 'General', icon: '⚙️' },
  { id: 'profile', label: 'Admin Profile', icon: '👤' },
  { id: 'password', label: 'Change Password', icon: '🔑' },
  { id: 'company', label: 'Company Info', icon: '🏢' },
  { id: 'service-areas', label: 'Service Areas', icon: '📍' },
  { id: 'payment', label: 'Payment Settings', icon: '💳' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'roles', label: 'Roles & Permissions', icon: '🔐' },
];

const PAYMENT_METHODS = ['EVC Plus', 'Zaad', 'eDahab', 'Bank Transfer', 'Cash', 'Visa', 'Mastercard'];
const ROLES = ['Super Admin', 'Manager', 'Booking Staff', 'Finance', 'Customer Support', 'Operations Staff', 'Cleaner'];
const PERMISSIONS = ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export', 'Manage'];

export default function Settings() {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const [activeSection, setActiveSection] = useState('general');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    addToast({ type: 'success', title: 'Settings saved successfully!' });
  };

  const [notifSettings, setNotifSettings] = useState({
    email: true, sms: true, whatsapp: false, push: true,
    bookingConfirmation: true, bookingReminder: true, paymentReceived: true, reviewRequest: true,
  });

  const [paymentEnabled, setPaymentEnabled] = useState<Record<string, boolean>>({
    'EVC Plus': true, 'Zaad': true, 'eDahab': true, 'Bank Transfer': true, 'Cash': true, 'Visa': false, 'Mastercard': false,
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Settings' }]} />
      <div className="flex gap-5">
        {/* Settings navigation */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            {SETTINGS_SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors border-b border-[var(--border)] last:border-0 ${activeSection === s.id ? 'bg-[var(--secondary)] text-[var(--primary)] font-medium' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]'}`}>
                <span>{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings content */}
        <div className="flex-1 min-w-0">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
            {activeSection === 'general' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-[var(--foreground)]">General Settings</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select label="Currency" value="USD" onChange={() => {}} options={[{ label: 'USD ($)', value: 'USD' }, { label: 'EUR (€)', value: 'EUR' }]} />
                  <Select label="Language" value="en" onChange={() => {}} options={[{ label: 'English', value: 'en' }, { label: 'Somali', value: 'so' }]} />
                  <Select label="Timezone" value="Africa/Mogadishu" onChange={() => {}} options={[{ label: 'Africa/Mogadishu (EAT)', value: 'Africa/Mogadishu' }]} />
                  <Select label="Date Format" value="YYYY-MM-DD" onChange={() => {}} options={[{ label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }, { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' }]} />
                  <Select label="Time Format" value="24h" onChange={() => {}} options={[{ label: '24-hour', value: '24h' }, { label: '12-hour', value: '12h' }]} />
                </div>
              </div>
            )}

            {activeSection === 'profile' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-[var(--foreground)]">Admin Profile</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" defaultValue="Mohamed Omar" />
                  <Input label="Email" type="email" defaultValue="admin@mrwhite.so" />
                  <Input label="Phone" defaultValue="+252 63 333 4444" />
                  <Select label="Role" value="Super Admin" onChange={() => {}} options={[{ label: 'Super Admin', value: 'Super Admin' }]} />
                </div>
                <Textarea label="Bio" rows={3} defaultValue="Operations Manager at Mr White Clean Services, Somalia." />
              </div>
            )}

            {activeSection === 'password' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-[var(--foreground)]">Change Password</h2>
                <div className="max-w-sm space-y-4">
                  <Input label="Current Password" type="password" placeholder="••••••••" />
                  <Input label="New Password" type="password" placeholder="Min. 8 characters" />
                  <Input label="Confirm New Password" type="password" placeholder="Repeat new password" />
                </div>
              </div>
            )}

            {activeSection === 'company' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-[var(--foreground)]">Company Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Company Name" defaultValue="Mr White Clean Services" />
                  <Input label="Email" defaultValue="info@mrwhite.so" />
                  <Input label="Phone" defaultValue="+252 61 000 0000" />
                  <Input label="Website" defaultValue="www.mrwhite.so" />
                  <Input label="City" defaultValue="Mogadishu" />
                  <Input label="Address" defaultValue="Hodan District, Mogadishu, Somalia" />
                </div>
                <Textarea label="Description" rows={3} defaultValue="Mr White Clean Services is Somalia's premier professional cleaning company, offering top-tier residential and commercial cleaning services." />
              </div>
            )}

            {activeSection === 'payment' && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[var(--foreground)]">Payment Settings</h2>
                <p className="text-sm text-[var(--muted-foreground)]">Enable or disable payment methods.</p>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(m => (
                    <div key={m} className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-xl">
                      <span className="text-sm font-medium text-[var(--foreground)]">{m}</span>
                      <Toggle checked={paymentEnabled[m] ?? false} onChange={v => setPaymentEnabled(p => ({ ...p, [m]: v }))} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-[var(--foreground)]">Notification Settings</h2>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)] mb-3">Channels</p>
                  <div className="space-y-2">
                    {[
                      { k: 'email', l: 'Email' }, { k: 'sms', l: 'SMS' },
                      { k: 'whatsapp', l: 'WhatsApp' }, { k: 'push', l: 'Push Notifications' },
                    ].map(({ k, l }) => (
                      <div key={k} className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-xl">
                        <span className="text-sm text-[var(--foreground)]">{l}</span>
                        <Toggle checked={(notifSettings as any)[k]} onChange={v => setNotifSettings(p => ({ ...p, [k]: v }))} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)] mb-3">Event Notifications</p>
                  <div className="space-y-2">
                    {[
                      { k: 'bookingConfirmation', l: 'Booking Confirmation' },
                      { k: 'bookingReminder', l: 'Booking Reminders' },
                      { k: 'paymentReceived', l: 'Payment Received' },
                      { k: 'reviewRequest', l: 'Review Request' },
                    ].map(({ k, l }) => (
                      <div key={k} className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-xl">
                        <span className="text-sm text-[var(--foreground)]">{l}</span>
                        <Toggle checked={(notifSettings as any)[k]} onChange={v => setNotifSettings(p => ({ ...p, [k]: v }))} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'roles' && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[var(--foreground)]">Roles & Permissions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-2 px-3 text-[var(--muted-foreground)] font-semibold">Role</th>
                        {PERMISSIONS.map(p => <th key={p} className="text-center py-2 px-2 text-[var(--muted-foreground)] font-semibold">{p}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {ROLES.map((role, ri) => (
                        <tr key={role} className="hover:bg-[var(--muted)] transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[var(--foreground)]">{role}</td>
                          {PERMISSIONS.map((perm, pi) => {
                            const enabled = ri === 0 || (ri <= 1 && pi <= 5) || (ri === 2 && pi <= 2) || (ri === 3 && [0, 1, 3].includes(pi));
                            return (
                              <td key={perm} className="py-2.5 px-2 text-center">
                                <span className={`inline-flex w-5 h-5 rounded items-center justify-center ${enabled ? 'text-[var(--green)]' : 'text-[var(--border)]'}`}>
                                  {enabled ? '✓' : '—'}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === 'service-areas' && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-[var(--foreground)]">Service Areas</h2>
                {['Hodan', 'Wadajir', 'Waberi', 'Howlwadaag', 'Yaqshid', 'Karaan', 'Dayniile', 'Dharkenley'].map(area => (
                  <div key={area} className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{area}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Mogadishu · $10 travel fee</p>
                    </div>
                    <Toggle checked size="sm" onChange={() => {}} />
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-6 pt-4 border-t border-[var(--border)]">
              <Button onClick={save} loading={saving}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
