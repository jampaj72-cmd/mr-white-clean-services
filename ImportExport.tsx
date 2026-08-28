import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/store/AppContext';

type Tab = 'import' | 'export';

export default function ImportExport() {
  const [tab, setTab] = useState<Tab>('import');
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { addToast } = useApp();

  const simulateImport = async () => {
    setImporting(true);
    await new Promise(r => setTimeout(r, 2000));
    setImporting(false);
    setSuccess(true);
    addToast({ type: 'success', title: 'Import successful!', message: '48 customers imported, 2 skipped.' });
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Import / Export" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Import / Export' }]} />
      <div className="flex gap-1 bg-[var(--muted)] rounded-xl p-1 w-fit">
        {(['import', 'export'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm' : 'text-[var(--muted-foreground)]'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'import' && (
        <div className="space-y-5">
          {/* Steps indicator */}
          <div className="flex items-center gap-2">
            {['Upload', 'Validate', 'Preview', 'Confirm', 'Done'].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 ${step >= i + 1 ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step >= i + 1 ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-[var(--border)]'}`}>{i + 1}</div>
                  <span className="text-xs font-medium hidden sm:block">{s}</span>
                </div>
                {i < 4 && <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Upload File</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Import customers, bookings, staff, or services via CSV or Excel.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Customers', 'Bookings', 'Staff', 'Services'].map(t => (
                  <button key={t} className="p-3 border border-[var(--border)] rounded-xl text-xs font-medium text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--secondary)] transition-all">{t}</button>
                ))}
              </div>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); setStep(2); }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragOver ? 'border-[var(--primary)] bg-[var(--secondary)]' : 'border-[var(--border)]'}`}>
                <div className="text-3xl mb-2">📂</div>
                <p className="text-sm font-medium text-[var(--foreground)]">Drag & drop your file here</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">CSV or Excel (.xlsx)</p>
                <Button size="sm" variant="outline" className="mt-3" onClick={() => setStep(2)}>Browse Files</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Validating File...</h3>
              <div className="space-y-2">
                {['Checking file format...', 'Validating required columns...', 'Checking for duplicates...', 'Validating phone numbers...'].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[var(--green)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-xs text-[var(--foreground)]">{s}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-[var(--secondary)] rounded-lg">
                <p className="text-xs font-medium text-[var(--foreground)]">50 rows found · 48 valid · 2 with warnings</p>
              </div>
              <Button onClick={() => setStep(3)}>Preview Data</Button>
            </div>
          )}

          {step === 3 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Preview Import Data</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead><tr className="border-b border-[var(--border)]">
                    {['Name', 'Phone', 'Email', 'City', 'Status'].map(h => <th key={h} className="text-left py-2 px-3 text-[var(--muted-foreground)] font-semibold">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {[['Nuurto Cali', '+252 61 888 9999', 'nuurto@email.so', 'Mogadishu', '✓'], ['Maxamed Iimaan', '+252 62 777 8888', 'maxamed@email.so', 'Hargeisa', '✓'], ['Faroox Xasan', 'INVALID', 'faroox@email.so', 'Mogadishu', '⚠']].map((row, i) => (
                      <tr key={i} className={`${row[4] === '⚠' ? 'bg-amber-50 dark:bg-amber-900/10' : ''}`}>
                        {row.map((cell, j) => <td key={j} className={`py-2 px-3 ${j === 4 ? (cell === '✓' ? 'text-green-500' : 'text-amber-500') : 'text-[var(--foreground)]'}`}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button onClick={() => setStep(4)}>Confirm Import</Button>
            </div>
          )}

          {step === 4 && !success && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Ready to Import</h3>
              <div className="grid grid-cols-3 gap-3">
                {[{ l: 'To Import', v: '48', c: '#39B86A' }, { l: 'Skipped', v: '2', c: '#F59E0B' }, { l: 'Failed', v: '0', c: '#EF4444' }].map(({ l, v, c }) => (
                  <div key={l} className="p-3 bg-[var(--muted)] rounded-xl text-center">
                    <p className="text-lg font-bold font-mono" style={{ color: c }}>{v}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{l}</p>
                  </div>
                ))}
              </div>
              <Button loading={importing} onClick={simulateImport}>Start Import</Button>
            </div>
          )}

          {success && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-base font-bold text-[var(--foreground)]">Import Successful!</h3>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">48 customers imported successfully. 2 records skipped.</p>
              <Button className="mt-4" onClick={() => { setStep(1); setSuccess(false); }}>Import Another File</Button>
            </div>
          )}
        </div>
      )}

      {tab === 'export' && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Export Data</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Customers', 'Bookings', 'Payments', 'Staff', 'Services', 'Invoices', 'Quotes', 'Reports'].map(type => (
              <div key={type} className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-xl">
                <span className="text-sm font-medium text-[var(--foreground)]">{type}</span>
                <div className="flex gap-1">
                  {['CSV', 'Excel', 'PDF'].map(fmt => (
                    <button key={fmt} onClick={() => addToast({ type: 'success', title: `Exporting ${type} as ${fmt}...` })}
                      className="text-[10px] font-medium px-2 py-1 rounded bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-colors">
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
