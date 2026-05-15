"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowDownLeft,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

type RequestStatus = "pending" | "approved" | "rejected" | "processing"

interface PaymentRequest {
  id: string
  merchant: string
  amount: string
  currency: string
  method: string
  status: RequestStatus
  date: string
  reference: string
}

const paymentRequests: PaymentRequest[] = [
  {
    id: "REQ-001",
    merchant: "TechFlow Inc.",
    amount: "15,420.00",
    currency: "USD",
    method: "Bank Transfer",
    status: "pending",
    date: "2024-01-15 14:32",
    reference: "INV-2024-0142",
  },
  {
    id: "REQ-002",
    merchant: "Digital Ventures",
    amount: "8,750.50",
    currency: "EUR",
    method: "SEPA",
    status: "approved",
    date: "2024-01-15 13:18",
    reference: "INV-2024-0141",
  },
  {
    id: "REQ-003",
    merchant: "CryptoTrade Ltd",
    amount: "2.45000000",
    currency: "BTC",
    method: "Cryptocurrency",
    status: "processing",
    date: "2024-01-15 12:45",
    reference: "INV-2024-0140",
  },
  {
    id: "REQ-004",
    merchant: "GlobalPay Services",
    amount: "32,100.00",
    currency: "GBP",
    method: "SWIFT",
    status: "rejected",
    date: "2024-01-15 11:22",
    reference: "INV-2024-0139",
  },
  {
    id: "REQ-005",
    merchant: "FinanceHub Corp",
    amount: "125,000.00",
    currency: "USDT",
    method: "Stablecoin",
    status: "approved",
    date: "2024-01-15 10:05",
    reference: "INV-2024-0138",
  },
  {
    id: "REQ-006",
    merchant: "E-Commerce Pro",
    amount: "4,890.25",
    currency: "USD",
    method: "ACH",
    status: "pending",
    date: "2024-01-15 09:48",
    reference: "INV-2024-0137",
  },
]

const statusConfig: Record<RequestStatus, { label: string; className: string; icon: React.ElementType }> = {
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning border-warning/20",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    className: "bg-primary/10 text-primary border-primary/20",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
  processing: {
    label: "Processing",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    icon: Clock,
  },
}

export function IncomingRequestsTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = paymentRequests.filter(
    (req) =>
      req.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <ArrowDownLeft className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Incoming Requests</h3>
              <p className="text-sm text-muted-foreground">{paymentRequests.length} payment requests</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 bg-input border-border focus:border-primary"
              />
            </div>
            <Button variant="outline" size="icon" className="border-border hover:border-primary/50">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Request ID</TableHead>
              <TableHead className="text-muted-foreground font-medium">Merchant</TableHead>
              <TableHead className="text-muted-foreground font-medium">Amount</TableHead>
              <TableHead className="text-muted-foreground font-medium">Method</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => {
              const status = statusConfig[request.status]
              const StatusIcon = status.icon
              return (
                <TableRow
                  key={request.id}
                  className="border-border hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {request.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{request.merchant}</p>
                      <p className="text-xs text-muted-foreground">{request.reference}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono">
                      <span className="text-foreground font-semibold">{request.amount}</span>
                      <span className="text-muted-foreground ml-1">{request.currency}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{request.method}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("flex items-center gap-1.5 w-fit", status.className)}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{request.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-primary">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredRequests.length} of {paymentRequests.length} requests
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="border-border">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
