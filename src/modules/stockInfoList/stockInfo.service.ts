import { Injectable } from '@nestjs/common';
import { StockInfo } from './stockInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetStockInfoDto } from './dto/get-stockInfo.dto';
import { ResponseDto } from './dto/response.dto';
import { getMarketPrice } from '../../service/external-api';
import { MarketDataService } from './market-data.service';

@Injectable()
export class StockInfoService {
  constructor(
    @InjectRepository(StockInfo)
    private stockInfoRepository: Repository<StockInfo>,
    private marketDataService: MarketDataService
  ) {}

  async findAll(
    code?: string,
    companyname?: string,
    selectorCode?: string,
    //page?: number
    page = 1,
  ): Promise<ResponseDto> {
    const queryBuilder = this.stockInfoRepository.createQueryBuilder('jp_stockinfo');

    const pageSize: number = 10;
    if (code) {
      queryBuilder.andWhere('jp_stockInfo.code = :code', { code });
    }

    if (companyname) {
      queryBuilder.andWhere('jp_stockInfo.companyname = :companyname', {
        companyname,
      });
    }

    if (selectorCode) {
      queryBuilder.andWhere('jp_stockInfo.selectorCode = :selectorCode', {
        selectorCode,
      });
    }

    //抽出レコード数
    const totalSize = await queryBuilder.getCount();

    const res = await queryBuilder
      .skip(pageSize * (page - 1)) // 現在のページに応じたオフセット
      .take(pageSize) // 1ページあたりのレコード数
      .getMany(); // レコードを取得

    //レコード数ループして時価を取得する必要あり
    // 外部APIにアクセス（時価と財務データを取得）
    // const marketPrice = await getMarketPrice(code);
    // console.log('<<<<<<<<<<<<<<<', marketPrice);
    // // Redisに保存
    // await this.marketDataService.saveMarketData(marketPrice);
    // const val = await this.marketDataService.getMarketData(code);
    // console.log('redis val ->', val);

    const stockInfosPromises = res.map(async (d) => {
      const marketPrice = await getMarketPrice(d.code);
      console.log('<<<<<<<<<<<<<<<', marketPrice);
      // Redisに保存
      await this.marketDataService.saveMarketData(marketPrice[0], d.code);
      const val = await this.marketDataService.getMarketData(d.code);
      console.log('redis val ->', val);

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
    return new ResponseDto(stockInfos, totalSize, page);
  }
}
