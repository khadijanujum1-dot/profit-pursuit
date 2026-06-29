import React from "react";
import { Store } from "@/lib/store";
import { Trash2, Mail, Check } from "lucide-react";
import { useMessages } from "@/hooks/useStore";
import { toast } from "sonner";

export default function MessagesInbox() {
  const messages = useMessages();

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await Store.deleteMessage(id); toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await Store.markMessageRead(id);
    } catch {
      toast.error("Failed to mark message as read");
    }
  };

  return (
    <div>
      <h3 className="font-heading text-xl text-white font-semibold mb-4">Messages Inbox</h3>
      {messages.length === 0 ? (
        <p className="text-white/30 text-sm text-center py-8">No messages yet.</p>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`bg-black/30 border px-4 py-3 ${msg.read ? "border-gold/5" : "border-gold/15"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm font-semibold">{msg.name}</span>
                    {!msg.read && <span className="bg-gold/20 text-gold text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded">New</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gold/50 mb-1">
                    <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-gold"><Mail size={11} /> {msg.email}</a>
                    <span>·</span>
                    <span>{new Date(msg.created_date).toLocaleDateString()}</span>
                  </div>
                  <span className="text-gold/60 text-xs tracking-wider uppercase">{msg.subject}</span>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed">{msg.message}</p>
                </div>
                <div className="flex flex-col gap-1">
                  {!msg.read && (
                    <button onClick={() => handleMarkRead(msg.id)} className="text-white/40 hover:text-emerald-400 p-1" title="Mark as read"><Check size={14} /></button>
                  )}
                  <button onClick={() => handleDelete(msg.id)} className="text-white/40 hover:text-red-400 p-1"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}