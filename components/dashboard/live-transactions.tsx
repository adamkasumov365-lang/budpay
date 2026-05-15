"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, ArrowDownLeft, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  type: "incoming" | "outgoing"
  amount: string
  currency: string
  merchant: string
  timestamp: string
  status: "completed" | "pending"
}

const generateTransaction = (id: number): Transaction => {
  const types: ("incoming" | "outgoing")[] = ["incoming", "outgoing"]
  const currencies = ["USD", "EUR", "BTC", "ETH", "USDT", "GBP"]
  const merchants = [
    "TechFlow Inc.",
    "Digital Ventures",
    "CryptoTrade Ltd",
    "GlobalPay Services",
    "FinanceHub Corp",
    "E-Commerce Pro",
    "PayStack Global",
    "Quantum Finance",
    "BlockChain Labs",
    "SwiftPay Solutions",
  ]

  const type = types[Math.floor(Math.random() * types.length)]
  const currency = currencies[Math.floor(Math.random() * currencies.length)]
  const isCrypto = ["BTC", "ETH"].includes(currency)
  
  const amount = isCrypto
    ? (Math.random() * 2).toFixed(8)
    : (Math.random() * 50000 + 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return {
    id: `TXN-${String(id).padStart(6, "0")}`,
    type,
    amount,
    currency,
    merchant: merchants[Math.floor(Math.random() * merchants.length)],
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    status: Math.random() > 0.1 ? "completed" : "pending",
  }
}

export function LiveTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Initialize with some transactions
    const initial = Array.from({ length: 8 }, (_, i) => generateTransaction(i + 1))
    setTransactions(initial)

    // Add new transaction every 2-4 seconds
    let txId = initial.length + 1
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const newTx = generateTransaction(txId++)
        return [newTx, ...prev.slice(0, 7)]
      })
    }, Math.random() * 2000 + 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Live Transactions</h3>
              <p className="text-sm text-muted-foreground">Real-time payment stream</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
            <span className="text-sm text-primary font-medium">Live</span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
        {transactions.map((tx, index) => (
          <div
            key={`${tx.id}-${index}`}
            className={cn(
              "p-4 flex items-center justify-between transition-all duration-500",
              index === 0 && "bg-primary/5 animate-pulse"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  tx.type === "incoming"
                    ? "bg-primary/10 text-primary"
                    : "bg-chart-3/10 text-chart-3"
                )}
              >
                {tx.type === "incoming" ? (
                  <ArrowDownLeft className="w-4 h-4" />
                ) : (
                  <ArrowUpRight className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{tx.merchant}</p>
                <p className="text-xs text-muted-foreground font-mono">{tx.id}</p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={cn(
                  "font-mono font-semibold",
                  tx.type === "incoming" ? "text-primary" : "text-foreground"
                )}
              >
                {tx.type === "incoming" ? "+" : "-"}
                {tx.amount} <span className="text-muted-foreground text-sm">{tx.currency}</span>
              </p>
              <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Updated every 2-4s</span>
          <span className="text-primary font-medium">
            {transactions.length} transactions
          </span>
        </div>
      </div>
    </div>
  )
}
