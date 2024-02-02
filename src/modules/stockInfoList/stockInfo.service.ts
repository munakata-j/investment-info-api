import { Injectable } from '@nestjs/common';
import { StockInfo } from './stockInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    selectorCode?: string
  ): Promise<StockInfo[]> {
    const queryBuilder = this.StockInfoRepository.createQueryBuilder();
    if (code) {
      queryBuilder.andWhere('jp_stockInfo.code = :code', { code });
    }

    if (companyname) {
      queryBuilder.andWhere('jp_stockInfo.companyname = :companyname', {
        companyname
      });
    }

    if (selectorCode) {
      queryBuilder.andWhere('jp_stockInfo.selectorCode = :selectorCode', {
        selectorCode
      });
    }
    const res = await queryBuilder.getMany();
    console.log('<<<<<<<<<<<<<', res);
    return queryBuilder.getMany();
  }
}
