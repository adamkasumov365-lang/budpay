"use client"

import { useState } from "react"
import Link from "next/link"
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
  ArrowRight,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboard } from "@/lib/dashboard-context"
import { formatCurrency, formatRelativeTime } from "@/lib/mock-data"
import { toast } from "sonner"

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
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
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    icon: Loader2,
  },
}

export function IncomingRequestsTable() {
  const { paymentRequests, approveRequest, rejectRequest } = useDashboard()
  const [searchQuery, setSearchQuery] = useState("")
  const [processingId, setProcessingId] = useState<string | null>(null)

  const filteredRequests = paymentRequests
    .filter(
      (req) =>
        req.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 6)

  const handleApprove = (id: string) => {
    setProcessingId(id)
    setTimeout(() => {
      approveRequest(id)
      setProcessingId(null)
      toast.success("Request approved")
    }, 800)
  }

  const handleReject = (id: string) => {
    setProcessingId(id)
    setTimeout(() => {
      rejectRequest(id)
      setProcessingId(null)
      toast.success("Request rejected")
    }, 800)
  }

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
              <p className="text-sm text-muted-foreground">
                {paymentRequests.filter((r) => r.status === "pending").length} pending requests
              </p>
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
            <Link href="/requests">
              <Button variant="outline" size="sm" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
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
              <TableHead className="text-muted-foreground font-medium">Type</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => {
              const status = statusConfig[request.status]
              const StatusIcon = status.icon
              const isProcessing = processingId === request.id
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
                      <p className="text-xs text-muted-foreground">{request.merchantId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground font-semibold">
                      {formatCurrency(request.amount, request.currency)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {request.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("flex items-center gap-1.5 w-fit", status.className)}
                    >
                      <StatusIcon className={cn("w-3 h-3", request.status === "processing" && "animate-spin")} />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatRelativeTime(request.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    {request.status === "pending" ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                          onClick={() => handleApprove(request.id)}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleReject(request.id)}
                          disabled={isProcessing}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <Link href="/requests">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {filteredRequests.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No requests found matching your search.
        </div>
      )}

      <div className="p-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredRequests.length} of {paymentRequests.length} requests
        </p>
        <Link href="/requests">
          <Button variant="outline" size="sm" className="gap-2">
            View All Requests
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
