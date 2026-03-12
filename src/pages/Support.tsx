import { useState } from "react";
import {
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Ticket,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportSidebar } from "@/components/support/SupportSidebar";
import { TicketList } from "@/components/support/TicketList";
import { TicketDetail } from "@/components/support/TicketDetail";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import type { TicketStatus, TicketPriority, TicketData, TicketMessage } from "@/types/support";

// ── Mock data ──────────────────────────────────────────────
const initialTickets: TicketData[] = [
  {
    id: "TK-1024",
    subject: "Network switch not responding after firmware update",
    customer: "ABC Trading Ltd",
    status: "open",
    priority: "high",
    category: "Network",
    created: "2025-06-02 09:15",
    updated: "2025-06-02 10:30",
    messages: [
      { id: "m1", sender: "James Phiri", role: "customer", content: "Hi, our Cisco switch on the 3rd floor stopped responding after we applied the latest firmware update last night. All connected devices lost connectivity.", timestamp: "09:15 AM" },
      { id: "m2", sender: "Support Team", role: "agent", content: "Thank you for reporting this. Can you confirm the switch model number and the firmware version you applied? We'll arrange an on-site visit if needed.", timestamp: "09:45 AM" },
      { id: "m3", sender: "James Phiri", role: "customer", content: "It's a Cisco SG350-28, firmware was updated to v2.5.9.15. The power LED is solid green but all port LEDs are off.", timestamp: "10:30 AM" },
    ],
  },
  {
    id: "TK-1023",
    subject: "PBX system dropping calls intermittently",
    customer: "MK Hospital",
    status: "in-progress",
    priority: "critical",
    category: "PBX / Telephony",
    created: "2025-06-01 14:20",
    updated: "2025-06-02 08:00",
    messages: [
      { id: "m4", sender: "Grace Banda", role: "customer", content: "Our PBX has been dropping calls mid-conversation. It's affecting patient appointments and emergency line.", timestamp: "02:20 PM" },
      { id: "m5", sender: "Mwai Mandula", role: "agent", content: "This is critical — I'm personally looking into it. We'll run diagnostics on the trunk lines and SIP configuration. Expect an update within 2 hours.", timestamp: "03:00 PM" },
    ],
  },
  {
    id: "TK-1022",
    subject: "New office IP address allocation request",
    customer: "FinServe Malawi",
    status: "resolved",
    priority: "medium",
    category: "IP Addressing",
    created: "2025-05-30 11:00",
    updated: "2025-06-01 16:45",
    messages: [
      { id: "m6", sender: "Chimwemwe Nkhoma", role: "customer", content: "We're expanding to a new wing and need 50 additional static IPs allocated to our subnet.", timestamp: "11:00 AM" },
      { id: "m7", sender: "Support Team", role: "agent", content: "Done! We've allocated 192.168.12.50–192.168.12.100 to your new wing subnet. Documentation sent to your email.", timestamp: "04:45 PM" },
    ],
  },
  {
    id: "TK-1021",
    subject: "Monthly maintenance check — Lilongwe HQ",
    customer: "Rare Solutions MW",
    status: "closed",
    priority: "low",
    category: "Maintenance",
    created: "2025-05-28 08:00",
    updated: "2025-05-29 17:00",
    messages: [
      { id: "m8", sender: "System", role: "agent", content: "Scheduled maintenance completed. All systems nominal. Report attached.", timestamp: "05:00 PM" },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────
const statusConfig: Record<TicketStatus, { label: string; color: string; icon: React.ElementType }> = {
  open: { label: "Open", color: "bg-blue-500/15 text-blue-700 border-blue-200", icon: AlertCircle },
  "in-progress": { label: "In Progress", color: "bg-accent/15 text-accent-foreground border-accent/30", icon: Clock },
  resolved: { label: "Resolved", color: "bg-emerald-500/15 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  closed: { label: "Closed", color: "bg-muted text-muted-foreground border-border", icon: CheckCircle2 },
};

const priorityColor: Record<TicketPriority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-blue-500/15 text-blue-700",
  high: "bg-orange-500/15 text-orange-700",
  critical: "bg-destructive/15 text-destructive",
};

// ── Component ──────────────────────────────────────────────
const Support = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [filterStatus, setFilterStatus] = useState<TicketStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("Network");
  const [newPriority, setNewPriority] = useState<TicketPriority>("medium");
  const [newMessage, setNewMessage] = useState("");
  const [sidebarNav, setSidebarNav] = useState("tickets");

  const selected = tickets.find((t) => t.id === selectedId) ?? null;

  const filtered = tickets.filter((t) => {
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    if (search && !t.subject.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSendReply = () => {
    if (!reply.trim() || !selected) return;
    const msg: TicketMessage = { id: `m${Date.now()}`, sender: "You (Agent)", role: "agent", content: reply, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setTickets((prev) => prev.map((t) => (t.id === selected.id ? { ...t, messages: [...t.messages, msg], updated: new Date().toLocaleString(), status: t.status === "open" ? "in-progress" : t.status } : t)));
    setReply("");
  };

  const handleCreateTicket = () => {
    if (!newSubject.trim() || !newMessage.trim()) return;
    const id = `TK-${1025 + tickets.length}`;
    const now = new Date().toLocaleString();
    const ticket: TicketData = {
      id,
      subject: newSubject,
      customer: "Walk-in Client",
      status: "open",
      priority: newPriority,
      category: newCategory,
      created: now,
      updated: now,
      messages: [{ id: `m${Date.now()}`, sender: "Walk-in Client", role: "customer", content: newMessage, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }],
    };
    setTickets((prev) => [ticket, ...prev]);
    setNewSubject("");
    setNewMessage("");
    setNewPriority("medium");
    setShowNew(false);
    setSelectedId(id);
  };

  const updateStatus = (id: string, status: TicketStatus) => setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status, updated: new Date().toLocaleString() } : t)));

  // ── Stats ──
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved" || t.status === "closed").length,
  };

  return (
    <div className="flex h-screen bg-background font-body overflow-hidden">
      <SupportSidebar 
        sidebarNav={sidebarNav} 
        setSidebarNav={setSidebarNav}
        resetSelection={() => {
          setSelectedId(null);
          setShowNew(false);
        }}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile brand - shown only when sidebar is hidden */}
            <div className="md:hidden flex items-center gap-2 mr-2">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-[10px]">RS</span>
              </div>
            </div>
            <h1 className="font-heading font-bold text-foreground text-lg capitalize">{sidebarNav}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full gap-1.5" onClick={() => { setShowNew(true); setSelectedId(null); setSidebarNav("tickets"); }}>
              <Plus size={16} /> New Ticket
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {sidebarNav === "dashboard" && (
            <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Tickets", value: stats.total, icon: Ticket, accent: false },
                  { label: "Open", value: stats.open, icon: AlertCircle, accent: false },
                  { label: "In Progress", value: stats.inProgress, icon: Clock, accent: true },
                  { label: "Resolved", value: stats.resolved, icon: CheckCircle2, accent: false },
                ].map((s) => (
                  <div key={s.label} className={`rounded-xl border border-border p-5 ${s.accent ? "bg-accent/5 border-accent/20" : "bg-card"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{s.label}</span>
                      <s.icon size={18} className={s.accent ? "text-accent" : "text-muted-foreground"} />
                    </div>
                    <p className="text-3xl font-heading font-bold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {tickets.slice(0, 4).map((t) => {
                    const sc = statusConfig[t.status];
                    return (
                      <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 -mx-2 px-2 rounded" onClick={() => { setSelectedId(t.id); setSidebarNav("tickets"); }}>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{t.subject}</p>
                          <p className="text-xs text-muted-foreground">{t.id} · {t.customer}</p>
                        </div>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium shrink-0 ml-3 ${sc.color}`}>{sc.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {(sidebarNav === "reports" || sidebarNav === "settings") && (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3 size={48} className="mx-auto mb-3 opacity-30" />
                <p className="font-heading font-semibold text-lg capitalize">{sidebarNav}</p>
                <p className="text-sm mt-1">Coming soon — prototype view only.</p>
              </div>
            </div>
          )}

          {sidebarNav === "tickets" && (
            <div className="flex-1 flex min-h-0">
              <TicketList 
                tickets={filtered}
                search={search}
                setSearch={setSearch}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setShowNew={setShowNew}
                statusConfig={statusConfig}
                priorityColor={priorityColor}
                isMobileHidden={!!selected || showNew}
              />

              {/* Detail / New ticket panel */}
              <div className={`${!selected && !showNew ? "hidden lg:flex" : "flex"} flex-1 flex-col min-w-0`}>
                {showNew ? (
                  <NewTicketForm 
                    setShowNew={setShowNew}
                    newSubject={newSubject}
                    setNewSubject={setNewSubject}
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    newPriority={newPriority}
                    setNewPriority={setNewPriority}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleCreateTicket={handleCreateTicket}
                  />
                ) : selected ? (
                  <TicketDetail 
                    selected={selected}
                    setSelectedId={setSelectedId}
                    statusConfig={statusConfig}
                    updateStatus={updateStatus}
                    reply={reply}
                    setReply={setReply}
                    handleSendReply={handleSendReply}
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MessageSquare size={48} className="mx-auto mb-3 opacity-20" />
                      <p className="font-heading font-semibold">Select a ticket</p>
                      <p className="text-sm mt-1">Choose a ticket from the list to view details.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
