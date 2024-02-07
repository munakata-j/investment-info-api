import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockInfo } from '../stockInfoList/stockInfo.entity';
import { StockInfoDetailController } from './stockInfoDetail.controller';
import { StockInfoDetailService } from './stockInfoDetail.service';
import { MarketDataService } from '../stockInfoList/market-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockInfo])],
  providers: [StockInfoDetailService, MarketDataService],
  controllers: [StockInfoDetailController],
})
export class StockInfoDetailModule {}
