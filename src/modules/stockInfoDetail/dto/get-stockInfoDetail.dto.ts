export class GetStockInfoDetailDto {
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
  constructor(partial: GetStockInfoDetailDto) {
    Object.assign(this, partial);
  }
}
