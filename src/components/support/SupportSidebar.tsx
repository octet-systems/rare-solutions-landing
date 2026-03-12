import { LayoutDashboard, Ticket, BarChart3, Settings, LogOut, Home, BookOpen, Users, Zap, Link2 } from "lucide-react";
import { Link } from "react-router-dom";

interface SupportSidebarProps {
  sidebarNav: string;
  setSidebarNav: (nav: string) => void;
  resetSelection: () => void;
}

export const SupportSidebar = ({ sidebarNav, setSidebarNav, resetSelection }: SupportSidebarProps) => {
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "tickets", icon: Ticket, label: "Tickets" },
    { id: "knowledge-base", icon: BookOpen, label: "Knowledge Base" },
    { id: "users", icon: Users, label: "User Management" },
    { id: "reports", icon: BarChart3, label: "Reports & Analytics" },
  ];

  const configItems = [
    { id: "automation", icon: Zap, label: "Automation" },
    { id: "integrations", icon: Link2, label: "Integrations" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-72 bg-primary flex flex-col shrink-0 hidden md:flex h-full border-r border-white/5">
      <div className="p-8 pb-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-accent-foreground font-heading font-bold text-base tracking-tighter">RS</span>
          </div>
          <span className="font-heading font-bold text-white text-lg tracking-tight">
            Rare Solutions <span className="text-accent">MW</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
        <div>
          <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Core</p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSidebarNav(item.id);
                  resetSelection();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  sidebarNav === item.id
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="px-4 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Configuration</p>
          <div className="space-y-1">
            {configItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSidebarNav(item.id);
                  resetSelection();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  sidebarNav === item.id
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/5 mb-8">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="p-6 border-t border-white/5 mt-auto bg-primary">
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
            <span className="text-accent text-sm font-bold">MM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold truncate tracking-tight">Mwai Mandula</p>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Administrator</p>
          </div>
          <Link to="/">
            <LogOut size={16} className="text-white/30 hover:text-white transition-colors cursor-pointer" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
