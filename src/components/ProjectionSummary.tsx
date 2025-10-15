import { Card } from "@/components/ui/card";
import { TrendingUp, PiggyBank, Sparkles } from "lucide-react";

interface ProjectionSummaryProps {
  finalNetWorth: number;
  totalContributions: number;
  totalGains: number;
  inflationRate: number;
  averageReturn: number;
}

export const ProjectionSummary = ({
  finalNetWorth,
  totalContributions,
  totalGains,
  inflationRate,
  averageReturn,
}: ProjectionSummaryProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-elegant)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Projected Net Worth</p>
            <p className="text-3xl font-bold">{formatCurrency(finalNetWorth)}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Contributions</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(totalContributions)}</p>
            </div>
            <div className="bg-secondary/10 p-2 rounded-lg">
              <PiggyBank className="w-5 h-5 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Investment Gains</p>
              <p className="text-xl font-semibold text-accent">{formatCurrency(totalGains)}</p>
            </div>
            <div className="bg-accent/10 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5 shadow-[var(--shadow-card)]">
        <h4 className="text-sm font-medium mb-3 text-foreground">Assumptions</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Average Annual Return</span>
            <span className="font-medium text-foreground">{formatPercent(averageReturn)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Inflation Rate</span>
            <span className="font-medium text-foreground">{formatPercent(inflationRate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Real Return (After Inflation)</span>
            <span className="font-medium text-foreground">{formatPercent(averageReturn - inflationRate)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
