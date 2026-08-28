import React, { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function Messages() {
  const { messages } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(messages[0]?.id ?? null);
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState(messages);

  const selected = localMessages.find(m => m.id === selectedId);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedId) return;
    setLocalMessages(prev => prev.map(m => m.id === selectedId ? {
      ...m, lastMessage: newMessage, lastTime: new Date().toISOString(),
      messages: [...m.messages, { id: `m${Date.now()}`, text: newMessage, from: 'admin', time: new Date().toISOString(), status: 'Sent' }]
    } : m));
    setNewMessage('');
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Messages" subtitle="Customer conversations" breadcrumbs={[{ label: 'Dashboard' }, { label: 'Messages' }]} />
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden flex h-[600px]">
        {/* Conversations list */}
        <div className="w-72 border-r border-[var(--border)] flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-[var(--border)]">
            <Input placeholder="Search conversations..." icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} />
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]">
            {localMessages.map(m => (
              <button key={m.id} onClick={() => setSelectedId(m.id)}
                className={`w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--muted)] transition-colors ${selectedId === m.id ? 'bg-[var(--secondary)]' : ''}`}>
                <Avatar name={m.customerName} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--foreground)] truncate">{m.customerName}</span>
                    {m.unread > 0 && <span className="w-4 h-4 bg-[var(--primary)] text-white text-[9px] font-bold rounded-full flex items-center justify-center flex-shrink-0">{m.unread}</span>}
                  </div>
                  <p className="text-[10px] text-[var(--muted-foreground)] truncate mt-0.5">{m.lastMessage}</p>
                  <Badge variant="secondary" className="mt-1 text-[9px]">{m.channel}</Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        {selected ? (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <Avatar name={selected.customerName} size="sm" />
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{selected.customerName}</p>
                <p className="text-xs text-[var(--muted-foreground)]">via {selected.channel}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selected.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-xs ${msg.from === 'admin' ? 'bg-[var(--primary)] text-white rounded-tr-sm' : 'bg-[var(--muted)] text-[var(--foreground)] rounded-tl-sm'}`}>
                    {msg.text}
                    <span className="block text-[10px] opacity-60 mt-0.5">{msg.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 p-3 border-t border-[var(--border)]">
              <Input placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()} />
              <Button onClick={sendMessage} icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>}>Send</Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[var(--muted-foreground)] text-sm">Select a conversation</div>
        )}
      </div>
    </div>
  );
}
