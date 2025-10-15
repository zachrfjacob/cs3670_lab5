import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card } from "@/components/ui/card";
import { YearlyProjection } from "@/types/financial";
import { formatCurrency } from "@/utils/financialCalculations";

interface EnhancedWealthChartProps {
  data: YearlyProjection[];
}

export const EnhancedWealthChart = ({ data }: EnhancedWealthChartProps) => {
  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <h3 className="text-lg font-semibold mb-6">Net Worth Projection Over Time</h3>
      <ResponsiveContainer width="100%" height={450}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInvestments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="age" 
            stroke="hsl(var(--muted-foreground))"
            label={{ value: "Age", position: "insideBottom", offset: -5 }}
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
          <Legend />
          <Area
            type="monotone"
            dataKey="assets"
            stackId="1"
            stroke="hsl(var(--secondary))"
            fill="url(#colorAssets)"
            name="Assets"
          />
          <Area
            type="monotone"
            dataKey="totalInvestments"
            stackId="1"
            stroke="hsl(var(--accent))"
            fill="url(#colorInvestments)"
            name="Total Investments"
          />
          <Area
            type="monotone"
            dataKey="checking"
            stackId="1"
            stroke="hsl(var(--muted-foreground))"
            fill="hsl(var(--muted))"
            name="Checking"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
