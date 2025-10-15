import { FinancialProfile, YearlyProjection, WithdrawalScenario } from "@/types/financial";

export const calculateProjections = (profile: FinancialProfile, years: number): YearlyProjection[] => {
  const projections: YearlyProjection[] = [];
  
  let checking = profile.accountBalances.checking;
  let hysa = profile.accountBalances.hysa;
  let rothIra = profile.accountBalances.rothIra;
  let traditionalIra = profile.accountBalances.traditionalIra;
  let brokerage = profile.accountBalances.brokerage;
  let assets = profile.assets.reduce((sum, asset) => sum + asset.value, 0);

  // Initial state
  projections.push({
    year: 0,
    age: profile.currentAge,
    checking,
    hysa,
    rothIra,
    traditionalIra,
    brokerage,
    assets,
    totalNetWorth: checking + hysa + rothIra + traditionalIra + brokerage + assets,
    totalInvestments: hysa + rothIra + traditionalIra + brokerage,
  });

  // Project forward
  for (let year = 1; year <= years; year++) {
    // Add monthly contributions
    const yearlyHysa = profile.monthlyContributions.hysa * 12;
    const yearlyRoth = profile.monthlyContributions.rothIra * 12;
    const yearlyTrad = profile.monthlyContributions.traditionalIra * 12;
    const yearlyBrokerage = profile.monthlyContributions.brokerage * 12;

    // Calculate returns (simplified: returns on beginning balance + half of contributions)
    const hysaReturn = (hysa + yearlyHysa / 2) * (profile.returnRates.hysa / 100);
    const rothReturn = (rothIra + yearlyRoth / 2) * (profile.returnRates.rothIra / 100);
    const tradReturn = (traditionalIra + yearlyTrad / 2) * (profile.returnRates.traditionalIra / 100);
    const brokerageReturn = (brokerage + yearlyBrokerage / 2) * (profile.returnRates.brokerage / 100);

    // Update balances
    hysa += yearlyHysa + hysaReturn;
    rothIra += yearlyRoth + rothReturn;
    traditionalIra += yearlyTrad + tradReturn;
    brokerage += yearlyBrokerage + brokerageReturn;

    // Appreciate assets
    assets = profile.assets.reduce((sum, asset) => {
      const appreciated = asset.value * Math.pow(1 + asset.appreciationRate / 100, year);
      return sum + appreciated;
    }, 0);

    projections.push({
      year,
      age: profile.currentAge + year,
      checking,
      hysa,
      rothIra,
      traditionalIra,
      brokerage,
      assets,
      totalNetWorth: checking + hysa + rothIra + traditionalIra + brokerage + assets,
      totalInvestments: hysa + rothIra + traditionalIra + brokerage,
    });
  }

  return projections;
};

export const calculateWithdrawalScenarios = (
  projections: YearlyProjection[],
  currentAge: number,
  retirementAge: number
): WithdrawalScenario[] => {
  const scenarios: WithdrawalScenario[] = [];
  const withdrawalRates = [0.03, 0.04, 0.05]; // 3%, 4%, 5% withdrawal rates
  
  // Find projection at retirement age
  const retirementProjection = projections.find(p => p.age === retirementAge);
  if (!retirementProjection) return scenarios;

  for (const rate of withdrawalRates) {
    const annualIncome = retirementProjection.totalInvestments * rate;
    const monthlyIncome = annualIncome / 12;
    
    // Estimate years of income (simplified: total investments / annual withdrawal)
    const yearsOfIncome = Math.floor(retirementProjection.totalInvestments / annualIncome);

    scenarios.push({
      age: retirementAge,
      monthlyIncome,
      annualIncome,
      yearsOfIncome,
    });
  }

  return scenarios;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
