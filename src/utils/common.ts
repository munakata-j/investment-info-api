import { FinancialMetrics } from '../config/type';

export function get12WeeksAgoExcludingWeekends(): Date {
  const date = new Date(); // 今日の日付
  date.setDate(date.getDate() - 12 * 7); // 12週間前

  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() - 1);
  }
  return date;
}

export function formatDateToYYYYMMDD(
  date: Date,
  separator: string = '',
): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${separator}${month}${separator}${day}`;
}

export function calculateFinancialIndicators(
  data: any,
  closePrice: number,
): FinancialMetrics {
  // 営業利益率の計算
  const operatingProfitMargin = data?.OperatingProfit
    ? ((data.OperatingProfit / data.NetSales) * 100).toFixed(2) + '%'
    : '0%';

  // PER（株価収益率）の計算
  const per = data?.EarningsPerShare
    ? (closePrice / data.EarningsPerShare).toFixed(2)
    : '0';

  // 配当利回りの計算
  const dividendYield = data?.AnnualDividendPerShare
    ? ((data.AnnualDividendPerShare / closePrice) * 100).toFixed(2) + '%'
    : '%';

  // 自己資本比率の計算
  const equityToAssetRatio = data?.Equity
    ? ((data.Equity / data.TotalAssets) * 100).toFixed(2) + '%'
    : '0%';

  // PBR（株価純資産倍率）の計算
  const pbr = data?.BookValuePerShare
    ? (closePrice / data.BookValuePerShare).toFixed(2)
    : '0';

  return {
    NetSales: data?.NetSales, // 売上高
    OperatingProfit: data?.OperatingProfit, // 営業利益
    OperatingProfitMargin: operatingProfitMargin, // 営業利益率
    PER: parseFloat(per), // PER
    DividendYield: dividendYield, // 配当利回り
    EquityToAssetRatio: equityToAssetRatio, // 自己資本比率
    PBR: parseFloat(pbr), // PBR
    ClosePrice: closePrice, //株価
  };
}
