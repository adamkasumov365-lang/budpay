"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { generateSecurityLogs, generateSessions, formatDate, formatRelativeTime, type SecurityLog, type Session } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Key,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Loader2,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function SecurityPage() {
  const [logs] = useState<SecurityLog[]>(() => generateSecurityLogs(30))
  const [sessions, setSessions] = useState<Session[]>(() => generateSessions())
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  
  // 2FA state
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [setup2FA, setSetup2FA] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const secret = "JBSWY3DPEHPK3PXP"

  // Session management
  const [revokeSession, setRevokeSession] = useState<Session | null>(null)
  const [revoking, setRevoking] = useState(false)

  // Password change
  const [changePassword, setChangePassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.toLowerCase().includes(search.toLowerCase()) ||
      log.device.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleEnable2FA = () => {
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit code")
      return
    }
    setVerifying(true)
    setTimeout(() => {
      setTwoFAEnabled(true)
      setSetup2FA(false)
      setVerifying(false)
      setOtpValue("")
      toast.success("Two-factor authentication enabled")
    }, 1500)
  }

  const handleDisable2FA = () => {
    setTwoFAEnabled(false)
    toast.success("Two-factor authentication disabled")
  }

  const handleRevokeSession = () => {
    if (!revokeSession) return
    setRevoking(true)
    setTimeout(() => {
      setSessions(sessions.filter((s) => s.id !== revokeSession.id))
      setRevoking(false)
      setRevokeSession(null)
      toast.success("Session revoked successfully")
    }, 1000)
  }

  const handleChangePassword = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error("Passwords do not match")
      return
    }
    if (passwordForm.new.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    setTimeout(() => {
      setChangePassword(false)
      setPasswordForm({ current: "", new: "", confirm: "" })
      toast.success("Password changed successfully")
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "blocked":
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-primary/20 text-primary border-primary/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "blocked":
        return "bg-destructive/20 text-destructive border-destructive/30"
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
            <h2 className="text-2xl font-bold text-foreground">Security</h2>
            <p className="text-muted-foreground">Manage security settings and monitor activity</p>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              {twoFAEnabled ? (
                <ShieldCheck className="w-5 h-5 text-primary" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-yellow-500" />
              )}
              <span className="text-sm text-muted-foreground">2FA Status</span>
            </div>
            <p className={cn("text-lg font-bold", twoFAEnabled ? "text-primary" : "text-yellow-500")}>
              {twoFAEnabled ? "Enabled" : "Disabled"}
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Monitor className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">Active Sessions</span>
            </div>
            <p className="text-lg font-bold text-foreground">{sessions.length}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Warnings</span>
            </div>
            <p className="text-lg font-bold text-yellow-500">
              {logs.filter((l) => l.status === "warning").length}
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="text-sm text-muted-foreground">Blocked</span>
            </div>
            <p className="text-lg font-bold text-destructive">
              {logs.filter((l) => l.status === "blocked").length}
            </p>
          </div>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="settings">Security Settings</TabsTrigger>
            <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>

          {/* Security Settings */}
          <TabsContent value="settings" className="space-y-6">
            {/* Two-Factor Authentication */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add an extra layer of security to your account using an authenticator app
                    </p>
                  </div>
                </div>
                <Switch
                  checked={twoFAEnabled}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSetup2FA(true)
                    } else {
                      handleDisable2FA()
                    }
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Key className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Password</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last changed 30 days ago. We recommend changing your password regularly.
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setChangePassword(true)}>
                  Change Password
                </Button>
              </div>
            </div>

            {/* Login Notifications */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Login Notifications</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get notified when your account is accessed from a new device or location
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          {/* Active Sessions */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out all
                </Button>
              </div>
              <div className="divide-y divide-border">
                {sessions.map((session) => (
                  <div key={session.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                        {session.device.includes("Mobile") ? (
                          <Smartphone className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Monitor className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{session.device}</p>
                          {session.current && (
                            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span>{session.browser}</span>
                          <span>•</span>
                          <span>{session.ip}</span>
                          <span>•</span>
                          <span>{session.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-foreground">{formatRelativeTime(session.lastActive)}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(session.lastActive)}</p>
                      </div>
                      {!session.current && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => setRevokeSession(session)}
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Activity Logs */}
          <TabsContent value="logs" className="space-y-6">
            {/* Filters */}
            <div className="glass-card p-4 rounded-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    className="pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Logs Table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Action</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="border-border hover:bg-card/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getStatusIcon(log.status)}
                          <span className="font-medium text-foreground">{log.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-foreground">{log.device}</span>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm text-muted-foreground">{log.ip}</code>
                      </TableCell>
                      <TableCell>
                        <span className="text-foreground">{log.location}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("capitalize", getStatusColor(log.status))}>
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-foreground">{formatRelativeTime(log.timestamp)}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 2FA Setup Dialog */}
      <Dialog open={setup2FA} onOpenChange={setSetup2FA}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app or enter the secret key manually
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                QR Code
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">Secret Key</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  value={showSecret ? secret : "••••••••••••••••"}
                  readOnly
                  className="font-mono"
                />
                <Button variant="outline" size="icon" onClick={() => setShowSecret(!showSecret)}>
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => {
                  navigator.clipboard.writeText(secret)
                  toast.success("Secret copied")
                }}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label>Enter verification code</Label>
              <div className="flex justify-center mt-2">
                <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSetup2FA(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnable2FA} disabled={verifying || otpValue.length !== 6}>
              {verifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Verify & Enable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={changePassword} onOpenChange={setChangePassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your current password and a new password</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={passwordForm.new}
                onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangePassword(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Session Confirmation */}
      <AlertDialog open={!!revokeSession} onOpenChange={() => setRevokeSession(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke this session? The device will be signed out immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevokeSession} className="bg-destructive hover:bg-destructive/90">
              {revoking ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
