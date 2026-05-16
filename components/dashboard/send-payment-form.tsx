"use client"

import { useState } from "react"
import {
  Send,
  User,
  CreditCard,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "USDT", symbol: "₮", name: "Tether" },
  { code: "BTC", symbol: "₿", name: "Bitcoin" },
]

const paymentMethods = [
  { id: "bank", name: "Bank Transfer", icon: "🏦" },
  { id: "card", name: "Card Payment", icon: "💳" },
  { id: "crypto", name: "Cryptocurrency", icon: "🪙" },
  { id: "wallet", name: "Digital Wallet", icon: "📱" },
]

export function SendPaymentForm() {
  const [currency, setCurrency] = useState("USD")
  const [paymentMethod, setPaymentMethod] = useState("bank")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [reference, setReference] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const selectedCurrency = currencies.find(c => c.code === currency)
  const fee = amount ? (parseFloat(amount) * 0.015).toFixed(2) : "0.00"
  const total = amount ? (parseFloat(amount) + parseFloat(fee)).toFixed(2) : "0.00"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false)
      setAmount("")
      setRecipient("")
      setAccountNumber("")
      setReference("")
    }, 3000)
  }

  if (isSuccess) {
    return (
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 neon-glow">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Payment Initiated</h3>
          <p className="text-muted-foreground mb-4">
            Your payment of {selectedCurrency?.symbol}{amount} has been submitted successfully.
          </p>
          <p className="text-sm text-muted-foreground">
            Transaction ID: <span className="text-primary font-mono">TXN-{Date.now().toString(36).toUpperCase()}</span>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Send className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Send Payment</h3>
            <p className="text-sm text-muted-foreground">Transfer funds securely</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Payment Method */}
        <div className="space-y-2">
          <Label className="text-foreground">Payment Method</Label>
          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  paymentMethod === method.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-input hover:border-primary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-lg mr-2">{method.icon}</span>
                <span className="text-sm font-medium">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount and Currency */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-foreground">Amount</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 bg-input border-border focus:border-primary h-12 text-lg font-semibold"
                required
                min="0.01"
                step="0.01"
              />
            </div>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-28 bg-input border-border h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    <span className="font-medium">{curr.code}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recipient */}
        <div className="space-y-2">
          <Label htmlFor="recipient" className="text-foreground">Recipient Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="recipient"
              type="text"
              placeholder="John Doe or Company Name"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="pl-10 bg-input border-border focus:border-primary h-12"
              required
            />
          </div>
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <Label htmlFor="accountNumber" className="text-foreground">
            {paymentMethod === "crypto" ? "Wallet Address" : "Account Number"}
          </Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="accountNumber"
              type="text"
              placeholder={paymentMethod === "crypto" ? "0x..." : "Enter account number"}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="pl-10 bg-input border-border focus:border-primary h-12 font-mono"
              required
            />
          </div>
        </div>

        {/* Reference */}
        <div className="space-y-2">
          <Label htmlFor="reference" className="text-foreground">Reference / Memo</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Textarea
              id="reference"
              placeholder="Payment reference or memo..."
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="pl-10 bg-input border-border focus:border-primary min-h-[80px] resize-none"
            />
          </div>
        </div>

        {/* Fee Summary */}
        {amount && parseFloat(amount) > 0 && (
          <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-foreground">{selectedCurrency?.symbol}{parseFloat(amount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing Fee (1.5%)</span>
              <span className="text-foreground">{selectedCurrency?.symbol}{fee}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{selectedCurrency?.symbol}{total}</span>
              </div>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-warning">
            Please verify all payment details before submitting. Transactions cannot be reversed once processed.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !amount || !recipient || !accountNumber}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Payment
            </div>
          )}
        </Button>
      </form>
    </div>
  )
}
