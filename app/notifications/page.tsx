"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useDashboard } from "@/lib/dashboard-context"
import { formatRelativeTime } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Check,
  CheckCheck,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDashboard()

  const unreadCount = notifications.filter((n) => !n.read).length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-primary" />
      case "error":
        return <XCircle className="w-5 h-5 text-destructive" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-500/10 border-blue-500/20"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20"
      case "success":
        return "bg-primary/10 border-primary/20"
      case "error":
        return "bg-destructive/10 border-destructive/20"
      default:
        return "bg-card"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
            <p className="text-muted-foreground">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={() => {
              markAllNotificationsRead()
              toast.success("All notifications marked as read")
            }}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Unread</p>
            <p className="text-2xl font-bold text-primary">{unreadCount}</p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Warnings</p>
            <p className="text-2xl font-bold text-yellow-500">
              {notifications.filter((n) => n.type === "warning").length}
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">Errors</p>
            <p className="text-2xl font-bold text-destructive">
              {notifications.filter((n) => n.type === "error").length}
            </p>
          </div>
        </div>

        {/* Notifications List */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">All Notifications</h3>
          </div>
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 flex items-start gap-4 transition-colors cursor-pointer hover:bg-card/50",
                  !notification.read && getTypeColor(notification.type)
                )}
                onClick={() => {
                  if (!notification.read) {
                    markNotificationRead(notification.id)
                  }
                }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={cn("font-medium", !notification.read ? "text-foreground" : "text-muted-foreground")}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formatRelativeTime(notification.timestamp)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        markNotificationRead(notification.id)
                        toast.success("Marked as read")
                      }}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
