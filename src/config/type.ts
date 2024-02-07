export interface FinancialData {
  NetSales: number;
  OperatingProfit: number;
  EarningsPerShare: number;
  ClosePrice: number; // 株価
  AnnualDividendPerShare: number; // 一年間の配当金額（一株あたり）
  TotalEquity: number; // 純資産の総額
  TotalAssets: number; // 総資産の総額
  BookValuePerShare: number; // 一株当たり純資産価値
}

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
export interface CompanyFinancialData {
  code?: string;
  companyname?: string;
  sectorCode?: string;
  sectorName?: string;
  NetSales?: number;
  OperatingProfit?: number;
  Profit?: number;
  OperatingProfitMargin?: number;
  Equity?: number;
  TotalAssets?: number;
  PER?: number;
  DividendYield?: number;
  EquityToAssetRatio?: number;
  PBR?: number;
  ClosePrice?: number;
  CashAndEquivalents?: number;
  CashFlowsFromFinancingActivities?: number;
  CashFlowsFromInvestingActivities?: number;
  CashFlowsFromOperatingActivities?: number;
  DisclosedData?: string;
}
