export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "critical";

export interface TicketMessage {
  id: string;
  sender: string;
  role: "customer" | "agent" | "system";
  content: string;
  timestamp: string;
  isInternal?: boolean; // For private agent notes
}

export interface TicketAttachment {
  name: string;
  size: string;
  type: string;
}

export interface TicketActivity {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
}

export interface TicketData {
  id: string;
  subject: string;
  customer: string;
  customerEmail?: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  tags?: string[];
  assignedTo?: string;
  assignedTeam?: string;
  created: string;
  updated: string;
  resolvedAt?: string;
  closedAt?: string;
  messages: TicketMessage[];
  attachments?: TicketAttachment[];
  activities?: TicketActivity[];
  slaDue?: string;
  firstResponseAt?: string;
  slaBreached?: boolean;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  content?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  helpful: number;
  tags: string[];
}

export interface KBArticleDetail extends KnowledgeBaseArticle {
  relatedArticles: string[];
}

// User & Team Management
export type UserRole = "admin" | "agent" | "viewer";
export type TeamName = "Network" | "PBX / Telephony" | "IP Addressing" | "Maintenance";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  team?: TeamName;
  avatar?: string;
  status: "online" | "offline" | "away";
  ticketCount: number;
  createdAt: string;
}

export interface Team {
  id: string;
  name: TeamName;
  leadId: string;
  members: string[];
  description: string;
}

// SLA
export interface SLA {
  id: string;
  name: string;
  priority: TicketPriority;
  responseTime: number; // minutes
  resolutionTime: number; // minutes
  breachNotification: boolean;
}

export interface SLABreach {
  ticketId: string;
  type: "response" | "resolution";
  timeBreached: string;
  notified: boolean;
}

// Automation
export type TriggerType = "ticket_created" | "status_changed" | "priority_changed" | "assigned" | "sla_breach" | "customer_reply";
export type ActionType = "assign_team" | "assign_agent" | "change_status" | "change_priority" | "send_email" | "add_tag" | "webhook";

export interface AutomationTrigger {
  type: TriggerType;
  conditions?: Record<string, unknown>;
}

export interface AutomationAction {
  type: ActionType;
  params: Record<string, unknown>;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  createdBy: string;
  lastRun?: string;
}

export interface Macro {
  id: string;
  title: string;
  content: string;
  category: string;
  usageCount: number;
  lastUsed?: string;
}

// Integrations
export type IntegrationType = "email" | "crm" | "chat" | "phone" | "social" | "webhook";

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  status: "active" | "inactive" | "error";
  config: Record<string, unknown>;
  lastSync?: string;
}

// Settings
export interface SystemSettings {
  companyName: string;
  timezone: string;
  dateFormat: string;
  defaultSLA: string;
  emailNotifications: boolean;
  slackNotifications: boolean;
  allowCustomerPortal: boolean;
  requireLogin: boolean;
}

// Reports
export interface ReportMetric {
  label: string;
  value: number | string;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
}

export interface ReportChart {
  type: "line" | "bar" | "pie" | "doughnut";
  title: string;
  data: unknown;
}
