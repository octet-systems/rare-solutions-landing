import { useState } from "react";
import {
  Search,
  Plus,
  ArrowLeft,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  LayoutDashboard,
  Ticket,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Paperclip,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ── Mock data ──────────────────────────────────────────────
type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "critical";

interface TicketMessage {
  id: string;
  sender: string;
  role: "customer" | "agent";
  content: string;
  timestamp: string;
}

interface TicketData {
  id: string;
  subject: string;
  customer: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  created: string;
  updated: string;
  messages: TicketMessage[];
}

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

  // ── Render ──
  return (
    <div className="flex h-screen bg-background font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-primary flex flex-col shrink-0 hidden md:flex">
        <div className="p-5 border-b border-primary-foreground/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-xs">RS</span>
            </div>
            <span className="font-heading font-bold text-primary-foreground text-sm">
              Rare Solutions <span className="text-accent">MW</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "tickets", icon: Ticket, label: "Tickets" },
            { id: "reports", icon: BarChart3, label: "Reports" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setSidebarNav(item.id); setSelectedId(null); setShowNew(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                sidebarNav === item.id ? "bg-accent text-accent-foreground" : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-xs font-bold">MM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-primary-foreground text-sm font-medium truncate">Mwai Mandula</p>
              <p className="text-primary-foreground/40 text-xs">Admin</p>
            </div>
            <LogOut size={16} className="text-primary-foreground/40 hover:text-primary-foreground cursor-pointer" />
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile brand */}
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

        {/* Dashboard view */}
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

        {/* Reports / Settings placeholder */}
        {(sidebarNav === "reports" || sidebarNav === "settings") && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto mb-3 opacity-30" />
              <p className="font-heading font-semibold text-lg">{sidebarNav === "reports" ? "Reports" : "Settings"}</p>
              <p className="text-sm mt-1">Coming soon — prototype view only.</p>
            </div>
          </div>
        )}

        {/* Tickets view */}
        {sidebarNav === "tickets" && (
          <div className="flex-1 flex min-h-0">
            {/* Ticket list */}
            <div className={`${selected || showNew ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[380px] border-r border-border bg-card shrink-0`}>
              {/* Search & filter */}
              <div className="p-3 border-b border-border space-y-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tickets…"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="flex gap-1 overflow-x-auto">
                  {(["all", "open", "in-progress", "resolved", "closed"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        filterStatus === s ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {s === "all" ? "All" : statusConfig[s].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-auto">
                {filtered.length === 0 && <p className="text-center text-muted-foreground text-sm py-10">No tickets found.</p>}
                {filtered.map((t) => {
                  const sc = statusConfig[t.status];
                  return (
                    <button
                      key={t.id}
                      onClick={() => { setSelectedId(t.id); setShowNew(false); }}
                      className={`w-full text-left px-4 py-3.5 border-b border-border hover:bg-muted/40 transition-colors ${selectedId === t.id ? "bg-accent/5 border-l-2 border-l-accent" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{t.id}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityColor[t.priority]}`}>{t.priority}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground line-clamp-1 mb-1">{t.subject}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{t.customer}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${sc.color}`}>{sc.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail / New ticket panel */}
            <div className={`${!selected && !showNew ? "hidden lg:flex" : "flex"} flex-1 flex-col min-w-0`}>
              {/* New ticket form */}
              {showNew && (
                <div className="flex-1 overflow-auto p-4 md:p-6">
                  <button onClick={() => setShowNew(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 lg:hidden">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <h2 className="font-heading font-bold text-xl text-foreground mb-6">Create New Ticket</h2>
                  <div className="max-w-lg space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Subject</label>
                      <input value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="Brief description of the issue" className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1.5">Category</label>
                        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                          {["Network", "PBX / Telephony", "IP Addressing", "Hardware", "Maintenance", "Other"].map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1.5">Priority</label>
                        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as TicketPriority)} className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                          {(["low", "medium", "high", "critical"] as const).map((p) => <option key={p} value={p} className="capitalize">{p}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Description</label>
                      <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} rows={5} placeholder="Describe the issue in detail…" className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                    </div>
                    <Button onClick={handleCreateTicket} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6">Submit Ticket</Button>
                  </div>
                </div>
              )}

              {/* Ticket detail */}
              {selected && !showNew && (
                <>
                  {/* Detail header */}
                  <div className="border-b border-border p-4 md:px-6 shrink-0">
                    <button onClick={() => setSelectedId(null)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3 lg:hidden">
                      <ArrowLeft size={16} /> Back
                    </button>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-muted-foreground mb-1">{selected.id} · {selected.category}</p>
                        <h2 className="font-heading font-bold text-foreground text-lg leading-snug">{selected.subject}</h2>
                        <p className="text-xs text-muted-foreground mt-1">by {selected.customer} · {selected.created}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusConfig[selected.status].color}`}>{statusConfig[selected.status].label}</span>
                        <div className="relative group">
                          <Button size="sm" variant="outline" className="rounded-full gap-1 text-xs">
                            Status <ChevronDown size={14} />
                          </Button>
                          <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 w-36 hidden group-hover:block z-10">
                            {(["open", "in-progress", "resolved", "closed"] as const).map((s) => (
                              <button key={s} onClick={() => updateStatus(selected.id, s)} className="w-full text-left px-3 py-1.5 text-sm hover:bg-muted transition-colors">{statusConfig[s].label}</button>
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
                        <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                          msg.role === "agent" ? "bg-accent/10 border border-accent/20" : "bg-muted border border-border"
                        }`}>
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
                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendReply(); } }}
                        placeholder="Type your reply…"
                        rows={1}
                        className="flex-1 px-3 py-2 text-sm rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      />
                      <Button size="icon" onClick={handleSendReply} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shrink-0">
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Empty state */}
              {!selected && !showNew && (
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
  );
};

export default Support;
