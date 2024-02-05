import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockInfoModule } from './modules/stockInfoList/stockInfo.module';
import { StockInfo } from './modules/stockInfoList/stockInfo.entity';
import { RedisModule } from '@nestjs-modules/ioredis';
import { exportToCsvModule } from "./modules/exportToCsv/exportToCsv.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // アプリケーション全体でConfigModuleを利用可能
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        entities: [StockInfo],
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'haru-0612',
        database: process.env.DATABASE_NAME,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://127.0.0.1:6379',
    }),
    StockInfoModule,
    exportToCsvModule,
  ],
})
export class AppModule {}
