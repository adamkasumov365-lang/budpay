"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Search, Menu, X, ArrowRight, CreditCard, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDashboard } from "@/lib/dashboard-context"
import { formatCurrency, formatRelativeTime } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

const pageNames: Record<string, string> = {
  "/": "Dashboard",
  "/payments": "Payments",
  "/requests": "Payment Requests",
  "/merchants": "Merchants",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/security": "Security",
  "/settings": "Settings",
  "/notifications": "Notifications",
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { notifications, markNotificationRead, markAllNotificationsRead, globalSearch, setGlobalSearch, searchResults } = useDashboard()
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  
  const unreadNotifications = notifications.filter((n) => !n.read)
  const pageName = pageNames[pathname] || "Dashboard"

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchResultClick = (href: string) => {
    setSearchOpen(false)
    setGlobalSearch("")
    router.push(href)
  }

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-foreground">{pageName}</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, Admin
            </p>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions, merchants..."
              className="pl-10 bg-input border-border focus:border-primary"
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => setSearchOpen(true)}
            />
            {globalSearch && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setGlobalSearch("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchOpen && searchResults && (searchResults.transactions.length > 0 || searchResults.merchants.length > 0 || searchResults.requests.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg border border-border bg-popover shadow-xl z-50 max-h-96 overflow-y-auto">
              {searchResults.transactions.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-muted-foreground">
                    <span>Transactions</span>
                    <CreditCard className="w-3 h-3" />
                  </div>
                  {searchResults.transactions.map((tx) => (
                    <button
                      key={tx.id}
                      onClick={() => handleSearchResultClick("/payments")}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-medium">{tx.id}</p>
                        <p className="text-xs text-muted-foreground">{tx.merchant}</p>
                      </div>
                      <span className={cn(
                        "text-sm font-medium",
                        tx.type === "incoming" ? "text-primary" : "text-foreground"
                      )}>
                        {tx.type === "incoming" ? "+" : "-"}{formatCurrency(tx.amount, tx.currency)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {searchResults.merchants.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-muted-foreground">
                    <span>Merchants</span>
                    <Users className="w-3 h-3" />
                  </div>
                  {searchResults.merchants.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSearchResultClick("/merchants")}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.email}</p>
                      </div>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        m.status === "active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        {m.status}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {searchResults.requests.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-muted-foreground">
                    <span>Requests</span>
                    <FileText className="w-3 h-3" />
                  </div>
                  {searchResults.requests.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleSearchResultClick("/requests")}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-medium">{r.id}</p>
                        <p className="text-xs text-muted-foreground">{r.merchant}</p>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(r.amount)}</span>
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => handleSearchResultClick("/payments")}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-sm font-medium"
              >
                View all results
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-2">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                {unreadNotifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto text-xs text-primary hover:text-primary"
                    onClick={() => markAllNotificationsRead()}
                  >
                    Mark all read
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator />
              {notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex flex-col items-start gap-1 py-3 cursor-pointer",
                    !notification.read && "bg-primary/5"
                  )}
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      notification.type === "info" && "bg-blue-500",
                      notification.type === "warning" && "bg-yellow-500",
                      notification.type === "success" && "bg-primary",
                      notification.type === "error" && "bg-destructive"
                    )} />
                    <span className="font-medium flex-1">{notification.title}</span>
                    <span className="text-xs text-muted-foreground">{formatRelativeTime(notification.timestamp)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground pl-4">
                    {notification.message}
                  </span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <Link href="/notifications" className="block">
                <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="w-8 h-8 bg-primary/10 border border-primary/20">
                  <AvatarFallback className="bg-transparent text-primary text-sm font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">Admin User</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer">Profile Settings</DropdownMenuItem>
              </Link>
              <Link href="/security">
                <DropdownMenuItem className="cursor-pointer">Security</DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer">API Keys</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/login">
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
