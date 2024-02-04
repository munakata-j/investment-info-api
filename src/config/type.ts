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
  NetSales: number;
  OperatingProfit: number;
  OperatingProfitMargin: string;
  PER: number;
  DividendYield: string;
  EquityToAssetRatio: string;
  PBR: number;
  ClosePrice: number;
}
