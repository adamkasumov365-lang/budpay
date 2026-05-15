"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Check, Wallet, Building2, Hash, Globe } from "lucide-react"

export function PaymentRequisitesForm() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const requisites = {
    accountNumber: "4829 3847 2938 4721",
    routingNumber: "021000021",
    swift: "BUDPUSNY",
    iban: "US89 3704 0044 0532 0130 00",
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-lg bg-primary/10">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Payment Requisites</h3>
          <p className="text-sm text-muted-foreground">Configure payment details</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Currency Selection */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Currency</Label>
          <Select defaultValue="usd">
            <SelectTrigger className="bg-input border-border hover:border-primary/50 focus:border-primary transition-colors">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD - US Dollar</SelectItem>
              <SelectItem value="eur">EUR - Euro</SelectItem>
              <SelectItem value="gbp">GBP - British Pound</SelectItem>
              <SelectItem value="btc">BTC - Bitcoin</SelectItem>
              <SelectItem value="eth">ETH - Ethereum</SelectItem>
              <SelectItem value="usdt">USDT - Tether</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground flex items-center gap-2">
            <CreditCardIcon className="w-4 h-4" />
            Account Number
          </Label>
          <div className="relative">
            <Input
              value={requisites.accountNumber}
              readOnly
              className="bg-input border-border pr-10 font-mono"
            />
            <button
              onClick={() => handleCopy(requisites.accountNumber, "account")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {copied === "account" ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Routing Number */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Routing Number
          </Label>
          <div className="relative">
            <Input
              value={requisites.routingNumber}
              readOnly
              className="bg-input border-border pr-10 font-mono"
            />
            <button
              onClick={() => handleCopy(requisites.routingNumber, "routing")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {copied === "routing" ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* SWIFT Code */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground flex items-center gap-2">
            <Globe className="w-4 h-4" />
            SWIFT Code
          </Label>
          <div className="relative">
            <Input
              value={requisites.swift}
              readOnly
              className="bg-input border-border pr-10 font-mono"
            />
            <button
              onClick={() => handleCopy(requisites.swift, "swift")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {copied === "swift" ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* IBAN */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground flex items-center gap-2">
            <Hash className="w-4 h-4" />
            IBAN
          </Label>
          <div className="relative">
            <Input
              value={requisites.iban}
              readOnly
              className="bg-input border-border pr-10 font-mono text-sm"
            />
            <button
              onClick={() => handleCopy(requisites.iban, "iban")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {copied === "iban" ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 neon-glow">
            Generate New Requisites
          </Button>
          <Button variant="outline" className="border-border hover:border-primary/50 hover:bg-primary/10">
            Export
          </Button>
        </div>
      </div>
    </div>
  )
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}
