import { motion } from "framer-motion";
import { AreaChart } from "@/components/charts/AreaChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Landmark, Plus, ArrowRightLeft, TrendingUp } from "lucide-react";
import { formatCompactCurrency, formatPercent } from "@/lib/format";

const products = [
  { id: "1", name: "ESN Sovereign Note 2027", type: "Government Bond", issuer: "US Treasury (Tokenized)", faceValue: 5000000000, yieldRate: 5.2, maturity: "2027-11-15", rating: "AAA", status: "Active", available: 1200000000 },
  { id: "2", name: "Infrastructure Revenue Bond", type: "Municipal", issuer: "NY Port Authority", faceValue: 2300000000, yieldRate: 6.1, maturity: "2032-05-01", rating: "AA+", status: "Active", available: 450000000 },
  { id: "3", name: "Green Climate Fund Sukuk", type: "Islamic Finance", issuer: "GCF", faceValue: 1800000000, yieldRate: 5.8, maturity: "2029-08-20", rating: "AA", status: "Pending", available: 1800000000 },
  { id: "4", name: "Digital Asset-Backed Security", type: "ABS", issuer: "Goldman Sachs", faceValue: 890000000, yieldRate: 7.2, maturity: "2025-12-01", rating: "A+", status: "Active", available: 50000000 },
  { id: "5", name: "Tokenized T-Bill Fund", type: "Money Market", issuer: "BlackRock", faceValue: 10000000000, yieldRate: 4.9, maturity: "Rolling", rating: "AAA", status: "Active", available: 3400000000 },
  { id: "6", name: "Private Credit CLO Tranche A", type: "CLO", issuer: "Apollo", faceValue: 650000000, yieldRate: 8.1, maturity: "2028-03-15", rating: "AA", status: "Fully Subscribed", available: 0 },
];

const yieldCurveData = [
  { maturity: "1mo", yield: 5.4 },
  { maturity: "3mo", yield: 5.45 },
  { maturity: "6mo", yield: 5.38 },
  { maturity: "1yr", yield: 5.2 },
  { maturity: "2yr", yield: 4.8 },
  { maturity: "5yr", yield: 4.3 },
  { maturity: "10yr", yield: 4.15 },
  { maturity: "30yr", yield: 4.35 },
];

const allocationData = [
  { name: "Sovereign Wealth Funds", value: 45 },
  { name: "Central Banks", value: 25 },
  { name: "Pension Funds", value: 20 },
  { name: "Family Offices", value: 10 },
];

export function Treasury() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Landmark className="text-primary" />
            Treasury Tokenization
          </h1>
          <p className="text-sm text-muted-foreground">T+0 settlement for institutional fixed income products</p>
        </div>
        
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan border-none">
          <Plus size={16} />
          Issue Treasury Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Portfolio" value={234100000000} prefix="$" trend={{ value: 4.2, isPositive: true }} delay={0.1} />
        <KpiCard title="Weighted Avg Yield" value={5.42} suffix="%" trend={{ value: 0.15, isPositive: true }} delay={0.2} />
        <KpiCard title="Duration Risk" value={4.2} suffix=" yrs" trend={{ value: 0.3, isPositive: false }} delay={0.3} />
        <KpiCard title="Maturing (30d)" value={12400000000} prefix="$" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 glass-dark rounded-xl border border-border p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">US Treasury Yield Curve</h2>
              <p className="text-sm text-muted-foreground">Tokenized market implied rates</p>
            </div>
            <div className="text-sm font-mono text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Inverted Curve Detected
            </div>
          </div>
          <div className="h-[250px]">
            <AreaChart 
              data={yieldCurveData} 
              dataKey="yield" 
              xAxisKey="maturity" 
              gradientId="yieldCurve"
              strokeColor="hsl(var(--chart-3))"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Investor Allocation</h2>
          <div className="flex-1 min-h-[200px]">
            <DonutChart 
              data={allocationData} 
              dataKey="value" 
              nameKey="name"
              formatter={(val) => `${val}%`}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {allocationData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-chart-${(i%5)+1}`} />
                <span className="text-muted-foreground truncate">{d.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="glass-dark rounded-xl border border-border overflow-hidden"
      >
        <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
          <h2 className="text-lg font-semibold text-foreground">Treasury Marketplace</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-border">Filter</Button>
            <Button variant="outline" size="sm" className="border-border">Export</Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Issuer</th>
                <th className="px-6 py-4 font-medium text-right">Face Value</th>
                <th className="px-6 py-4 font-medium text-right">Yield</th>
                <th className="px-6 py-4 font-medium">Maturity</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.type}</p>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{product.issuer}</td>
                  <td className="px-6 py-4 font-mono text-right">{formatCompactCurrency(product.faceValue)}</td>
                  <td className="px-6 py-4 font-mono text-right text-emerald-500 font-medium">{product.yieldRate}%</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{product.maturity}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-muted text-xs font-bold font-mono">{product.rating}</span>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={product.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" variant="ghost" className="hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Allocate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
