import { useState, useRef } from "react";
import { ArrowLeft, ChevronDown, Paperclip, Send, Clock, MessageSquare, ShieldAlert, FileText, Download, Upload, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TicketData, TicketStatus } from "@/types/support";

interface TicketDetailProps {
  selected: TicketData | null;
  setSelectedId: (id: string | null) => void;
  statusConfig: Record<TicketStatus, { label: string; color: string; icon: React.ElementType }>;
  updateStatus: (id: string, status: TicketStatus) => void;
  reply: string;
  setReply: (reply: string) => void;
  handleSendReply: (isInternal?: boolean) => void;
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
  const [activeTab, setActiveTab] = useState<"messages" | "activity">("messages");
  const [isInternalMode, setIsInternalMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      setTimeout(() => setIsUploading(false), 1500);
    }
  };

  if (!selected) return null;

  return (
    <div className="flex flex-col h-full bg-card">
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
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-muted-foreground">
                {selected.id} · {selected.category}
              </span>
              {selected.slaDue && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                  new Date(selected.slaDue) < new Date() ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
                }`}>
                  SLA: {selected.slaDue}
                </span>
              )}
            </div>
            <h2 className="font-heading font-bold text-foreground text-lg leading-snug">{selected.subject}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              by {selected.customer} · {selected.created}
            </p>
            {(selected.assignedTo || selected.assignedTeam) && (
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-700 border-blue-200">
                  <UserPlus size={10} className="mr-1" />
                  {selected.assignedTeam || "Assigned"}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs px-2 py-1 rounded-full border font-medium ${statusConfig[selected.status].color}`}
            >
              {statusConfig[selected.status].label}
            </span>
            <div className="relative group">
              <Button size="sm" variant="outline" className="rounded-full gap-1 text-xs h-8">
                Status <ChevronDown size={14} />
              </Button>
              <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 w-36 hidden group-hover:block z-20">
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

        {/* Tabs */}
        <div className="flex items-center gap-6 mt-6 border-b border-transparent">
          <button 
            onClick={() => setActiveTab("messages")}
            className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === "messages" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            Messages
            {activeTab === "messages" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
          <button 
            onClick={() => setActiveTab("activity")}
            className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === "activity" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            Activity Log
            {activeTab === "activity" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto p-4 md:px-6">
        {activeTab === "messages" ? (
          <div className="space-y-6">
            {selected.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.isInternal 
                      ? "bg-amber-500/5 border border-amber-500/20" 
                      : msg.role === "agent" 
                        ? "bg-accent/5 border border-accent/10" 
                        : "bg-muted/50 border border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">{msg.sender}</span>
                      {msg.isInternal && (
                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-tighter bg-amber-500/20 text-amber-700 px-1.5 py-0.5 rounded">
                          <ShieldAlert size={10} /> Internal Note
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {/* Attachments display */}
            {selected.attachments && selected.attachments.length > 0 && (
              <div className="mt-8 pt-4 border-t border-border/50">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Paperclip size={14} /> Attachments ({selected.attachments.length})
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selected.attachments.map((file, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 border border-border rounded-xl group hover:bg-muted transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded bg-background flex items-center justify-center">
                        <FileText size={16} className="text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground truncate max-w-[120px]">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">{file.size}</p>
                      </div>
                      <Download size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-2">
            {selected.activities?.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0 ring-4 ring-accent/10" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    by {activity.actor} · {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {(!selected.activities || selected.activities.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <Clock size={32} className="mx-auto mb-2 opacity-20" />
                <p className="text-sm">No activity recorded for this ticket.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reply box */}
      <div className="border-t border-border p-3 md:px-6 shrink-0 bg-background/50 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-4">
          <button 
            onClick={() => setIsInternalMode(false)}
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${!isInternalMode ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            Public Reply
          </button>
          <button 
            onClick={() => setIsInternalMode(true)}
            className={`text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${isInternalMode ? "text-amber-600" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ShieldAlert size={12} /> Internal Note
          </button>
        </div>
        
        <div className={`rounded-2xl border transition-all ${isInternalMode ? "bg-amber-500/5 border-amber-500/20" : "bg-card border-input focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent"}`}>
          <div className="flex items-end gap-2 p-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileChange}
            />
            <button 
              onClick={handleFileUpload}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Attach files"
            >
              {isUploading ? <Upload size={18} className="animate-pulse text-accent" /> : <Paperclip size={18} />}
            </button>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendReply(isInternalMode);
                }
              }}
              placeholder={isInternalMode ? "Type a private note only agents can see..." : "Type your reply to the customer..."}
              rows={2}
              className="flex-1 px-3 py-2 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
            />
            <Button
              size="icon"
              onClick={() => handleSendReply(isInternalMode)}
              className={`rounded-xl shrink-0 transition-colors ${isInternalMode ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-accent text-accent-foreground hover:bg-accent/90"}`}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground text-center italic">
          {isInternalMode ? "Visible only to staff members." : "The customer will be notified of this reply."}
        </p>
      </div>
    </div>
  );
};
