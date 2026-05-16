"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useDashboard } from "@/lib/dashboard-context"
import { formatCurrency, formatDate } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  MoreHorizontal,
  Building2,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Eye,
  Copy,
  Trash2,
  Plus,
  FileCheck,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function MerchantsPage() {
  const { merchants, updateMerchant } = useDashboard()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedMerchant, setSelectedMerchant] = useState<typeof merchants[0] | null>(null)
  const [editMerchant, setEditMerchant] = useState<typeof merchants[0] | null>(null)
  const [processing, setProcessing] = useState(false)

  const categories = [...new Set(merchants.map((m) => m.category))]

  const filteredMerchants = merchants.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || m.status === statusFilter
    const matchesRisk = riskFilter === "all" || m.riskLevel === riskFilter
    const matchesCategory = categoryFilter === "all" || m.category === categoryFilter
    return matchesSearch && matchesStatus && matchesRisk && matchesCategory
  })

  const handleStatusChange = (id: string, status: typeof merchants[0]["status"]) => {
    setProcessing(true)
    setTimeout(() => {
      updateMerchant(id, { status })
      setProcessing(false)
      toast.success(`Merchant status updated to ${status}`)
    }, 500)
  }

  const handleSaveEdit = () => {
    if (!editMerchant) return
    setProcessing(true)
    setTimeout(() => {
      updateMerchant(editMerchant.id, editMerchant)
      setProcessing(false)
      setEditMerchant(null)
      toast.success("Merchant updated successfully")
    }, 500)
  }

  const handleCopyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success("API key copied to clipboard")
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/20 text-primary border-primary/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "suspended":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Merchants</h2>
            <p className="text-muted-foreground">Manage merchant accounts and settings</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Merchant
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Total Merchants</p>
            <p className="text-2xl font-bold text-foreground">{merchants.length}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-primary">
              {merchants.filter((m) => m.status === "active").length}
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-500">
              {merchants.filter((m) => m.status === "pending").length}
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">High Risk</p>
            <p className="text-2xl font-bold text-destructive">
              {merchants.filter((m) => m.riskLevel === "high").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 rounded-xl">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ID..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[140px]">
                  <Shield className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Merchants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredMerchants.map((merchant) => (
            <div
              key={merchant.id}
              className="glass-card p-5 rounded-xl hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{merchant.name}</h3>
                    <p className="text-sm text-muted-foreground">{merchant.email}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedMerchant(merchant)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setEditMerchant(merchant)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyApiKey(merchant.apiKey)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy API Key
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {merchant.status === "active" ? (
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleStatusChange(merchant.id, "suspended")}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Suspend
                      </DropdownMenuItem>
                    ) : merchant.status === "suspended" ? (
                      <DropdownMenuItem
                        className="text-primary"
                        onClick={() => handleStatusChange(merchant.id, "active")}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Reactivate
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className={cn("capitalize", getStatusColor(merchant.status))}>
                  {merchant.status}
                </Badge>
                <Badge variant="outline" className={cn("capitalize", getRiskColor(merchant.riskLevel))}>
                  {merchant.riskLevel} risk
                </Badge>
                <Badge variant="outline">{merchant.category}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Total Volume</p>
                  <p className="font-semibold text-foreground">{formatCurrency(merchant.totalVolume)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Transactions</p>
                  <p className="font-semibold text-foreground">{merchant.transactionCount.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Documents</span>
                  <div className="flex items-center gap-1">
                    {merchant.documents.map((doc, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          doc.verified ? "bg-primary" : "bg-muted"
                        )}
                        title={`${doc.type}: ${doc.verified ? "Verified" : "Pending"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMerchants.length === 0 && (
          <div className="glass-card p-8 rounded-xl text-center text-muted-foreground">
            No merchants found matching your criteria.
          </div>
        )}
      </div>

      {/* Merchant Detail Dialog */}
      <Dialog open={!!selectedMerchant} onOpenChange={() => setSelectedMerchant(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Merchant Details</DialogTitle>
            <DialogDescription>{selectedMerchant?.id}</DialogDescription>
          </DialogHeader>
          {selectedMerchant && (
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="integration">Integration</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedMerchant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedMerchant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className={cn("capitalize", getStatusColor(selectedMerchant.status))}>
                      {selectedMerchant.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <Badge variant="outline" className={cn("capitalize", getRiskColor(selectedMerchant.riskLevel))}>
                      {selectedMerchant.riskLevel}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{selectedMerchant.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">{formatDate(selectedMerchant.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Volume</p>
                    <p className="font-medium text-primary">{formatCurrency(selectedMerchant.totalVolume)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="font-medium">{selectedMerchant.transactionCount.toLocaleString()}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <div className="space-y-4">
                  {selectedMerchant.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <FileCheck className={cn("w-5 h-5", doc.verified ? "text-primary" : "text-muted-foreground")} />
                        <div>
                          <p className="font-medium">{doc.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.verified ? "Verified" : "Pending review"}
                          </p>
                        </div>
                      </div>
                      <Badge variant={doc.verified ? "default" : "outline"} className={doc.verified ? "bg-primary/20 text-primary" : ""}>
                        {doc.verified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="integration">
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">API Key</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={selectedMerchant.apiKey} readOnly className="font-mono text-sm" />
                      <Button variant="outline" size="icon" onClick={() => handleCopyApiKey(selectedMerchant.apiKey)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Webhook URL</Label>
                    <Input value={selectedMerchant.webhookUrl} readOnly className="font-mono text-sm mt-1" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedMerchant(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setSelectedMerchant(null)
                if (selectedMerchant) setEditMerchant(selectedMerchant)
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Merchant Dialog */}
      <Dialog open={!!editMerchant} onOpenChange={() => setEditMerchant(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Merchant</DialogTitle>
            <DialogDescription>Update merchant details and settings</DialogDescription>
          </DialogHeader>
          {editMerchant && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={editMerchant.name}
                  onChange={(e) => setEditMerchant({ ...editMerchant, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={editMerchant.email}
                  onChange={(e) => setEditMerchant({ ...editMerchant, email: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={editMerchant.status}
                  onValueChange={(value: typeof editMerchant.status) =>
                    setEditMerchant({ ...editMerchant, status: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Risk Level</Label>
                <Select
                  value={editMerchant.riskLevel}
                  onValueChange={(value: typeof editMerchant.riskLevel) =>
                    setEditMerchant({ ...editMerchant, riskLevel: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Webhook URL</Label>
                <Input
                  value={editMerchant.webhookUrl}
                  onChange={(e) => setEditMerchant({ ...editMerchant, webhookUrl: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMerchant(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={processing}>
              {processing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
