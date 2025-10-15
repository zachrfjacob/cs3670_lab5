export interface AccountBalances {
  checking: number;
  hysa: number;
  rothIra: number;
  traditionalIra: number;
  brokerage: number;
}

export interface MonthlyContributions {
  hysa: number;
  rothIra: number;
  traditionalIra: number;
  brokerage: number;
}

export interface ReturnRates {
  hysa: number;
  rothIra: number;
  traditionalIra: number;
  brokerage: number;
}

export interface Asset {
  id: string;
  name: string;
  value: number;
  appreciationRate: number;
}

export interface FinancialProfile {
  accountBalances: AccountBalances;
  monthlyContributions: MonthlyContributions;
  returnRates: ReturnRates;
  assets: Asset[];
  currentAge: number;
  retirementAge: number;
}

export interface YearlyProjection {
  year: number;
  age: number;
  checking: number;
  hysa: number;
  rothIra: number;
  traditionalIra: number;
  brokerage: number;
  assets: number;
  totalNetWorth: number;
  totalInvestments: number;
}

export interface WithdrawalScenario {
  age: number;
  monthlyIncome: number;
  annualIncome: number;
  yearsOfIncome: number;
}
