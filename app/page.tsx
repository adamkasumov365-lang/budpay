"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/dashboard/admin-sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { AnalyticsCards } from "@/components/dashboard/analytics-cards"
import { PaymentRequisitesForm } from "@/components/dashboard/payment-requisites-form"
import { SendPaymentForm } from "@/components/dashboard/send-payment-form"
import { IncomingRequestsTable } from "@/components/dashboard/incoming-requests-table"
import { LiveTransactions } from "@/components/dashboard/live-transactions"
import { MerchantManagement } from "@/components/dashboard/merchant-management"
import { TransactionStatusWidget } from "@/components/dashboard/transaction-status"
import { VolumeChart, TransactionsChart } from "@/components/dashboard/charts"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 lg:hidden transform transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="lg:pl-64 transition-all duration-300">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-4 lg:p-6 space-y-6">
          {/* Analytics Cards */}
          <AnalyticsCards />

          {/* Main Grid - Charts and Live Data */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <VolumeChart />
            </div>
            <div>
              <LiveTransactions />
            </div>
          </div>

          {/* Secondary Grid - Forms and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <PaymentRequisitesForm />
            </div>
            <div>
              <SendPaymentForm />
            </div>
            <div>
              <TransactionStatusWidget />
            </div>
          </div>

          {/* Hourly Activity Chart */}
          <TransactionsChart />

          {/* Incoming Requests Table */}
          <IncomingRequestsTable />

          {/* Merchant Management */}
          <MerchantManagement />

          {/* Footer */}
          <footer className="pt-6 pb-4 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>&copy; 2024 BUDPAY PRO. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">API Documentation</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
