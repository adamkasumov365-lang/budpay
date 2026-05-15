"use client"

import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TxStatus = "completed" | "pending" | "failed" | "processing" | "refunded"

interface Transaction {
  id: string
  status: TxStatus
  amount: string
  currency: string
  merchant: string
  timestamp: string
  method: string
}

const transactions: Transaction[] = [
  {
    id: "TXN-847291",
    status: "completed",
    amount: "4,250.00",
    currency: "USD",
    merchant: "TechFlow Inc.",
    timestamp: "2 min ago",
    method: "Card",
  },
  {
    id: "TXN-847290",
    status: "processing",
    amount: "12,840.50",
    currency: "EUR",
    merchant: "Digital Ventures",
    timestamp: "5 min ago",
    method: "Bank Transfer",
  },
  {
    id: "TXN-847289",
    status: "pending",
    amount: "0.45000000",
    currency: "BTC",
    merchant: "CryptoTrade Ltd",
    timestamp: "8 min ago",
    method: "Crypto",
  },
  {
    id: "TXN-847288",
    status: "failed",
    amount: "890.00",
    currency: "GBP",
    merchant: "GlobalPay Services",
    timestamp: "12 min ago",
    method: "SEPA",
  },
  {
    id: "TXN-847287",
    status: "completed",
    amount: "25,000.00",
    currency: "USDT",
    merchant: "FinanceHub Corp",
    timestamp: "15 min ago",
    method: "Stablecoin",
  },
  {
    id: "TXN-847286",
    status: "refunded",
    amount: "1,420.75",
    currency: "USD",
    merchant: "E-Commerce Pro",
    timestamp: "18 min ago",
    method: "Card",
  },
]

const statusConfig: Record<TxStatus, { label: string; icon: React.ElementType; className: string }> = {
  completed: {
    label: "Completed",
    icon: CheckCircle,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  processing: {
    label: "Processing",
    icon: RefreshCw,
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  },
  refunded: {
    label: "Refunded",
    icon: AlertCircle,
    className: "bg-muted text-muted-foreground border-border",
  },
}

export function TransactionStatusWidget() {
  const statusCounts = transactions.reduce((acc, tx) => {
    acc[tx.status] = (acc[tx.status] || 0) + 1
    return acc
  }, {} as Record<TxStatus, number>)

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Transaction Status</h3>
            <p className="text-sm text-muted-foreground">Recent activity overview</p>
          </div>
          <button className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Status summary */}
        <div className="flex flex-wrap gap-3 mt-4">
          {(Object.entries(statusCounts) as [TxStatus, number][]).map(([status, count]) => {
            const config = statusConfig[status]
            const Icon = config.icon
            return (
              <div
                key={status}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg border",
                  config.className
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{count}</span>
                <span className="text-sm opacity-70">{config.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="divide-y divide-border">
        {transactions.map((tx) => {
          const status = statusConfig[tx.status]
          const StatusIcon = status.icon

          return (
            <div
              key={tx.id}
              className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg border", status.className)}>
                  <StatusIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{tx.merchant}</p>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border">
                      {tx.method}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{tx.id}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-mono font-semibold text-foreground">
                  {tx.amount} <span className="text-muted-foreground text-sm">{tx.currency}</span>
                </p>
                <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
