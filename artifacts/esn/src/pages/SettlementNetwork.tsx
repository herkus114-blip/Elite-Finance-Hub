import { AnimatePresence, motion } from "framer-motion";
import { Globe2, ArrowRight, Server, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { formatCompactCurrency } from "@/lib/format";

// Realistic coordinates for major financial hubs
const nodes = [
  { id: "NYC", name: "New York", x: 25, y: 35, type: "primary" },
  { id: "LON", name: "London", x: 45, y: 28, type: "primary" },
  { id: "SGP", name: "Singapore", x: 80, y: 55, type: "primary" },
  { id: "TOK", name: "Tokyo", x: 88, y: 35, type: "primary" },
  { id: "FRA", name: "Frankfurt", x: 48, y: 29, type: "secondary" },
  { id: "DXB", name: "Dubai", x: 58, y: 45, type: "secondary" },
  { id: "HKG", name: "Hong Kong", x: 82, y: 45, type: "secondary" },
  { id: "SYD", name: "Sydney", x: 90, y: 80, type: "secondary" },
  { id: "ZUR", name: "Zurich", x: 47, y: 31, type: "secondary" },
];

const initialFlows = [
  { id: 1, from: "NYC", to: "LON", amount: 145000000, speed: 2 },
  { id: 2, from: "LON", to: "SGP", amount: 89000000, speed: 3 },
  { id: 3, from: "SGP", to: "TOK", amount: 210000000, speed: 2.5 },
  { id: 4, from: "TOK", to: "NYC", amount: 340000000, speed: 1.5 },
  { id: 5, from: "FRA", to: "LON", amount: 56000000, speed: 4 },
  { id: 6, from: "DXB", to: "SGP", amount: 112000000, speed: 3.5 },
];

export function SettlementNetwork() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [flows, setFlows] = useState(initialFlows);

  // Simulate new settlements
  useEffect(() => {
    const interval = setInterval(() => {
      const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
      let toNode = nodes[Math.floor(Math.random() * nodes.length)];
      while (toNode.id === fromNode.id) {
        toNode = nodes[Math.floor(Math.random() * nodes.length)];
      }

      const newFlow = {
        id: Date.now(),
        from: fromNode.id,
        to: toNode.id,
        amount: Math.floor(Math.random() * 500000000) + 10000000,
        speed: Math.random() * 2 + 1.5
      };

      setFlows(prev => [...prev.slice(-10), newFlow]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-12 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Globe2 className="text-primary" />
            Global Settlement Network
          </h1>
          <p className="text-sm text-muted-foreground">T+0 atomic cross-border settlement infrastructure</p>
        </div>
        
        <div className="flex items-center gap-4 bg-background/50 px-4 py-2 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-foreground">127 Corridors Active</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <span className="text-xs font-mono text-muted-foreground">Avg Time: 1.4s</span>
        </div>
      </div>

      {/* Main Map Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[2/1] min-h-[400px] glass-dark rounded-xl border border-border overflow-hidden bg-[#050B14]"
      >
        {/* Simplified Map Background (Abstract Grid/Dots) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)', 
               backgroundSize: '30px 30px' 
             }} 
        />
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        {/* SVG Flow Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <AnimatePresence>
            {flows.map((flow) => {
              const start = nodes.find(n => n.id === flow.from);
              const end = nodes.find(n => n.id === flow.to);
              if (!start || !end) return null;

              // Quadratic bezier curve control point to make arcs
              const cpX = (start.x + end.x) / 2;
              const cpY = Math.min(start.y, end.y) - 20;

              const path = `M ${start.x}% ${start.y}% Q ${cpX}% ${cpY}% ${end.x}% ${end.y}%`;

              return (
                <g key={flow.id}>
                  {/* Background track */}
                  <path 
                    d={path} 
                    fill="none" 
                    stroke="hsl(var(--border))" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                    opacity="0.3" 
                  />
                  {/* Animated flow particle */}
                  <motion.circle
                    r="3"
                    fill="hsl(var(--primary))"
                    filter="url(#glow)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: flow.speed, ease: "linear", repeat: Infinity }}
                    style={{ offsetPath: `path('${path}')` }}
                  />
                </g>
              );
            })}
          </AnimatePresence>
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <div 
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* Ping effect */}
            <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${node.type === 'primary' ? 'bg-primary w-4 h-4 -m-1' : 'bg-accent w-3 h-3 -m-0.5'}`} />
            
            {/* Core dot */}
            <div className={`relative rounded-full shadow-lg ${node.type === 'primary' ? 'w-2 h-2 bg-primary shadow-primary/50' : 'w-1.5 h-1.5 bg-accent shadow-accent/50'}`} />
            
            {/* Label */}
            <div className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono font-medium transition-opacity ${activeNode === node.id ? 'opacity-100 text-foreground' : 'opacity-50 text-muted-foreground'}`}>
              {node.name}
            </div>

            {/* Tooltip on hover */}
            <AnimatePresence>
              {activeNode === node.id && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-popover/90 backdrop-blur-md border border-border p-3 rounded-lg shadow-xl w-48 z-20 pointer-events-none"
                >
                  <div className="flex justify-between items-center mb-2 border-b border-border/50 pb-2">
                    <span className="font-bold text-foreground">{node.name} Node</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-1.5 rounded">Online</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-mono text-foreground">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Latency</span>
                      <span className="font-mono text-emerald-500">12ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume (24h)</span>
                      <span className="font-mono text-foreground">{formatCompactCurrency(Math.random() * 10000000000 + 1000000000)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass-dark px-3 py-2 rounded-lg border border-border flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary" /> Primary Liquidity Hub
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" /> Secondary Node
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Transaction Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 glass-dark rounded-xl border border-border overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Activity size={16} className="text-primary" />
              Live Settlement Feed
            </h2>
            <Button size="sm" variant="outline" className="border-border">View Explorer</Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 h-[300px]">
            <AnimatePresence>
              {flows.slice().reverse().map((flow) => (
                <motion.div
                  key={flow.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent transition-colors mb-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded border border-primary/20 text-primary">
                      <Server size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-mono text-sm font-semibold text-foreground">
                        <span>{flow.from}</span>
                        <ArrowRight size={14} className="text-muted-foreground" />
                        <span>{flow.to}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 font-mono">TxRef: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-emerald-500">{formatCompactCurrency(flow.amount)}</p>
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <CheckCircle2 size={10} className="text-emerald-500" />
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Settled T+0</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Action Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-dark rounded-xl border border-border p-6 flex flex-col"
        >
          <h2 className="font-semibold text-foreground mb-6">Initiate Settlement</h2>
          
          <div className="space-y-4 flex-1">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">From Institution</label>
              <select className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
                <option>Goldman Sachs (NYC)</option>
                <option>HSBC (LON)</option>
                <option>DBS (SGP)</option>
              </select>
            </div>
            
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-background border border-border rounded-full p-1.5 text-muted-foreground">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">To Institution</label>
              <select className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
                <option>DBS (SGP)</option>
                <option>MUFG (TOK)</option>
                <option>Deutsche Bank (FRA)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 block">Amount & Currency</label>
              <div className="flex gap-2">
                <input type="text" placeholder="0.00" className="flex-1 bg-background/50 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors" />
                <select className="w-24 bg-background/50 border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>SGD</option>
                </select>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan border-none h-12 text-base font-semibold tracking-wide">
            Execute T+0 Settlement
          </Button>
          
          <div className="flex items-start gap-2 mt-4 text-xs text-muted-foreground">
            <ShieldAlert size={14} className="shrink-0 mt-0.5 text-primary" />
            <p>Transactions are cryptographically signed and immutable. Settlement is final.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
