import { Search, CheckSquare, Square } from "lucide-react";
import type { TicketData, TicketStatus, TicketPriority } from "@/types/support";

interface TicketListProps {
  tickets: TicketData[];
  search: string;
  setSearch: (value: string) => void;
  filterStatus: TicketStatus | "all";
  setFilterStatus: (value: TicketStatus | "all") => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  setShowNew: (show: boolean) => void;
  statusConfig: Record<TicketStatus, { label: string; color: string; icon: React.ElementType }>;
  priorityColor: Record<TicketPriority, string>;
  isMobileHidden: boolean;
  selectedTickets?: string[];
  onToggleSelection?: (id: string) => void;
  showSelection?: boolean;
}

export const TicketList = ({
  tickets,
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  selectedId,
  setSelectedId,
  setShowNew,
  statusConfig,
  priorityColor,
  isMobileHidden,
  selectedTickets = [],
  onToggleSelection,
  showSelection = false,
}: TicketListProps) => {
  return (
    <div className={`${isMobileHidden ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-[380px] border-r border-border bg-card shrink-0 h-full`}>
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
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {(["all", "open", "in-progress", "resolved", "closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filterStatus === s
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto">
        {tickets.length === 0 && <p className="text-center text-muted-foreground text-sm py-10">No tickets found.</p>}
        {tickets.map((t) => {
          const sc = statusConfig[t.status];
          const isSelected = selectedTickets.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => {
                if (showSelection && onToggleSelection) {
                  onToggleSelection(t.id);
                } else {
                  setSelectedId(t.id);
                  setShowNew(false);
                }
              }}
              className={`w-full text-left px-4 py-3.5 border-b border-border hover:bg-muted/40 transition-colors ${
                selectedId === t.id ? "bg-accent/5 border-l-2 border-l-accent" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  {showSelection && (
                    <span onClick={(e) => { e.stopPropagation(); onToggleSelection?.(t.id); }}>
                      {isSelected ? <CheckSquare size={14} className="text-accent" /> : <Square size={14} className="text-muted-foreground" />}
                    </span>
                  )}
                  <span className="text-xs font-mono text-muted-foreground">{t.id}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityColor[t.priority]}`}>
                  {t.priority}
                </span>
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
  );
};
