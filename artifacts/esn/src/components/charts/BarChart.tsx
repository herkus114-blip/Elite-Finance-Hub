import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Cell } from "recharts";

interface BarChartProps {
  data: any[];
  height?: number;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  layout?: "horizontal" | "vertical";
  formatter?: (value: number) => string;
}

const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark p-3 rounded-lg border border-border shadow-xl">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-mono font-semibold text-foreground">
          {formatter ? formatter(payload[0].value) : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function BarChart({ 
  data, 
  height = 300, 
  dataKey, 
  xAxisKey,
  color = "hsl(var(--primary))",
  layout = "horizontal",
  formatter
}: BarChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart 
          data={data} 
          layout={layout}
          margin={{ top: 10, right: 30, left: layout === 'vertical' ? 50 : 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={layout === 'horizontal'} vertical={layout === 'vertical'} stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis 
            type={layout === 'vertical' ? 'number' : 'category'} 
            dataKey={layout === 'horizontal' ? xAxisKey : undefined} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
            tickFormatter={layout === 'vertical' && formatter ? formatter : undefined}
          />
          <YAxis 
            type={layout === 'vertical' ? 'category' : 'number'} 
            dataKey={layout === 'vertical' ? xAxisKey : undefined}
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={layout === 'horizontal' && formatter ? formatter : undefined}
            width={layout === 'vertical' ? 80 : 60}
          />
          <Tooltip content={<CustomTooltip formatter={formatter} />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
          <Bar dataKey={dataKey} radius={4}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || color} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
