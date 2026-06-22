import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface KpiCardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: ReactNode;
  delay?: number;
  sparklineData?: any[];
}

export function KpiCard({ title, value, prefix = "", suffix = "", trend, icon, delay = 0, sparklineData }: KpiCardProps) {
  // Very simple count up logic for numbers
  const [displayValue, setDisplayValue] = useState(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        
        setDisplayValue(value * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  const formattedValue = typeof displayValue === 'number' 
    ? new Intl.NumberFormat('en-US', { 
        notation: "compact", 
        compactDisplay: "short",
        maximumFractionDigits: 1
      }).format(displayValue)
    : displayValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-dark rounded-xl p-5 border border-border flex flex-col relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-muted-foreground/60">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-1 mt-auto">
        <span className="text-3xl font-bold tracking-tight text-foreground font-mono">
          {prefix}{formattedValue}{suffix}
        </span>
      </div>

      {trend && (
        <div className="mt-2 flex items-center gap-1.5 text-xs font-medium">
          <span className={trend.isPositive ? "text-emerald-500" : "text-destructive"}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}

      {sparklineData && (
        <div className="absolute bottom-0 left-0 w-full h-12 opacity-30 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`sparkline-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill={`url(#sparkline-${title.replace(/\s+/g, '-')})`} 
                isAnimationActive={false}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
