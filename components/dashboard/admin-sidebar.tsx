"use client"

import { useState } from "react"
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

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CreditCard, label: "Payments", badge: "12" },
  { icon: ArrowDownLeft, label: "Requests", badge: "5" },
  { icon: Users, label: "Merchants" },
  { icon: BarChart3, label: "Analytics" },
  { icon: FileText, label: "Reports" },
  { icon: Shield, label: "Security" },
  { icon: Settings, label: "Settings" },
]

const bottomItems = [
  { icon: Bell, label: "Notifications", badge: "3" },
  { icon: HelpCircle, label: "Help Center" },
  { icon: LogOut, label: "Logout" },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
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
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className={cn("text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4", collapsed && "text-center")}>
          {collapsed ? "•" : "Main Menu"}
        </div>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "hover:bg-sidebar-accent group relative",
              item.active
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-sidebar-foreground hover:text-foreground",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5 flex-shrink-0",
                item.active && "text-primary"
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
          </button>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
              "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent relative",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-destructive/20 text-destructive">
                    {item.badge}
                  </span>
                )}
              </>
            )}
            {collapsed && item.badge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold rounded-full bg-destructive text-destructive-foreground flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
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
  )
}
