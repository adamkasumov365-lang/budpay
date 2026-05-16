"use client"

import { TrendingUp, TrendingDown, DollarSign, CreditCard, Users, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboard } from "@/lib/dashboard-context"
import { formatCurrency } from "@/lib/mock-data"

export function AnalyticsCards() {
  const { analytics } = useDashboard()

  const stats = [
    {
      title: "Total Volume",
      value: formatCurrency(analytics.totalVolume),
      change: `+${analytics.totalVolumeChange}%`,
      trend: "up" as const,
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Transactions",
      value: analytics.transactions.toLocaleString(),
      change: `+${analytics.transactionsChange}%`,
      trend: "up" as const,
      icon: CreditCard,
      description: "vs last month",
    },
    {
      title: "Active Merchants",
      value: analytics.activeMerchants.toLocaleString(),
      change: `+${analytics.activeMerchantsChange}%`,
      trend: "up" as const,
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Success Rate",
      value: `${analytics.successRate}%`,
      change: `+${analytics.successRateChange}%`,
      trend: "up" as const,
      icon: Activity,
      description: "vs last month",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="glass-card rounded-xl p-5 relative overflow-hidden group hover:border-primary/30 transition-all duration-300"
        >
          {/* Background glow effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-300" />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "p-2.5 rounded-lg",
                stat.trend === "up" ? "bg-primary/10" : "bg-destructive/10"
              )}>
                <stat.icon className={cn(
                  "w-5 h-5",
                  stat.trend === "up" ? "text-primary" : "text-destructive"
                )} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                stat.trend === "up" ? "text-primary" : "text-destructive"
              )}>
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
