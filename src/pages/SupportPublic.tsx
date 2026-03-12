import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Headphones, Mail, Phone, MapPin, Clock, Send, 
  CheckCircle, AlertCircle, MessageSquare, FileText, Search, Eye
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const categories = [
  "Network Issues",
  "PBX / Telephony",
  "IP Addressing",
  "Email Support",
  "Security Concerns",
  "Billing Inquiry",
  "General Inquiry",
];

interface TicketStatus {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: string;
  category: string;
  created: string;
  lastUpdate: string;
}

const mockTickets: TicketStatus[] = [
  { id: "TK-1024", subject: "Network switch not responding", status: "in-progress", priority: "high", category: "Network", created: "2025-06-02", lastUpdate: "2025-06-02" },
  { id: "TK-1023", subject: "PBX system dropping calls", status: "open", priority: "critical", category: "PBX / Telephony", created: "2025-06-01", lastUpdate: "2025-06-02" },
  { id: "TK-1022", subject: "IP address allocation request", status: "resolved", priority: "medium", category: "IP Addressing", created: "2025-05-30", lastUpdate: "2025-06-01" },
];

const statusConfig = {
  open: { label: "Open", color: "bg-blue-500/15 text-blue-700 border-blue-200", icon: AlertCircle },
  "in-progress": { label: "In Progress", color: "bg-amber-500/15 text-amber-700 border-amber-200", icon: Clock },
  resolved: { label: "Resolved", color: "bg-green-500/15 text-green-700 border-green-200", icon: CheckCircle },
  closed: { label: "Closed", color: "bg-muted text-muted-foreground border-border", icon: CheckCircle },
};

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-blue-500/15 text-blue-700",
  high: "bg-orange-500/15 text-orange-700",
  critical: "bg-red-500/15 text-red-700",
};

const SupportPublic = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("submit");
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [searchTicket, setSearchTicket] = useState("");
  const [foundTicket, setFoundTicket] = useState<TicketStatus | null>(null);
  const [searched, setSearched] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    category: "",
    subject: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const id = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(id);
    setSubmitted(true);
    
    toast({
      title: "Ticket Submitted",
      description: `Your ticket ${id} has been created. We'll respond within 24 hours.`,
    });
  };

  const handleSearchTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const found = mockTickets.find(t => t.id.toLowerCase() === searchTicket.toLowerCase());
    setFoundTicket(found || null);
    setSearched(true);
  };

  const renderStatusTimeline = (status: TicketStatus["status"]) => {
    const steps = ["open", "in-progress", "resolved", "closed"];
    const currentIndex = steps.indexOf(status);
    
    return (
      <div className="flex items-center justify-between mt-6">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {index < currentIndex ? <CheckCircle size={16} /> : <span className="text-xs font-bold">{index + 1}</span>}
              </div>
              <span className={`text-xs mt-2 ${isCurrent ? "font-semibold text-accent" : "text-muted-foreground"}`}>
                {step === "in-progress" ? "In Progress" : step.charAt(0).toUpperCase() + step.slice(1)}
              </span>
            </div>
          );
        })}
        <div className="absolute inset-x-0 h-0.5 bg-muted -z-10 top-4" style={{ left: "12.5%", right: "12.5%" }} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-xs">RS</span>
            </div>
            <span className="font-heading font-bold text-lg">Rare Solutions</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
            <Link to="/support">
              <Button size="sm">Support Portal</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 w-full justify-start max-w-md mx-auto">
            <TabsTrigger value="submit" className="flex-1 gap-2">
              <MessageSquare size={16} />
              Submit Ticket
            </TabsTrigger>
            <TabsTrigger value="track" className="flex-1 gap-2">
              <Search size={16} />
              Track Ticket
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex-1 gap-2">
              <FileText size={16} />
              Knowledge Base
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            {submitted ? (
              <div className="max-w-md mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="font-heading font-bold text-2xl mb-2">Ticket Submitted Successfully!</h1>
                <p className="text-muted-foreground mb-6">
                  Your support request has been received. We'll get back to you as soon as possible.
                </p>
                
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Ticket ID</span>
                      <Badge variant="outline" className="font-mono">{ticketId}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <p className="text-sm text-muted-foreground mt-4">
                  Save your ticket ID for reference. Use it to track your ticket status below.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
                  <Button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", company: "", category: "", subject: "", description: "" }); }}>
                    Submit Another Ticket
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("track")}>
                    Track This Ticket
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Submit a Support Request
                      </CardTitle>
                      <CardDescription>
                        Fill out the form below and our team will get back to you within 24 hours.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input 
                              id="name"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input 
                              id="email"
                              type="email"
                              placeholder="john@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company / Organization</Label>
                          <Input 
                            id="company"
                            placeholder="Your company name"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select 
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input 
                            id="subject"
                            placeholder="Brief description of your issue"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description *</Label>
                          <Textarea 
                            id="description"
                            placeholder="Please provide as much detail as possible about your issue..."
                            rows={6}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full">
                          <Send className="w-4 h-4 mr-2" />
                          Submit Ticket
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">+265 1 234 567</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">support@rare.co.mw</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">Lilongwe, Malawi</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Business Hours</p>
                          <p className="text-sm text-muted-foreground">Mon - Fri: 8:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-accent/5 border-accent/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <p className="font-medium text-accent">Emergency Support</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            For critical issues outside business hours: +265 999 123 456
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="track">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    Track Your Ticket
                  </CardTitle>
                  <CardDescription>
                    Enter your ticket ID to check the status of your support request
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearchTicket} className="flex gap-3 mb-6">
                    <Input 
                      placeholder="Enter ticket ID (e.g., TK-1024)"
                      value={searchTicket}
                      onChange={(e) => setSearchTicket(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </form>

                  {searched && !foundTicket && (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">No ticket found with that ID</p>
                      <p className="text-sm text-muted-foreground mt-1">Please check your ticket ID and try again</p>
                    </div>
                  )}

                  {foundTicket && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-mono text-sm text-muted-foreground">{foundTicket.id}</p>
                          <p className="font-semibold">{foundTicket.subject}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusConfig[foundTicket.status].color}`}>
                          {statusConfig[foundTicket.status].label}
                        </span>
                      </div>

                      <div className="relative pt-6">
                        {renderStatusTimeline(foundTicket.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Category</p>
                          <p className="font-medium">{foundTicket.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Priority</p>
                          <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[foundTicket.priority]}`}>
                            {foundTicket.priority}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p className="font-medium">{foundTicket.created}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Update</p>
                          <p className="font-medium">{foundTicket.lastUpdate}</p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>Need more help?</strong> Reply to any of our emails about this ticket or submit a new ticket with additional information.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="knowledge">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    Knowledge Base
                  </CardTitle>
                  <CardDescription>
                    Browse our help articles to find answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "Configuring VLANs on Cisco SG-Series", category: "Networking", excerpt: "Learn how to set up VLANs on Cisco managed switches" },
                      { title: "PBX Quick Start Guide", category: "Telephony", excerpt: "Essential features for office staff using our PBX systems" },
                      { title: "IP Addressing Best Practices", category: "Infrastructure", excerpt: "How to structure your internal IP allocation" },
                      { title: "Troubleshooting SIP Drops", category: "Telephony", excerpt: "Step-by-step checklist for VoIP call issues" },
                      { title: "Setting Up Remote Access VPN", category: "Security", excerpt: "Connect to your office network securely from home" },
                      { title: "Network Security Basics", category: "Security", excerpt: "Essential security practices for your network" },
                    ].map((article, i) => (
                      <div key={i} className="p-4 border rounded-lg hover:border-accent/50 hover:bg-accent/5 transition-colors cursor-pointer">
                        <Badge variant="outline" className="mb-2 text-xs">{article.category}</Badge>
                        <h3 className="font-semibold mb-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupportPublic;
