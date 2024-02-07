import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { StockInfoDetailService } from './stockInfoDetail.service';

@Controller('stockInfo_detail')
export class StockInfoDetailController {
  constructor(private stockInfoDetailService: StockInfoDetailService) {}
  @Get()
  async findAll(@Res() res: Response, @Query('code') code: string) {
    try {
      const info =
        await this.stockInfoDetailService.getDetailCompanyFinancialData(code);
      res.status(HttpStatus.OK);
      res.header('Content-Type', 'application/json');
      res.header(
        'Content-Disposition',
        'attachment; filename="financial_data.csv"',
      );
      res.send({
        code: '200',
        msg: '',
        data: info,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}
