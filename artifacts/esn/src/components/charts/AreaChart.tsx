import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface AreaChartProps {
  data: any[];
  height?: number;
  dataKey: string;
  xAxisKey: string;
  gradientId?: string;
  strokeColor?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark p-3 rounded-lg border border-border shadow-xl">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-mono font-semibold text-foreground">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function AreaChart({ 
  data, 
  height = 300, 
  dataKey, 
  xAxisKey,
  gradientId = "colorValue",
  strokeColor = "hsl(var(--primary))"
}: AreaChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis 
            dataKey={xAxisKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000000000}B`}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={strokeColor} 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#${gradientId})`} 
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
