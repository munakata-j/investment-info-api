import { Controller, Get, Query } from '@nestjs/common';
import { StockInfoService } from './stockInfo.service';
import { ResponseDto } from './dto/response.dto';

@Controller('stockInfo')
export class StockInfoController {
  constructor(private stockInfoService: StockInfoService) {}

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
}
