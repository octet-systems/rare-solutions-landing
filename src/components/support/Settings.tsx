import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, Building2, Bell, Shield, Clock, 
  Mail, Globe, Database, Save, RotateCcw
} from "lucide-react";
import type { SystemSettings, SLA } from "@/types/support";

const defaultSettings: SystemSettings = {
  companyName: "Rare Solutions MW",
  timezone: "Africa/Blantyre",
  dateFormat: "DD/MM/YYYY",
  defaultSLA: "standard",
  emailNotifications: true,
  slackNotifications: false,
  allowCustomerPortal: true,
  requireLogin: true,
};

const mockSLAs: SLA[] = [
  { id: "sla1", name: "Critical", priority: "critical", responseTime: 15, resolutionTime: 240, breachNotification: true },
  { id: "sla2", name: "High", priority: "high", responseTime: 60, resolutionTime: 480, breachNotification: true },
  { id: "sla3", name: "Medium", priority: "medium", responseTime: 240, resolutionTime: 1440, breachNotification: false },
  { id: "sla4", name: "Low", priority: "low", responseTime: 480, resolutionTime: 2880, breachNotification: false },
];

interface SettingsProps {
  onClose?: () => void;
}

export const Settings = ({ onClose }: SettingsProps) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [slas, setSlas] = useState(mockSLAs);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-xl">Settings</h2>
            <p className="text-sm text-muted-foreground">Configure system preferences</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw size={14} className="mr-1" /> Reset
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save size={14} className="mr-1" /> {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="gap-1"><SettingsIcon size={14} /> General</TabsTrigger>
            <TabsTrigger value="sla" className="gap-1"><Clock size={14} /> SLA Policies</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1"><Bell size={14} /> Notifications</TabsTrigger>
            <TabsTrigger value="security" className="gap-1"><Shield size={14} /> Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Building2 size={16} /> Company</CardTitle>
                  <CardDescription>General organization settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Company Name</Label>
                    <Input value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(v) => setSettings({ ...settings, timezone: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Blantyre">Africa/Blantyre (CAT)</SelectItem>
                        <SelectItem value="Africa/Lusaka">Africa/Lusaka (CAT)</SelectItem>
                        <SelectItem value="Africa/Johannesburg">Africa/Johannesburg (SAST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Date Format</Label>
                    <Select value={settings.dateFormat} onValueChange={(v) => setSettings({ ...settings, dateFormat: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Globe size={16} /> Customer Portal</CardTitle>
                  <CardDescription>Self-service portal configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Customer Portal</Label>
                      <p className="text-sm text-muted-foreground">Customers can view and manage their tickets</p>
                    </div>
                    <Switch checked={settings.allowCustomerPortal} onCheckedChange={(v) => setSettings({ ...settings, allowCustomerPortal: v })} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Login</Label>
                      <p className="text-sm text-muted-foreground">Customers must log in to submit tickets</p>
                    </div>
                    <Switch checked={settings.requireLogin} onCheckedChange={(v) => setSettings({ ...settings, requireLogin: v })} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sla">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Clock size={16} /> SLA Policies</CardTitle>
                <CardDescription>Define response and resolution times per priority</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slas.map(sla => (
                    <div key={sla.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={
                            sla.priority === "critical" ? "bg-red-500/10 text-red-700 border-red-200" :
                            sla.priority === "high" ? "bg-orange-500/10 text-orange-700 border-orange-200" :
                            sla.priority === "medium" ? "bg-blue-500/10 text-blue-700 border-blue-200" :
                            "bg-muted text-muted-foreground"
                          }>{sla.priority}</Badge>
                          <span className="font-medium">{sla.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground text-xs">First Response</p>
                          <p className="font-medium">{formatTime(sla.responseTime)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground text-xs">Resolution</p>
                          <p className="font-medium">{formatTime(sla.resolutionTime)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={sla.breachNotification} />
                          <span className="text-xs text-muted-foreground">Alert</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Mail size={16} /> Email Notifications</CardTitle>
                  <CardDescription>Configure email alert preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send email alerts for important events</p>
                      </div>
                      <Switch checked={settings.emailNotifications} onCheckedChange={(v) => setSettings({ ...settings, emailNotifications: v })} />
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                      <Label>Notification Events</Label>
                      <div className="flex flex-wrap gap-2">
                        {["New Ticket", "Ticket Assigned", "Status Changed", "SLA Breach", "New Reply"].map(event => (
                          <Badge key={event} variant="outline" className="cursor-pointer hover:bg-muted">{event}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2"><Shield size={16} /> Security Settings</CardTitle>
                <CardDescription>Configure authentication and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all agents</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all admin actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
