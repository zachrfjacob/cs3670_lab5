import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card } from "@/components/ui/card";

interface WealthChartProps {
  data: Array<{
    year: number;
    netWorth: number;
    contributions: number;
    gains: number;
  }>;
}

export const WealthChart = ({ data }: WealthChartProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <h3 className="text-lg font-semibold mb-6">Projected Net Worth Growth</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))"
            label={{ value: "Years from Now", position: "insideBottom", offset: -5 }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={formatCurrency}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Area
            type="monotone"
            dataKey="contributions"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorContributions)"
            name="Total Contributions"
          />
          <Area
            type="monotone"
            dataKey="netWorth"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorNetWorth)"
            name="Net Worth"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
