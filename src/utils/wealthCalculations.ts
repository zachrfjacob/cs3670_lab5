export interface PortfolioReturns {
  conservative: { min: number; max: number };
  balanced: { min: number; max: number };
  aggressive: { min: number; max: number };
}

export const PORTFOLIO_RETURNS: PortfolioReturns = {
  conservative: { min: 0.04, max: 0.06 },
  balanced: { min: 0.06, max: 0.08 },
  aggressive: { min: 0.08, max: 0.10 },
};

export const INFLATION_RATE = 0.03; // 3% average inflation

export interface YearlyProjection {
  year: number;
  netWorth: number;
  contributions: number;
  gains: number;
}

export const calculateNetWorthProjection = (
  currentSavings: number,
  monthlyContribution: number,
  portfolioType: keyof PortfolioReturns,
  years: number
): YearlyProjection[] => {
  const returns = PORTFOLIO_RETURNS[portfolioType];
  const averageReturn = (returns.min + returns.max) / 2;
  
  const projections: YearlyProjection[] = [];
  let balance = currentSavings;
  let totalContributions = currentSavings;

  projections.push({
    year: 0,
    netWorth: balance,
    contributions: totalContributions,
    gains: 0,
  });

  for (let year = 1; year <= years; year++) {
    // Add monthly contributions for the year
    const yearlyContribution = monthlyContribution * 12;
    totalContributions += yearlyContribution;
    
    // Calculate returns on current balance plus half of yearly contributions (average)
    const returnsOnBalance = balance * averageReturn;
    const returnsOnContributions = (yearlyContribution / 2) * averageReturn;
    const totalReturns = returnsOnBalance + returnsOnContributions;
    
    // Update balance
    balance = balance + yearlyContribution + totalReturns;
    
    projections.push({
      year,
      netWorth: Math.round(balance),
      contributions: Math.round(totalContributions),
      gains: Math.round(balance - totalContributions),
    });
  }

  return projections;
};

export const getAverageReturn = (portfolioType: keyof PortfolioReturns): number => {
  const returns = PORTFOLIO_RETURNS[portfolioType];
  return (returns.min + returns.max) / 2;
};
