import { useMemo, useState, type ElementType } from "react";
import {
  Search,
  Plus,
  ArrowLeft,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  Ticket,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Paperclip,
  MessageSquare,
  Menu,
  Bell,
  Server,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "tickets", icon: Ticket, label: "Tickets" },
  { id: "reports", icon: BarChart3, label: "Reports" },
  { id: "settings", icon: Settings, label: "Settings" },
] as const;

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
    messages: [{ id: "m6", sender: "Support Team", role: "agent", content: "Done! We've allocated 192.168.12.50–192.168.12.100 to your new wing subnet. Documentation sent to your email.", timestamp: "04:45 PM" }],
  },
];

const statusConfig: Record<TicketStatus, { label: string; color: string; icon: ElementType }> = {
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

const Support = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedId, setSelectedId] = useState<string | null>(initialTickets[0].id);
  const [reply, setReply] = useState("");
  const [filterStatus, setFilterStatus] = useState<TicketStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("Network");
  const [newPriority, setNewPriority] = useState<TicketPriority>("medium");
  const [newMessage, setNewMessage] = useState("");
  const [sidebarNav, setSidebarNav] = useState<(typeof navItems)[number]["id"]>("tickets");

  const selected = tickets.find((ticket) => ticket.id === selectedId) ?? null;

  const filtered = useMemo(
    () =>
      tickets.filter((ticket) => {
        if (filterStatus !== "all" && ticket.status !== filterStatus) return false;
        if (
          search &&
          !ticket.subject.toLowerCase().includes(search.toLowerCase()) &&
          !ticket.id.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }
        return true;
      }),
    [filterStatus, search, tickets],
  );

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved" || t.status === "closed").length,
  };

  const handleSendReply = () => {
    if (!reply.trim() || !selected) return;
    const msg: TicketMessage = {
      id: `m${Date.now()}`,
      sender: "You (Agent)",
      role: "agent",
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === selected.id
          ? {
              ...ticket,
              messages: [...ticket.messages, msg],
              updated: new Date().toLocaleString(),
              status: ticket.status === "open" ? "in-progress" : ticket.status,
            }
          : ticket,
      ),
    );
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
    setSelectedId(id);
    setShowNew(false);
    setNewSubject("");
    setNewMessage("");
    setNewPriority("medium");
    setSidebarNav("tickets");
  };

  const updateStatus = (id: string, status: TicketStatus) => {
    setTickets((prev) => prev.map((ticket) => (ticket.id === id ? { ...ticket, status, updated: new Date().toLocaleString() } : ticket)));
  };

  const switchView = (view: (typeof navItems)[number]["id"]) => {
    setSidebarNav(view);
    setShowNew(false);
    if (view !== "tickets") {
      setSelectedId(null);
    }
    setMobileNavOpen(false);
  };

  return (
    <div className="flex h-screen bg-background font-body">
      <aside className="w-64 bg-primary flex-col shrink-0 hidden md:flex">
        <div className="p-5 border-b border-primary-foreground/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-xs">RS</span>
            </div>
            <span className="font-heading font-bold text-primary-foreground text-sm">Rare Solutions <span className="text-accent">MW</span></span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => switchView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                sidebarNav === item.id ? "bg-accent text-accent-foreground" : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen((state) => !state)}>
              <Menu size={18} />
            </Button>
            <h1 className="font-heading font-bold text-foreground text-lg capitalize">{sidebarNav}</h1>
            <p className="hidden md:block text-xs text-muted-foreground">Prototype workspace · all views interactive</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full"><Bell size={16} /></Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full gap-1.5" onClick={() => { setShowNew(true); setSelectedId(null); setSidebarNav("tickets"); }}>
              <Plus size={16} /> New Ticket
            </Button>
          </div>
        </header>

        {mobileNavOpen && (
          <div className="md:hidden border-b border-border bg-card p-2 flex gap-2 overflow-x-auto">
            {navItems.map((item) => (
              <Button key={item.id} variant={sidebarNav === item.id ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => switchView(item.id)}>
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {sidebarNav === "dashboard" && (
          <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[{ label: "Total Tickets", value: stats.total, icon: Ticket }, { label: "Open", value: stats.open, icon: AlertCircle }, { label: "In Progress", value: stats.inProgress, icon: Clock }, { label: "Resolved", value: stats.resolved, icon: CheckCircle2 }].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border p-5 bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground text-xs uppercase">{stat.label}</span>
                    <stat.icon size={16} className="text-muted-foreground" />
                  </div>
                  <p className="text-3xl font-heading font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {tickets.slice(0, 4).map((ticket) => (
                  <button key={ticket.id} className="w-full flex items-center justify-between py-2 border-b border-border last:border-0 text-left" onClick={() => { setSelectedId(ticket.id); setSidebarNav("tickets"); }}>
                    <div>
                      <p className="text-sm font-medium">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground">{ticket.id} · {ticket.customer}</p>
                    </div>
                    <Badge variant="outline">{statusConfig[ticket.status].label}</Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {sidebarNav === "reports" && (
          <div className="flex-1 overflow-auto p-4 md:p-6 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Avg. First Response", value: "18 min", icon: MessageSquare },
                { label: "SLA Met", value: "96%", icon: ShieldCheck },
                { label: "Escalated", value: "2 this week", icon: AlertCircle },
              ].map((report) => (
                <div key={report.label} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{report.label}</p>
                    <report.icon size={16} className="text-accent" />
                  </div>
                  <p className="text-2xl font-heading font-bold mt-2">{report.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-heading text-lg font-semibold">Team Capacity Planner</h2>
              <p className="text-sm text-muted-foreground mt-1">Prototype report to estimate staffing and ticket load for next sprint.</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="rounded-lg border border-border p-4 bg-muted/20">
                  <p className="text-sm font-medium">Expected New Tickets</p>
                  <p className="text-3xl font-heading font-bold mt-2">42</p>
                </div>
                <div className="rounded-lg border border-border p-4 bg-muted/20">
                  <p className="text-sm font-medium">Recommended Engineers On Shift</p>
                  <p className="text-3xl font-heading font-bold mt-2">6</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {sidebarNav === "settings" && (
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="max-w-3xl rounded-xl border border-border bg-card p-6 space-y-5">
              <h2 className="font-heading text-xl font-semibold">Portal Settings</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 mb-2"><Server size={16} /> <p className="font-medium">Environment</p></div>
                  <p className="text-sm text-muted-foreground">Prototype mode · local mock data</p>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 mb-2"><SlidersHorizontal size={16} /> <p className="font-medium">Automation Rules</p></div>
                  <p className="text-sm text-muted-foreground">Auto-assign high priority tickets to on-call engineer.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-full">Save Preferences</Button>
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">Run Health Check</Button>
                <Button variant="ghost" className="rounded-full gap-2 text-muted-foreground"><LogOut size={14} /> Sign Out</Button>
              </div>
            </div>
          </div>
        )}

        {sidebarNav === "tickets" && (
          <div className="flex-1 flex min-h-0">
            <div className={`${selected || showNew ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[380px] border-r border-border bg-card shrink-0`}>
              <div className="p-3 border-b border-border space-y-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tickets…" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-input bg-background" />
                </div>
                <div className="flex gap-1 overflow-x-auto">
                  {(["all", "open", "in-progress", "resolved", "closed"] as const).map((status) => (
                    <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${filterStatus === status ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                      {status === "all" ? "All" : statusConfig[status].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                {filtered.length === 0 && <p className="text-center text-muted-foreground text-sm py-10">No tickets found.</p>}
                {filtered.map((ticket) => (
                  <button key={ticket.id} onClick={() => { setSelectedId(ticket.id); setShowNew(false); }} className={`w-full text-left px-4 py-3.5 border-b border-border hover:bg-muted/40 transition-colors ${selectedId === ticket.id ? "bg-accent/5 border-l-2 border-l-accent" : ""}`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityColor[ticket.priority]}`}>{ticket.priority}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground line-clamp-1 mb-1">{ticket.subject}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{ticket.customer}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${statusConfig[ticket.status].color}`}>{statusConfig[ticket.status].label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`${!selected && !showNew ? "hidden lg:flex" : "flex"} flex-1 flex-col min-w-0`}>
              {showNew && (
                <div className="flex-1 overflow-auto p-4 md:p-6">
                  <button onClick={() => setShowNew(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 lg:hidden"><ArrowLeft size={16} /> Back</button>
                  <h2 className="font-heading font-bold text-xl mb-6">Create New Ticket</h2>
                  <div className="max-w-lg space-y-4">
                    <input value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="Subject" className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background" />
                    <div className="grid grid-cols-2 gap-4">
                      <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background">
                        {["Network", "PBX / Telephony", "Maintenance", "IP Addressing"].map((category) => <option key={category} value={category}>{category}</option>)}
                      </select>
                      <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as TicketPriority)} className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background">
                        {["low", "medium", "high", "critical"].map((priority) => <option key={priority} value={priority} className="capitalize">{priority}</option>)}
                      </select>
                    </div>
                    <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} rows={5} placeholder="Describe the issue..." className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background resize-none" />
                    <Button onClick={handleCreateTicket} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6">Submit Ticket</Button>
                  </div>
                </div>
              )}

              {selected && !showNew && (
                <>
                  <div className="border-b border-border p-4 md:px-6 shrink-0">
                    <button onClick={() => setSelectedId(null)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3 lg:hidden"><ArrowLeft size={16} /> Back</button>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-mono text-muted-foreground mb-1">{selected.id} · {selected.category}</p>
                        <h2 className="font-heading font-bold text-lg leading-snug">{selected.subject}</h2>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-full gap-1 text-xs">
                            Status <ChevronDown size={14} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          {(["open", "in-progress", "resolved", "closed"] as const).map((status) => (
                            <DropdownMenuItem
                              key={status}
                              onClick={() => updateStatus(selected.id, status)}
                              className="justify-between"
                            >
                              {statusConfig[status].label}
                              {selected.status === status ? <CheckCircle2 size={14} className="text-accent" /> : null}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-4 md:px-6 space-y-4">
                    {selected.messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.role === "agent" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${msg.role === "agent" ? "bg-accent/10 border border-accent/20" : "bg-muted border border-border"}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold">{msg.sender}</span>
                            <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                          </div>
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border p-3 md:px-6 shrink-0">
                    <div className="flex items-end gap-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground"><Paperclip size={18} /></button>
                      <textarea value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendReply(); } }} placeholder="Type your reply…" rows={1} className="flex-1 px-3 py-2 text-sm rounded-xl border border-input bg-background resize-none" />
                      <Button size="icon" onClick={handleSendReply} className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shrink-0"><Send size={16} /></Button>
                    </div>
                  </div>
                </>
              )}

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
