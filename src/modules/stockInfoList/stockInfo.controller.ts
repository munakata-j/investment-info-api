import { Controller, Get, Query } from '@nestjs/common';
import { StockInfoService } from './stockInfo.service';
import { StockInfo } from './stockInfo.entity';
import { ResponseDto } from "./dto/response.dto";

@Controller('stockInfo')
export class StockInfoController {
  constructor(private stockInfoService: StockInfoService) {}

  @Get()
  findAll(
    @Query('code') code?: string,
    @Query('companyname') companyname?: string,
    @Query('selectorCode') selectorCode?: string,
    @Query('page') page?: number,
  ): Promise<ResponseDto> {
    const res = this.stockInfoService.findAll(code, companyname, selectorCode, page);
    return res;
  }
}
