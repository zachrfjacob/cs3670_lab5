import { Card } from "@/components/ui/card";
import { WithdrawalScenario } from "@/types/financial";
import { formatCurrency } from "@/utils/financialCalculations";
import { DollarSign, TrendingDown, Clock } from "lucide-react";

interface WithdrawalPlannerProps {
  scenarios: WithdrawalScenario[];
}

export const WithdrawalPlanner = ({ scenarios }: WithdrawalPlannerProps) => {
  const rateLabels = ["Conservative (3%)", "Moderate (4%)", "Aggressive (5%)"];

  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <h3 className="text-lg font-semibold mb-4">Retirement Income Scenarios</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Estimated sustainable withdrawal amounts at retirement using different withdrawal rates
      </p>
      
      <div className="space-y-4">
        {scenarios.map((scenario, index) => (
          <Card key={index} className="p-5 bg-gradient-to-br from-primary/5 to-transparent border-l-4 border-l-primary">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">{rateLabels[index]}</h4>
              <span className="text-xs text-muted-foreground">Age {scenario.age}</span>
            </div>
            
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Income</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(scenario.monthlyIncome)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <TrendingDown className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Annual Income</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(scenario.annualIncome)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Years of Income</p>
                  <p className="text-lg font-semibold text-foreground">
                    ~{scenario.yearsOfIncome} years
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> The 4% rule is a common retirement planning guideline. Conservative (3%) provides longer sustainability, 
          while aggressive (5%) offers higher income but depletes funds faster. These are simplified estimates and don't account for 
          taxes, investment returns during retirement, or inflation adjustments.
        </p>
      </div>
    </Card>
  );
};
