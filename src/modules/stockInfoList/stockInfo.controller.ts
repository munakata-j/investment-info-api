import { Controller, Get, Post, Query } from '@nestjs/common';
import { StockInfoService } from './stockInfo.service';
import { ResponseDto } from './dto/response.dto';
import { MarketDataService } from './market-data.service';

@Controller('stockInfo')
export class StockInfoController {
  constructor(
    private stockInfoService: StockInfoService,
    private marketDataService: MarketDataService,
  ) {}

  @Get()
  findAll(
    @Query('code') code?: string,
    @Query('companyname') companyname?: string,
    @Query('sector17code') sector17code?: string,
    @Query('page') page?: number,
  ): Promise<ResponseDto> {
    const res = this.stockInfoService.findAll(
      code,
      companyname,
      sector17code,
      page,
    );
    return res;
  }

  @Post('/flushdb')
  async flushDb() {
    await this.marketDataService.flushDb();
    return { message: 'Current database flushed' };
  }

  @Post('/flushall')
  async flushAll() {
    await this.marketDataService.flushAll();
    return { message: 'All databases flushed' };
  }
}
