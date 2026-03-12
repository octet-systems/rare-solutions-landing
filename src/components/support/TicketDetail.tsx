import { ArrowLeft, ChevronDown, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TicketData, TicketStatus } from "@/types/support";

interface TicketDetailProps {
  selected: TicketData | null;
  setSelectedId: (id: string | null) => void;
  statusConfig: Record<TicketStatus, { label: string; color: string; icon: React.ElementType }>;
  updateStatus: (id: string, status: TicketStatus) => void;
  reply: string;
  setReply: (reply: string) => void;
  handleSendReply: () => void;
}

export const TicketDetail = ({
  selected,
  setSelectedId,
  statusConfig,
  updateStatus,
  reply,
  setReply,
  handleSendReply,
}: TicketDetailProps) => {
  if (!selected) return null;

  return (
    <>
      {/* Detail header */}
      <div className="border-b border-border p-4 md:px-6 shrink-0">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3 lg:hidden"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-mono text-muted-foreground mb-1">
              {selected.id} · {selected.category}
            </p>
            <h2 className="font-heading font-bold text-foreground text-lg leading-snug">{selected.subject}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              by {selected.customer} · {selected.created}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs px-2 py-1 rounded-full border font-medium ${statusConfig[selected.status].color}`}
            >
              {statusConfig[selected.status].label}
            </span>
            <div className="relative group">
              <Button size="sm" variant="outline" className="rounded-full gap-1 text-xs">
                Status <ChevronDown size={14} />
              </Button>
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 w-36 hidden group-hover:block z-10">
                {(["open", "in-progress", "resolved", "closed"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted transition-colors"
                  >
                    {statusConfig[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 md:px-6 space-y-4">
        {selected.messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.role === "agent" ? "bg-accent/10 border border-accent/20" : "bg-muted border border-border"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-foreground">{msg.sender}</span>
                <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reply box */}
      <div className="border-t border-border p-3 md:px-6 shrink-0">
        <div className="flex items-end gap-2">
          <button className="p-2 text-muted-foreground hover:text-foreground">
            <Paperclip size={18} />
          </button>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendReply();
              }
            }}
            placeholder="Type your reply…"
            rows={1}
            className="flex-1 px-3 py-2 text-sm rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <Button
            size="icon"
            onClick={handleSendReply}
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shrink-0"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </>
  );
};
