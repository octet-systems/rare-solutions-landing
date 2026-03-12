import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Users, UserPlus, Shield, UserCog, Trash2, Edit2, 
  MoreVertical, Search, Mail, Phone, Building2, CheckCircle
} from "lucide-react";
import type { User, UserRole, TeamName, Team } from "@/types/support";

const mockUsers: User[] = [
  { id: "u1", name: "Mwai Mandula", email: "mwai@rare.co.mw", role: "admin", team: "Network", status: "online", ticketCount: 12, createdAt: "2024-01-15" },
  { id: "u2", name: "Chimwemwe Nkhoma", email: "chimwemwe@rare.co.mw", role: "agent", team: "PBX / Telephony", status: "online", ticketCount: 8, createdAt: "2024-02-20" },
  { id: "u3", name: "Grace Banda", email: "grace@rare.co.mw", role: "agent", team: "IP Addressing", status: "away", ticketCount: 5, createdAt: "2024-03-10" },
  { id: "u4", name: "James Phiri", email: "james@rare.co.mw", role: "agent", team: "Network", status: "offline", ticketCount: 3, createdAt: "2024-04-05" },
  { id: "u5", name: "Livity Phiri", email: "livity@rare.co.mw", role: "viewer", team: "Maintenance", status: "online", ticketCount: 0, createdAt: "2024-05-01" },
];

const mockTeams: Team[] = [
  { id: "t1", name: "Network", leadId: "u1", members: ["u1", "u4"], description: "Network infrastructure support" },
  { id: "t2", name: "PBX / Telephony", leadId: "u2", members: ["u2"], description: "PBX and VoIP systems" },
  { id: "t3", name: "IP Addressing", leadId: "u3", members: ["u3"], description: "IP allocation and management" },
  { id: "t4", name: "Maintenance", leadId: "u5", members: ["u5"], description: "Scheduled maintenance" },
];

const roleColors: Record<UserRole, string> = {
  admin: "bg-red-500/15 text-red-700 border-red-200",
  agent: "bg-blue-500/15 text-blue-700 border-blue-200",
  viewer: "bg-muted text-muted-foreground border-border",
};

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-muted",
  away: "bg-yellow-500",
};

interface TeamAgentSelectProps {
  ticketId: string;
  currentAgent?: string;
  currentTeam?: string;
  onAssign: (agentId: string, teamId?: string) => void;
}

export const TeamAgentSelect = ({ ticketId, currentAgent, currentTeam, onAssign }: TeamAgentSelectProps) => {
  const [selectedTeam, setSelectedTeam] = useState(currentTeam || "");
  const [selectedAgent, setSelectedAgent] = useState(currentAgent || "");

  const teamMembers = mockTeams.find(t => t.name === selectedTeam)?.members || [];

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-xs text-muted-foreground">Team</Label>
        <Select value={selectedTeam} onValueChange={(v) => { setSelectedTeam(v); setSelectedAgent(""); onAssign("", v); }}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Select team" /></SelectTrigger>
          <SelectContent>
            {mockTeams.map(team => (
              <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedTeam && (
        <div>
          <Label className="text-xs text-muted-foreground">Assign Agent</Label>
          <Select value={selectedAgent} onValueChange={(v) => onAssign(v, selectedTeam)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select agent" /></SelectTrigger>
            <SelectContent>
              {teamMembers.map(memberId => {
                const user = mockUsers.find(u => u.id === memberId);
                return user ? (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ) : null;
              })}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

interface UserManagementProps {
  onClose?: () => void;
}

export const UserManagement = ({ onClose }: UserManagementProps) => {
  const [users, setUsers] = useState(mockUsers);
  const [teams, setTeams] = useState(mockTeams);
  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg">User & Team Management</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button size="sm" onClick={() => { setEditingUser(null); setShowUserDialog(true); }}>
            <UserPlus size={16} className="mr-1" /> Add User
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowTeamDialog(true)}>
            <Building2 size={16} className="mr-1" /> Add Team
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4">
          <TabsTrigger value="users" className="gap-1"><Users size={14} /> Users</TabsTrigger>
          <TabsTrigger value="teams" className="gap-1"><Building2 size={14} /> Teams</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="flex-1 overflow-auto p-4 mt-0">
          <div className="space-y-2">
            {filteredUsers.map(user => (
              <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold text-sm">{user.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${statusColors[user.status]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{user.name}</p>
                    <Badge variant="outline" className={roleColors[user.role]}>{user.role}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{user.team || "Unassigned"}</span>
                  <span>·</span>
                  <span>{user.ticketCount} tickets</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingUser(user); setShowUserDialog(true); }}>
                    <Edit2 size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teams" className="flex-1 overflow-auto p-4 mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {teams.map(team => {
              const lead = users.find(u => u.id === team.leadId);
              return (
                <Card key={team.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center justify-between">
                      {team.name}
                      <Badge variant="outline">{team.members.length} members</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{team.description}</p>
                    <p className="text-sm">Lead: <span className="font-medium">{lead?.name}</span></p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter full name" defaultValue={editingUser?.name} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input placeholder="email@company.com" type="email" defaultValue={editingUser?.email} />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select defaultValue={editingUser?.role || "agent"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Team</Label>
              <Select defaultValue={editingUser?.team}>
                <SelectTrigger><SelectValue placeholder="Select team" /></SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowUserDialog(false)}>{editingUser ? "Save Changes" : "Add User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label>Team Name</Label>
              <Input placeholder="Enter team name" />
            </div>
            <div className="grid gap-2">
              <Label>Team Lead</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select team lead" /></SelectTrigger>
                <SelectContent>
                  {users.filter(u => u.role === "admin" || u.role === "agent").map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea placeholder="Team description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTeamDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowTeamDialog(false)}>Create Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
