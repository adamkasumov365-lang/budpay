"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Building2,
  Globe,
  Shield,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type MerchantStatus = "active" | "pending" | "suspended"
type RiskLevel = "low" | "medium" | "high"

interface Merchant {
  id: string
  name: string
  email: string
  country: string
  status: MerchantStatus
  riskLevel: RiskLevel
  volume: string
  transactions: number
  joinDate: string
}

const merchants: Merchant[] = [
  {
    id: "MER-001",
    name: "TechFlow Inc.",
    email: "payments@techflow.com",
    country: "United States",
    status: "active",
    riskLevel: "low",
    volume: "$1,245,890",
    transactions: 12482,
    joinDate: "Jan 2023",
  },
  {
    id: "MER-002",
    name: "Digital Ventures",
    email: "billing@digitalventures.eu",
    country: "Germany",
    status: "active",
    riskLevel: "low",
    volume: "$892,340",
    transactions: 8934,
    joinDate: "Mar 2023",
  },
  {
    id: "MER-003",
    name: "CryptoTrade Ltd",
    email: "finance@cryptotrade.io",
    country: "Singapore",
    status: "pending",
    riskLevel: "medium",
    volume: "$2,456,780",
    transactions: 24567,
    joinDate: "Jun 2023",
  },
  {
    id: "MER-004",
    name: "GlobalPay Services",
    email: "admin@globalpay.com",
    country: "United Kingdom",
    status: "active",
    riskLevel: "low",
    volume: "$567,230",
    transactions: 5672,
    joinDate: "Aug 2023",
  },
  {
    id: "MER-005",
    name: "FinanceHub Corp",
    email: "treasury@financehub.co",
    country: "Switzerland",
    status: "suspended",
    riskLevel: "high",
    volume: "$3,891,200",
    transactions: 38912,
    joinDate: "Feb 2023",
  },
  {
    id: "MER-006",
    name: "E-Commerce Pro",
    email: "payments@ecompro.com",
    country: "Canada",
    status: "active",
    riskLevel: "low",
    volume: "$423,560",
    transactions: 4235,
    joinDate: "Oct 2023",
  },
]

const statusConfig: Record<MerchantStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-primary/10 text-primary border-primary/20" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  suspended: { label: "Suspended", className: "bg-destructive/10 text-destructive border-destructive/20" },
}

const riskConfig: Record<RiskLevel, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-primary/10 text-primary" },
  medium: { label: "Medium", className: "bg-warning/10 text-warning" },
  high: { label: "High", className: "bg-destructive/10 text-destructive" },
}

export function MerchantManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMerchants = merchants.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Merchant Management</h3>
              <p className="text-sm text-muted-foreground">{merchants.length} registered merchants</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search merchants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 bg-input border-border focus:border-primary"
              />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Merchant
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6">
        {filteredMerchants.map((merchant) => {
          const status = statusConfig[merchant.status]
          const risk = riskConfig[merchant.riskLevel]

          return (
            <div
              key={merchant.id}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-muted/20 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-primary/10 border border-primary/20">
                  <AvatarFallback className="bg-transparent text-primary font-semibold">
                    {merchant.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{merchant.name}</h4>
                    <Badge variant="outline" className={cn("text-xs", status.className)}>
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{merchant.email}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {merchant.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {merchant.id}
                    </span>
                    <span>Since {merchant.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Volume</p>
                  <p className="font-semibold text-foreground">{merchant.volume}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Transactions</p>
                  <p className="font-semibold text-foreground">{merchant.transactions.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Risk Level</p>
                  <Badge variant="secondary" className={cn("text-xs mt-1", risk.className)}>
                    <Shield className="w-3 h-3 mr-1" />
                    {risk.label}
                  </Badge>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                    {merchant.status === "active" ? (
                      <DropdownMenuItem className="cursor-pointer text-warning">
                        <XCircle className="w-4 h-4 mr-2" />
                        Suspend
                      </DropdownMenuItem>
                    ) : merchant.status === "suspended" ? (
                      <DropdownMenuItem className="cursor-pointer text-primary">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Reactivate
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem className="cursor-pointer text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
