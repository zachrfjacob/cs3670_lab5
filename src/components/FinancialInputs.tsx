import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export interface FinancialData {
  currentSavings: number;
  monthlyContribution: number;
  annualIncome: number;
  portfolioType: "conservative" | "balanced" | "aggressive";
  timeHorizon: number;
}

interface FinancialInputsProps {
  data: FinancialData;
  onChange: (data: FinancialData) => void;
}

export const FinancialInputs = ({ data, onChange }: FinancialInputsProps) => {
  const updateField = (field: keyof FinancialData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="currentSavings" className="text-sm font-medium">
            Current Savings
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="currentSavings"
              type="number"
              value={data.currentSavings}
              onChange={(e) => updateField("currentSavings", parseFloat(e.target.value) || 0)}
              className="pl-7"
              placeholder="50000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyContribution" className="text-sm font-medium">
            Monthly Contribution
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="monthlyContribution"
              type="number"
              value={data.monthlyContribution}
              onChange={(e) => updateField("monthlyContribution", parseFloat(e.target.value) || 0)}
              className="pl-7"
              placeholder="1000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="annualIncome" className="text-sm font-medium">
            Annual Income
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="annualIncome"
              type="number"
              value={data.annualIncome}
              onChange={(e) => updateField("annualIncome", parseFloat(e.target.value) || 0)}
              className="pl-7"
              placeholder="75000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioType" className="text-sm font-medium">
            Portfolio Type
          </Label>
          <Select value={data.portfolioType} onValueChange={(value) => updateField("portfolioType", value)}>
            <SelectTrigger id="portfolioType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conservative">Conservative (4-6% return)</SelectItem>
              <SelectItem value="balanced">Balanced (6-8% return)</SelectItem>
              <SelectItem value="aggressive">Aggressive (8-10% return)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="timeHorizon" className="text-sm font-medium">
            Time Horizon
          </Label>
          <span className="text-sm font-semibold text-primary">{data.timeHorizon} years</span>
        </div>
        <Slider
          id="timeHorizon"
          min={1}
          max={40}
          step={1}
          value={[data.timeHorizon]}
          onValueChange={([value]) => updateField("timeHorizon", value)}
          className="w-full"
        />
      </div>
    </div>
  );
};
