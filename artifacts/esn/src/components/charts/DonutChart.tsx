import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DonutChartProps {
  data: any[];
  height?: number;
  dataKey: string;
  nameKey: string;
  centerText?: string;
  centerSubText?: string;
  formatter?: (value: number) => string;
}

const CustomTooltip = ({ active, payload, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark p-3 rounded-lg border border-border shadow-xl flex items-center gap-3">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
        <div>
          <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
          <p className="text-sm font-mono text-muted-foreground">
            {formatter ? formatter(payload[0].value) : payload[0].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function DonutChart({ 
  data, 
  height = 300, 
  dataKey, 
  nameKey,
  centerText,
  centerSubText,
  formatter
}: DonutChartProps) {
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey={dataKey}
            nameKey={nameKey}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip formatter={formatter} />} />
        </PieChart>
      </ResponsiveContainer>
      
      {(centerText || centerSubText) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerText && <span className="text-2xl font-bold font-mono text-foreground">{centerText}</span>}
          {centerSubText && <span className="text-xs text-muted-foreground uppercase tracking-wider">{centerSubText}</span>}
        </div>
      )}
    </div>
  );
}
