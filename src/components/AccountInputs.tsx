import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AccountBalances, MonthlyContributions, ReturnRates } from "@/types/financial";
import { Wallet, PiggyBank, TrendingUp } from "lucide-react";

interface AccountInputsProps {
  balances: AccountBalances;
  contributions: MonthlyContributions;
  returns: ReturnRates;
  onBalanceChange: (field: keyof AccountBalances, value: number) => void;
  onContributionChange: (field: keyof MonthlyContributions, value: number) => void;
  onReturnChange: (field: keyof ReturnRates, value: number) => void;
}

export const AccountInputs = ({
  balances,
  contributions,
  returns,
  onBalanceChange,
  onContributionChange,
  onReturnChange,
}: AccountInputsProps) => {
  const CurrencyInput = ({ label, value, onChange, icon: Icon }: any) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="pl-7"
          placeholder="0"
        />
      </div>
    </div>
  );

  const PercentInput = ({ label, value, onChange }: any) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="pr-8"
          placeholder="0"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Checking Account */}
      <Card className="p-5 border-l-4 border-l-primary">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          Checking Account
        </h3>
        <div className="grid gap-4 md:grid-cols-1">
          <CurrencyInput
            label="Current Balance"
            value={balances.checking}
            onChange={(v: number) => onBalanceChange("checking", v)}
            icon={Wallet}
          />
        </div>
      </Card>

      {/* High-Yield Savings */}
      <Card className="p-5 border-l-4 border-l-secondary">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <PiggyBank className="w-5 h-5 text-secondary" />
          High-Yield Savings Account (HYSA)
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <CurrencyInput
            label="Current Balance"
            value={balances.hysa}
            onChange={(v: number) => onBalanceChange("hysa", v)}
            icon={PiggyBank}
          />
          <CurrencyInput
            label="Monthly Contribution"
            value={contributions.hysa}
            onChange={(v: number) => onContributionChange("hysa", v)}
            icon={TrendingUp}
          />
          <PercentInput
            label="Annual Return (%)"
            value={returns.hysa}
            onChange={(v: number) => onReturnChange("hysa", v)}
          />
        </div>
      </Card>

      {/* Roth IRA */}
      <Card className="p-5 border-l-4 border-l-accent">
        <h3 className="font-semibold mb-4">Roth IRA</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <CurrencyInput
            label="Current Balance"
            value={balances.rothIra}
            onChange={(v: number) => onBalanceChange("rothIra", v)}
            icon={TrendingUp}
          />
          <CurrencyInput
            label="Monthly Contribution"
            value={contributions.rothIra}
            onChange={(v: number) => onContributionChange("rothIra", v)}
            icon={TrendingUp}
          />
          <PercentInput
            label="Annual Return (%)"
            value={returns.rothIra}
            onChange={(v: number) => onReturnChange("rothIra", v)}
          />
        </div>
      </Card>

      {/* Traditional IRA */}
      <Card className="p-5 border-l-4 border-l-accent">
        <h3 className="font-semibold mb-4">Traditional IRA</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <CurrencyInput
            label="Current Balance"
            value={balances.traditionalIra}
            onChange={(v: number) => onBalanceChange("traditionalIra", v)}
            icon={TrendingUp}
          />
          <CurrencyInput
            label="Monthly Contribution"
            value={contributions.traditionalIra}
            onChange={(v: number) => onContributionChange("traditionalIra", v)}
            icon={TrendingUp}
          />
          <PercentInput
            label="Annual Return (%)"
            value={returns.traditionalIra}
            onChange={(v: number) => onReturnChange("traditionalIra", v)}
          />
        </div>
      </Card>

      {/* Brokerage */}
      <Card className="p-5 border-l-4 border-l-primary">
        <h3 className="font-semibold mb-4">Taxable Brokerage Account</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <CurrencyInput
            label="Current Balance"
            value={balances.brokerage}
            onChange={(v: number) => onBalanceChange("brokerage", v)}
            icon={TrendingUp}
          />
          <CurrencyInput
            label="Monthly Contribution"
            value={contributions.brokerage}
            onChange={(v: number) => onContributionChange("brokerage", v)}
            icon={TrendingUp}
          />
          <PercentInput
            label="Annual Return (%)"
            value={returns.brokerage}
            onChange={(v: number) => onReturnChange("brokerage", v)}
          />
        </div>
      </Card>
    </div>
  );
};
