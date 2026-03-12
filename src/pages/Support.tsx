import { useState } from "react";
import { useParams, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Ticket,
  BarChart3,
  MessageSquare,
  BookOpen,
  Users,
  Settings,
  Zap,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportSidebar } from "@/components/support/SupportSidebar";
import { TicketList } from "@/components/support/TicketList";
import { TicketDetail } from "@/components/support/TicketDetail";
import { NewTicketForm } from "@/components/support/NewTicketForm";
import { Reports } from "@/components/support/Reports";
import { Settings as SettingsPanel } from "@/components/support/Settings";
import { Automation } from "@/components/support/Automation";
import { Integrations } from "@/components/support/Integrations";
import { UserManagement } from "@/components/support/UserManagement";
import { KnowledgeBaseFull, KBArticleDetailView } from "@/components/support/KnowledgeBaseFull";
import { TicketOperations } from "@/components/support/TicketOperations";
import type { TicketStatus, TicketPriority, TicketData, TicketMessage, TicketActivity, KnowledgeBaseArticle } from "@/types/support";

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
    slaDue: "2025-06-02 13:15", // 4 hours after creation
    attachments: [
      { name: "switch_logs.txt", size: "45 KB", type: "text/plain" },
    ],
    messages: [
      { id: "m1", sender: "James Phiri", role: "customer", content: "Hi, our Cisco switch on the 3rd floor stopped responding after we applied the latest firmware update last night. All connected devices lost connectivity.", timestamp: "09:15 AM" },
      { id: "m2", sender: "Support Team", role: "agent", content: "Thank you for reporting this. Can you confirm the switch model number and the firmware version you applied? We'll arrange an on-site visit if needed.", timestamp: "09:45 AM" },
      { id: "m-internal-1", sender: "Agent Mwai", role: "agent", content: "This looks like a failed flash. We should check if we have a replacement unit in the warehouse.", timestamp: "10:00 AM", isInternal: true },
      { id: "m3", sender: "James Phiri", role: "customer", content: "It's a Cisco SG350-28, firmware was updated to v2.5.9.15. The power LED is solid green but all port LEDs are off.", timestamp: "10:30 AM" },
    ],
    activities: [
      { id: "a1", action: "Ticket Created", actor: "James Phiri", timestamp: "09:15 AM" },
      { id: "a2", action: "Status changed to Open", actor: "System", timestamp: "09:15 AM" },
      { id: "a3", action: "Assigned to Network Team", actor: "System", timestamp: "09:20 AM" },
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
    slaDue: "2025-06-01 16:20", // Past due
    messages: [
      { id: "m4", sender: "Grace Banda", role: "customer", content: "Our PBX has been dropping calls mid-conversation. It's affecting patient appointments and emergency line.", timestamp: "02:20 PM" },
      { id: "m5", sender: "Mwai Mandula", role: "agent", content: "This is critical — I'm personally looking into it. We'll run diagnostics on the trunk lines and SIP configuration. Expect an update within 2 hours.", timestamp: "03:00 PM" },
    ],
    activities: [
      { id: "a4", action: "Ticket Created", actor: "Grace Banda", timestamp: "02:20 PM" },
      { id: "a5", action: "Status changed to In Progress", actor: "Mwai Mandula", timestamp: "03:00 PM" },
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

const kbArticles: KnowledgeBaseArticle[] = [
  { id: "KB-1", title: "Configuring VLANs on Cisco SG-Series", excerpt: "A guide on how to segment your network using Cisco SG-series managed switches.", category: "Networking", author: "Mwai Mandula", createdAt: "2025-01-15", updatedAt: "2025-05-20", views: 245, helpful: 18, tags: ["cisco", "vlan", "networking"] },
  { id: "KB-2", title: "PBX Quick Start Guide for New Staff", excerpt: "Essential call handling features for office staff using our PBX solutions.", category: "Telephony", author: "Chimwemwe Nkhoma", createdAt: "2025-02-01", updatedAt: "2025-04-10", views: 189, helpful: 12, tags: ["pbx", " telephony", "quickstart"] },
  { id: "KB-3", title: "Common IP Addressing Best Practices", excerpt: "Learn how to structure your internal IP allocation to avoid conflicts.", category: "Infrastructure", author: "Grace Banda", createdAt: "2025-01-20", updatedAt: "2025-03-15", views: 156, helpful: 9, tags: ["ip", "subnet", "infrastructure"] },
  { id: "KB-4", title: "Troubleshooting Intermittent SIP Drops", excerpt: "Step-by-step checklist for diagnosing VoIP call stability issues.", category: "Telephony", author: "Mwai Mandula", createdAt: "2025-03-05", updatedAt: "2025-05-01", views: 312, helpful: 24, tags: ["sip", "voip", "troubleshooting"] },
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
  const navigate = useNavigate();
  const location = useLocation();
  const { "*": section } = useParams();
  
  const sectionKey = section || "tickets";
  
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
  const [kbSearch, setKbSearch] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeBaseArticle | null>(null);

  const sidebarNav = sectionKey;

  const setSidebarNav = (nav: string) => {
    navigate(`/dashboard/${nav === "tickets" ? "" : nav}`);
  };

  const selected = tickets.find((t) => t.id === selectedId) ?? null;

  const filtered = tickets.filter((t) => {
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    if (search && !t.subject.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filteredKb = kbArticles.filter(a => 
    a.title.toLowerCase().includes(kbSearch.toLowerCase()) || 
    a.category.toLowerCase().includes(kbSearch.toLowerCase())
  );

  const toggleTicketSelection = (id: string) => {
    setSelectedTickets(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleMerge = (targetId: string, sourceIds: string[]) => {
    const sourceTickets = tickets.filter(t => sourceIds.includes(t.id));
    const targetTicket = tickets.find(t => t.id === targetId);
    if (!targetTicket) return;
    
    const mergedMessages = [...targetTicket.messages];
    sourceTickets.forEach(t => {
      mergedMessages.push(...t.messages);
    });
    
    const activity: TicketActivity = {
      id: `a${Date.now()}`,
      action: `Merged ${sourceIds.length} ticket(s)`,
      actor: "Mwai Mandula",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    
    setTickets(prev => prev.map(t => {
      if (t.id === targetId) {
        return { 
          ...t, 
          messages: mergedMessages, 
          activities: [...(t.activities || []), activity],
          updated: new Date().toLocaleString()
        };
      }
      return t;
    }).filter(t => !sourceIds.includes(t.id)));
  };

  const handleBulkAction = (action: string, ticketIds: string[]) => {
    const [actionType, actionValue] = action.split(":");
    
    setTickets(prev => prev.map(t => {
      if (!ticketIds.includes(t.id)) return t;
      
      const activity: TicketActivity = {
        id: `a${Date.now()}`,
        action: `Bulk: ${action}`,
        actor: "Mwai Mandula",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      
      return {
        ...t,
        status: actionType === "status" ? actionValue as TicketStatus : t.status,
        priority: actionType === "priority" ? actionValue as TicketPriority : t.priority,
        activities: [...(t.activities || []), activity],
        updated: new Date().toLocaleString()
      };
    }));
  };

  const handleAssignTicket = (ticketId: string, agentId: string, teamId?: string) => {
    const activity: TicketActivity = {
      id: `a${Date.now()}`,
      action: teamId ? `Assigned to ${teamId}` : `Assigned to agent`,
      actor: "Mwai Mandula",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setTickets(prev => prev.map(t => t.id === ticketId ? {
      ...t,
      assignedTo: agentId,
      assignedTeam: teamId,
      activities: [...(t.activities || []), activity],
      updated: new Date().toLocaleString()
    } : t));
  };

  const handleSendReply = (isInternal = false) => {
    if (!reply.trim() || !selected) return;
    const msg: TicketMessage = { 
      id: `m${Date.now()}`, 
      sender: isInternal ? "Mwai Mandula (Internal)" : "Mwai Mandula", 
      role: "agent", 
      content: reply, 
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isInternal
    };

    const activity: TicketActivity = {
      id: `a${Date.now()}`,
      action: isInternal ? "Added Internal Note" : "Sent Reply",
      actor: "Mwai Mandula",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setTickets((prev) => prev.map((t) => (t.id === selected.id ? { 
      ...t, 
      messages: [...t.messages, msg], 
      activities: [...(t.activities || []), activity],
      updated: new Date().toLocaleString(), 
      status: (!isInternal && t.status === "open") ? "in-progress" : t.status 
    } : t)));
    setReply("");
  };

  const handleCreateTicket = () => {
    if (!newSubject.trim() || !newMessage.trim()) return;
    const id = `TK-${1025 + tickets.length}`;
    const now = new Date().toLocaleString();
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const ticket: TicketData = {
      id,
      subject: newSubject,
      customer: "Walk-in Client",
      status: "open",
      priority: newPriority,
      category: newCategory,
      created: now,
      updated: now,
      slaDue: new Date(Date.now() + 14400000).toLocaleString(), // 4h SLA
      messages: [{ id: `m${Date.now()}`, sender: "Walk-in Client", role: "customer", content: newMessage, timestamp: time }],
      activities: [
        { id: `a${Date.now()}-1`, action: "Ticket Created", actor: "Walk-in Client", timestamp: time },
        { id: `a${Date.now()}-2`, action: "SLA timer started (4h)", actor: "System", timestamp: time },
      ],
    };
    setTickets((prev) => [ticket, ...prev]);
    setNewSubject("");
    setNewMessage("");
    setNewPriority("medium");
    setShowNew(false);
    setSelectedId(id);
  };

  const updateStatus = (id: string, status: TicketStatus) => {
    const activity: TicketActivity = {
      id: `a${Date.now()}`,
      action: `Status changed to ${status}`,
      actor: "Mwai Mandula",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status, updated: new Date().toLocaleString(), activities: [...(t.activities || []), activity] } : t)));
  };

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
        <header className="h-20 border-b border-border bg-white flex items-center justify-between px-6 lg:px-10 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile brand */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-accent font-bold text-xs">RS</span>
              </div>
            </div>
            <h1 className="font-heading font-bold text-primary text-2xl capitalize tracking-tight">{sidebarNav.replace("-", " ")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-gold-light rounded-full px-6 h-10 font-bold gap-2 shadow-lg shadow-accent/10 transition-all active:scale-95" onClick={() => { setShowNew(true); setSelectedId(null); setSidebarNav("tickets"); }}>
              <Plus size={18} /> Create Ticket
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50">
          {sidebarNav === "dashboard" && (
            <div className="flex-1 overflow-auto p-6 lg:p-10 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Tickets", value: stats.total, icon: Ticket, accent: false, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Open Issues", value: stats.open, icon: AlertCircle, accent: false, color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "In Progress", value: stats.inProgress, icon: Clock, accent: true, color: "text-accent", bg: "bg-accent/10" },
                  { label: "Resolved", value: stats.resolved, icon: CheckCircle2, accent: false, color: "text-emerald-600", bg: "bg-emerald-50" },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <s.icon size={22} />
                      </div>
                      <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
                    </div>
                    <p className="text-4xl font-heading font-bold text-primary tracking-tighter">{s.value}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-heading font-bold text-primary text-xl flex items-center gap-3 tracking-tight">
                      <Clock size={20} className="text-accent" /> Recent Activity
                    </h3>
                    <Button variant="ghost" size="sm" className="text-accent font-bold text-xs" onClick={() => setSidebarNav("tickets")}>
                      View All
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {tickets.slice(0, 5).map((t) => {
                      const sc = statusConfig[t.status];
                      return (
                        <div key={t.id} className="flex items-center justify-between p-4 border-b border-border last:border-0 cursor-pointer hover:bg-slate-50 -mx-4 px-8 transition-colors" onClick={() => { setSelectedId(t.id); setSidebarNav("tickets"); }}>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-primary truncate tracking-tight">{t.subject}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t.id} · {t.customer} · <span className="font-medium">{t.updated}</span></p>
                          </div>
                          <span className={`text-[10px] px-3 py-1 rounded-full border font-bold uppercase tracking-wider shrink-0 ml-4 ${sc.color}`}>{sc.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-border p-8 shadow-sm flex flex-col">
                  <h3 className="font-heading font-bold text-primary text-xl mb-8 flex items-center gap-3 tracking-tight">
                    <BookOpen size={20} className="text-accent" /> Knowledge Base
                  </h3>
                  <div className="space-y-6 flex-1">
                    {kbArticles.slice(0, 3).map((a) => (
                      <div key={a.id} className="block group cursor-pointer" onClick={() => setSidebarNav("knowledge-base")}>
                        <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-1">{a.category}</span>
                        <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors tracking-tight leading-snug">{a.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{a.excerpt}</p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-8 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-xs h-12 rounded-xl transition-all" onClick={() => setSidebarNav("knowledge-base")}>
                    Browse Help Articles
                  </Button>
                </div>
              </div>
            </div>
          )}

          {(sidebarNav === "reports" || sidebarNav === "settings") && (
            sidebarNav === "reports" ? (
              <Reports />
            ) : (
              <SettingsPanel />
            )
          )}

          {sidebarNav === "users" && (
            <UserManagement />
          )}

          {sidebarNav === "automation" && (
            <Automation />
          )}

          {sidebarNav === "integrations" && (
            <Integrations />
          )}

          {sidebarNav === "knowledge-base" && (
            selectedArticle ? (
              <KBArticleDetailView 
                article={selectedArticle} 
                onBack={() => setSelectedArticle(null)} 
              />
            ) : (
              <KnowledgeBaseFull 
                articles={kbArticles} 
                onSelectArticle={setSelectedArticle}
              />
            )
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
                selectedTickets={selectedTickets}
                onToggleSelection={toggleTicketSelection}
                showSelection={selectedTickets.length > 0}
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

              <TicketOperations 
                selectedTickets={selectedTickets}
                allTickets={tickets}
                onMerge={handleMerge}
                onDuplicate={() => {}}
                onBulkAction={handleBulkAction}
                onClearSelection={() => setSelectedTickets([])}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
