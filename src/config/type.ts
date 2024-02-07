export interface FinancialMetrics {
  code: string;
  companyname: string;
  sectorCode: string;
  sectorName: string;
  marketName: string;
  NetSales: number;
  OperatingProfit: number;
  Profit: number;
  OperatingProfitMargin: string;
  TotalAssets: number;
  Equity: number;
  PER: number;
  DividendYield: string;
  EquityToAssetRatio: string;
  PBR: number;
  ClosePrice: number;
  CashFlowsFromOperatingActivities: number;
  CashFlowsFromInvestingActivities: number;
  CashFlowsFromFinancingActivities: number;
  CashAndEquivalents: number;
  DisclosedData: string;
}