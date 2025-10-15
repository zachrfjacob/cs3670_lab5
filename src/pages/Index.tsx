import { useState } from "react";
import { AccountInputs } from "@/components/AccountInputs";
import { AssetManager } from "@/components/AssetManager";
import { AgeInputs } from "@/components/AgeInputs";
import { EnhancedWealthChart } from "@/components/EnhancedWealthChart";
import { WithdrawalPlanner } from "@/components/WithdrawalPlanner";
import { NetWorthSummary } from "@/components/NetWorthSummary";
import { Calculator } from "lucide-react";
import { FinancialProfile } from "@/types/financial";
import { calculateProjections, calculateWithdrawalScenarios } from "@/utils/financialCalculations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [profile, setProfile] = useState<FinancialProfile>({
    accountBalances: {
      checking: 5000,
      hysa: 25000,
      rothIra: 50000,
      traditionalIra: 35000,
      brokerage: 40000,
    },
    monthlyContributions: {
      hysa: 500,
      rothIra: 500,
      traditionalIra: 300,
      brokerage: 700,
    },
    returnRates: {
      hysa: 4.5,
      rothIra: 8.0,
      traditionalIra: 8.0,
      brokerage: 7.5,
    },
    assets: [
      { id: "1", name: "Primary Home", value: 400000, appreciationRate: 3.0 },
    ],
    currentAge: 35,
    retirementAge: 65,
  });

  const yearsToProject = Math.min(profile.retirementAge - profile.currentAge + 10, 40);
  const projections = calculateProjections(profile, yearsToProject);
  const withdrawalScenarios = calculateWithdrawalScenarios(
    projections,
    profile.currentAge,
    profile.retirementAge
  );

  const currentProjection = projections[0];
  const retirementProjection = projections.find(p => p.age === profile.retirementAge) || null;

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Advanced Wealth Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your complete financial picture across all accounts, assets, and retirement scenarios
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="accounts" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              
              <TabsContent value="accounts" className="space-y-6 mt-6">
                <AccountInputs
                  balances={profile.accountBalances}
                  contributions={profile.monthlyContributions}
                  returns={profile.returnRates}
                  onBalanceChange={(field, value) =>
                    setProfile({
                      ...profile,
                      accountBalances: { ...profile.accountBalances, [field]: value },
                    })
                  }
                  onContributionChange={(field, value) =>
                    setProfile({
                      ...profile,
                      monthlyContributions: { ...profile.monthlyContributions, [field]: value },
                    })
                  }
                  onReturnChange={(field, value) =>
                    setProfile({
                      ...profile,
                      returnRates: { ...profile.returnRates, [field]: value },
                    })
                  }
                />
              </TabsContent>
              
              <TabsContent value="assets" className="mt-6">
                <AssetManager
                  assets={profile.assets}
                  onAssetsChange={(assets) => setProfile({ ...profile, assets })}
                />
              </TabsContent>
              
              <TabsContent value="timeline" className="mt-6">
                <AgeInputs
                  currentAge={profile.currentAge}
                  retirementAge={profile.retirementAge}
                  onCurrentAgeChange={(age) => setProfile({ ...profile, currentAge: age })}
                  onRetirementAgeChange={(age) => setProfile({ ...profile, retirementAge: age })}
                />
              </TabsContent>
            </Tabs>

            <EnhancedWealthChart data={projections} />
            <WithdrawalPlanner scenarios={withdrawalScenarios} />
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <NetWorthSummary
                currentProjection={currentProjection}
                retirementProjection={retirementProjection}
              />
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            * This calculator provides estimates for planning purposes only. Returns may vary significantly. 
            Tax implications, inflation adjustments, and market volatility are simplified. 
            Consult a certified financial planner for personalized retirement advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
