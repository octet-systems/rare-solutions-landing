import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Zap, Play, Pause, Plus, Trash2, Edit2, Copy, 
  MessageSquare, Webhook, Mail, Tag, Users, Clock, ArrowRight
} from "lucide-react";
import type { Automation as AutomationType, Macro, TriggerType, ActionType } from "@/types/support";

const mockAutomations: AutomationType[] = [
  { 
    id: "a1", name: "Critical Ticket Alert", description: "Notify team lead when critical ticket created", enabled: true,
    trigger: { type: "ticket_created", conditions: { priority: "critical" } },
    actions: [{ type: "assign_team", params: { team: "Network" } }, { type: "send_email", params: { to: "team@rare.co.mw" } }],
    createdBy: "Admin", lastRun: "2025-06-02 10:30"
  },
  { 
    id: "a2", name: "Auto-assign Network Tickets", description: "Route network tickets to Network team", enabled: true,
    trigger: { type: "ticket_created", conditions: { category: "Network" } },
    actions: [{ type: "assign_team", params: { team: "Network" } }],
    createdBy: "Admin", lastRun: "2025-06-02 11:15"
  },
  { 
    id: "a3", name: "SLA Breach Notification", description: "Alert when SLA is about to breach", enabled: false,
    trigger: { type: "sla_breach", conditions: { timeRemaining: 30 } },
    actions: [{ type: "send_email", params: { to: "escalation@rare.co.mw" } }],
    createdBy: "Admin"
  },
];

const mockMacros: Macro[] = [
  { id: "m1", title: "Request More Info", content: "Thank you for contacting us. To help resolve this issue faster, could you please provide:\n\n1. \n2. \n3. ", category: "General", usageCount: 45, lastUsed: "2025-06-02" },
  { id: "m2", title: "Escalate to Team Lead", content: "This issue requires attention from our team lead. They will contact you within 2 hours.", category: "Escalation", usageCount: 12, lastUsed: "2025-06-01" },
  { id: "m3", title: "Close Resolved Ticket", content: "We're glad we could help! If you have any other questions, feel free to open a new ticket. This ticket will now be closed.", category: "Resolution", usageCount: 38, lastUsed: "2025-06-02" },
  { id: "m4", title: "Network Diagnostics", content: "Please run the following diagnostics and share the results:\n\n1. Ping test to gateway\n2. Traceroute to 8.8.8.8\n3. Port scan results\n\nInstructions: ", category: "Network", usageCount: 22, lastUsed: "2025-05-30" },
];

const triggerIcons: Record<TriggerType, React.ElementType> = {
  ticket_created: Plus,
  status_changed: ArrowRight,
  priority_changed: ArrowRight,
  assigned: Users,
  sla_breach: Clock,
  customer_reply: MessageSquare,
};

const actionIcons: Record<ActionType, React.ElementType> = {
  assign_team: Users,
  assign_agent: Users,
  change_status: ArrowRight,
  change_priority: ArrowRight,
  send_email: Mail,
  add_tag: Tag,
  webhook: Webhook,
};

interface AutomationProps {
  onClose?: () => void;
}

export const Automation = ({ onClose }: AutomationProps) => {
  const [automations, setAutomations] = useState<AutomationType[]>(mockAutomations);
  const [macros, setMacros] = useState(mockMacros);
  const [activeTab, setActiveTab] = useState("automations");
  const [showAutomationDialog, setShowAutomationDialog] = useState(false);
  const [showMacroDialog, setShowMacroDialog] = useState(false);
  const [editingMacro, setEditingMacro] = useState<Macro | null>(null);

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const deleteAutomation = (id: string) => {
    setAutomations(automations.filter(a => a.id !== id));
  };

  const deleteMacro = (id: string) => {
    setMacros(macros.filter(m => m.id !== id));
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl">Automation & Macros</h2>
            <p className="text-sm text-muted-foreground">Automate workflows and speed up responses</p>
          </div>
          <Button size="sm" onClick={() => { setEditingMacro(null); setShowMacroDialog(true); }}>
            <Plus size={14} className="mr-1" /> New Macro
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="automations" className="gap-1"><Zap size={14} /> Automations</TabsTrigger>
            <TabsTrigger value="macros" className="gap-1"><MessageSquare size={14} /> Macros</TabsTrigger>
          </TabsList>

          <TabsContent value="automations">
            <div className="space-y-4">
              {automations.map(automation => {
                const TriggerIcon = triggerIcons[automation.trigger.type as TriggerType] || Zap;
                return (
                  <Card key={automation.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <TriggerIcon size={18} className="text-accent" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{automation.name}</h3>
                              <Badge variant="outline" className={automation.enabled ? "bg-green-500/10 text-green-700 border-green-200" : "bg-muted text-muted-foreground"}>
                                {automation.enabled ? "Active" : "Disabled"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{automation.description}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span>Trigger: {automation.trigger.type.replace("_", " ")}</span>
                              <span>·</span>
                              <span>{automation.actions.length} action(s)</span>
                              {automation.lastRun && (<><span>·</span><span>Last run: {automation.lastRun}</span></>)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Switch checked={automation.enabled} onCheckedChange={() => toggleAutomation(automation.id)} />
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteAutomation(automation.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Button variant="outline" className="w-full" onClick={() => setShowAutomationDialog(true)}>
                <Plus size={14} className="mr-1" /> Create New Automation
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="macros">
            <div className="grid md:grid-cols-2 gap-4">
              {macros.map(macro => (
                <Card key={macro.id} className="hover:border-accent/50 transition-colors cursor-pointer" onClick={() => { setEditingMacro(macro); setShowMacroDialog(true); }}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{macro.title}</h3>
                        <Badge variant="outline" className="mt-1 text-xs">{macro.category}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); }}>
                          <Copy size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={(e) => { e.stopPropagation(); deleteMacro(macro.id); }}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{macro.content}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span>Used {macro.usageCount} times</span>
                      {macro.lastUsed && <span>· Last: {macro.lastUsed}</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={showMacroDialog} onOpenChange={setShowMacroDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingMacro ? "Edit Macro" : "Create New Macro"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input placeholder="Macro title" defaultValue={editingMacro?.title} />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select defaultValue={editingMacro?.category || "General"}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Escalation">Escalation</SelectItem>
                    <SelectItem value="Resolution">Resolution</SelectItem>
                    <SelectItem value="Network">Network</SelectItem>
                    <SelectItem value="Telephony">Telephony</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Content</Label>
                <Textarea placeholder="Macro content..." rows={6} defaultValue={editingMacro?.content} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMacroDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowMacroDialog(false)}>{editingMacro ? "Save Changes" : "Create Macro"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showAutomationDialog} onOpenChange={setShowAutomationDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Automation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input placeholder="Automation name" />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Input placeholder="Brief description" />
              </div>
              <div className="grid gap-2">
                <Label>Trigger</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select trigger" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ticket_created">Ticket Created</SelectItem>
                    <SelectItem value="status_changed">Status Changed</SelectItem>
                    <SelectItem value="priority_changed">Priority Changed</SelectItem>
                    <SelectItem value="assigned">Ticket Assigned</SelectItem>
                    <SelectItem value="sla_breach">SLA Breach</SelectItem>
                    <SelectItem value="customer_reply">Customer Reply</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Actions</Label>
                <div className="p-3 rounded-lg border border-dashed text-center text-sm text-muted-foreground">
                  Add actions (assign, notify, etc.)
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAutomationDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowAutomationDialog(false)}>Create Automation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
