import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockInfoService } from './stockInfo.service';
import { StockInfoController } from './stockInfo.controller';
import { StockInfo } from './stockInfo.entity';
import { MarketDataService } from './market-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockInfo])],
  providers: [StockInfoService, MarketDataService],
  controllers: [StockInfoController],
})
export class StockInfoModule {}
