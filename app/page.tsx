"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AnalyticsCards } from "@/components/dashboard/analytics-cards"
import { PaymentRequisitesForm } from "@/components/dashboard/payment-requisites-form"
import { SendPaymentForm } from "@/components/dashboard/send-payment-form"
import { IncomingRequestsTable } from "@/components/dashboard/incoming-requests-table"
import { LiveTransactions } from "@/components/dashboard/live-transactions"
import { MerchantManagement } from "@/components/dashboard/merchant-management"
import { TransactionStatusWidget } from "@/components/dashboard/transaction-status"
import { VolumeChart, TransactionsChart } from "@/components/dashboard/charts"

export default function DashboardPage() {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  )
}
