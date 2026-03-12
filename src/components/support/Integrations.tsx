import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Mail, MessageSquare, Phone, Link2, ExternalLink, 
  CheckCircle, XCircle, AlertCircle, RefreshCw, Settings, Trash2
} from "lucide-react";
import type { Integration, IntegrationType } from "@/types/support";

const mockIntegrations: Integration[] = [
  { id: "i1", name: "Email (IMAP/SMTP)", type: "email", status: "active", config: {}, lastSync: "2025-06-02 11:30" },
  { id: "i2", name: "WhatsApp Business", type: "chat", status: "active", config: {}, lastSync: "2025-06-02 11:25" },
  { id: "i3", name: "Salesforce CRM", type: "crm", status: "inactive", config: {} },
  { id: "i4", name: "Twilio Phone", type: "phone", status: "active", config: {}, lastSync: "2025-06-02 11:20" },
  { id: "i5", name: "Slack Notifications", type: "chat", status: "error", config: {}, lastSync: "2025-06-01 15:00" },
  { id: "i6", name: "Webhook - Accounting", type: "webhook", status: "active", config: {}, lastSync: "2025-06-02 10:45" },
];

const integrationIcons: Record<IntegrationType, React.ElementType> = {
  email: Mail,
  crm: Link2,
  chat: MessageSquare,
  phone: Phone,
  social: MessageSquare,
  webhook: Link2,
};

const statusConfig = {
  active: { color: "bg-green-500/15 text-green-700 border-green-200", icon: CheckCircle },
  inactive: { color: "bg-muted text-muted-foreground border-border", icon: XCircle },
  error: { color: "bg-red-500/15 text-red-700 border-red-200", icon: AlertCircle },
};

interface IntegrationsProps {
  onClose?: () => void;
}

export const Integrations = ({ onClose }: IntegrationsProps) => {
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(i => 
      i.id === id ? { ...i, status: i.status === "active" ? "inactive" : "active" } : i
    ));
  };

  const deleteIntegration = (id: string) => {
    setIntegrations(integrations.filter(i => i.id !== id));
  };

  const openConfig = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowConfigDialog(true);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl">Integrations</h2>
            <p className="text-sm text-muted-foreground">Connect with external services</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map(integration => {
            const Icon = integrationIcons[integration.type];
            const status = statusConfig[integration.status];
            const StatusIcon = status.icon;
            return (
              <Card key={integration.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <Badge variant="outline" className={status.color}>
                      <StatusIcon size={10} className="mr-1" />
                      {integration.status}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{integration.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 capitalize">{integration.type}</p>
                  {integration.lastSync && (
                    <p className="text-xs text-muted-foreground mt-1">Last sync: {integration.lastSync}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    {integration.status !== "error" && (
                      <Switch checked={integration.status === "active"} onCheckedChange={() => toggleIntegration(integration.id)} />
                    )}
                    <Button variant="outline" size="sm" className="h-7" onClick={() => openConfig(integration)}>
                      <Settings size={12} className="mr-1" /> Configure
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteIntegration(integration.id)}>
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Card className="border-dashed">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[180px]">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                <ExternalLink size={20} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium text-muted-foreground">Add Integration</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Connect more services to your support system</p>
              <Button variant="outline" size="sm" className="mt-3">
                Browse Integrations
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className="font-heading font-semibold mb-3">API Access</h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">API Key</p>
                  <p className="text-sm text-muted-foreground">Use this key to access the REST API</p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded">rs_live_************************</code>
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label>API Key / Username</Label>
                <Input type="password" placeholder="Enter API key" />
              </div>
              <div className="grid gap-2">
                <Label>API Secret / Password</Label>
                <Input type="password" placeholder="Enter API secret" />
              </div>
              <div className="grid gap-2">
                <Label>Webhook URL (for {selectedIntegration?.type})</Label>
                <Input placeholder="https://..." />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="sync" defaultChecked={selectedIntegration?.status === "active"} />
                <Label htmlFor="sync">Enable auto-sync</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfigDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowConfigDialog(false)}>Save Configuration</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
