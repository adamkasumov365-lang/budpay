"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const volumeData = [
  { name: "Jan", volume: 1240000, transactions: 12400 },
  { name: "Feb", volume: 1580000, transactions: 15800 },
  { name: "Mar", volume: 1420000, transactions: 14200 },
  { name: "Apr", volume: 2100000, transactions: 21000 },
  { name: "May", volume: 1890000, transactions: 18900 },
  { name: "Jun", volume: 2340000, transactions: 23400 },
  { name: "Jul", volume: 2780000, transactions: 27800 },
  { name: "Aug", volume: 2450000, transactions: 24500 },
  { name: "Sep", volume: 2890000, transactions: 28900 },
  { name: "Oct", volume: 3120000, transactions: 31200 },
  { name: "Nov", volume: 2980000, transactions: 29800 },
  { name: "Dec", volume: 3450000, transactions: 34500 },
]

const hourlyData = [
  { hour: "00:00", value: 1200 },
  { hour: "04:00", value: 800 },
  { hour: "08:00", value: 2400 },
  { hour: "12:00", value: 4200 },
  { hour: "16:00", value: 3800 },
  { hour: "20:00", value: 2900 },
  { hour: "24:00", value: 1800 },
]

export function VolumeChart() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Payment Volume</h3>
        <p className="text-sm text-muted-foreground">Monthly transaction volume overview</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={volumeData}>
            <defs>
              <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.8 0.22 145)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="oklch(0.8 0.22 145)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.12 0.005 240)",
                border: "1px solid oklch(0.22 0.01 240)",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "oklch(0.95 0 0)" }}
              itemStyle={{ color: "oklch(0.8 0.22 145)" }}
              formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Volume"]}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="oklch(0.8 0.22 145)"
              strokeWidth={2}
              fill="url(#volumeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function TransactionsChart() {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Hourly Activity</h3>
        <p className="text-sm text-muted-foreground">Transaction distribution by hour</p>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.12 0.005 240)",
                border: "1px solid oklch(0.22 0.01 240)",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "oklch(0.95 0 0)" }}
              itemStyle={{ color: "oklch(0.8 0.22 145)" }}
              formatter={(value: number) => [value.toLocaleString(), "Transactions"]}
            />
            <Bar
              dataKey="value"
              fill="oklch(0.8 0.22 145)"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
