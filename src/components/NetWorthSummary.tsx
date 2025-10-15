import { Card } from "@/components/ui/card";
import { YearlyProjection } from "@/types/financial";
import { formatCurrency } from "@/utils/financialCalculations";
import { TrendingUp, Wallet, Home, PiggyBank } from "lucide-react";

interface NetWorthSummaryProps {
  currentProjection: YearlyProjection;
  retirementProjection: YearlyProjection | null;
}

export const NetWorthSummary = ({ currentProjection, retirementProjection }: NetWorthSummaryProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-elegant)]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Current Net Worth</p>
            <p className="text-3xl font-bold">{formatCurrency(currentProjection.totalNetWorth)}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="opacity-75">Investments</p>
            <p className="font-semibold">{formatCurrency(currentProjection.totalInvestments)}</p>
          </div>
          <div>
            <p className="opacity-75">Assets</p>
            <p className="font-semibold">{formatCurrency(currentProjection.assets)}</p>
          </div>
        </div>
      </Card>

      {retirementProjection && (
        <Card className="p-6 bg-gradient-to-br from-secondary to-accent text-primary-foreground shadow-[var(--shadow-elegant)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">At Retirement (Age {retirementProjection.age})</p>
              <p className="text-3xl font-bold">{formatCurrency(retirementProjection.totalNetWorth)}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <PiggyBank className="w-6 h-6" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="opacity-75">Investments</p>
              <p className="font-semibold">{formatCurrency(retirementProjection.totalInvestments)}</p>
            </div>
            <div>
              <p className="opacity-75">Assets</p>
              <p className="font-semibold">{formatCurrency(retirementProjection.assets)}</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-5 shadow-[var(--shadow-card)]">
        <h4 className="text-sm font-medium mb-3 text-foreground">Account Breakdown (Current)</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Checking</span>
            </div>
            <span className="font-medium text-foreground">{formatCurrency(currentProjection.checking)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">HYSA</span>
            </div>
            <span className="font-medium text-foreground">{formatCurrency(currentProjection.hysa)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Roth IRA</span>
            </div>
            <span className="font-medium text-foreground">{formatCurrency(currentProjection.rothIra)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Traditional IRA</span>
            </div>
            <span className="font-medium text-foreground">{formatCurrency(currentProjection.traditionalIra)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Brokerage</span>
            </div>
            <span className="font-medium text-foreground">{formatCurrency(currentProjection.brokerage)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Assets</span>
            </div>
            <span className="font-medium text-foreground">{formatCurrency(currentProjection.assets)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
