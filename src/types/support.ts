export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "critical";

export interface TicketMessage {
  id: string;
  sender: string;
  role: "customer" | "agent";
  content: string;
  timestamp: string;
}

export interface TicketData {
  id: string;
  subject: string;
  customer: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  created: string;
  updated: string;
  messages: TicketMessage[];
}
