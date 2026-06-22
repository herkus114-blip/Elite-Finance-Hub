import { motion } from "framer-motion";
import { ArrowLeftRight, CheckCircle2, CircleDashed, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function Gateway() {
  const [fromAmount, setFromAmount] = useState("10000000");
  const exchangeRate = 1.0842;
  const toAmount = (Number(fromAmount) * exchangeRate).toFixed(2);

  return (
    <div className="flex flex-col gap-6 pb-12 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <ArrowLeftRight className="text-primary" />
            Institutional FX Gateway
          </h1>
          <p className="text-sm text-muted-foreground">Seamless conversion between Fiat, Crypto, and Tokenized Deposits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        
        {/* Conversion Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-dark rounded-xl border border-border p-8 flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-foreground">Execute Conversion</h2>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">
              <CheckCircle2 size={12} />
              Compliance Check: PASSED
            </div>
          </div>

          <div className="space-y-6 relative">
            {/* FROM */}
            <div className="bg-background/40 border border-border rounded-xl p-4 transition-colors focus-within:border-primary/50">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Sell (From)</label>
              <div className="flex gap-4">
                <Select defaultValue="USD">
                  <SelectTrigger className="w-[140px] text-lg font-bold border-none bg-transparent focus:ring-0 p-0 h-auto shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-border">
                    <SelectItem value="USD">USD (Fiat)</SelectItem>
                    <SelectItem value="EUR">EUR (Fiat)</SelectItem>
                    <SelectItem value="USDC">USDC (Crypto)</SelectItem>
                    <SelectItem value="ESN-USD">ESN-USD (Token)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input 
                  type="text" 
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="flex-1 text-right text-3xl font-mono font-bold border-none bg-transparent focus-visible:ring-0 p-0 shadow-none text-foreground" 
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Balance: $450,000,000.00</span>
                <span>~$10,000,000.00</span>
              </div>
            </div>

            {/* Swap Button */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full glow-cyan transition-transform hover:scale-110 border-4 border-card">
                <ArrowLeftRight size={20} className="rotate-90" />
              </button>
            </div>

            {/* TO */}
            <div className="bg-background/40 border border-border rounded-xl p-4 transition-colors focus-within:border-primary/50">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Buy (To)</label>
              <div className="flex gap-4">
                <Select defaultValue="ESN-EUR">
                  <SelectTrigger className="w-[140px] text-lg font-bold border-none bg-transparent focus:ring-0 p-0 h-auto shadow-none text-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-border">
                    <SelectItem value="ESN-EUR">ESN-EUR (Token)</SelectItem>
                    <SelectItem value="EUR">EUR (Fiat)</SelectItem>
                    <SelectItem value="USDC">USDC (Crypto)</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex-1 text-right text-3xl font-mono font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                  {new Intl.NumberFormat('en-US').format(Number(toAmount))}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span className="text-primary flex items-center gap-1">
                  1 USD = {exchangeRate} EUR 
                  <span className="text-[10px] bg-primary/20 px-1 rounded text-primary">Guaranteed 30s</span>
                </span>
                <span>~$10,000,000.00</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network Fee (0.01%)</span>
              <span className="font-mono text-foreground">$1,000.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Slippage</span>
              <span className="font-mono text-emerald-500">0.00% (Deep Liquidity)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Settlement Time</span>
              <span className="font-mono text-foreground">Instant (Atomic)</span>
            </div>
          </div>

          <Button className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan border-none h-14 text-lg font-semibold tracking-wide">
            Confirm Conversion
          </Button>
        </motion.div>

        {/* Journey Visualization & Rates */}
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-dark rounded-xl border border-border p-8"
          >
            <h3 className="font-semibold text-foreground mb-8">Execution Path</h3>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-pulse" />
              </div>

              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground border-4 border-card">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Initiation</p>
                    <p className="text-xs text-muted-foreground font-mono">Quotes secured</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground border-4 border-card glow-cyan">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">Pre-Trade Compliance</p>
                    <p className="text-xs text-muted-foreground font-mono">KYC/AML / Sanctions check running...</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground border-4 border-card">
                    <CircleDashed size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Liquidity Matching</p>
                    <p className="text-xs text-muted-foreground font-mono">Awaiting pool allocation</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground border-4 border-card">
                    <CircleDashed size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Atomic Settlement</p>
                    <p className="text-xs text-muted-foreground font-mono">Smart contract execution</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-dark rounded-xl border border-border p-6 flex-1"
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Deep Liquidity Rates (Live)</h3>
            <div className="space-y-3">
              {[
                { pair: "EUR/USD", rate: "1.0842", change: "+0.0012", positive: true },
                { pair: "GBP/USD", rate: "1.2654", change: "-0.0008", positive: false },
                { pair: "USD/JPY", rate: "150.24", change: "+0.4500", positive: true },
                { pair: "USD/CHF", rate: "0.8841", change: "-0.0021", positive: false },
              ].map((rate, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-border/50">
                  <span className="font-semibold text-foreground font-mono">{rate.pair}</span>
                  <div className="text-right">
                    <span className="font-mono text-foreground block">{rate.rate}</span>
                    <span className={`text-[10px] font-mono ${rate.positive ? 'text-emerald-500' : 'text-destructive'}`}>
                      {rate.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
