import { motion } from "framer-motion";
import { Brain, AlertTriangle, Crosshair, Radar, BarChart3, ChevronRight, ShieldCheck, Activity, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart } from "@/components/charts/AreaChart";
import { Radar as RechartsRadar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

// Mock data
const radarData = [
  { subject: 'Liquidity', A: 90, fullMark: 100 },
  { subject: 'Market', A: 85, fullMark: 100 },
  { subject: 'Regulatory', A: 95, fullMark: 100 },
  { subject: 'Fraud', A: 98, fullMark: 100 },
  { subject: 'Credit Risk', A: 75, fullMark: 100 },
  { subject: 'Volatility', A: 80, fullMark: 100 },
];

const forecastData = [
  { date: 'Q1', value: 820 },
  { date: 'Q2', value: 860 },
  { date: 'Q3', value: 940 },
  { date: 'Q4', value: 1050 },
  { date: 'Q1(Next)', value: 1200 },
];

export function AiIntelligence() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Brain className="text-accent" />
            ESN-Quant Intelligence
          </h1>
          <p className="text-sm text-muted-foreground">Institutional-grade predictive analytics & risk modeling</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">Model: v3.2.4-institutional</span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
            Engine Online
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Analysis Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="xl:col-span-2 flex flex-col gap-6"
        >
          <div className="flex gap-4 items-center">
            <Select defaultValue="1">
              <SelectTrigger className="w-[300px] bg-background/50 border-border glass-dark h-12 text-base">
                <SelectValue placeholder="Select Asset" />
              </SelectTrigger>
              <SelectContent className="glass-dark border-border">
                <SelectItem value="1">Manhattan Commercial Tower</SelectItem>
                <SelectItem value="2">Dubai Infrastructure Bond</SelectItem>
                <SelectItem value="3">North Sea Energy Complex</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">Analyzing 4.2M data points...</span>
          </div>

          <div className="glass-dark rounded-xl border border-border overflow-hidden">
            {/* Header Banner */}
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-500" size={24} />
                <div>
                  <h3 className="font-bold text-emerald-500 tracking-wide">STRONG BUY RECOMMENDATION</h3>
                  <p className="text-xs text-emerald-500/80">94.7% Confidence Level • Exit window: 18-24 months</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Target Price</p>
                <p className="text-xl font-mono font-bold text-foreground">$105.40 <span className="text-sm text-emerald-500 font-sans">+12.4%</span></p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Radar Chart */}
              <div className="flex flex-col items-center">
                <h4 className="text-sm font-semibold text-muted-foreground w-full mb-2">Multidimensional Risk Profile</h4>
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <RechartsRadar name="Asset Profile" dataKey="A" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.3} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center gap-6 w-full mt-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold font-mono text-emerald-500">92</p>
                    <p className="text-xs text-muted-foreground uppercase">Overall Score</p>
                  </div>
                  <div className="w-px bg-border"></div>
                  <div className="text-center">
                    <p className="text-3xl font-bold font-mono text-accent">2.3</p>
                    <p className="text-xs text-muted-foreground uppercase">Risk Factor</p>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold text-muted-foreground mb-4">ESN-Quant Insights</h4>
                
                <div className="space-y-4 flex-1">
                  <div className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <TrendingUp size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium mb-1">Strong Institutional Demand Forecasted</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Predictive models indicate a 42% increase in institutional demand for prime NY commercial real estate tokens in Q3 2026, driven by shifted rate expectations.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                      <Activity size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium mb-1">Liquidity Corridors Optimal</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Cross-border settlement rails to Asian markets show excess liquidity, reducing expected slippage by 14bps for block trades {'>'}$50M.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 w-6 h-6 rounded bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                      <AlertTriangle size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium mb-1">Regulatory Observation</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Pending SEC ruling on fractional real estate may introduce reporting friction. Model prices in a 2% compliance premium.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                    Download Full PDF Report <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          {/* Market Forecast */}
          <div className="glass-dark rounded-xl border border-border p-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">RWA Market Growth Forecast ($B)</h2>
            <div className="h-[200px] mb-4">
              <AreaChart 
                data={forecastData} 
                dataKey="value" 
                xAxisKey="date" 
                gradientId="forecast"
                strokeColor="hsl(var(--accent))"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Global Liquidity Trend</span>
                <span className="text-emerald-500 font-medium">Expanding</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Volatility Index</span>
                <span className="text-foreground font-medium">14.2 (Low)</span>
              </div>
            </div>
          </div>

          {/* Top Opportunities */}
          <div className="glass-dark rounded-xl border border-border p-6 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Crosshair size={18} className="text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Algorithmic Opportunities</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "Tokenized T-Bill Arb", spread: "12bps", conf: 98 },
                { name: "EUR/USD Settlement", spread: "4bps", conf: 99 },
                { name: "Private Credit Secondary", spread: "240bps", conf: 82 },
              ].map((opp, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group">
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{opp.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Spread: {opp.spread}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-emerald-500">{opp.conf}%</p>
                    <p className="text-[10px] text-muted-foreground">Conf.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
