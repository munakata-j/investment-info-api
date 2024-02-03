import { Injectable } from '@nestjs/common';
import { StockInfo } from './stockInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetStockInfoDto } from "./dto/get-stockInfo.dto";
import { ResponseDto } from "./dto/response.dto";

@Injectable()
export class StockInfoService {
  constructor(
    @InjectRepository(StockInfo)
    private StockInfoRepository: Repository<StockInfo>,
  ) {
  }

  async findAll(
    code?: string,
    companyname?: string,
    selectorCode?: string,
    //page?: number
    page = 1
  ): Promise<ResponseDto> {
    const queryBuilder = this.StockInfoRepository.createQueryBuilder();
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
        selectorCode
      });
    }

    //抽出レコード数
    const totalSize = await queryBuilder.getCount();

    const res = await queryBuilder
      .skip(pageSize * (page - 1)) // 現在のページに応じたオフセット
      .take(pageSize) // 1ページあたりのレコード数
      .getMany(); // レコードを取得

    const stockInfos = res.map(d => new GetStockInfoDto({
      code: d.code,
      companyname: d.companyname,
      id: parseInt(d.id),
      marketcode: d.marketcode,
      marketcodename: d.marketcodename,
      marketprice: 0,
      sector17code: d.sector17code,
      sector17codename: d.sector17codename
    }));
    return new ResponseDto(stockInfos, totalSize, page);
  }
}
