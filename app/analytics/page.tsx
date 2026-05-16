"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useDashboard } from "@/lib/dashboard-context"
import { formatCurrency, volumeChartData, hourlyActivityData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  Calendar,
  Download,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const methodDistribution = [
  { name: "Bank Transfer", value: 45, color: "oklch(0.8 0.22 145)" },
  { name: "Card", value: 30, color: "oklch(0.6 0.2 200)" },
  { name: "Crypto", value: 15, color: "oklch(0.7 0.2 50)" },
  { name: "Wallet", value: 10, color: "oklch(0.5 0.15 280)" },
]

const statusDistribution = [
  { name: "Completed", value: 85, color: "oklch(0.8 0.22 145)" },
  { name: "Pending", value: 8, color: "oklch(0.7 0.2 85)" },
  { name: "Failed", value: 5, color: "oklch(0.6 0.25 25)" },
  { name: "Processing", value: 2, color: "oklch(0.6 0.2 240)" },
]

const conversionData = [
  { day: "Mon", rate: 98.2 },
  { day: "Tue", rate: 97.8 },
  { day: "Wed", rate: 98.5 },
  { day: "Thu", rate: 99.1 },
  { day: "Fri", rate: 98.7 },
  { day: "Sat", rate: 97.5 },
  { day: "Sun", rate: 98.9 },
]

export default function AnalyticsPage() {
  const { analytics, transactions, merchants } = useDashboard()
  const [period, setPeriod] = useState("30d")

  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0)
  const avgTransaction = totalVolume / transactions.length
  const successRate = (transactions.filter((t) => t.status === "completed").length / transactions.length) * 100

  const handleExport = () => {
    toast.success("Analytics report exported")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
            <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-primary text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{analytics.totalVolumeChange}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(analytics.totalVolume)}</p>
            <p className="text-sm text-muted-foreground">Total Volume</p>
          </div>

          <div className="glass-card p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-center gap-1 text-primary text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{analytics.transactionsChange}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{analytics.transactions.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Transactions</p>
          </div>

          <div className="glass-card p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex items-center gap-1 text-primary text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{analytics.activeMerchantsChange}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{analytics.activeMerchants}</p>
            <p className="text-sm text-muted-foreground">Active Merchants</p>
          </div>

          <div className="glass-card p-5 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-primary text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{analytics.successRateChange}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{analytics.successRate}%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Volume Trend */}
          <div className="glass-card p-5 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Volume Trend</h3>
                <p className="text-sm text-muted-foreground">Monthly transaction volume</p>
              </div>
              <div className="flex items-center gap-2 text-primary text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+12.5% vs last period</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeChartData}>
                  <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.8 0.22 145)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.8 0.22 145)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" />
                  <XAxis dataKey="month" stroke="oklch(0.5 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.5 0 0)" fontSize={12} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.15 0.01 240)",
                      border: "1px solid oklch(0.25 0.01 240)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [formatCurrency(value), "Volume"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="oklch(0.8 0.22 145)"
                    strokeWidth={2}
                    fill="url(#volumeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transaction Count */}
          <div className="glass-card p-5 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Hourly Activity</h3>
                <p className="text-sm text-muted-foreground">Transactions by hour</p>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" />
                  <XAxis dataKey="hour" stroke="oklch(0.5 0 0)" fontSize={12} />
                  <YAxis stroke="oklch(0.5 0 0)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.15 0.01 240)",
                      border: "1px solid oklch(0.25 0.01 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="transactions" fill="oklch(0.8 0.22 145)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="glass-card p-5 rounded-xl">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
              <p className="text-sm text-muted-foreground">Distribution by method</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={methodDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {methodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.15 0.01 240)",
                      border: "1px solid oklch(0.25 0.01 240)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {methodDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="glass-card p-5 rounded-xl">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Transaction Status</h3>
              <p className="text-sm text-muted-foreground">Distribution by status</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.15 0.01 240)",
                      border: "1px solid oklch(0.25 0.01 240)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="glass-card p-5 rounded-xl">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground">Success Rate</h3>
              <p className="text-sm text-muted-foreground">Daily conversion trend</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.3 0 0)" />
                  <XAxis dataKey="day" stroke="oklch(0.5 0 0)" fontSize={12} />
                  <YAxis domain={[96, 100]} stroke="oklch(0.5 0 0)" fontSize={12} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.15 0.01 240)",
                      border: "1px solid oklch(0.25 0.01 240)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="oklch(0.8 0.22 145)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.8 0.22 145)", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-muted-foreground">Average</span>
              <span className="font-semibold text-primary">{(conversionData.reduce((a, b) => a + b.rate, 0) / conversionData.length).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Avg. Transaction</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(avgTransaction)}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Total Fees</p>
            <p className="text-xl font-bold text-foreground">{formatCurrency(totalVolume * 0.015)}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Chargebacks</p>
            <p className="text-xl font-bold text-foreground">0.02%</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Refund Rate</p>
            <p className="text-xl font-bold text-foreground">1.2%</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
