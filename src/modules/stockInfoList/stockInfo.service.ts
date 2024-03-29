import { Injectable } from '@nestjs/common';
import { StockInfo } from './stockInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetStockInfoDto } from './dto/get-stockInfo.dto';
import { ResponseDto } from './dto/response.dto';
import { getFinancialData, getMarketPrice } from '../../service/external-api';
import { MarketDataService } from './market-data.service';
import { calculateFinancialIndicators } from '../../utils/common';

@Injectable()
export class StockInfoService {
  constructor(
    @InjectRepository(StockInfo)
    private stockInfoRepository: Repository<StockInfo>,
    private marketDataService: MarketDataService,
  ) {}

  async findAll(
    code?: string,
    companyname?: string,
    sector17code?: string,
    page?: number,
  ): Promise<ResponseDto> {
    page = page ? page : 1;
    const queryBuilder =
      this.stockInfoRepository.createQueryBuilder('jp_stockinfo');

    const pageSize: number = 20;
    if (code) {
      queryBuilder.andWhere('jp_stockInfo.code = :code', { code });
    }

    if (companyname) {
      queryBuilder.andWhere('jp_stockInfo.companyname = :companyname', {
        companyname,
      });
    }

    if (sector17code) {
      queryBuilder.andWhere('jp_stockInfo.sector17code = :sector17code', {
        sector17code,
      });
    }

    //抽出レコード数
    const totalSize = await queryBuilder.getCount();

    const res = await queryBuilder
      .skip(pageSize * (page - 1)) // 現在のページに応じたオフセット
      .take(pageSize) // 1ページあたりのレコード数
      .getMany(); // レコードを取得

    const stockInfosPromises = res.map(async (d) => {
      let marketPrice;
      let financialData;

      // 時価取得
      try {
        marketPrice = await getMarketPrice(d.code);
      } catch (error) {
        console.error(`Error fetching market price for code ${d.code}:`, error);
        return null;
      }

      // 財務データ取得
      try {
        financialData = await getFinancialData(d.code);
      } catch (error) {
        console.error(
          `Error fetching financial data for code ${d.code}:`,
          error,
        );
        return null;
      }

      const financialFormatData = calculateFinancialIndicators(
        financialData,
        d,
        marketPrice?.[0]?.Close ? marketPrice[0].Close : 0,
      );

      // Redisに保存
      await this.marketDataService.saveMarketData(financialFormatData, d.code);

      return new GetStockInfoDto({
        code: d.code,
        companyname: d.companyname,
        id: parseInt(d.id),
        marketcode: d.marketcode,
        marketcodename: d.marketcodename,
        marketprice: marketPrice,
        sector17code: d.sector17code,
        sector17codename: d.sector17codename,
      });
    });
    const stockInfos = await Promise.all(stockInfosPromises);
    return new ResponseDto(stockInfos, totalSize, page, '200', '');
  }
}
