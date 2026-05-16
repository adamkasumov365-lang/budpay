"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useDashboard } from "@/lib/dashboard-context"
import { formatCurrency, formatDate } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  FileImage,
  Clock,
  CheckCircle,
  Loader2,
  Plus,
  Eye,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Report {
  id: string
  name: string
  type: "transactions" | "merchants" | "analytics" | "security"
  format: "csv" | "pdf" | "xlsx"
  dateRange: string
  createdAt: Date
  status: "ready" | "generating" | "failed"
  size: string
}

const mockReports: Report[] = [
  {
    id: "RPT-001",
    name: "Monthly Transactions Report",
    type: "transactions",
    format: "csv",
    dateRange: "May 2024",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "ready",
    size: "2.4 MB",
  },
  {
    id: "RPT-002",
    name: "Merchant Performance Q2",
    type: "merchants",
    format: "pdf",
    dateRange: "Q2 2024",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "ready",
    size: "1.8 MB",
  },
  {
    id: "RPT-003",
    name: "Weekly Analytics Summary",
    type: "analytics",
    format: "xlsx",
    dateRange: "Week 22",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "ready",
    size: "856 KB",
  },
  {
    id: "RPT-004",
    name: "Security Audit Log",
    type: "security",
    format: "pdf",
    dateRange: "May 2024",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "ready",
    size: "3.2 MB",
  },
]

export default function ReportsPage() {
  const { transactions, merchants } = useDashboard()
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [createOpen, setCreateOpen] = useState(false)
  const [previewReport, setPreviewReport] = useState<Report | null>(null)
  const [generating, setGenerating] = useState(false)

  // Create report form state
  const [reportType, setReportType] = useState<string>("transactions")
  const [reportFormat, setReportFormat] = useState<string>("csv")
  const [dateRange, setDateRange] = useState<string>("30d")
  const [includeCharts, setIncludeCharts] = useState(false)

  const handleCreateReport = () => {
    setGenerating(true)
    
    setTimeout(() => {
      const newReport: Report = {
        id: `RPT-${String(reports.length + 1).padStart(3, "0")}`,
        name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
        type: reportType as Report["type"],
        format: reportFormat as Report["format"],
        dateRange: dateRange === "7d" ? "Last 7 days" : dateRange === "30d" ? "Last 30 days" : dateRange === "90d" ? "Last 90 days" : "Last year",
        createdAt: new Date(),
        status: "ready",
        size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
      }
      
      setReports([newReport, ...reports])
      setGenerating(false)
      setCreateOpen(false)
      toast.success("Report generated successfully")
    }, 2000)
  }

  const handleDownload = (report: Report, format: "csv" | "pdf") => {
    if (format === "csv") {
      // Generate CSV content
      const headers = ["ID", "Type", "Amount", "Currency", "Status", "Merchant", "Date"]
      const rows = transactions.slice(0, 100).map((tx) => [
        tx.id,
        tx.type,
        tx.amount,
        tx.currency,
        tx.status,
        tx.merchant,
        formatDate(tx.timestamp),
      ])
      
      const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${report.name.toLowerCase().replace(/\s+/g, "-")}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } else {
      // For PDF, we'd normally use a library like jspdf
      // For demo, just show a toast
      toast.success(`${report.name} downloaded as PDF`)
    }
    
    toast.success(`${report.name} downloaded`)
  }

  const handleDelete = (id: string) => {
    setReports(reports.filter((r) => r.id !== id))
    toast.success("Report deleted")
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "csv":
        return <FileSpreadsheet className="w-4 h-4 text-green-500" />
      case "pdf":
        return <FileImage className="w-4 h-4 text-red-500" />
      case "xlsx":
        return <FileSpreadsheet className="w-4 h-4 text-blue-500" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "transactions":
        return "bg-primary/20 text-primary border-primary/30"
      case "merchants":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      case "analytics":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30"
      case "security":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Reports</h2>
            <p className="text-muted-foreground">Generate and export detailed reports</p>
          </div>
          <Button onClick={() => setCreateOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold text-foreground">{reports.length}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-primary">
              {reports.filter((r) => r.createdAt.getMonth() === new Date().getMonth()).length}
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Total Size</p>
            <p className="text-2xl font-bold text-foreground">
              {reports.reduce((sum, r) => sum + parseFloat(r.size), 0).toFixed(1)} MB
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Exports Today</p>
            <p className="text-2xl font-bold text-foreground">12</p>
          </div>
        </div>

        {/* Report Templates */}
        <div className="glass-card p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Export</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => {
                setReportType("transactions")
                setCreateOpen(true)
              }}
            >
              <FileText className="w-6 h-6 text-primary" />
              <span>Transactions</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => {
                setReportType("merchants")
                setCreateOpen(true)
              }}
            >
              <FileText className="w-6 h-6 text-blue-500" />
              <span>Merchants</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => {
                setReportType("analytics")
                setCreateOpen(true)
              }}
            >
              <FileText className="w-6 h-6 text-purple-500" />
              <span>Analytics</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => {
                setReportType("security")
                setCreateOpen(true)
              }}
            >
              <FileText className="w-6 h-6 text-yellow-500" />
              <span>Security</span>
            </Button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Report</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="border-border hover:bg-card/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getFormatIcon(report.format)}
                      <div>
                        <p className="font-medium text-foreground">{report.name}</p>
                        <p className="text-xs text-muted-foreground uppercase">{report.format}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn("px-2 py-1 text-xs rounded-full capitalize border", getTypeColor(report.type))}>
                      {report.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">{report.dateRange}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">{formatDate(report.createdAt)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">{report.size}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {report.status === "ready" ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : report.status === "generating" ? (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="capitalize text-sm">{report.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewReport(report)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(report, "csv")}
                        disabled={report.status !== "ready"}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(report.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Report Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Report</DialogTitle>
            <DialogDescription>Configure and generate a new report</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="merchants">Merchants</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Format</Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {reportFormat === "pdf" && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="charts"
                  checked={includeCharts}
                  onCheckedChange={(checked) => setIncludeCharts(!!checked)}
                />
                <Label htmlFor="charts" className="cursor-pointer">Include charts and visualizations</Label>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReport} disabled={generating}>
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                "Generate Report"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewReport} onOpenChange={() => setPreviewReport(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewReport?.name}</DialogTitle>
            <DialogDescription>Report preview and download options</DialogDescription>
          </DialogHeader>
          {previewReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{previewReport.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Format</p>
                  <p className="font-medium uppercase">{previewReport.format}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Range</p>
                  <p className="font-medium">{previewReport.dateRange}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-medium">{previewReport.size}</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Report Summary</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{transactions.length}</p>
                    <p className="text-xs text-muted-foreground">Records</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(transactions.reduce((s, t) => s + t.amount, 0))}</p>
                    <p className="text-xs text-muted-foreground">Total Volume</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{merchants.length}</p>
                    <p className="text-xs text-muted-foreground">Merchants</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setPreviewReport(null)}>
              Close
            </Button>
            <Button variant="outline" onClick={() => previewReport && handleDownload(previewReport, "csv")}>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button onClick={() => previewReport && handleDownload(previewReport, "pdf")}>
              <FileImage className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
