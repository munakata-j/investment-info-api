import { Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { StockInfoService } from './stockInfo.service';
import { MarketDataService } from './market-data.service';
import { Response } from 'express';

@Controller('stockInfo')
export class StockInfoController {
  constructor(
    private stockInfoService: StockInfoService,
    private marketDataService: MarketDataService,
  ) {}

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('code') code?: string,
    @Query('companyname') companyname?: string,
    @Query('sector17code') sector17code?: string,
    @Query('page') page?: number,
  ) {
    try {
      const stockInfo = await this.stockInfoService.findAll(
        code,
        companyname,
        sector17code,
        page,
      );
      res.status(HttpStatus.OK);
      res.header('Content-Type', 'application/json');
      res.send({
        code: '200',
        msg: '',
        data: stockInfo,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message,
      });
    }
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
