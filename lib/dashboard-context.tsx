"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"
import {
  Transaction,
  PaymentRequest,
  Merchant,
  Notification,
  generateTransactions,
  generatePaymentRequests,
  generateMerchants,
  generateNotifications,
  analyticsData,
} from "@/lib/mock-data"

interface DashboardContextType {
  // Data
  transactions: Transaction[]
  paymentRequests: PaymentRequest[]
  merchants: Merchant[]
  notifications: Notification[]
  analytics: typeof analyticsData
  
  // Loading states
  loading: boolean
  
  // Search
  globalSearch: string
  setGlobalSearch: (search: string) => void
  searchResults: SearchResults | null
  
  // Actions
  approveRequest: (id: string) => void
  rejectRequest: (id: string) => void
  updateMerchant: (id: string, data: Partial<Merchant>) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  refreshData: () => void
  addTransaction: (tx: Transaction) => void
}

interface SearchResults {
  transactions: Transaction[]
  merchants: Merchant[]
  requests: PaymentRequest[]
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => generateTransactions(50))
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>(() => generatePaymentRequests(20))
  const [merchants, setMerchants] = useState<Merchant[]>(() => generateMerchants(10))
  const [notifications, setNotifications] = useState<Notification[]>(() => generateNotifications())
  const [loading, setLoading] = useState(false)
  const [globalSearch, setGlobalSearch] = useState("")
  const [analytics] = useState(analyticsData)

  // Compute search results
  const searchResults: SearchResults | null = globalSearch.length > 0
    ? {
        transactions: transactions.filter(
          (t) =>
            t.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
            t.merchant.toLowerCase().includes(globalSearch.toLowerCase()) ||
            t.reference.toLowerCase().includes(globalSearch.toLowerCase())
        ).slice(0, 5),
        merchants: merchants.filter(
          (m) =>
            m.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
            m.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
            m.id.toLowerCase().includes(globalSearch.toLowerCase())
        ).slice(0, 5),
        requests: paymentRequests.filter(
          (r) =>
            r.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
            r.merchant.toLowerCase().includes(globalSearch.toLowerCase())
        ).slice(0, 5),
      }
    : null

  const approveRequest = useCallback((id: string) => {
    setPaymentRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "approved" as const } : req
      )
    )
  }, [])

  const rejectRequest = useCallback((id: string) => {
    setPaymentRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "rejected" as const } : req
      )
    )
  }, [])

  const updateMerchant = useCallback((id: string, data: Partial<Merchant>) => {
    setMerchants((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...data } : m))
    )
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const refreshData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setTransactions(generateTransactions(50))
      setPaymentRequests(generatePaymentRequests(20))
      setLoading(false)
    }, 500)
  }, [])

  const addTransaction = useCallback((tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev])
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        paymentRequests,
        merchants,
        notifications,
        analytics,
        loading,
        globalSearch,
        setGlobalSearch,
        searchResults,
        approveRequest,
        rejectRequest,
        updateMerchant,
        markNotificationRead,
        markAllNotificationsRead,
        refreshData,
        addTransaction,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
