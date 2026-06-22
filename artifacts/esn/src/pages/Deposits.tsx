import { motion } from "framer-motion";
import { Landmark, Plus, ArrowRightLeft, Percent, Layers, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCompactCurrency } from "@/lib/format";
import { StatusBadge } from "@/components/ui/StatusBadge";

const pools = [
  { id: "1", name: "USD Prime Liquidity", currency: "USD", total: 45200000000, utilization: 67, apy: 4.8, participants: 24, rails: ["FedWire", "SWIFT", "Blockchain"] },
  { id: "2", name: "EUR Settlement Pool", currency: "EUR", total: 28900000000, utilization: 54, apy: 4.2, participants: 18, rails: ["SEPA", "SWIFT", "Blockchain"] },
  { id: "3", name: "GBP Institutional Pool", currency: "GBP", total: 18300000000, utilization: 71, apy: 4.6, participants: 12, rails: ["CHAPS", "Blockchain"] },
  { id: "4", name: "SGD Regional Hub", currency: "SGD", total: 8400000000, utilization: 48, apy: 5.1, participants: 9, rails: ["MEPS+", "Blockchain"] },
];

const issuances = [
  { id: "1", issuer: "JPMorgan Chase", amount: 500000000, currency: "USD", status: "Settled", date: "2 mins ago", rail: "Blockchain" },
  { id: "2", issuer: "Société Générale", amount: 250000000, currency: "EUR", status: "Processing", date: "14 mins ago", rail: "SEPA Integration" },
  { id: "3", issuer: "Standard Chartered", amount: 120000000, currency: "SGD", status: "Settled", date: "1 hour ago", rail: "Blockchain" },
  { id: "4", issuer: "Barclays", amount: 300000000, currency: "GBP", status: "Settled", date: "3 hours ago", rail: "Blockchain" },
];

export function Deposits() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Landmark className="text-emerald-500" />
            Tokenized Deposit Network
          </h1>
          <p className="text-sm text-muted-foreground">Programmable commercial bank money and wholesale CBDCs</p>
        </div>
        
        <Button className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 border-none shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Plus size={16} />
          Issue Deposit Token
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pools.map((pool, i) => (
          <motion.div
            key={pool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-dark rounded-xl border border-border p-5 flex flex-col relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
          >
            {/* Background gradient hint based on utilization */}
            <div 
              className="absolute bottom-0 left-0 w-full h-1"
              style={{ 
                background: `linear-gradient(90deg, hsl(var(--emerald-500)) ${pool.utilization}%, transparent ${pool.utilization}%)`,
                opacity: 0.5
              }}
            />

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-foreground leading-tight">{pool.name}</h3>
                <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded mt-1 inline-block">{pool.currency}</span>
              </div>
              <div className="bg-emerald-500/10 text-emerald-500 font-mono font-bold text-sm px-2 py-1 rounded border border-emerald-500/20">
                {pool.apy}% APY
              </div>
            </div>

            <div className="mt-2 mb-4">
              <p className="text-xs text-muted-foreground mb-1">Total Liquidity</p>
              <p className="text-2xl font-mono font-bold tracking-tight text-foreground">
                {formatCompactCurrency(pool.total, pool.currency)}
              </p>
            </div>

            <div className="space-y-3 mt-auto pt-4 border-t border-border/50">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="font-mono text-foreground">{pool.utilization}%</span>
                </div>
                <div className="h-1.5 bg-background rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pool.utilization}%` }} />
                </div>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active Participants</span>
                <span className="font-mono text-foreground">{pool.participants} Institutions</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {pool.rails.map(rail => (
                  <span key={rail} className="text-[9px] uppercase tracking-wider bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground">
                    {rail}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 glass-dark rounded-xl border border-border overflow-hidden"
        >
          <div className="p-5 border-b border-border flex justify-between items-center bg-background/50">
            <h2 className="text-lg font-semibold text-foreground">Recent Issuances & Redemptions</h2>
            <Button variant="ghost" size="sm" className="text-emerald-500 hover:text-emerald-400">View All</Button>
          </div>
          
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Institution</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium">Settlement Rail</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {issuances.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{item.issuer}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">MINT</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-right font-bold text-foreground">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency, maximumFractionDigits: 0 }).format(item.amount)}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs flex items-center gap-1.5">
                    {item.rail === "Blockchain" ? <Layers size={12} className="text-primary" /> : <ArrowRightLeft size={12} />}
                    {item.rail}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{item.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6">Compliance & Reserves</h2>
          
          <div className="space-y-6 flex-1">
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
              <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">100% Reserve Backed</p>
                <p className="text-xs text-muted-foreground">All tokenized deposits are fully backed 1:1 by central bank reserves or high-quality liquid assets (HQLA) held in bankruptcy-remote trusts.</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Real-time Attestation</span>
                <span className="font-mono text-emerald-500">Live</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Last Oracle Update: 12 seconds ago</p>
            </div>
            
            <div>
               <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Supported Regulatory Regimes</h3>
               <div className="flex flex-wrap gap-2">
                 <span className="text-xs px-2 py-1 bg-background border border-border rounded text-foreground">MiCA (EU)</span>
                 <span className="text-xs px-2 py-1 bg-background border border-border rounded text-foreground">MAS (SG)</span>
                 <span className="text-xs px-2 py-1 bg-background border border-border rounded text-foreground">FCA (UK)</span>
                 <span className="text-xs px-2 py-1 bg-background border border-border rounded text-foreground">DFSA (UAE)</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
