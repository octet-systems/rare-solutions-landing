import { LayoutDashboard, Ticket, BarChart3, Settings, LogOut, Home } from "lucide-react";
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
    { id: "reports", icon: BarChart3, label: "Reports" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-primary flex flex-col shrink-0 hidden md:flex h-full">
      <div className="p-5 border-b border-primary-foreground/10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-heading font-bold text-xs">RS</span>
          </div>
          <span className="font-heading font-bold text-primary-foreground text-sm">
            Rare Solutions <span className="text-accent">MW</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSidebarNav(item.id);
              resetSelection();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              sidebarNav === item.id
                ? "bg-accent text-accent-foreground"
                : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
        
        <div className="pt-4 mt-4 border-t border-primary-foreground/10">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-primary-foreground/10 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent text-xs font-bold">MM</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary-foreground text-sm font-medium truncate">Mwai Mandula</p>
            <p className="text-primary-foreground/40 text-xs">Admin</p>
          </div>
          <Link to="/">
            <LogOut size={16} className="text-primary-foreground/40 hover:text-primary-foreground cursor-pointer" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
