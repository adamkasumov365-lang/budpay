"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  User,
  Building,
  Bell,
  Palette,
  Key,
  Globe,
  Shield,
  CreditCard,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  Loader2,
  Upload,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [generateApiKey, setGenerateApiKey] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  
  // Profile state
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@budpay.pro",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    language: "en",
  })

  // Company state
  const [company, setCompany] = useState({
    name: "BUDPAY PRO",
    website: "https://budpay.pro",
    address: "123 Finance Street, New York, NY 10001",
    description: "Premium payment processing platform for modern businesses",
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailTransactions: true,
    emailMarketing: false,
    emailSecurity: true,
    pushTransactions: true,
    pushRequests: true,
    pushAlerts: true,
  })

  // API Keys
  const [apiKeys] = useState([
    { id: "1", name: "Production", key: "bp_live_sk_xxxxxxxxxxxx", created: "2024-01-15", lastUsed: "2024-05-20" },
    { id: "2", name: "Development", key: "bp_test_sk_xxxxxxxxxxxx", created: "2024-02-20", lastUsed: "2024-05-19" },
  ])

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast.success("Settings saved successfully")
    }, 1000)
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success("API key copied to clipboard")
  }

  const handleGenerateKey = () => {
    setGenerateApiKey(false)
    toast.success("New API key generated")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <p className="text-muted-foreground">Manage your account and platform settings</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-2">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company" className="gap-2">
              <Building className="w-4 h-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Key className="w-4 h-4" />
              API Keys
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-6">Profile Information</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-24 h-24 bg-primary/10 border-2 border-primary/20">
                    <AvatarFallback className="bg-transparent text-primary text-2xl font-bold">AD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <Select value={profile.timezone} onValueChange={(v) => setProfile({ ...profile, timezone: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Language</Label>
                    <Select value={profile.language} onValueChange={(v) => setProfile({ ...profile, language: v })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Company Settings */}
          <TabsContent value="company" className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-6">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Website</Label>
                  <Input
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <Input
                    value={company.address}
                    onChange={(e) => setCompany({ ...company, address: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={company.description}
                    onChange={(e) => setCompany({ ...company, description: e.target.value })}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-6">Billing Information</h3>
              <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="outline">Update</Button>
              </div>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-6">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Transaction Updates</p>
                    <p className="text-sm text-muted-foreground">Receive emails for completed transactions</p>
                  </div>
                  <Switch
                    checked={notifications.emailTransactions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailTransactions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified about security events</p>
                  </div>
                  <Switch
                    checked={notifications.emailSecurity}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailSecurity: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Marketing & News</p>
                    <p className="text-sm text-muted-foreground">Product updates and announcements</p>
                  </div>
                  <Switch
                    checked={notifications.emailMarketing}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-6">Push Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Transaction Alerts</p>
                    <p className="text-sm text-muted-foreground">Real-time transaction notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushTransactions}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushTransactions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Payment Requests</p>
                    <p className="text-sm text-muted-foreground">New payment request notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushRequests}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushRequests: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">System Alerts</p>
                    <p className="text-sm text-muted-foreground">Important system notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushAlerts: checked })}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-6">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 rounded-xl border-2 border-primary bg-primary/10 text-center transition-all">
                  <div className="w-full h-20 rounded-lg bg-zinc-900 mb-3 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Dark</span>
                </button>
                <button className="p-4 rounded-xl border-2 border-border hover:border-primary/50 text-center transition-all">
                  <div className="w-full h-20 rounded-lg bg-white mb-3 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Light</span>
                </button>
                <button className="p-4 rounded-xl border-2 border-border hover:border-primary/50 text-center transition-all">
                  <div className="w-full h-20 rounded-lg bg-gradient-to-b from-white to-zinc-900 mb-3 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">System</span>
                </button>
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-6">Accent Color</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Green", color: "bg-green-500" },
                  { name: "Blue", color: "bg-blue-500" },
                  { name: "Purple", color: "bg-purple-500" },
                  { name: "Orange", color: "bg-orange-500" },
                  { name: "Pink", color: "bg-pink-500" },
                  { name: "Cyan", color: "bg-cyan-500" },
                ].map((accent) => (
                  <button
                    key={accent.name}
                    className={cn(
                      "w-10 h-10 rounded-full transition-all",
                      accent.color,
                      accent.name === "Green" ? "ring-2 ring-offset-2 ring-offset-background ring-primary" : "hover:scale-110"
                    )}
                    title={accent.name}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* API Keys */}
          <TabsContent value="api" className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">API Keys</h3>
                  <p className="text-sm text-muted-foreground">Manage your API keys for integrations</p>
                </div>
                <Button onClick={() => setGenerateApiKey(true)}>
                  <Key className="w-4 h-4 mr-2" />
                  Generate New Key
                </Button>
              </div>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Key className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{apiKey.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-sm text-muted-foreground font-mono">
                            {showApiKey ? apiKey.key : apiKey.key.replace(/./g, "•").substring(0, 20) + "..."}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <p className="text-muted-foreground">Created: {apiKey.created}</p>
                        <p className="text-muted-foreground">Last used: {apiKey.lastUsed}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Webhooks</h3>
              <div className="space-y-4">
                <div>
                  <Label>Webhook URL</Label>
                  <Input
                    placeholder="https://your-domain.com/webhooks/budpay"
                    className="mt-1 font-mono"
                  />
                </div>
                <div>
                  <Label>Events</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["payment.completed", "payment.failed", "refund.created", "dispute.opened"].map((event) => (
                      <div key={event} className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <code className="text-sm text-muted-foreground">{event}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Generate API Key Dialog */}
      <Dialog open={generateApiKey} onOpenChange={setGenerateApiKey}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate New API Key</DialogTitle>
            <DialogDescription>
              Create a new API key for your integration. Make sure to copy it as it won&apos;t be shown again.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Key Name</Label>
              <Input placeholder="e.g., Production, Staging, Mobile App" className="mt-1" />
            </div>
            <div>
              <Label>Environment</Label>
              <Select defaultValue="live">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="live">Live (Production)</SelectItem>
                  <SelectItem value="test">Test (Sandbox)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGenerateApiKey(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateKey}>Generate Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
