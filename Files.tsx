import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/store/AppContext';

const MOCK_FILES = [
  { id: 'F1', name: 'Invoice INV-2026-000001.pdf', type: 'PDF', size: '245 KB', uploaded: '2026-08-22', category: 'Invoice', uploader: 'Caasha Mohamud' },
  { id: 'F2', name: 'Before-cleaning-Yaqshid.jpg', type: 'Image', size: '1.2 MB', uploaded: '2026-08-22', category: 'Before/After', uploader: 'Ahmed Abdi' },
  { id: 'F3', name: 'After-cleaning-Yaqshid.jpg', type: 'Image', size: '1.1 MB', uploaded: '2026-08-22', category: 'Before/After', uploader: 'Ahmed Abdi' },
  { id: 'F4', name: 'Quote QUO-2026-000001.pdf', type: 'PDF', size: '189 KB', uploaded: '2026-08-10', category: 'Quote', uploader: 'Abdi Warsame' },
  { id: 'F5', name: 'Customer contract - Fadumo.pdf', type: 'PDF', size: '320 KB', uploaded: '2026-08-20', category: 'Document', uploader: 'Mohamed Omar' },
];

const CATEGORY_ICONS: Record<string, string> = { PDF: '📄', Image: '🖼️', Document: '📋', Video: '🎥' };
const CATEGORIES = ['All', 'Invoice', 'Quote', 'Before/After', 'Document'];

export default function Files() {
  const { addToast } = useApp();
  const [category, setCategory] = useState('All');
  const [dragOver, setDragOver] = useState(false);

  const filtered = MOCK_FILES.filter(f => category === 'All' || f.category === category);

  return (
    <div className="space-y-5">
      <PageHeader title="Files & Media" subtitle={`${MOCK_FILES.length} files`}
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Files & Media' }]}
        actions={<Button onClick={() => addToast({ type: 'info', title: 'Select files to upload' })}>Upload File</Button>}
      />

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); addToast({ type: 'success', title: 'File uploaded!', message: `${e.dataTransfer.files[0]?.name ?? 'File'} uploaded successfully.` }); }}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragOver ? 'border-[var(--primary)] bg-[var(--secondary)]' : 'border-[var(--border)] bg-[var(--muted)]'}`}>
        <div className="text-3xl mb-2">☁️</div>
        <p className="text-sm font-medium text-[var(--foreground)]">Drag & drop files here</p>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">or <button className="text-[var(--primary)] hover:underline" onClick={() => addToast({ type: 'info', title: 'File picker opened' })}>browse files</button></p>
        <p className="text-xs text-[var(--muted-foreground)] mt-2">Supports: Images, PDFs, Documents</p>
      </div>

      <div className="flex gap-1">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${category === c ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(f => (
          <div key={f.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 card-hover">
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">{CATEGORY_ICONS[f.type] ?? '📁'}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--foreground)] truncate">{f.name}</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">{f.size} · {f.uploaded}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="secondary">{f.category}</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-1 mt-3 pt-3 border-t border-[var(--border)]">
              <button onClick={() => addToast({ type: 'info', title: `Previewing ${f.name}` })} className="text-[10px] font-medium px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Preview</button>
              <button onClick={() => addToast({ type: 'success', title: 'Download started' })} className="text-[10px] font-medium px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">Download</button>
              <button onClick={() => addToast({ type: 'info', title: 'File deleted' })} className="text-[10px] font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-colors ml-auto">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
