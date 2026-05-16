"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CreditCard,
  Users,
  ArrowDownLeft,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDashboard } from "@/lib/dashboard-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CreditCard, label: "Payments", href: "/payments", badge: "12" },
  { icon: ArrowDownLeft, label: "Requests", href: "/requests", badge: "5" },
  { icon: Users, label: "Merchants", href: "/merchants" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Shield, label: "Security", href: "/security" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

interface AdminSidebarProps {
  onNavigate?: () => void
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const pathname = usePathname()
  const { notifications } = useDashboard()
  
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out",
          "bg-sidebar border-r border-sidebar-border",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <Link href="/" className={cn("flex items-center gap-3", collapsed && "justify-center w-full")} onClick={onNavigate}>
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center neon-glow">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-green" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-foreground neon-text">BUDPAY PRO</h1>
                <p className="text-xs text-muted-foreground">Payment Gateway</p>
              </div>
            )}
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className={cn("text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", collapsed && "text-center")}>
            {collapsed ? "..." : "Main Menu"}
          </div>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  "hover:bg-sidebar-accent group relative",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-sidebar-foreground hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110",
                    isActive && "text-primary"
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/20 text-primary">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Link
            href="/notifications"
            onClick={onNavigate}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent relative",
              pathname === "/notifications" && "bg-primary/10 text-primary border border-primary/20",
              collapsed && "justify-center px-2"
            )}
          >
            <Bell className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left text-sm font-medium">Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-destructive/20 text-destructive">
                    {unreadCount}
                  </span>
                )}
              </>
            )}
            {collapsed && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold rounded-full bg-destructive text-destructive-foreground flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setHelpOpen(true)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent",
              collapsed && "justify-center px-2"
            )}
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="flex-1 text-left text-sm font-medium">Help Center</span>}
          </button>

          <button
            onClick={() => setLogoutOpen(true)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "text-sidebar-foreground hover:text-destructive hover:bg-destructive/10",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="flex-1 text-left text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </aside>

      {/* Logout Dialog */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of BUDPAY PRO? You will need to sign in again to access your dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutOpen(false)}>
              Cancel
            </Button>
            <Link href="/login">
              <Button variant="destructive">Logout</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Help Center</DialogTitle>
            <DialogDescription>
              Get support for BUDPAY PRO
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <h4 className="font-medium mb-1">Documentation</h4>
              <p className="text-sm text-muted-foreground">Browse our comprehensive API docs and guides.</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <h4 className="font-medium mb-1">Contact Support</h4>
              <p className="text-sm text-muted-foreground">support@budpay.pro</p>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <h4 className="font-medium mb-1">Live Chat</h4>
              <p className="text-sm text-muted-foreground">Available 24/7 for urgent issues.</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setHelpOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
