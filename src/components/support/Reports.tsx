import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, 
  Users, Ticket, Activity, BarChart3, Download, Calendar
} from "lucide-react";

interface ReportsProps {
  onClose?: () => void;
}

export const Reports = ({ onClose }: ReportsProps) => {
  const [dateRange, setDateRange] = useState("30d");

  const stats = [
    { label: "Total Tickets", value: 156, change: 12, type: "positive", icon: Ticket },
    { label: "Avg Response Time", value: "2.4h", change: -15, type: "positive", icon: Clock },
    { label: "Resolution Rate", value: "94%", change: 3, type: "positive", icon: CheckCircle },
    { label: "SLA Compliance", value: "87%", change: -5, type: "negative", icon: AlertCircle },
  ];

  const agentPerformance = [
    { name: "Mwai Mandula", resolved: 45, avgTime: "1.8h", satisfaction: 4.8 },
    { name: "Chimwemwe Nkhoma", resolved: 38, avgTime: "2.2h", satisfaction: 4.6 },
    { name: "Grace Banda", resolved: 32, avgTime: "2.5h", satisfaction: 4.7 },
    { name: "James Phiri", resolved: 28, avgTime: "3.1h", satisfaction: 4.5 },
  ];

  const categoryBreakdown = [
    { category: "Network", count: 52, percentage: 33 },
    { category: "PBX / Telephony", count: 41, percentage: 26 },
    { category: "IP Addressing", count: 35, percentage: 22 },
    { category: "Maintenance", count: 28, percentage: 19 },
  ];

  const trendData = [
    { week: "W1", tickets: 32, resolved: 28 },
    { week: "W2", tickets: 38, resolved: 35 },
    { week: "W3", tickets: 35, resolved: 38 },
    { week: "W4", tickets: 51, resolved: 45 },
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-semibold text-xl">Reports & Analytics</h2>
            <p className="text-sm text-muted-foreground">Track performance metrics and trends</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-36"><Calendar size={14} className="mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download size={14} className="mr-1" /> Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  <stat.icon size={16} className="text-muted-foreground" />
                </div>
                <p className="text-2xl font-heading font-bold">{stat.value}</p>
                <div className={`flex items-center gap-1 text-xs mt-1 ${stat.type === "positive" ? "text-green-600" : stat.type === "negative" ? "text-red-600" : "text-muted-foreground"}`}>
                  {stat.type === "positive" ? <TrendingUp size={12} /> : stat.type === "negative" ? <TrendingDown size={12} /> : null}
                  {stat.change > 0 ? "+" : ""}{stat.change}% from last period
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Ticket Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-end gap-2">
                {trendData.map(d => (
                  <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 items-end" style={{ height: "160px" }}>
                      <div className="flex-1 bg-blue-500/60 rounded-t" style={{ height: `${(d.tickets / 60) * 100}%` }} />
                      <div className="flex-1 bg-emerald-500/60 rounded-t" style={{ height: `${(d.resolved / 60) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.week}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500/60" /> Created</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/60" /> Resolved</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryBreakdown.map(cat => (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{cat.category}</span>
                      <span className="text-muted-foreground">{cat.count} ({cat.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Agent Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Agent</th>
                    <th className="text-right py-2 font-medium">Resolved</th>
                    <th className="text-right py-2 font-medium">Avg Time</th>
                    <th className="text-right py-2 font-medium">Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  {agentPerformance.map(agent => (
                    <tr key={agent.name} className="border-b last:border-0">
                      <td className="py-2">{agent.name}</td>
                      <td className="text-right">{agent.resolved}</td>
                      <td className="text-right">{agent.avgTime}</td>
                      <td className="text-right">
                        <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                          {agent.satisfaction} ★
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
