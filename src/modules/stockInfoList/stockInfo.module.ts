import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockInfoService } from './stockInfo.service';
import { StockInfoController } from './stockInfo.controller';
import { StockInfo } from './stockInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockInfo])],
  providers: [StockInfoService],
  controllers: [StockInfoController],
})
export class StockInfoModule {}
