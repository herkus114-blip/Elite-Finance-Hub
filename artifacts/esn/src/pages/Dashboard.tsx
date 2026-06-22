import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetDashboardMetrics, getGetDashboardMetricsQueryKey, useGetMarketActivity } from "@workspace/api-client-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { AreaChart } from "@/components/charts/AreaChart";
import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { Activity, ArrowUpRight, BarChart3, Brain, Globe, Layers, Network, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import { formatCompactCurrency } from "@/lib/format";

// Realistic fallback data
const fallbackMetrics = {
  totalTokenizedAssets: 847300000000,
  totalTreasuryAssets: 234100000000,
  dailySettlementVolume: 12400000000,
  connectedInstitutions: 47,
  globalLiquidityIndex: 94.2,
  aiConfidenceScore: 94.7,
  totalRevenue: 847000000,
  activeCorridors: 127,
  networkUptime: 99.97,
  transactionsToday: 18429,
  revenueChange: 23.4,
  volumeChange: 18.7,
  institutionsChange: 3
};

// Generate realistic chart data
const generateVolumeData = () => {
  const data = [];
  let base = 8.5;
  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some noise and trend
    base = base + (Math.random() * 0.4 - 0.15);
    if (base < 5) base = 5;
    
    // Weekend dip
    const day = date.getDay();
    const multiplier = (day === 0 || day === 6) ? 0.4 : 1;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: (base * multiplier * 1000000000)
    });
  }
  return data;
};

const volumeData = generateVolumeData();

const geoData = [
  { name: "North America", value: 45 },
  { name: "Europe", value: 30 },
  { name: "Asia Pacific", value: 20 },
  { name: "Middle East", value: 5 }
];

const revenueData = [
  { month: "Jan", revenue: 110000000 },
  { month: "Feb", revenue: 125000000 },
  { month: "Mar", revenue: 142000000 },
  { month: "Apr", revenue: 138000000 },
  { month: "May", revenue: 156000000 },
  { month: "Jun", revenue: 176000000 }
];

export function Dashboard() {
  const { data: metricsData, isLoading: isLoadingMetrics } = useGetDashboardMetrics({
    query: { queryKey: getGetDashboardMetricsQueryKey() }
  });
  
  const { data: marketActivity } = useGetMarketActivity();

  const metrics = metricsData || fallbackMetrics;
  
  const [tickerItems] = useState([
    "SETTLED: $24.5M USD-SGD Corridor (Goldman Sachs → DBS)",
    "TOKENIZED: $1.2B Dubai Infrastructure Bond (ESN-RWA)",
    "AI ALERT: High liquidity demand forecast in Asian markets",
    "NEW NODE: Bank of China HK node online",
    "SETTLED: €18.2M EUR-GBP Corridor (Deutsche Bank → HSBC)",
    "ISSUED: $500M Tokenized T-Bill Fund (AAA)"
  ]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Ticker Bar */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg overflow-hidden h-10 flex items-center px-4 relative">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest border-r border-primary/20 pr-4 mr-4 bg-background/80 backdrop-blur z-10">
          <Zap size={14} className="animate-pulse" />
          Live Network Feed
        </div>
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="whitespace-nowrap flex gap-12 text-sm font-mono text-muted-foreground ticker-scroll">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Tokenized Assets" 
          value={metrics.totalTokenizedAssets}
          prefix="$"
          trend={{ value: 12.4, isPositive: true }}
          icon={<Layers className="text-primary" />}
          delay={0.1}
          sparklineData={volumeData.slice(-20).map(d => ({ value: d.volume * 1.5 }))}
        />
        <KpiCard 
          title="Daily Settlement Volume" 
          value={metrics.dailySettlementVolume}
          prefix="$"
          trend={{ value: metrics.volumeChange || 8.2, isPositive: true }}
          icon={<Activity className="text-accent" />}
          delay={0.2}
          sparklineData={volumeData.slice(-20)}
        />
        <KpiCard 
          title="Connected Institutions" 
          value={metrics.connectedInstitutions}
          trend={{ value: metrics.institutionsChange || 3, isPositive: true }}
          icon={<Network className="text-emerald-500" />}
          delay={0.3}
        />
        <KpiCard 
          title="AI Confidence Score" 
          value={metrics.aiConfidenceScore}
          suffix="%"
          trend={{ value: 0.5, isPositive: true }}
          icon={<Brain className="text-amber-500" />}
          delay={0.4}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard 
          title="Treasury Assets" 
          value={metrics.totalTreasuryAssets}
          prefix="$"
          icon={<TrendingUp className="text-primary" />}
          delay={0.5}
        />
        <KpiCard 
          title="Active Corridors" 
          value={metrics.activeCorridors}
          icon={<Globe className="text-primary" />}
          delay={0.6}
        />
        <KpiCard 
          title="Network Uptime" 
          value={metrics.networkUptime}
          suffix="%"
          icon={<ShieldCheck className="text-primary" />}
          delay={0.7}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="lg:col-span-2 glass-dark rounded-xl border border-border p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Global Settlement Volume</h2>
              <p className="text-sm text-muted-foreground">90-day moving average across all corridors</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Total Volume
              </span>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <AreaChart 
              data={volumeData} 
              dataKey="volume" 
              xAxisKey="date" 
            />
          </div>
        </motion.div>

        {/* Market Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col h-full overflow-hidden"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">Live Activity</h2>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
              Live
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {(marketActivity || [
              { id: '1', type: 'settlement', description: 'USD-EUR Corridor Settlement', amount: 45200000, currency: 'USD', timestamp: new Date().toISOString(), status: 'completed' },
              { id: '2', type: 'issuance', description: 'Tokenized Treasury Note', amount: 120000000, currency: 'USD', timestamp: new Date(Date.now() - 50000).toISOString(), status: 'completed' },
              { id: '3', type: 'conversion', description: 'Crypto-Fiat Liquidity Match', amount: 8500000, currency: 'EUR', timestamp: new Date(Date.now() - 120000).toISOString(), status: 'processing' },
              { id: '4', type: 'settlement', description: 'SGD-JPY Corridor Settlement', amount: 32000000, currency: 'SGD', timestamp: new Date(Date.now() - 300000).toISOString(), status: 'completed' },
              { id: '5', type: 'asset', description: 'Commercial Real Estate Tokenized', amount: 240000000, currency: 'USD', timestamp: new Date(Date.now() - 800000).toISOString(), status: 'completed' }
            ]).map((event, i) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (i * 0.1) }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              >
                <div className={`p-2 rounded-full mt-0.5 ${
                  event.type === 'settlement' ? 'bg-primary/20 text-primary' :
                  event.type === 'issuance' ? 'bg-accent/20 text-accent' :
                  'bg-emerald-500/20 text-emerald-500'
                }`}>
                  {event.type === 'settlement' ? <ArrowUpRight size={14} /> :
                   event.type === 'issuance' ? <Layers size={14} /> :
                   <Activity size={14} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{event.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatCompactCurrency(event.amount, event.currency)}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">•</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Geo Distribution */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col"
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">Volume by Region</h2>
          <div className="flex-1 min-h-[250px]">
            <DonutChart 
              data={geoData} 
              dataKey="value" 
              nameKey="name"
              centerText="127"
              centerSubText="Corridors"
              formatter={(val) => `${val}%`}
            />
          </div>
        </motion.div>

        {/* Revenue */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col"
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">Revenue Trajectory</h2>
          <div className="flex-1 min-h-[250px]">
            <BarChart 
              data={revenueData} 
              dataKey="revenue" 
              xAxisKey="month"
              formatter={(val) => formatCompactCurrency(val)}
            />
          </div>
        </motion.div>

        {/* AI Performance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col justify-between"
        >
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">ESN-Quant AI Engine</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Risk Prediction Accuracy</span>
                <span className="font-mono text-primary">98.4%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '98.4%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Liquidity Matching Speed</span>
                <span className="font-mono text-accent">14ms</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Fraud Detection Rate</span>
                <span className="font-mono text-emerald-500">99.9%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.9%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Model Version: v3.2.4</span>
            <span className="text-emerald-500 flex items-center gap-1"><ShieldCheck size={12} /> Secure</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
