// Mock data for BUDPAY PRO dashboard

export interface Transaction {
  id: string
  type: "incoming" | "outgoing"
  amount: number
  currency: string
  status: "completed" | "pending" | "failed" | "processing"
  merchant: string
  merchantId: string
  timestamp: Date
  reference: string
  fee: number
  method: "bank" | "card" | "crypto" | "wallet"
}

export interface PaymentRequest {
  id: string
  merchant: string
  merchantId: string
  amount: number
  currency: string
  status: "pending" | "approved" | "rejected" | "processing"
  createdAt: Date
  type: "withdrawal" | "deposit" | "refund"
  description: string
  priority: "low" | "medium" | "high"
}

export interface Merchant {
  id: string
  name: string
  email: string
  status: "active" | "pending" | "suspended" | "inactive"
  riskLevel: "low" | "medium" | "high"
  totalVolume: number
  transactionCount: number
  createdAt: Date
  lastActive: Date
  documents: { type: string; verified: boolean }[]
  apiKey: string
  webhookUrl: string
  category: string
}

export interface SecurityLog {
  id: string
  action: string
  ip: string
  device: string
  location: string
  timestamp: Date
  status: "success" | "warning" | "blocked"
}

export interface Session {
  id: string
  device: string
  browser: string
  ip: string
  location: string
  lastActive: Date
  current: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  timestamp: Date
}

// Generate random ID
const generateId = () => Math.random().toString(36).substr(2, 9).toUpperCase()

// Generate mock transactions
export const generateTransactions = (count: number): Transaction[] => {
  const merchants = ["TechFlow Inc.", "CryptoTrade Ltd", "PayGlobal", "DigiPay", "FastMoney", "SecurePay", "GlobalTrans"]
  const methods: Transaction["method"][] = ["bank", "card", "crypto", "wallet"]
  const statuses: Transaction["status"][] = ["completed", "pending", "failed", "processing"]
  const currencies = ["USD", "EUR", "GBP", "BTC", "ETH"]

  return Array.from({ length: count }, (_, i) => {
    const amount = Math.random() * 50000 + 100
    return {
      id: `TXN-${generateId()}`,
      type: Math.random() > 0.5 ? "incoming" : "outgoing",
      amount: Math.round(amount * 100) / 100,
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      merchantId: `M-${generateId()}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      reference: `REF-${generateId()}`,
      fee: Math.round(amount * 0.015 * 100) / 100,
      method: methods[Math.floor(Math.random() * methods.length)],
    }
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Generate mock payment requests
export const generatePaymentRequests = (count: number): PaymentRequest[] => {
  const merchants = ["TechFlow Inc.", "CryptoTrade Ltd", "PayGlobal", "DigiPay", "FastMoney"]
  const statuses: PaymentRequest["status"][] = ["pending", "approved", "rejected", "processing"]
  const types: PaymentRequest["type"][] = ["withdrawal", "deposit", "refund"]
  const priorities: PaymentRequest["priority"][] = ["low", "medium", "high"]

  return Array.from({ length: count }, () => ({
    id: `REQ-${generateId()}`,
    merchant: merchants[Math.floor(Math.random() * merchants.length)],
    merchantId: `M-${generateId()}`,
    amount: Math.round((Math.random() * 100000 + 1000) * 100) / 100,
    currency: "USD",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000),
    type: types[Math.floor(Math.random() * types.length)],
    description: "Payment processing request",
    priority: priorities[Math.floor(Math.random() * priorities.length)],
  })).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

// Generate mock merchants
export const generateMerchants = (count: number): Merchant[] => {
  const names = ["TechFlow Inc.", "CryptoTrade Ltd", "PayGlobal Solutions", "DigiPay Corp", "FastMoney LLC", "SecurePay Inc", "GlobalTrans Ltd", "FinanceHub", "PayStream", "MoneyWise"]
  const categories = ["E-commerce", "Gaming", "SaaS", "Crypto Exchange", "Retail", "Financial Services"]
  const statuses: Merchant["status"][] = ["active", "pending", "suspended", "inactive"]
  const riskLevels: Merchant["riskLevel"][] = ["low", "medium", "high"]

  return names.slice(0, count).map((name) => ({
    id: `M-${generateId()}`,
    name,
    email: `contact@${name.toLowerCase().replace(/[^a-z]/g, "")}.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    totalVolume: Math.round(Math.random() * 5000000 + 100000),
    transactionCount: Math.floor(Math.random() * 10000 + 500),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
    documents: [
      { type: "Business License", verified: Math.random() > 0.3 },
      { type: "Tax Certificate", verified: Math.random() > 0.4 },
      { type: "Bank Statement", verified: Math.random() > 0.2 },
    ],
    apiKey: `bp_live_${generateId()}${generateId()}`,
    webhookUrl: `https://${name.toLowerCase().replace(/[^a-z]/g, "")}.com/webhooks/budpay`,
    category: categories[Math.floor(Math.random() * categories.length)],
  }))
}

// Generate security logs
export const generateSecurityLogs = (count: number): SecurityLog[] => {
  const actions = [
    "Login successful",
    "Password changed",
    "API key generated",
    "2FA enabled",
    "Failed login attempt",
    "Settings updated",
    "New device detected",
    "Suspicious activity blocked",
    "Webhook URL changed",
    "Withdrawal approved",
  ]
  const devices = ["Chrome on Windows", "Safari on macOS", "Firefox on Linux", "Mobile App iOS", "Mobile App Android"]
  const locations = ["New York, US", "London, UK", "Tokyo, JP", "Singapore, SG", "Frankfurt, DE"]
  const statuses: SecurityLog["status"][] = ["success", "warning", "blocked"]

  return Array.from({ length: count }, () => ({
    id: `LOG-${generateId()}`,
    action: actions[Math.floor(Math.random() * actions.length)],
    ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    device: devices[Math.floor(Math.random() * devices.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

// Generate sessions
export const generateSessions = (): Session[] => [
  {
    id: "sess_1",
    device: "Chrome on Windows",
    browser: "Chrome 120",
    ip: "192.168.1.1",
    location: "New York, US",
    lastActive: new Date(),
    current: true,
  },
  {
    id: "sess_2",
    device: "Safari on macOS",
    browser: "Safari 17",
    ip: "192.168.1.45",
    location: "London, UK",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    current: false,
  },
  {
    id: "sess_3",
    device: "Mobile App iOS",
    browser: "BUDPAY App 2.1",
    ip: "10.0.0.1",
    location: "Singapore, SG",
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    current: false,
  },
]

// Generate notifications
export const generateNotifications = (): Notification[] => [
  {
    id: "notif_1",
    title: "New payment request",
    message: "TechFlow Inc. submitted a request for $15,420",
    type: "info",
    read: false,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "notif_2",
    title: "Merchant verification",
    message: "CryptoTrade Ltd requires document review",
    type: "warning",
    read: false,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "notif_3",
    title: "High volume alert",
    message: "Transaction volume exceeded $2M today",
    type: "success",
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "notif_4",
    title: "Security alert",
    message: "New login from unknown device detected",
    type: "error",
    read: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
]

// Analytics data
export const analyticsData = {
  totalVolume: 2847563.42,
  totalVolumeChange: 12.5,
  transactions: 15847,
  transactionsChange: 8.2,
  activeMerchants: 342,
  activeMerchantsChange: 5.1,
  successRate: 98.7,
  successRateChange: 0.3,
}

// Chart data
export const volumeChartData = [
  { month: "Jan", volume: 1850000, transactions: 12400 },
  { month: "Feb", volume: 2100000, transactions: 14200 },
  { month: "Mar", volume: 1950000, transactions: 13100 },
  { month: "Apr", volume: 2400000, transactions: 15800 },
  { month: "May", volume: 2650000, transactions: 17200 },
  { month: "Jun", volume: 2847563, transactions: 15847 },
]

export const hourlyActivityData = [
  { hour: "00:00", transactions: 120 },
  { hour: "02:00", transactions: 85 },
  { hour: "04:00", transactions: 65 },
  { hour: "06:00", transactions: 145 },
  { hour: "08:00", transactions: 320 },
  { hour: "10:00", transactions: 480 },
  { hour: "12:00", transactions: 520 },
  { hour: "14:00", transactions: 590 },
  { hour: "16:00", transactions: 680 },
  { hour: "18:00", transactions: 720 },
  { hour: "20:00", transactions: 540 },
  { hour: "22:00", transactions: 280 },
]

// Format currency
export const formatCurrency = (amount: number, currency = "USD"): string => {
  if (currency === "BTC") return `${amount.toFixed(6)} BTC`
  if (currency === "ETH") return `${amount.toFixed(4)} ETH`
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Format relative time
export const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}
