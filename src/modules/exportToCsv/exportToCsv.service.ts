import { Injectable } from '@nestjs/common';
import { createObjectCsvStringifier } from 'csv-writer';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class CsvExportService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async exportData(codes: string[]): Promise<any> {
    try {
      const records = await Promise.all(
        codes.map(async (code) => {
          const key = `code:${code}`;
          const rawData = await this.redis.get(key);
          const data = JSON.parse(rawData);
          return {
            code: data?.code,
            companyname: data?.companyname,
            sectorCode: data?.sectorCode,
            sectorName: data?.sectorName,
            NetSales: data?.NetSales,
            OperatingProfit: data?.OperatingProfit,
            Profit: data?.Profit,
            OperatingProfitMargin: data?.OperatingProfitMargin,
            Equity: data?.Equity,
            TotalAssets: data?.TotalAssets,
            PER: data?.PER,
            DividendYield: data?.DividendYield,
            EquityToAssetRatio: data?.EquityToAssetRatio,
            PBR: data?.PBR,
            ClosePrice: data?.ClosePrice,
            CashAndEquivalents: data?.CashAndEquivalents,
            CashFlowsFromFinancingActivities:
              data?.CashFlowsFromFinancingActivities,
            CashFlowsFromInvestingActivities:
              data?.CashFlowsFromInvestingActivities,
            CashFlowsFromOperatingActivities:
              data?.CashFlowsFromOperatingActivities,
            DisclosedData: data?.DisclosedData,
          };
        }),
      );

      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: 'code', title: 'コード' },
          { id: 'companyname', title: '会社名' },
          { id: 'sectorCode', title: '業種コード' },
          { id: 'sectorName', title: '業種名' },
          { id: 'NetSales', title: '売上高' },
          { id: 'OperatingProfit', title: '営業利益' },
          { id: 'Profit', title: '純利益' },
          { id: 'OperatingProfitMargin', title: '営業利益率' },
          { id: 'Equity', title: '純資産' },
          { id: 'TotalAssets', title: '総資産' },
          { id: 'PER', title: 'PER' },
          { id: 'DividendYield', title: '配当利回り' },
          { id: 'EquityToAssetRatio', title: '自己資本比率' },
          { id: 'PBR', title: 'PBR' },
          { id: 'ClosePrice', title: '株価' },
          { id: 'CashAndEquivalents', title: '現金および同等物' },
          {
            id: 'CashFlowsFromFinancingActivities',
            title: '財務活動によるキャッシュフロー',
          },
          {
            id: 'CashFlowsFromInvestingActivities',
            title: '投資活動によるキャッシュフロー',
          },
          {
            id: 'CashFlowsFromOperatingActivities',
            title: '営業活動によるキャッシュフロー',
          },
          { id: 'DisclosedData', title: '開示日' },
        ],
      });

      const header = csvStringifier.getHeaderString();
      return {
        code: '200',
        msg: '',
        header: header,
        body: [{ records }],
      };
    } catch (error) {
      return {
        code: '500',
        msg: 'Internal Server Error',
        header: '',
        body: [''],
      };
    }
  }
}
