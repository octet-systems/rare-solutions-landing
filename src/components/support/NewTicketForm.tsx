import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TicketPriority } from "@/types/support";

interface NewTicketFormProps {
  setShowNew: (show: boolean) => void;
  newSubject: string;
  setNewSubject: (value: string) => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
  newPriority: TicketPriority;
  setNewPriority: (value: TicketPriority) => void;
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleCreateTicket: () => void;
}

export const NewTicketForm = ({
  setShowNew,
  newSubject,
  setNewSubject,
  newCategory,
  setNewCategory,
  newPriority,
  setNewPriority,
  newMessage,
  setNewMessage,
  handleCreateTicket,
}: NewTicketFormProps) => {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      <button
        onClick={() => setShowNew(false)}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 lg:hidden"
      >
        <ArrowLeft size={16} /> Back
      </button>
      <h2 className="font-heading font-bold text-xl text-foreground mb-6">Create New Ticket</h2>
      <div className="max-w-lg space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Subject</label>
          <input
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Brief description of the issue"
            className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {["Network", "PBX / Telephony", "IP Addressing", "Hardware", "Maintenance", "Other"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">Priority</label>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as TicketPriority)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {(["low", "medium", "high", "critical"] as const).map((p) => (
                <option key={p} value={p} className="capitalize">
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Description</label>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={5}
            placeholder="Describe the issue in detail…"
            className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
        <Button
          onClick={handleCreateTicket}
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6"
        >
          Submit Ticket
        </Button>
      </div>
    </div>
  );
};
