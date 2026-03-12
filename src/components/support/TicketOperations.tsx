import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Copy, GitMerge, Trash2, Archive, Tag, 
  CheckSquare, Square, ChevronDown, MoreHorizontal
} from "lucide-react";

interface TicketOperationsProps {
  selectedTickets: string[];
  allTickets: { id: string; subject: string; customer: string }[];
  onMerge: (targetId: string, sourceIds: string[]) => void;
  onDuplicate: (ticketId: string) => void;
  onBulkAction: (action: string, ticketIds: string[]) => void;
  onClearSelection: () => void;
}

export const TicketOperations = ({
  selectedTickets,
  allTickets,
  onMerge,
  onDuplicate,
  onBulkAction,
  onClearSelection,
}: TicketOperationsProps) => {
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [mergeTarget, setMergeTarget] = useState("");

  const handleMerge = () => {
    if (mergeTarget && selectedTickets.length > 0) {
      onMerge(mergeTarget, selectedTickets.filter(id => id !== mergeTarget));
      setShowMergeDialog(false);
      onClearSelection();
    }
  };

  const handleBulk = () => {
    if (bulkAction && selectedTickets.length > 0) {
      onBulkAction(bulkAction, selectedTickets);
      setShowBulkDialog(false);
      onClearSelection();
    }
  };

  if (selectedTickets.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg p-3 flex items-center gap-3 z-50">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-accent/10 text-accent">
          {selectedTickets.length} selected
        </Badge>
      </div>
      
      <div className="h-6 w-px bg-border" />
      
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1"
          onClick={() => setShowMergeDialog(true)}
          disabled={selectedTickets.length < 2}
        >
          <GitMerge size={14} /> Merge
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1"
          onClick={() => setShowBulkDialog(true)}
        >
          <MoreHorizontal size={14} /> Bulk
        </Button>
      </div>

      <div className="h-6 w-px bg-border" />

      <Button variant="ghost" size="sm" className="text-destructive" onClick={onClearSelection}>
        <XCircle size={14} className="mr-1" /> Clear
      </Button>

      <Dialog open={showMergeDialog} onOpenChange={setShowMergeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Merge Tickets</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Merge {selectedTickets.length - 1} tickets into one. The selected tickets will be merged into the target ticket.
            </p>
            <div className="grid gap-2">
              <Label>Target Ticket (will be kept)</Label>
              <Select value={mergeTarget} onValueChange={setMergeTarget}>
                <SelectTrigger><SelectValue placeholder="Select target ticket" /></SelectTrigger>
                <SelectContent>
                  {allTickets.filter(t => selectedTickets.includes(t.id)).map(ticket => (
                    <SelectItem key={ticket.id} value={ticket.id}>
                      {ticket.id} - {ticket.subject.slice(0, 40)}...
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-2">Will be merged into target:</p>
              <div className="space-y-1">
                {selectedTickets.filter(id => id !== mergeTarget).map(id => {
                  const ticket = allTickets.find(t => t.id === id);
                  return (
                    <div key={id} className="flex items-center gap-2 text-xs">
                      <Trash2 size={10} className="text-destructive" />
                      <span>{id} - {ticket?.subject.slice(0, 30)}...</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMergeDialog(false)}>Cancel</Button>
            <Button onClick={handleMerge} disabled={!mergeTarget}>Merge Tickets</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Actions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Apply an action to {selectedTickets.length} selected tickets.
            </p>
            <div className="grid gap-2">
              <Label>Action</Label>
              <Select value={bulkAction} onValueChange={setBulkAction}>
                <SelectTrigger><SelectValue placeholder="Select action" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="status:open">Set Status: Open</SelectItem>
                  <SelectItem value="status:in-progress">Set Status: In Progress</SelectItem>
                  <SelectItem value="status:resolved">Set Status: Resolved</SelectItem>
                  <SelectItem value="status:closed">Set Status: Closed</SelectItem>
                  <SelectItem value="priority:low">Set Priority: Low</SelectItem>
                  <SelectItem value="priority:medium">Set Priority: Medium</SelectItem>
                  <SelectItem value="priority:high">Set Priority: High</SelectItem>
                  <SelectItem value="priority:critical">Set Priority: Critical</SelectItem>
                  <SelectItem value="add_tag">Add Tag</SelectItem>
                  <SelectItem value="archive">Archive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {bulkAction === "add_tag" && (
              <div className="grid gap-2">
                <Label>Tag Name</Label>
                <Input placeholder="Enter tag name" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkDialog(false)}>Cancel</Button>
            <Button onClick={handleBulk} disabled={!bulkAction}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import { XCircle } from "lucide-react";
